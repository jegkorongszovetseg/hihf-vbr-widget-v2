<script setup>
import { I18NProvider, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import { useServices, useVisibilityChange } from '@mjsz-vbr-elements/core/composables';
import { format, getLocalTimezone, isAfter, isEmpty, offsetName } from '@mjsz-vbr-elements/core/utils';
import { refDebounced, useIntervalFn } from '@vueuse/core';
import { computed, ref, triggerRef } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import Carousel from './Carousel.vue';
import CarouselItem from './CarouselItem.vue';
import ExternalSchedule from './ExternalSchedule.vue';
import Game from './Game.vue';
import { mergeGames, useGameDataService } from './internal';
import TrayAgain from './TryAgain.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  servicePath: {
    type: String,
    default: '/v2/public-calendar?seasonId=217',
  },

  externalGameResolver: {
    type: [String, Function],
    default: '',
  },

  externalScheduleUrl: {
    type: String,
    default: '',
  },
});

const messages = { en, hu };
const timezone = getLocalTimezone();

let gameDataIntervals = [];

const error = ref(false);

const { isLoading, state: games, execute } = useServices({
  options: {
    path: props.servicePath,
    apiKey: props.apiKey,
    params: {},
    immediate: true,
  },
  transform: res => mergeGames(res, games.value, 'id').reverse(),
  onError: () => {
    error.value = true;
  },
  onSuccess: handleLiveGames,
});

const { resume, pause } = useIntervalFn(execute, 1000 * 60 * 5);
const isLoadingDebounced = refDebounced(isLoading, 500);

useVisibilityChange(
  true,
  () => {
    execute();
    resume();
  },
  () => {
    pause();
    gameDataIntervals.map(cleanFn => cleanFn?.());
    gameDataIntervals = [];
  },
);

const initialIndex = computed(() => {
  if (isEmpty(games.value))
    return 0;
  return games.value.findIndex(game => !isAfter(new Date(game.gameDate), new Date(), 'day')) + 1;
});

const convertedGames = computed(() =>
  games.value.map(game => ({
    ...game,
    gameDateTime: `${format(game.gameDate, 'L LT', timezone, props.locale)} (${offsetName(
      game.gameDate,
      timezone,
      props.locale,
    )})`,
  })),
);

const { execute: fetchGameData } = useGameDataService({ apiKey: props.apiKey });

async function handleLiveGames() {
  error.value = false;
  gameDataIntervals.map(cleanFn => cleanFn?.());
  gameDataIntervals = [];

  const liveGames = games.value.filter(game => game.gameStatus === 1);

  for (let i = 0; i < liveGames.length; i++) {
    const id = liveGames[i].id;
    fetchGameData(0, { gameId: id }).then(data => updateGameData(data));
    const { pause } = useIntervalFn(() => fetchGameData(0, { gameId: id }).then(data => updateGameData(data)), 60000);
    gameDataIntervals.push(pause);
  }
}

function updateGameData(gameData = {}) {
  const { gameId, gameStatus, homeTeamScore, awayTeamScore, period, periodTime } = gameData;
  const gameObj = games.value.find(game => game.id === gameId);
  gameObj.gameStatus = gameStatus;
  gameObj.homeTeamScore = homeTeamScore;
  gameObj.awayTeamScore = awayTeamScore;
  gameObj.period = period;
  gameObj.periodTime = periodTime;
  triggerRef(games);
}

function navigateTo({ url, target }) {
  window.open(url, target);
}

function onTryAgain() {
  error.value = false;
  execute();
}
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="locale" :messages="messages">
    <Carousel :key="isLoadingDebounced" :initial-index="initialIndex">
      <div v-if="!error && isLoadingDebounced" style="width: 100%">
        <LoadingIndicator />
      </div>
      <TrayAgain v-else-if="error && isEmpty(games)" @try-again="onTryAgain" />
      <div v-else-if="convertedGames.length === 0" class="is-no-games">
        {{ t('gamesTimeline.noGames') }}
      </div>
      <template v-else>
        <CarouselItem v-once>
          <ExternalSchedule :external-schedule-url="externalScheduleUrl" :title="t('gamesTimeline.allSchedule')" @navigate-to="navigateTo" />
        </CarouselItem>

        <CarouselItem
          v-for="game in convertedGames"
          :key="game.id"
          v-memo="[
            game.gameDateTime,
            game.gameStatus,
            game.homeTeamScore,
            game.awayTeamScore,
            game.period,
            game.actualTime,
          ]"
        >
          <Game :game-data="game" :external-game-resolver="externalGameResolver" @navigate-to="navigateTo" />
        </CarouselItem>
        <CarouselItem v-once>
          <ExternalSchedule :external-schedule-url="externalScheduleUrl" :title="t('gamesTimeline.allSchedule')" @navigate-to="navigateTo" />
        </CarouselItem>
      </template>
    </Carousel>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/games-timeline.css" />

<style src="@mjsz-vbr-elements/shared/css/components/badge.css" />
