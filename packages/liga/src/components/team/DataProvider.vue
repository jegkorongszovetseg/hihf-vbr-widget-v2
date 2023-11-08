<script setup>
import { reactive, computed, watch } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import {
  rawConvert,
  gameDateTime,
  gameResult,
  teamOpponent,
  teamResultType,
  sortGames,
  getLocalTimezone,
} from '@mjsz-vbr-elements/core/utils';
import { PAGE_INFO, PAGE_GAMES, PAGE_ROSTER, transformRosters, transformTeamInfo } from './team.internal.js';

const timezone = getLocalTimezone();

const props = defineProps({
  teamId: {
    type: String,
    default: '',
  },

  championshipId: {
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
  page: params.page || PAGE_INFO,
  teamId: Number(params.teamId) || Number(props.teamId),
});

const { onError } = useError();

const { state: teamInfo } = useServices({
  options: {
    path: '/v2/team-info',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, teamId: state.teamId })),
    immediate: true,
  },
  transform: (res) => transformTeamInfo(res),
  onError,
});

const { state: games, execute: fetchTeamGames } = useServices({
  options: {
    path: '/v2/team-games',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, teamId: state.teamId })),
  },
  transform: (res) =>
    rawConvert(
      sortGames(res),
      gameDateTime(timezone, props.locale),
      teamResultType(state.teamId),
      gameResult(state.teamId),
      teamOpponent(state.teamId)
    ),
  onError,
});

const { state: roster, execute: fetchTeamRoster } = useServices({
  options: {
    path: '/v2/championship-players',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: 3450 })),
  },
  transform: (res) => transformRosters(res, state.teamId),
  onError,
});

watch(
  params,
  () => {
    fetchData(params.page);
  },
  {
    immediate: true,
  }
);

function onChangePage(page) {
  state.page = page;
  params.page = page;
}

function fetchData(page) {
  switch (page) {
    case PAGE_GAMES:
      fetchTeamGames();
      break;
    case PAGE_ROSTER:
      fetchTeamRoster();
      break;

    default:
      break;
  }
}
</script>

<template>
  <slot v-bind="{ ...state, games, teamInfo, roster, onChangePage }" />
</template>
