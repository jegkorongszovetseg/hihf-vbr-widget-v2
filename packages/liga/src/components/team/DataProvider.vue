<script setup>
import { reactive, computed, watch } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
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
import {
  PAGE_INFO,
  PAGE_GAMES,
  PAGE_PLAYER_STATS,
  PAGE_ROSTER,
  transformRosters,
  mergePlayerStats,
  transformTeamInfo,
  transformFieledPlayersStats,
} from './team.internal.js';

const timezone = getLocalTimezone();

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

const params = useUrlSearchParams('history');

const state = reactive({
  page: params.page || PAGE_INFO,
  teamId: Number(params.teamId) || Number(props.teamId),
  championshipId: Number(params.championshipId) || Number(props.championshipId),
  statistics: {},
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
  transform: (res) => transformTeamInfo(res),
  onError,
});

const { state: games, execute: fetchTeamGames } = useServices({
  options: {
    path: '/v2/team-games',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, teamId: state.teamId })),
  },
  transform: (res) =>
    rawConvert(
      sortGames(res),
      gameDateTime(timezone, props.locale),
      teamResultType,
      gameResult(state.teamId),
      teamOpponent
    ),
  onError,
});

const { state: roster, execute: fetchTeamRoster } = useServices({
  options: {
    path: '/v2/championship-players',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, teamId: state.teamId })),
  },
  transform: (res) => transformRosters(res, state.teamId),
  onError,
});

const { state: fieldPlayers, execute: fetchFieldLeaders } = useServices({
  options: {
    path: '/v2/players-stats',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformFieledPlayersStats(res, state.teamId),
  onError,
});

const { state: fieldPlayersPenalty, execute: fetchFieldPenalty } = useServices({
  options: {
    path: '/v2/players-penalty',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformFieledPlayersStats(res, state.teamId),
  onError,
});

const { state: goalieStats, execute: fetchGoalieStats } = useServices({
  options: {
    path: '/v2/players-goalie',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId })),
  },
  transform: (res) => transformFieledPlayersStats(res, state.teamId),
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
    case PAGE_PLAYER_STATS:
      state.isStatsLoading = true;
      useAsyncQueue([fetchGoalieStats, fetchFieldLeaders, fetchFieldPenalty], {
        onFinished: () => {
          state.isStatsLoading = false;
          state.statistics = mergePlayerStats({
            goalieStats: goalieStats.value,
            fieldPlayers: fieldPlayers.value,
            playersPenalty: fieldPlayersPenalty.value,
          });
        },
      });
      // state.isStatsLoading = false;
      break;

    default:
      break;
  }
}
</script>

<template>
  <slot v-bind="{ ...state, games, teamInfo, roster, fieldPlayers, fieldPlayersPenalty, onChangePage }" />
</template>
