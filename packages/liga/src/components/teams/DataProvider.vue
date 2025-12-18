<script setup>
import { useError, useLazyLoadingState, useServices } from '@mjsz-vbr-elements/core/composables';
import { convertTeams } from '@mjsz-vbr-elements/core/utils';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { computed, reactive } from 'vue';
import { transformSeasons } from '../internal';

const props = defineProps({
  championshipName: {
    type: String,
    default: '',
  },

  apiKey: {
    type: String,
    default: '',
  },

  locale: {
    type: String,
    default: 'hu',
  },
});

const params = useUrlSearchParams('history');

const state = reactive({
  championshipName: props.championshipName,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
});

const { onError } = useError();

const { isLoading: seasonsLoading, execute: fetchSeasons } = useServices({
  options: {
    path: '/v2/championship-seasons',
    apiKey: props.apiKey,
    params: { championshipName: state.championshipName },
  },
  transform: res => transformSeasons(res, state),
  onError,
});

const {
  isLoading: teamsLoading,
  state: rows,
  execute: fetchTeams,
} = useServices({
  options: {
    path: '/v2/championship-teams',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: convertTeams,
  onError,
});

const isLoading = useLazyLoadingState([seasonsLoading, teamsLoading], { delay: 1000 });

useAsyncQueue([fetchSeasons, fetchTeams]);

function changeSeason(value) {
  state.championshipId = value;
  params.championshipId = value;
  useAsyncQueue([fetchTeams]);
}
</script>

<template>
  <slot
    v-bind="{
      ...state,
      teams: rows,
      isLoading,
      changeSeason,
    }"
  />
</template>
