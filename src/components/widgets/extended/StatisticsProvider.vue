<script setup>
import { computed, reactive, unref, watch } from 'vue';
import { head } from 'ramda';
import { fetchVBRData } from '../../../composables/useFetchVBRApi';
import { convertSeasons, convertTeams, REPORTS_MAP, REPORTS_SELECT } from './statistics.internal.js';
import convert from '../../../utils/convert';
import { usePage } from '../../../composables/usePage';
import { SORT_STATE_DESCEND } from '../../../constants';
import useSort from '../../../composables/useSort';
import { useUrlSearchParams } from '@vueuse/core';

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
  reports: REPORTS_SELECT,
  currentReport: params.report || 'fieldplayers',
  teams: [],
  teamFilter: '',
  playerFilter: '',
  rows: [],
  columns: null,
  api: null,
});

const initialReport = REPORTS_MAP.get('fieldplayers');
state.columns = initialReport.columns;
state.api = initialReport.api;

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
    if (!state.section) {
      state.section = head(state.sections);
      params.section = state.section;
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
    state.rows = rows;
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
    console.log(teams);
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
    .playerName()
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

const onSeasonChange = (event) => {
  state.section = null;
  state.report = null;
  params.championshipId = event.target.value;
};

const onSectionChange = (event) => {
  params.section = event.target.value;
};

const onReportChange = (event) => {
  params.report = event.target.value;
};

const onTeamChange = (event) => {
  onPaginatorChange(1);
  state.teamFilter = Number(event.target.value) || '';
};

const onPlayerInput = (event) => {
  onPaginatorChange(1);
  state.playerFilter = event.target.value;
};

watch(
  () => params.report,
  (reportId) => {
    state.currentReport = reportId;
    setTableData();
    fetchStatistic();
  }
);

watch(
  () => params.section,
  (section) => {
    state.section = section;
    fetchStatistic();
  }
);

watch(
  () => params.championshipId,
  async (championshipId) => {
    state.championshipId = championshipId;
    await fetchSection();
    await fetchTeams();
    // await fetchStatistic();
  }
);
</script>

<template>
  <slot
    v-bind="{
      ...state,
      rows: convertedRows,
      sort,
      page,
      onSeasonChange,
      onSectionChange,
      onReportChange,
      onPaginatorChange,
      onTeamChange,
      onPlayerInput,
      onSort,
    }"
  />
</template>
