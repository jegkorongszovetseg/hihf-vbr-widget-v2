<script setup>
import { computed, reactive, unref } from 'vue';
import { head } from 'ramda';
import { fetchVBRData } from '../../../composables/useFetchVBRApi';
import { convertSeasons, REPORTS_MAP, REPORTS_SELECT } from './statistics.internal.js';
import convert from '../../../utils/convert';
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
});

const state = reactive({
  error: '',
  loading: false,
  seasons: [],
  championshipId: null,
  sections: [],
  section: null,
  reports: REPORTS_SELECT,
  currentReport: 'fieldplayers',
  rows: [],
  columns: null,
  api: null,
});

const initialReport = REPORTS_MAP.get('fieldplayers');
state.columns = initialReport.columns;
state.api = initialReport.api;

const { page, change: onPaginatorChange } = usePage({});

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
    fetchSection();
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
      championshipId: Number(state.championshipId),
    });
    state.sections = sections.sectionName;
    state.section = head(state.sections);
    fetchStatistic();
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
      championshipId: Number(state.championshipId),
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

fetchSeasons();

const convertedRows = computed(() =>
  convert(state.rows)
    // .teamFilter(props.teamFilterByName, ['teamName'])
    .playerName()
    .sorted(sort)
    .addIndex(sort.sortTarget)
    .pagination(unref(page), props.limit)
    .value()
);

const onSeasonChange = (event) => {
  state.championshipId = event.target.value;
  fetchSeasons();
};

const onSectionChange = (event) => {
  state.section = event.target.value;
  fetchStatistic();
};

const onReportChange = (event) => {
  state.currentReport = event.target.value;
  const report = REPORTS_MAP.get(event.target.value);
  state.columns = report.columns;
  state.api = report.api;
  sort.sortTarget = report.sort.sortTarget;
  sort.orders = report.sort.orders;
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
      onSeasonChange,
      onSectionChange,
      onReportChange,
      onPaginatorChange,
      onSort,
    }"
  />
</template>
