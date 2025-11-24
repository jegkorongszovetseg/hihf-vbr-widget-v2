<script setup>
import { ErrorNotice, I18NProvider } from '@mjsz-vbr-elements/core/components';
import { useGameDataSocket, useServices } from '@mjsz-vbr-elements/core/composables';
import { getWebsocketURL, isEmpty, resolveApiKey, transformEventsForGameTimeline } from '@mjsz-vbr-elements/core/utils';
import { useUrlSearchParams } from '@vueuse/core';
import { computed, ref } from 'vue';
import commonEN from '../../locales/en/common.json';
import extendeEN from '../../locales/en/extended.json';
import commonHU from '../../locales/hu/common.json';
import extendedHU from '../../locales/hu/extended.json';
import { useApiErrors } from '../game/composables';
// import ScoreBoard from './components/ScoreBoard.vue';
import { useTeamColors } from './composables/use-team-colors';
import { TAB_EVENTS, TAB_LINEUPS, TAB_OFFICIALS, TAB_PLAYER_STATS, TAB_TEAM_STATS } from './constants';
import GameData from './GameData.vue';
import GameEvents from './GameEvents.vue';
import GameLineups from './GameLineups.vue';
import GameOfficials from './GameOfficials.vue';
import GamePlayerStats from './GamePlayerStats.vue';
import GameTabs from './GameTabs.vue';
import GameTeamStats from './GameTeamStats.vue';
import { handleServices } from './internal';

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

const messages = { en: { ...commonEN, ...extendeEN }, hu: { ...commonHU, ...extendedHU } };

const contentElementRef = ref(null);
// const isScoreBoardVisible = ref(false);

const searchParams = useUrlSearchParams('history');
const activeTab = ref(searchParams.tab || TAB_EVENTS);

// useIntersectionObserver(
//   contentElementRef,
//   ([{ isIntersecting }]) => {
//     isScoreBoardVisible.value = !isIntersecting;
//   },
//   {
//     threshold: 0.25,
//   },
// );

const { errors, add: addApiError, remove: removeApiError } = useApiErrors();

const gameId = computed(() => searchParams?.gameid || searchParams?.gameId || props.gameId);

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
  transform: data => transformEventsForGameTimeline(data),

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
});

const colors = useTeamColors(gameData);

const resolvedApiKey = resolveApiKey(props.apiKey);
const websocketURL = computed(() => getWebsocketURL(`/v2/game-attendance?gameid=${gameId.value}&apiKey=${resolvedApiKey}`));

useGameDataSocket(getWebsocketURL(`/v2/game-data?gameid=${gameId.value}&apiKey=${resolvedApiKey}`), gameData);
</script>

<template>
  <div class="gamecenter-timeline" :style="colors">
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorNotice v-for="error in errors" :key="error.key" :error="error" />

      <!-- <ScoreBoard
        v-if="gameData?.gameStatus === 1"
        :class="{ 'is-visible': isScoreBoardVisible }"
        :game-data="gameData"
      /> -->

      <GameData
        v-if="!isEmpty(gameData)"
        ref="contentElementRef"
        :game-events="gameEvents"
        :game-data="gameData"
        :websocket-url="websocketURL"
        :locale="locale"
      />

      <template v-if="gameData?.gameStatus > 0">
        <GameTabs v-model:active-tab="activeTab" />

        <GameEvents
          v-if="activeTab === TAB_EVENTS && !isEmpty(gameEvents) && !isEmpty(gameData)"
          :game-events="gameEvents"
          :game-data="gameData"
        />

        <GameLineups
          v-if="activeTab === TAB_LINEUPS"
          :data="gameStats.players"
          :game-officials="gameOfficials"
          :home-team-id="gameData.homeTeam.id"
          :home-team-name="gameData.homeTeam.longName"
          :away-team-id="gameData.awayTeam.id"
          :away-team-name="gameData.awayTeam.longName"
        />

        <GameTeamStats v-if="activeTab === TAB_TEAM_STATS" :game-data="gameData" :game-stats="gameStats" />

        <GamePlayerStats
          v-if="activeTab === TAB_PLAYER_STATS && !isEmpty(gameStats)"
          :data="gameStats"
          :home-team-id="gameData.homeTeam.id"
          :home-team-name="gameData.homeTeam.longName"
          :away-team-id="gameData.awayTeam.id"
          :away-team-name="gameData.awayTeam.longName"
        />

        <GameOfficials
          v-if="activeTab === TAB_OFFICIALS && !isEmpty(gameOfficials) && !isEmpty(gameData)"
          :game-officials="gameOfficials"
          :home-team-name="gameData.homeTeam.longName"
          :away-team-name="gameData.awayTeam.longName"
        />
      </template>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/typography.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/badge.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/avatar.css" />

<style src="@mjsz-vbr-elements/shared/css/components/game-center-timeline.css" />

<style src="@mjsz-vbr-elements/shared/css/components/game-center-game-data.css" />

<style src="@mjsz-vbr-elements/shared/css/components/double-bar.css" />

<style src="@mjsz-vbr-elements/shared/css/components/progress.css" />
