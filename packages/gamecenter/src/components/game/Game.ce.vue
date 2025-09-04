<script setup>
import { ErrorNotice, I18NProvider } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { getWebsocketURL, resolveApiKey } from '@mjsz-vbr-elements/core/utils';
import { useUrlSearchParams } from '@vueuse/core';
import { compose, groupBy, isEmpty, isNotEmpty, prop, propEq, reject, reverse } from 'ramda';
import { computed } from 'vue';
import CommonEn from '../../locales/en/common.json';
import CommonHu from '../../locales/hu/common.json';
import { handleServices, useApiErrors } from './composables';
import GameData from './GameData.vue';
import GameEvents from './GameEvents.vue';
import GameGoaliesStats from './GameGoaliesStats.vue';
import GameOfficials from './GameOfficials.vue';
import GamePlayersStats from './GamePlayersStats.vue';
import GameStats from './GameStats.vue';
import GameTeamsOfficials from './GameTeamOfficials.vue';

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

const messages = { en: CommonEn, hu: CommonHu };

const REFRESH_DELAY = 30000;

const searchParams = useUrlSearchParams('history');

const { errors, add: addApiError, remove: removeApiError } = useApiErrors();

const gameId = computed(() => searchParams.gameId || searchParams.gameid || searchParams['game-id'] || props.gameId);

const { state: gameData, execute: getGameData } = useServices({
  options: {
    path: '/v2/game-data',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  onError: e => addApiError('gameData', e),
  onSuccess: () => removeApiError('gameData'),
});

const { state: gameEvents, execute: getEvents } = useServices({
  options: {
    path: '/v2/game-events',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  transform: data =>
    compose(groupBy(prop('eventPeriod')), reverse, reject(propEq('Period', 'type')))(data?.isEmpty ? [] : data),
  onError: e => addApiError('gameEvents', e),
  onSuccess: () => removeApiError('gameEvents'),
});

const { state: gameStats, execute: getGameStats } = useServices({
  options: {
    path: '/v2/game-stats',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  onError: e => addApiError('gameStats', e),
  onSuccess: () => removeApiError('gameStats'),
});

const { state: gameOfficials, execute: getGameOfficials } = useServices({
  options: {
    path: '/v2/game-officials',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  onError: e => addApiError('gameOfficials', e),
  onSuccess: () => removeApiError('gameOfficials'),
});

handleServices({
  data: gameData,
  services: { getGameData, getGameStats, getEvents, getGameOfficials },
  interval: REFRESH_DELAY,
});

const resolvedApiKey = resolveApiKey(props.apiKey);
const websocketURL = computed(() => getWebsocketURL(`/v2/game-attendance?gameid=${gameId.value}&apiKey=${resolvedApiKey}`));
</script>

<template>
  <div class="gamecenter">
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorNotice v-for="error in errors" :key="error.key" :error="error" />

      <GameData v-if="!isEmpty(gameData)" :game-data="gameData" :locale="props.locale" :websocket-url="websocketURL" />

      <GameOfficials v-if="isNotEmpty(gameData)" :game-data="gameData" :game-officials="gameOfficials" />

      <template v-if="gameData?.gameStatus > 0">
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

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/game-center.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/grid.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/progress.scss" lang="scss"></style>
