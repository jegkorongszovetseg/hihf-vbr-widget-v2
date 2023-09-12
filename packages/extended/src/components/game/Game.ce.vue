<script setup>
import { computed } from 'vue';
import { compose, groupBy, prop, reverse, isEmpty } from 'ramda';
import { useUrlSearchParams } from '@vueuse/core';
import { useServices, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider, ErrorNotice } from '@mjsz-vbr-elements/core/components';
import { handleServices } from './composables';
import GameData from './GameData.vue';
import GameStats from './GameStats.vue';
import GameEvents from './GameEvents.vue';
import GamePlayersStats from './GamePlayersStats.vue';
import GameGoaliesStats from './GameGoaliesStats.vue';
import GameOfficials from './GameOfficials.vue';
import GameTeamsOfficials from './GameTeamOfficials.vue';
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

const {
  state: gameData,
  execute: getGameData,
  error: gameDataError,
} = useServices({
  options: {
    path: '/v2/game-data',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
});

const {
  state: gameEvents,
  execute: getEvents,
  error: gameEventsError,
} = useServices({
  options: {
    path: '/v2/game-events',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  transform: compose(groupBy(prop('eventPeriod')), reverse),
});

const {
  state: gameStats,
  execute: getGameStats,
  error: gameStatssError,
} = useServices({
  options: {
    path: '/v2/game-stats',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
});

const {
  state: gameOfficials,
  execute: getGameOfficials,
  error: gameOfficialsError,
} = useServices({
  options: {
    path: '/v2/game-officials',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
});

handleServices({ data: gameData, services: [getGameData, getGameStats, getEvents], interval: REFRESH_DELAY });
getGameOfficials();

const hasError = computed(() =>
  [gameDataError.value, gameEventsError.value, gameStatssError.value, gameOfficialsError.value].some(Boolean)
);
</script>

<template>
  <div :class="useMainClass('gamecenter')">
    <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
      <ErrorNotice v-if="hasError" :error="gameDataError" />

      <GameData v-if="!isEmpty(gameData)" :game-data="gameData" :locale="props.locale" />

      <GameOfficials v-if="!isEmpty(gameData)" :game-data="gameData" :game-officials="gameOfficials" />

      <GameStats v-if="!isEmpty(gameStats)" :game-data="gameData" :game-stats="gameStats" />

      <GameEvents v-if="!isEmpty(gameEvents) && !isEmpty(gameData)" :game-events="gameEvents" :game-data="gameData" />

      <GamePlayersStats
        v-if="!isEmpty(gameStats)"
        :data="gameStats.players"
        :home-team-id="gameData.homeTeam.id"
        :home-team-name="gameData.homeTeam.longName"
        :away-team-id="gameData.awayTeam.id"
        :away-team-name="gameData.awayTeam.longName"
      />

      <GameGoaliesStats
        v-if="!isEmpty(gameStats)"
        :data="gameStats.goalies"
        :home-team-id="gameData.homeTeam.id"
        :home-team-name="gameData.homeTeam.longName"
        :away-team-id="gameData.awayTeam.id"
        :away-team-name="gameData.awayTeam.longName"
      />

      <GameTeamsOfficials
        v-if="!isEmpty(gameOfficials) && !isEmpty(gameData)"
        :game-officials="gameOfficials"
        :home-team-name="gameData.homeTeam.longName"
        :away-team-name="gameData.awayTeam.longName"
      />
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/game-center.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
