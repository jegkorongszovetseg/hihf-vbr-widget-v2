<script setup>
import { computed } from 'vue';
import { compose, groupBy, prop, reverse, isEmpty, replace, map, over, lensProp } from 'ramda';
import { useUrlSearchParams } from '@vueuse/core';
import { useServices, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider } from '@mjsz-vbr-elements/core/components';
import { handleServices } from './composables';
import GameData from './GameData.vue';
import GameStats from './GameStats.vue';
import GameEvents from './GameEvents.vue';
import GamePlayersStats from './GamePlayersStats.vue';
import GameGoaliesStats from './GameGoaliesStats.vue';
import hu from './locales/hu.json';
import en from './locales/en.json';

const messages = { en, hu };

const REFRESH_DELAY = 30000;

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  gameId: {
    type: [Number, String],
    default: 0,
  },
});

const searchParams = useUrlSearchParams('history');

const gameId = computed(() => searchParams?.gameId ?? props.gameId);

const { state: gameData, execute: getGameData } = useServices({
  options: {
    path: '/v1/gameData',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
});

const { state: gameEvents, execute: getEvents } = useServices({
  options: {
    path: '/v1/gameEvents',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  // transform: compose(groupBy(prop('eventPeriod')), reverse),
  transform: groupBy(prop('eventPeriod')),
  // transform: map(over(lensProp('eventPeriod'), replace('. ', '-'))),
  // transform: compose(groupBy(prop('eventPeriod'), map(over(lensProp('eventPeriod'), replace('. ', '-'))))),
});

const { state: gameStats, execute: getGameStats } = useServices({
  options: {
    path: '/v1/gameStats',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
});

handleServices({ data: gameData, services: [getGameData, getEvents, getGameStats], interval: REFRESH_DELAY });
</script>

<template>
  <div :class="useMainClass('gamecenter')">
    <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
      <GameData v-if="!isEmpty(gameData)" :game-data="gameData" :locale="props.locale" />

      <GameStats  v-if="!isEmpty(gameStats)" :game-data="gameData" :game-stats="gameStats"  />

      <GameEvents v-if="!isEmpty(gameEvents) && !isEmpty(gameData)" :game-events="gameEvents" :game-data="gameData" />

      <GamePlayersStats
        v-if="!isEmpty(gameStats)"
        :data="gameStats.players"
        :home-team-id="gameData.homeTeamId"
        :home-team-name="gameData.homeTeamName"
        :away-team-id="gameData.awayTeamId"
        :away-team-name="gameData.awayTeamName"
      />

      <GameGoaliesStats
        v-if="!isEmpty(gameStats)"
        :data="gameStats.goalies"
        :home-team-id="gameData.homeTeamId"
        :home-team-name="gameData.homeTeamName"
        :away-team-id="gameData.awayTeamId"
        :away-team-name="gameData.awayTeamName"
      />

      <div>Team Members</div>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/game-center.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
