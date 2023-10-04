<script setup>
import { reactive, computed, unref, toRef } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { useLazyLoadingState, useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, sortGames } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons, transformTeams } from '../internal';
import { transformSections } from './championship.internal.js';

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

const params = useUrlSearchParams('history');

const state = reactive({
  loading: false,
  seasons: [],
  championshipId: Number(params.championshipId) || 0,
  championships: [],
  phaseId: null,
  selectedChampionshipId: null,
  sections: [],
  section: params.section || null,
});
const timezone = toRef(props, 'timezone');
const { onError } = useError();

const teamFilterTypes = computed(() => {
  switch (state.selectedTeamGameType) {
    case 'all':
      return [
        ['homeTeam', 'id'],
        ['awayTeam', 'id'],
      ];
    case 'home':
      return [['homeTeam', 'id']];
    default:
      return [['awayTeam', 'id']];
  }
});

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

const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, gamesLoading], { delay: 1000 });

useAsyncQueue([fetchSeasons, fetchSection, fetchSchedule]);

const phases = computed(() => {
  const champ = state.championships.find((item) => item.sectionId === state.selectedChampionshipId);
  return champ?.phases ?? [];
});

const convertedRows = computed(() => {
  return convert(unref(rows))
    .schedule(unref(timezone), unref(props.locale))
    .value();
});

const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  useAsyncQueue([fetchSection, fetchSchedule]);
};

const changeChampionship = (value) => {
  state.selectedChampionshipId = value;
  state.phaseId = phases.value[0]?.phaseId ?? null;
  fetchSchedule();
};

const changePhase = (value) => {
  state.phaseId = value;
  fetchSchedule();
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      games: convertedRows,
      phases,
      isLoading,
      changeSeason,
      changeChampionship,
      changePhase,
    }"
  ></slot>
</template>
