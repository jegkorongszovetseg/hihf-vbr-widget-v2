<script setup>
import { gameProps } from '@mjsz-vbr-elements/core';
import { I18NProvider, Image } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { externalGameLinkResolver, format, isEmpty } from '@mjsz-vbr-elements/core/utils';
import { useIntervalFn } from '@vueuse/core';
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

  // externalGameResolver, isGameTargetExternal
  ...gameProps,
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

const homeScore = computed(() => {
  const score = game.value.homeTeamScore || 0;
  return score.toString().padStart(2, '0').split('');
});
const awayScore = computed(() => {
  const score = game.value.awayTeamScore || 0;
  return score.toString().padStart(2, '0').split('');
});

const { date, finished } = countdown(computed(() => {
  return game.value.gameDate;
}), () => resume());

const gameLink = computed(() => externalGameLinkResolver(props.externalGameResolver, { gameId: props.gameId }));
const gameLinkTarget = computed(() => props.isGameTargetExternal ? '_blank' : '_self');

function startGame(game) {
  if (game.gameStatus === 1)
    resume();
  if (game.gameStatus > 1)
    pause();
}
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="locale" :messages="messages">
    <a :href="gameLink" :target="gameLinkTarget" class="game-countdown">
      <div class="game-countdown-title">
        <template v-if="!isEmpty(game)">
          {{ game.championshipName }} - {{ game.divisionName }}
        </template>
      </div>

      <div class="game-countdown-container">
        <div class="game-countdown-result" :class="{ 'is-visible': finished }">
          <div class="is-period" v-text="t(game.period ? `game.period.${game.period}` : '')" />
          <div class="is-home-score" :class="{ 'is-live': game.gameStatus === 1 }" style="display: flex;">
            <Number v-if="homeScore[0] !== '0'" :number="homeScore[0]" />
            <Number :number="homeScore[1]" />
          </div>
          <span class="is-separator" :class="{ 'is-live': game.gameStatus === 1 }">:</span>
          <div class="is-away-score" :class="{ 'is-live': game.gameStatus === 1 }" style="display: flex;">
            <Number v-if="awayScore[0] !== '0'" :number="awayScore[0]" />
            <Number :number="awayScore[1]" />
          </div>
          <div class="is-period-results" v-text="game.periodResults" />
        </div>

        <div class="game-countdown-counter" :class="{ 'is-visible': !finished && !isLoading }">
          <div>
            <div v-text="t('countdown.days')" />
            <div style="display: flex;">
              <Number :number="date.days[0]" direction="decrease" />
              <Number :number="date.days[1]" direction="decrease" />
            </div>
          </div>
          <div>
            <div v-text="t('countdown.hours')" />
            <div style="display: flex;">
              <Number :number="date.hours[0]" direction="decrease" />
              <Number :number="date.hours[1]" direction="decrease" />
            </div>
          </div>
          <div>
            <div v-text="t('countdown.minutes')" />
            <div style="display: flex;">
              <Number :number="date.minutes[0]" direction="decrease" />
              <Number :number="date.minutes[1]" direction="decrease" />
            </div>
          </div>

          <div>
            <div v-text="t('countdown.seconds')" />
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
    </a>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/countdown.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/countdown.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/animation.scss" lang="scss"></style> -->
