<script setup>
import { computed, reactive, unref } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { head, pick } from 'ramda';
import {
  convertSeasons,
  convertTeams,
  setDefaultReport,
  REPORTS_MAP,
  PLAYERS_REPORTS_SELECT,
  TEAMS_REPORTS_SELECT,
  REPORT_TYPE_PLAYERS,
} from './statistics.internal.js';
import {
  convert,
  convertTimesSecToMin,
  convertTimesMinToMinSec,
  playerName,
  rawConvert,
  InvalidSeasonName,
  WidgetError,
} from '@mjsz-vbr-elements/core/utils';
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import { useError, useI18n, useSort, usePage, fetchVBRData } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  limit: {
    type: Number,
    default: 20,
  },

  apiKey: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();
const { onError } = useError();

const params = useUrlSearchParams('history');

const state = reactive({
  loading: false,
  seasons: [],
  championshipId: Number(params.championshipId) || props.championshipId,
  sections: [],
  section: params.section || null,
  phaseId: 0,
  teams: [],
  teamFilter: Number(params.teamFilter) || null,
  playerFilter: '',
  reportType: params.type || REPORT_TYPE_PLAYERS,
  reports: null,
  currentReport: setDefaultReport(params),
  rows: [],
  columns: null,
  api: null,
  apiParams: {},
});

const initialReport = REPORTS_MAP.get('playerspenalties'); // points
state.columns = initialReport.columns;
state.api = initialReport.api;

const currentReportList = computed(() =>
  state.reportType === REPORT_TYPE_PLAYERS ? PLAYERS_REPORTS_SELECT(t) : TEAMS_REPORTS_SELECT(t)
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'point',
  orders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
});

const fetchSeasons = async () => {
  try {
    state.loading = true;
    const seasons = await fetchVBRData('/v2/championship-seasons', props.apiKey, {
      championshipName: props.championshipName,
    });
    if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
    state.seasons = convertSeasons(seasons);
    if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
  } catch (error) {
    onError(error);
  } finally {
    state.loading = false;
  }
};

const fetchSection = async () => {
  try {
    state.loading = true;
    const sections = await fetchVBRData('/v2/championship-sections', props.apiKey, {
      championshipId: state.championshipId,
    });
    state.sections = sections[0].phases;
    if (state.sections && !state.sections.includes(state.section)) {
      state.section = head(state.sections)?.phaseName;
      state.phaseId = head(state.sections)?.phaseId;
      // state.championshipId = sections[0].sectionId;
    }
  } catch (error) {
    onError(error);
  } finally {
    state.loading = false;
  }
};

const fetchStatistic = async () => {
  try {
    state.loading = true;
    state.rows = [];
    onPaginatorChange(1);
    const rows = await fetchVBRData(state.api, props.apiKey, {
      championshipId: state.championshipId,
      phaseId: state.phaseId,
      ...state.apiParams,
    });
    state.rows = rawConvert(
      rows,
      playerName,
      convertTimesMinToMinSec(['mip']),
      convertTimesSecToMin(['dvgTime', 'dvgTimePP1', 'dvgTimePP2', 'advTime', 'advTimePP1', 'advTimePP2'])
    );
  } catch (error) {
    onError(error);
  } finally {
    state.loading = false;
  }
};

const fetchTeams = async () => {
  try {
    state.loading = true;
    state.rows = [];
    const teams = await fetchVBRData('/v2/championship-teams', props.apiKey, {
      championshipId: state.championshipId,
    });
    state.teams = convertTeams(teams);
  } catch (error) {
    onError(error);
  } finally {
    state.loading = false;
  }
};

const convertedRows = computed(() =>
  convert(state.rows)
    .filter(state.teamFilter, [['team', 'id']], true)
    .filter(state.playerFilter, ['name'])
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value()
);

const range = computed(() => {
  return [(page.value - 1) * props.limit + 1, Math.min(page.value * props.limit, convertedRows.value.totalItems)];
});

const setTableData = () => {
  const report = REPORTS_MAP.get(state.currentReport);
  state.columns = report.columns;
  state.api = report.api;
  state.apiParams = report.params || {};
  sort.sortTarget = report.sort.sortTarget;
  sort.orders = report.sort.orders;
};

const onSeasonChange = async (value) => {
  state.championshipId = value;
  params.championshipId = value;
  await fetchSection();
  params.section = state.section;
  await fetchTeams();
  await fetchStatistic();
};

const onSectionChange = async (value) => {
  state.section = value;
  params.section = value;
  await fetchStatistic();
};

const onReportChange = (value) => {
  state.currentReport = value;
  params.report = value;
  setTableData();
  fetchStatistic();
};

const onTeamChange = (value) => {
  onPaginatorChange(1);
  state.teamFilter = Number(value) || null;
  params.teamFilter = value || null;
};

const onPlayerInput = (event) => {
  onPaginatorChange(1);
  if (event instanceof Event) event = event.target.value;
  state.playerFilter = event;
};

const onStatTypeChange = (value) => {
  state.reportType = value;
  state.currentReport = head(currentReportList.value).value;
  state.teamFilter = null;
  state.playerFilter = '';
  params.report = state.currentReport;
  params.teamFilter = null;
  params.type = value;
  setTableData();
  fetchStatistic();
};

const init = async () => {
  await fetchSeasons();
  await fetchSection();
  await fetchTeams();
  setTableData();
  await fetchStatistic();
};
init();
</script>

<template>
  <slot
    v-bind="{
      ...state,
      rows: convertedRows,
      sort,
      page,
      range,
      selectorProps: {
        reports: currentReportList,
        ...pick(
          [
            'seasons',
            'championshipId',
            'sections',
            'section',
            'currentReport',
            'reportType',
            'teams',
            'teamFilter',
            'playerFilter',
          ],
          state
        ),
      },
      selectorListeners: {
        onSeasonChange,
        onSectionChange,
        onReportChange,
        onStatTypeChange,
        onTeamChange,
        onPlayerInput,
      },
      onPaginatorChange,
      onSort,
    }"
  />
</template>
