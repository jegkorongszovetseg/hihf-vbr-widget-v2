<script setup>
import { reactive } from 'vue';
import { descend, compose, map, pick, prop, sort, head, curry } from 'ramda';
import { fetchVBRData } from '../../../composables/useFetchVBRApi';

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
});

const fetchSeasons = async () => {
  try {
    const seasons = await fetchVBRData('/v1/championshipSeasons', props.apiKey, {
      championshipName: props.championshipName,
    });
    const converted = compose(
      sort(descend(prop('championshipId'))),
      map(pick(['championshipId', 'seasonName']))
    )(seasons);
    state.seasons = converted;
    if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
    fetchSection();
  } catch (error) {
    console.log(error);
    state.error = error.message;
  }
};

fetchSeasons();

const fetchSection = async () => {
  try {
    const sections = await fetchVBRData('/v1/championshipSections', props.apiKey, {
      championshipId: Number(state.championshipId),
    });
    state.sections = sections.sectionName;
    state.section = head(state.sections);
  } catch (error) {
    console.log(error);
    state.error = error.message;
  }
};

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
};
</script>

<template>
  <slot v-bind="{ ...state, onSeasonChange, onSectionChange, onReportChange }" />
</template>
