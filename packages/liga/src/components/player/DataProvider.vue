<script setup>
import { reactive, computed } from 'vue';
import { useAsyncQueue, useUrlSearchParams } from '@vueuse/core';
import { omit, pick } from 'ramda';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { getLocalTimezone } from '@mjsz-vbr-elements/core/utils';
import { COLUMNS_GAMES, COLUMNS_PLAYER_SEASON_STATS } from '../internal';
import {
  transformPlayerData,
  transformSeasonStats,
  transformGames,
  transformCurrentSeasonStats,
  removeCurrentFromSeasonStats,
  PANE_GAMES,
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
  pane: PANE_GAMES,
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
    const { position } = res;
    if (position.toLowerCase() === 'gk') {
      state.seasonApi = GOALIE_STATS_API;
      state.gamesApi = GOALIE_GAMES_API;
      state.isGoalie = true;
    }
    fetchData();
  },
});

const { state: playerSeasonStatsRows, execute: fetchSeasonStats } = useServices({
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

const playerSeasonStats = computed(() => removeCurrentFromSeasonStats(3451, playerSeasonStatsRows.value));
const currentSeasonStats = computed(() => transformCurrentSeasonStats(3451, playerSeasonStatsRows.value));

const currentSeasonColumns = computed(() =>
  state.isGoalie
    ? pick(
        ['teamName', 'gkd', 'gpi', 'mipMin', 'mipPercent', 'ga', 'gaa', 'sog', 'svs', 'svsPercent'],
        COLUMNS_PLAYER_SEASON_STATS
      )
    : omit(
        ['seasonId', 'ga', 'gaa', 'sog', 'svs', 'svsPercent', 'mipMin', 'mipPercent', 'gkd', 'gpi'],
        COLUMNS_PLAYER_SEASON_STATS
      )
);

const seasonColumns = computed(() =>
  state.isGoalie
    ? pick(
        ['season', 'teamName', 'gkd', 'gpi', 'mipMin', 'ga', 'gaa', 'sog', 'svs', 'svsPercent'],
        COLUMNS_PLAYER_SEASON_STATS
      )
    : omit(
        [
          'shootPercent',
          'pimPerGame',
          'p2',
          'p5',
          'p10',
          'p20',
          'p25',
          'gkd',
          'gpi',
          'mipMin',
          'mipPercent',
          'ga',
          'gaa',
          'sog',
          'svs',
          'svsPercent',
        ],
        COLUMNS_PLAYER_SEASON_STATS
      )
);

const gameColumns = computed(() =>
  state.isGoalie
    ? pick(
        [
          'gameDateDate',
          'gameDateTime',
          'teamName',
          'gameResult',
          'gameResultType',
          'opponent',
          'resultType',
          'sa',
          'ga',
          'gaa',
          'svsPercent',
        ],
        COLUMNS_GAMES
      )
    : pick(
        [
          'gameDateDate',
          'gameDateTime',
          'teamName',
          'gameResult',
          'gameResultType',
          'opponent',
          'resultType',
          'goals',
          'assists',
          'points',
          'plusMinus',
          'shoot',
          'shootPercent',
          'pim',
        ],
        COLUMNS_GAMES
      )
);

function fetchData() {
  useAsyncQueue([fetchSeasonStats, fetchGames]);
}

function onChangePane(value) {
  state.pane = value;
}
</script>
<template>
  <slot
    v-bind="{
      pane: state.pane,
      playerData,
      playerGames,
      playerSeasonStats,
      currentSeasonStats,
      gameColumns,
      currentSeasonColumns,
      seasonColumns,
      onChangePane,
    }"
  ></slot>
</template>
