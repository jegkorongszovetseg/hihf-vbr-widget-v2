<script setup>
import { computed, reactive } from 'vue';
import { useAsyncQueue } from '@vueuse/core';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { sortGames } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons, transformSections  } from '../../utils/transformers';

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
  transform: (data) => sortGames(data),
  onError,
});

useAsyncQueue([fetchSeasons, fetchSection, fetchSchedule]);

// function changeSection() {}
</script>

<template>
  <slot v-bind="{ ...state }" />
</template>
