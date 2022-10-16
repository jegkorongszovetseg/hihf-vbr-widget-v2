<script setup>
import { reactive } from 'vue';
import { head, isEmpty } from 'ramda';
import { fetchVBRData } from '../../../composables/useFetchVBRApi';
import { convertSeasons, REPORTS_MAP, REPORTS_SELECT } from './statistics.internal.js';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
  },
});

const state = reactive({
  error: '',
  seasons: [],
  championshipId: null,
  sections: [],
  section: null,
  reports: REPORTS_SELECT,
  currentReport: 'fieldplayers',
  rows: [],
  component: null,
  columns: null,
});

const initialReport = REPORTS_MAP.get('fieldplayers');
state.component = initialReport.component;
state.columns = initialReport.columns;

const fetchSeasons = async () => {
  try {
    const seasons = await fetchVBRData('/v1/championshipSeasons', props.apiKey, {
      championshipName: props.championshipName,
    });
    state.seasons = convertSeasons(seasons);
    if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
    fetchSection();
  } catch (error) {
    console.log(error);
    state.error = error.message;
  }
};

const fetchSection = async () => {
  try {
    const sections = await fetchVBRData('/v1/championshipSections', props.apiKey, {
      championshipId: Number(state.championshipId),
    });
    state.sections = sections.sectionName;
    state.section = head(state.sections);
    // if (isEmpty(state.rows)) fetchStatistic();
    fetchStatistic();
  } catch (error) {
    console.log(error);
    state.error = error.message;
  }
};

const fetchStatistic = async () => {
  const rows = await fetchVBRData('/v1/playersStatsPeriod', props.apiKey, {
    championshipId: Number(state.championshipId),
    division: state.section,
  });
  console.log(rows);
  state.rows = rows;
};

fetchSeasons();

const onSeasonChange = (event) => {
  console.log(event.target.value);
  state.championshipId = event.target.value;
  fetchSeasons();
};

const onSectionChange = (event) => {
  console.log(event.target.value);
};

const onReportChange = (event) => {
  console.log(event.target.value);
  fetchStatistic();
};
</script>

<template>
  <slot v-bind="{ ...state, onSeasonChange, onSectionChange, onReportChange }" />
</template>
