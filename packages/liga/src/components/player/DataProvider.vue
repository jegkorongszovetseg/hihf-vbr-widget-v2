<script setup>
import { reactive, computed } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { omit } from 'ramda';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { getLocalTimezone } from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_GAMES } from '../internal';
import {
  transformPlayerData,
  transformSeasonStats,
  transformGames,
  transformCurrentSeasonStats,
} from './player.internal';

const PLAYER_SEASON_STATS_API = '/v2/player-season-stats';
const GOALIE_STATS_API = '/v2/goalie-season-stats';
const PLAYER_GAMES_API = '/v2/player-games';
const GOALIE_GAMES_API = '/v2/goalie-games';
const timezone = getLocalTimezone();

const props = defineProps({
  playerId: {
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
  playerId: Number(params.playerId) || Number(props.playerId),
  championshipId: Number(params.championshipId) || Number(props.championshipId),
  seasonApi: PLAYER_SEASON_STATS_API,
  gamesApi: PLAYER_GAMES_API,
  isGoalie: false,
});

const { onError } = useError();

const { state: playerData } = useServices({
  options: {
    path: '/v2/player-data',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, playerId: state.playerId })),
    immediate: true,
  },
  transform: (res) => transformPlayerData(res, props.locale),
  onError,
  onSuccess: (res) => {
    console.log('Success', res);
    const { position } = res;
    if (position.toLowerCase() === 'gk') {
      state.seasonApi = GOALIE_STATS_API;
      state.gamesApi = GOALIE_GAMES_API;
      state.isGoalie = true;
    }
    fetchData();
  },
});

const { state: playerSeasonStats, execute: fetchSeasonStats } = useServices({
  options: {
    path: computed(() => state.seasonApi),
    apiKey: props.apiKey,
    params: computed(() => ({ playerId: state.playerId })),
    immediate: false,
  },
  transform: (res) => transformSeasonStats(res),
  onError,
});

const { state: playerGames, execute: fetchGames } = useServices({
  options: {
    path: computed(() => state.gamesApi),
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, playerId: state.playerId })),
    immediate: false,
  },
  transform: (res) => transformGames(res, state, props.locale, timezone),
  onError,
});

const currentSeasonStats = computed(() => transformCurrentSeasonStats(3451, playerSeasonStats.value));

const gameColumns = computed(() =>
  state.isGoalie
    ? omit(['ppgf', 'shga'], COLUMNS_GAMES)
    : omit(['toi', 'saves', 'svsPercent', 'ppgf', 'shga'], COLUMNS_GAMES)
);

function fetchData() {
  console.log(state.seasonApi, state.gamesApi);
  useAsyncQueue([fetchSeasonStats, fetchGames]);
}
</script>
<template>
  <slot v-bind="{ playerData, playerGames, playerSeasonStats, currentSeasonStats, gameColumns }"></slot>
</template>
