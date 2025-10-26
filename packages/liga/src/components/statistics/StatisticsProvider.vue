<script setup>
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import { fetchVBRData, useError, useI18n, usePage, useSort } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  convertPhaseName,
  convertSeasons,
  convertTeams,
  convertTimesMinToMinSec,
  convertTimesSecToMin,
  head,
  InvalidSeasonName,
  path,
  pick,
  playerName,
  prop,
  rawConvert,
  sortBy,
  teamName,
  WidgetError,
} from '@mjsz-vbr-elements/core/utils';
import { useUrlSearchParams } from '@vueuse/core';
import { computed, reactive, unref } from 'vue';
import {
  PLAYERS_REPORTS_SELECT,
  REPORT_TYPE_PLAYERS,
  REPORTS_MAP,
  setDefaultReport,
  TEAMS_REPORTS_SELECT,
} from './statistics.internal.js';

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
  phaseId: Number(params.phaseId) || 0,
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

const initialReport = REPORTS_MAP.get('points');
state.columns = initialReport.columns;
state.api = initialReport.api;

const currentReportList = computed(() =>
  state.reportType === REPORT_TYPE_PLAYERS ? PLAYERS_REPORTS_SELECT(t) : TEAMS_REPORTS_SELECT(t),
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'points',
  orders: [{ target: 'points', direction: SORT_STATE_DESCEND }],
});

async function fetchSeasons() {
  try {
    state.loading = true;
    const seasons = await fetchVBRData('/v2/championship-seasons', props.apiKey, {
      championshipName: props.championshipName,
    });
    if (seasons.length === 0)
      throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
    state.seasons = convertSeasons(seasons);
    if (!state.championshipId)
      state.championshipId = head(state.seasons).championshipId;
  }
  catch (error) {
    onError(error);
  }
  finally {
    state.loading = false;
  }
}

async function fetchSection() {
  try {
    state.loading = true;
    const sections = await fetchVBRData('/v2/championship-sections', props.apiKey, {
      championshipId: state.championshipId,
    });
    state.sections = sortBy(prop('phaseName'))(convertPhaseName(path([0, 'phases'], sections)));
    state.phaseId = state.phaseId || head(state.sections)?.phaseId;
  }
  catch (error) {
    onError(error);
  }
  finally {
    state.loading = false;
  }
}

async function fetchStatistic() {
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
      teamName,
      convertTimesMinToMinSec(['mip']),
      convertTimesSecToMin([
        'dvgTime',
        'dvgTimePP1',
        'dvgTimePP2',
        'advTime',
        'advTimePP1',
        'advTimePP2',
        'toi',
        'atoi',
        'eqToi',
        'pp1Toi',
        'pp2Toi',
        'sh1Toi',
        'sh2Toi',
        'eqAToi',
        'pp1AToi',
        'pp2AToi',
        'sh1AToi',
        'sh2AToi',
      ]),
    );
  }
  catch (error) {
    onError(error);
  }
  finally {
    state.loading = false;
  }
}

async function fetchTeams() {
  try {
    state.loading = true;
    state.rows = [];
    const teams = await fetchVBRData('/v2/championship-teams', props.apiKey, {
      championshipId: state.championshipId,
    });
    state.teams = convertTeams(teams);
  }
  catch (error) {
    onError(error);
  }
  finally {
    state.loading = false;
  }
}

const convertedRows = computed(() =>
  convert(state.rows)
    .filter(state.teamFilter, [['team', 'id']], true)
    .filter(state.playerFilter, ['name'])
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value(),
);

const range = computed(() => {
  return [(page.value - 1) * props.limit + 1, Math.min(page.value * props.limit, convertedRows.value.totalItems)];
});

function setTableData() {
  const report = REPORTS_MAP.get(state.currentReport);
  state.columns = report.columns;
  state.api = report.api;
  state.apiParams = report.params || {};
  sort.sortTarget = report.sort.sortTarget;
  sort.orders = report.sort.orders;
}

async function onSeasonChange(value) {
  state.championshipId = value;
  params.championshipId = value;
  state.phaseId = null;
  params.phaseId = null;
  await fetchSection();
  params.section = state.section;
  await fetchTeams();
  await fetchStatistic();
}

async function onSectionChange(value) {
  state.phaseId = value;
  params.phaseId = value;
  await fetchStatistic();
}

function onReportChange(value) {
  state.currentReport = value;
  params.report = value;
  setTableData();
  fetchStatistic();
}

function onTeamChange(value) {
  onPaginatorChange(1);
  state.teamFilter = Number(value) || null;
  params.teamFilter = value || null;
}

function onPlayerInput(event) {
  onPaginatorChange(1);
  if (event instanceof Event)
    event = event.target.value;
  state.playerFilter = event;
}

function onStatTypeChange(value) {
  state.reportType = value;
  state.currentReport = head(currentReportList.value).value;
  state.teamFilter = null;
  state.playerFilter = '';
  params.report = state.currentReport;
  params.teamFilter = null;
  params.type = value;
  setTableData();
  fetchStatistic();
}

async function init() {
  await fetchSeasons();
  await fetchSection();
  await fetchTeams();
  setTableData();
  await fetchStatistic();
}
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
            'phaseId',
            'currentReport',
            'reportType',
            'teams',
            'teamFilter',
            'playerFilter',
          ],
          state,
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
