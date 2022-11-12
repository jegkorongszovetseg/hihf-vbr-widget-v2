<script setup>
import { reactive, computed } from 'vue';
import { useAsyncQueue } from '@vueuse/core';
import { useServices } from '@/composables/useServices';
import { useError } from '@/composables/useErrors';
import { transformSeasons, transformSections, transformTeams } from '@/components/widgets/extended/internal';

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

const state = reactive({
  championshipName: props.championshipName,
  loading: false,
  seasons: [],
  championshipId: 0,
  sections: [],
  section: null,
  teams: [],
});

const { onError } = useError();

const { execute: fetchSeasons } = useServices({
  options: {
    path: '/v1/championshipSeasons',
    apiKey: props.apiKey,
    params: { championshipName: state.championshipName },
  },
  transform: (res) => transformSeasons(res, state),
  onError,
});

const { execute: fetchSection } = useServices({
  options: {
    path: '/v1/championshipSections',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformSections(res, state),
  onError,
});

const { execute: fetchTeams } = useServices({
  options: {
    path: '/v1/championshipTeams',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformTeams(res, state),
  onError,
});

useAsyncQueue([fetchSeasons, fetchSection, fetchTeams]);
</script>

<template>
  <slot v-bind="{ ...state }"></slot>
</template>
