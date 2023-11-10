<script setup>
import { reactive, computed } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { reverse } from 'ramda';
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import {
  rawConvert,
  sortGames,
  gameDateTime,
  teamResultType,
  gameResult,
  teamOpponent,
  teamName,
  getLocalTimezone,
} from '@mjsz-vbr-elements/core/utils';

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
});

const { onError } = useError();

const { state: playerData } = useServices({
  options: {
    path: '/v2/player-data',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, playerId: state.playerId })),
    immediate: true,
  },
  // transform: (res) => transformTeamInfo(res),
  onError,
});

const { state: playerSeasonStats } = useServices({
  options: {
    path: '/v2/player-season-stats',
    apiKey: props.apiKey,
    params: computed(() => ({ playerId: state.playerId })),
    immediate: true,
  },
  transform: (res) => rawConvert(reverse(res), teamName),
  onError,
});

const { state: playerGames } = useServices({
  options: {
    path: '/v2/player-games',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: state.championshipId, playerId: state.playerId })),
    immediate: true,
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
</script>
<template>
  <slot v-bind="{ playerData, playerGames, playerSeasonStats }"></slot>
</template>
