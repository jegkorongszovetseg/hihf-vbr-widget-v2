<script setup>
import { computed, reactive } from 'vue';
import { useAsyncQueue } from '@vueuse/core';
import { path } from 'ramda';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { transformAllSeason, transformSeasons, transformSections } from './internal';

const props = defineProps({
  apiKey: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'hu',
  },
});

const state = reactive({
  seasonsList: [],
  seasonId: null,
  championshipList: [],
  championshipId: null,
  sections: [],
  sectionId: null,
});

const { onError } = useError();

// all-season-list
// championship-list
// championship-sections

const { isLoading: allSeasonsLoading, execute: fetchAllSeasons } = useServices({
  options: {
    path: '/v2/all-season-list',
    apiKey: props.apiKey,
    params: {},
  },
  transform: (res) => transformAllSeason(res, state),
  onError,
});

const { isLoading: seasonsLoading, execute: fetchSeasons } = useServices({
  options: {
    path: '/v2/championship-list',
    apiKey: props.apiKey,
    params: computed(() => ({ seasonId: state.seasonId })),
  },
  transform: (res) => transformSeasons(res, state),
  onError,
});

const {
  isLoading: sectionsLoading,
  execute: fetchSections,
} = useServices({
  options: {
    path: '/v2/championship-sections',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformSections(res, state),
  onError,
});

const phaseData = computed(()=> state.sections?.find((section)=>section.sectionId === state.sectionId)?.phases ?? [])

useAsyncQueue([fetchAllSeasons, fetchSeasons, fetchSections]);

const isLoading = computed(() => [allSeasonsLoading.value, seasonsLoading.value, sectionsLoading.value].some(Boolean));

function onChangeSeason(value) {
  state.seasonId = value;
  useAsyncQueue([fetchSeasons, fetchSections]);
}

function onChangeChampionship(value) {
  state.championshipId = value;
  fetchSections();
}

function onChangeSection(value) {
  state.sectionId = value;
}
</script>

<template>
  <slot
    v-bind="{
      ...state,
      isLoading,
      phaseData,
      onChangeSeason,
      onChangeSection,
      onChangeChampionship,
    }"
  />
</template>
