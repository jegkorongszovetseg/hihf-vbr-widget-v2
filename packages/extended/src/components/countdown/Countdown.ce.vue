<script setup>
import { I18NProvider, Image } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { format } from '@mjsz-vbr-elements/core/utils';
import { useInterval, useIntervalFn } from '@vueuse/core';
import { isEmpty } from 'ramda';
import { computed } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { countdown } from './internal';
import Number from './Number.vue';

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
    type: String,
    default: '',
  },
});

const messages = { en, hu };

const {
  state: game,
  execute,
  isLoading,
} = useServices({
  options: {
    path: '/v2/game-data',
    apiKey: props.apiKey,
    params: {
      gameId: props.gameId,
    },
    immediate: true,
  },
  onSuccess: startGame,
  // onError,
});

const { pause, resume } = useIntervalFn(() => {
  execute();
}, 30000, { immediate: false });

// Test goals
const counter = useInterval(1000);
const counter2 = useInterval(1500);

const homeScore = computed(() => {
  // const score = game.homeScore || 0;
  const score = counter.value;
  return score.toString().padStart(2, '0').split('');
});
const awayScore = computed(() => {
  // const score = game.awayScore || 0;
  const score = counter2.value;
  return score.toString().padStart(2, '0').split('');
});

const { date, finished } = countdown(computed(() => {
  // return new Date(2025, 2, 2, 12, 31, 0);
  return game.value.gameDate;
}), () => resume());

function startGame(game) {
  if (game.gameStatus === 1)
    resume();
  if (game.gameStatus > 1)
    pause();
}
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="locale" :messages="messages">
    <div class="game-countdown">
      <div class="game-countdown-title">
        <template v-if="!isEmpty(game)">
          {{ game.championshipName }} - {{ game.divisionName }}
        </template>
      </div>

      <div class="game-countdown-container">
        <div class="game-countdown-result" :class="{ 'is-visible': finished }">
          <div class="is-period" v-text="t(game.period ? `game.period.${game.period}` : '')" />
          <!-- <Number class="is-home-score" :class="{ 'is-live': game.gameStatus === 1 }" :number="game.homeTeamScore" /> -->
          <div class="is-home-score" :class="{ 'is-live': game.gameStatus === 1 }" style="display: flex;">
            <Number v-if="homeScore[0] !== '0'" :number="homeScore[0]" />
            <Number :number="homeScore[1]" />
          </div>
          <span class="is-separator" :class="{ 'is-live': game.gameStatus === 1 }">:</span>
          <div class="is-away-score" :class="{ 'is-live': game.gameStatus === 1 }" style="display: flex;">
            <Number v-if="awayScore[0] !== '0'" :number="awayScore[0]" />
            <Number :number="awayScore[1]" />
          </div>
          <!-- <Number class="is-away-score" :class="{ 'is-live': game.gameStatus === 1 }" :number="game.awayTeamScore" /> -->
          <div class="is-period-results" v-text="game.periodResults" />
        </div>

        <div class="game-countdown-counter" :class="{ 'is-visible': !finished && !isLoading }">
          <div>
            <div>Nap</div>
            <div style="display: flex;">
              <Number :number="date.days[0]" direction="decrease" />
              <Number :number="date.days[1]" direction="decrease" />
            </div>
          </div>
          <div>
            <div>Óra</div>
            <div style="display: flex;">
              <Number :number="date.hours[0]" direction="decrease" />
              <Number :number="date.hours[1]" direction="decrease" />
            </div>
          </div>
          <div>
            <div>Perc</div>
            <div style="display: flex;">
              <Number :number="date.minutes[0]" direction="decrease" />
              <Number :number="date.minutes[1]" direction="decrease" />
            </div>
          </div>

          <div>
            <div>Másodperc</div>
            <div style="display: flex;">
              <Number :number="date.seconds[0]" direction="decrease" />
              <Number :number="date.seconds[1]" direction="decrease" />
            </div>
          </div>
        </div>
      </div>

      <div class="game-countdown-gamedata">
        <div class="is-game-date">
          {{ format(game.gameDate, 'L dddd - HH:mm', null, locale) }}
        </div>
        <Image v-if="game.homeTeam?.logo" class="is-home-team-logo" :src="game.homeTeam.logo" />
        <span class="is-home-team">{{ game.homeTeam?.longName }}</span>
        <span class="is-separator">-</span>
        <span class="is-away-team">{{ game.awayTeam?.longName }}</span>
        <Image v-if="game.awayTeam?.logo" class="is-away-team-logo" :src="game.awayTeam.logo" />
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/countdown.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/animation.scss" lang="scss"></style>
