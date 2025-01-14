<script setup>
import { useError, useServices, useSort } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { useAsyncQueue, useIntervalFn, useUrlSearchParams } from '@vueuse/core';
import { computed, reactive, unref } from 'vue';
import { transformSeasons, transformStandingSections } from '../internal';
import { FETCH_GAMES_INTERVAL, TOGGLE_LIVE, useGamesListForLiveStandings } from './standings.internal';

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
  standingsType: TOGGLE_LIVE,
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
  transform: res => transformSeasons(res, state),
  onError,
});

const { isLoading: sectionLoading, execute: fetchSection } = useServices({
  options: {
    path: '/v2/championship-sections',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: res => transformStandingSections(res, state),
  onError,
});

const {
  isLoading: standingsLoading,
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

const { state: games, execute: fetchGamesList } = useServices({
  options: {
    path: '/v2/games-list',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, division: state.section })),
  },
  onError,
});

const { isActive: isLiveStandingsActive, rows: liveRows } = useGamesListForLiveStandings(rows, games);

// const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, standingsLoading], { delay: 1000 });
const isLoading = computed(() => [sectionLoading.value, seasonsLoading.value, standingsLoading.value].some(Boolean));

const convertedRows = computed(() => {
  return convert(unref(rows)).teamName().sorted(sort).addContinuousIndex().value();
});

const convertedLiveRows = computed(() => {
  return convert(unref(liveRows)).addContinuousIndex().value();
});

useAsyncQueue([fetchSeasons, fetchSection, fetchStandings, fetchGamesList]);

useIntervalFn(fetchGamesList, FETCH_GAMES_INTERVAL);

function changeSeason(value) {
  state.championshipId = value;
  params.championshipId = value;
  // resets
  params.section = null;
  useAsyncQueue([fetchSection, fetchStandings]);
}

function changeSection(value) {
  state.section = value;
  params.section = value;
  // resets
  fetchStandings();
}

function onChangeStandingsType(type) {
  state.standingsType = type;
}
</script>

<template>
  <slot
    v-bind="{
      ...state,
      sort,
      isLoading,
      isLiveStandingsActive,
      teams: convertedRows,
      liveRows: convertedLiveRows,
      onSort,
      changeSeason,
      changeSection,
      onChangeStandingsType,
    }"
  />
</template>
