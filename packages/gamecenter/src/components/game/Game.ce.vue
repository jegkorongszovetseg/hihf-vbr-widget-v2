<script setup>
import { computed } from 'vue';
import { compose, groupBy, prop, reverse, isEmpty, pathOr } from 'ramda';
import { useUrlSearchParams } from '@vueuse/core';
import { useServices, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider, ErrorNotice } from '@mjsz-vbr-elements/core/components';
import { handleServices, useApiErrors } from './composables';
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

const { errors, add: addApiError, remove: removeApiError } = useApiErrors();

const gameId = computed(() => searchParams?.gameid ?? props.gameId);

const { state: gameData, execute: getGameData } = useServices({
  options: {
    path: '/v2/game-data',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  onError: (e) => addApiError('gameData', e),
  onSuccess: () => removeApiError('gameData'),
});

const { state: gameEvents, execute: getEvents } = useServices({
  options: {
    path: '/v2/game-events',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  transform: (data) => compose(groupBy(prop('eventPeriod')), reverse)(data?.isEmpty ? [] : data),
  onError: (e) => addApiError('gameEvents', e),
  onSuccess: () => removeApiError('gameEvents'),
});

const { state: gameStats, execute: getGameStats } = useServices({
  options: {
    path: '/v2/game-stats',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  onError: (e) => addApiError('gameStats', e),
  onSuccess: () => removeApiError('gameStats'),
});

const { state: gameOfficials, execute: getGameOfficials } = useServices({
  options: {
    path: '/v2/game-officials',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  onError: (e) => addApiError('gameOfficials', e),
  onSuccess: () => removeApiError('gameOfficials'),
});

handleServices({
  data: gameData,
  services: { getGameData, getGameStats, getEvents, getGameOfficials },
  interval: REFRESH_DELAY,
});
</script>

<template>
  <div :class="useMainClass('gamecenter')">
    <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
      <ErrorNotice v-for="error in errors" :key="error.key" :error="error" />

      <GameData v-if="!isEmpty(gameData)" :game-data="gameData" :locale="props.locale" />

      <template v-if="gameData?.gameStatus > 0">
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
      </template>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/game-center.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/progress.css"></style>
