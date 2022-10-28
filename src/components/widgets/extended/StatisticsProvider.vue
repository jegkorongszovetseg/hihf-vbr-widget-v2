<script setup>
import { computed, reactive, unref } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { head } from 'ramda';
import { fetchVBRData } from '../../../composables/useFetchVBRApi';
import {
  convertSeasons,
  convertTeams,
  REPORTS_MAP,
  PLAYERS_REPORTS_SELECT,
  TEAMS_REPORTS_SELECT,
} from './statistics.internal.js';
import convert, { convertTimes, playerName, rawConvert } from '../../../utils/convert';
import { usePage } from '../../../composables/usePage';
import { SORT_STATE_DESCEND } from '../../../constants';
import useSort from '../../../composables/useSort';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
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

const params = useUrlSearchParams('history');

const state = reactive({
  error: '',
  loading: false,
  seasons: [],
  championshipId: params.championshipId || null,
  sections: [],
  section: params.section || null,
  reports: PLAYERS_REPORTS_SELECT,
  currentReport: params.report || 'points',
  teams: [],
  teamFilter: Number(params.teamFilter) || '',
  playerFilter: '',
  reportType: params.type || 'players',
  rows: [],
  columns: null,
  api: null,
});

const initialReport = REPORTS_MAP.get('points');
state.columns = initialReport.columns;
state.api = initialReport.api;

const currentReportList = computed(() =>
  state.reportType === 'players' ? PLAYERS_REPORTS_SELECT : TEAMS_REPORTS_SELECT
);

const { page, change: onPaginatorChange } = usePage();

const { sort, change: onSort } = useSort({
  sortTarget: 'point',
  orders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
});

const fetchSeasons = async () => {
  try {
    state.loading = true;
    const seasons = await fetchVBRData('/v1/championshipSeasons', props.apiKey, {
      championshipName: props.championshipName,
    });
    state.seasons = convertSeasons(seasons);
    if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
  } catch (error) {
    console.log(error);
    state.error = error.message;
  } finally {
    state.loading = false;
  }
};

const fetchSection = async () => {
  try {
    const sections = await fetchVBRData('/v1/championshipSections', props.apiKey, {
      championshipId: state.championshipId,
    });
    state.sections = sections.sectionName;
    if (!state.sections.includes(state.section)) {
      state.section = head(state.sections);
    }
  } catch (error) {
    console.log(error);
    state.error = error.message;
  }
};

const fetchStatistic = async () => {
  try {
    state.loading = true;
    state.rows = [];
    onPaginatorChange(1);
    const rows = await fetchVBRData(state.api, props.apiKey, {
      championshipId: state.championshipId,
      division: state.section,
    });
    state.rows = rawConvert(
      rows,
      playerName,
      convertTimes(['dvgTime', 'dvgTimePP1', 'dvgTimePP2', 'advTime', 'advTimePP1', 'advTimePP2'])
    );
  } catch (error) {
    console.log(error);
    state.error = error.message;
  } finally {
    state.loading = false;
  }
};

const fetchTeams = async () => {
  try {
    state.loading = true;
    state.rows = [];
    const teams = await fetchVBRData('/v1/championshipTeams', props.apiKey, {
      championshipId: state.championshipId,
    });
    state.teams = convertTeams(teams);
  } catch (error) {
    state.error = error.message;
  } finally {
    state.loading = false;
  }
};

const init = async () => {
  try {
    await fetchSeasons();
    await fetchSection();
    await fetchTeams();
    setTableData();
    await fetchStatistic();
  } catch (error) {
    state.error = error.message;
  }
};
init();

const convertedRows = computed(() =>
  convert(state.rows)
    .filter(state.teamFilter, ['teamId'], true)
    .filter(state.playerFilter, ['name'])
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value()
);

const setTableData = () => {
  const report = REPORTS_MAP.get(state.currentReport);
  state.columns = report.columns;
  state.api = report.api;
  sort.sortTarget = report.sort.sortTarget;
  sort.orders = report.sort.orders;
};

const onSeasonChange = async (event) => {
  const { value } = event.target;
  state.championshipId = value;
  params.championshipId = value;
  await fetchSection();
  params.section = state.section;
  await fetchTeams();
  await fetchStatistic();
};

const onSectionChange = async (event) => {
  const { value } = event.target;
  state.section = value;
  params.section = value;
  await fetchStatistic();
};

const onReportChange = (event) => {
  const { value } = event.target;
  state.currentReport = value;
  params.report = value;
  setTableData();
  fetchStatistic();
};

const onTeamChange = (event) => {
  onPaginatorChange(1);
  const { value } = event.target;
  state.teamFilter = Number(value) || '';
  params.teamFilter = value || null;
};

const onPlayerInput = (event) => {
  onPaginatorChange(1);
  state.playerFilter = event.target.value;
};

const onStatTypeChange = (value) => {
  state.reportType = value;
  state.currentReport = head(currentReportList.value).value;
  params.type = value;
  setTableData();
  fetchStatistic();
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      rows: convertedRows,
      sort,
      page,
      reports: currentReportList,
      onSeasonChange,
      onSectionChange,
      onReportChange,
      onPaginatorChange,
      onTeamChange,
      onPlayerInput,
      onSort,
      onStatTypeChange,
    }"
  />
</template>
