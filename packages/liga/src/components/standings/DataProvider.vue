<script setup>
import { reactive, computed, unref, toRef } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { useLazyLoadingState, useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, sortGames } from '@mjsz-vbr-elements/core/utils';
import { transformSeasons, transformSections, transformTeams } from '../internal';

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
  transform: (data) => sortGames(data),
  onError,
});

const isLoading = useLazyLoadingState([sectionLoading, seasonsLoading, gamesLoading], { delay: 1000 });

const convertedRows = computed(() => {
  return convert(unref(rows)).addContinuousIndex().value();
});

useAsyncQueue([fetchSeasons, fetchSection, fetchStandings], {
  onFinished: () => {},
});

const changeSeason = (value) => {
  state.championshipId = value;
  params.championshipId = value;
  // resets
  state.selectedTeam = null;
  params.selectedTeam = null;
  state.selectedMonth = null;
  params.selectedMonth = null;
  state.selectedTeamGameType = 'all';
  params.selectedTeamGameType = null;
  useAsyncQueue([fetchSection, fetchTeams, fetchSchedule]);
};


const changeSection = (value) => {
  state.section = value;
  params.section = value;
  // resets
  state.selectedMonth = null;
  params.selectedMonth = null;
  fetchSchedule();
};


const changeTeamType = (value) => {
  state.selectedTeamGameType = value;
  params.selectedTeamGameType = value;
};
</script>

<template>
  <slot
    v-bind="{
      ...state,
      teams: convertedRows,
      isLoading,
      changeSeason,
      changeSection,
      changeTeamType,
    }"
  ></slot>
</template>
