<script setup>
import { reactive, computed, unref } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { useLazyLoadingState, useError, useServices, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons, transformSections } from '../internal';
import { useGamesListForLiveStandings, mockGames } from './standings.internal';

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
  loading: false,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
  sections: [],
  section: params.section || null,
});

const { onError } = useError();

const { sort, change: onSort } = useSort({
  sortTarget: '',
  orders: [],
});

const { isLoading: seasonsLoading, execute: fetchSeasons } = useServices({
  options: {
    path: '/v2/championship-seasons',
    apiKey: props.apiKey,
    params: { championshipName: state.championshipName },
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
  execute: fetchStandings,
} = useServices({
  options: {
    path: '/v2/standings',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, division: state.section })),
  },
  onError,
});

const { rows: liveRows } = useGamesListForLiveStandings(rows, mockGames);

const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, gamesLoading], { delay: 1000 });

const convertedRows = computed(() => {
  return convert(unref(rows)).sorted(sort).addContinuousIndex().value();
});

const convertedLiveRows = computed(() => {
  return convert(unref(liveRows)).addContinuousIndex().value();
});

useAsyncQueue([fetchSeasons, fetchSection, fetchStandings]);



const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  // resets
  params.section = null;
  useAsyncQueue([fetchSection, fetchStandings]);
};

const changeSection = (value) => {
  state.section = value;
  params.section = value;
  // resets
  fetchStandings();
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      sort,
      teams: convertedRows,
      liveRows: convertedLiveRows,
      isLoading,
      onSort,
      changeSeason,
      changeSection,
    }"
  ></slot>
</template>
