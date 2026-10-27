<script setup>
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import {
  gameDateTime,
  gameResult,
  getLocalTimezone,
  rawConvert,
  sortGames,
  teamOpponent,
  teamResultType,
  transformFieledPlayersStats,
  transformRosters,
} from '@mjsz-vbr-elements/core/utils';
import { useUrlSearchParams } from '@vueuse/core';
import { computed, reactive, watch } from 'vue';
import {
  PAGE_GAMES,
  PAGE_INFO,
  PAGE_PLAYER_STATS,
  PAGE_ROSTER,
  transformTeamInfo,
} from './team.internal.js';

const props = defineProps({
  apiKey: {
    type: String,
    default: '',
  },

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

const timezone = getLocalTimezone();

const params = useUrlSearchParams('history');

const state = reactive({
  page: params.page || PAGE_INFO,
  teamId: Number(props.teamId),
  championshipId: Number(props.championshipId),
  // statistics: {},
  isStatsLoading: false,
});

const { onError } = useError();

const { state: teamInfo } = useServices({
  options: {
    path: '/v2/team-info',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, teamId: state.teamId })),
    immediate: true,
  },
  transform: res => transformTeamInfo(res),
  onError,
});

const { state: games, execute: fetchTeamGames } = useServices({
  options: {
    path: '/v2/team-games',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, teamId: state.teamId })),
  },
  transform: res =>
    rawConvert(
      sortGames(res),
      gameDateTime(timezone, props.locale),
      teamResultType,
      gameResult(state.teamId),
      teamOpponent,
    ),
  onError,
});

const { state: roster, execute: fetchTeamRoster } = useServices({
  options: {
    path: '/v2/championship-players',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, teamId: state.teamId })),
  },
  transform: res => transformRosters(res, state.teamId),
  onError,
});

const { state: playerStatsByTeam, execute: fetchPlayerStatsByTeam, isLoading: isStatsLoading } = useServices({
  options: {
    path: '/v2/player-season-stats-by-team',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, teamId: state.teamId })),
  },
  transform: res => ({ players: transformFieledPlayersStats(res.players), goalies: transformFieledPlayersStats(res.goalies) }),
  onError,
});

watch(
  params,
  () => {
    fetchData(params.page);
  },
  {
    immediate: true,
  },
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
    case PAGE_PLAYER_STATS:
      fetchPlayerStatsByTeam();
      break;

    default:
      break;
  }
}
</script>

<template>
  <slot v-bind="{ ...state, games, teamInfo, roster, playerStatsByTeam, isStatsLoading, onChangePage }" />
</template>
