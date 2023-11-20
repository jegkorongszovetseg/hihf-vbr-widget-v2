<script setup>
import { computed, reactive } from 'vue';
import { useAsyncQueue } from '@vueuse/core';
import { omit, path, pipe } from 'ramda';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, sortGames } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons, transformSections } from '../../utils/transformers';
import { transformRegistration } from './schedule-cup.internal';

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

  locale: {
    type: String,
    default: 'hu',
  },

  timezone: {
    type: String,
    default: '',
  },
});

const state = reactive({
  seasons: [],
  championshipId: null,
  sections: [],
  sectionId: null,
  phaseId: null,
});

const { onError } = useError();

const { isLoading: seasonsLoading, execute: fetchSeasons } = useServices({
  options: {
    path: '/v2/championship-seasons',
    apiKey: props.apiKey,
    params: { championshipName: props.championshipName },
  },
  transform: (res) => transformSeasons(res, state),
  onError,
});

const { isLoading: sectionLoading, execute: fetchSection } = useServices({
  options: {
    path: '/v2/championship-sections',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformSections(res, state),
  onError,
});

const {
  isLoading: gamesLoading,
  state: rows,
  execute: fetchSchedule,
} = useServices({
  options: {
    path: '/v2/games-list',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, phaseId: state.phaseId })),
  },
  transform: (data) => pipe(sortGames, transformRegistration(state.championshipId))(data),
  onError,
});

const convertedRows = computed(() => {
  return convert(rows.value).schedule(props.timezone, props.locale).value();
});

useAsyncQueue([fetchSeasons, fetchSection, fetchSchedule]);

const isLoading = computed(() => [sectionLoading.value, seasonsLoading.value, gamesLoading.value].some(Boolean));

function onChangeSeason(value) {
  state.championshipId = value;
  useAsyncQueue([fetchSection, fetchSchedule]);
}

function onChangeSection(payload) {
  state.sectionId = payload.sectionId;
  state.phaseId = path(['phases', 0, 'phaseId'], payload);
  fetchSchedule();
}
</script>

<template>
  <slot
    v-bind="{
      rows: convertedRows,
      isLoading,
      values: omit(['phaseId'], state),
      listeners: { onChangeSection, onChangeSeason },
    }"
  />
</template>
