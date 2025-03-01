<script setup>
import { I18NProvider } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { useIntervalFn } from '@vueuse/core';
import { isEmpty } from 'ramda';
import { computed } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { countdown } from './internal';

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
}, 15000, { immediate: false });

const { date, finished } = countdown(computed(() => {
  // return new Date(2025, 2, 1, 10, 27, 0);
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
  <I18NProvider :locale="locale" :messages="messages">
    <div class="game-countdown">
      <div class="game-countdown-title">
        <template v-if="!isEmpty(game)">
          {{ game.championshipName }} - {{ game.divisionName }}
        </template>
      </div>

      <div v-if="finished">
        <span>{{ game.homeTeamScore }}</span>
        <span>:</span>
        <span>{{ game.awayTeamScore }}</span>
      </div>

      <div v-else class="game-countdown-container">
        <div>
          <div>Nap</div>
          <div class="number">
            {{ date.days }}
          </div>
        </div>
        <div>
          <div>Óra</div>
          <div class="number">
            {{ date.hours }}
          </div>
        </div>
        <div>
          <div>Perc</div>
          <div class="number">
            {{ date.minutes }}
          </div>
        </div>

        <div>
          <div>Másodperc</div>
          <div class="number">
            {{ date.seconds }}
          </div>
        </div>
      </div>

      <div class="game-countdown-gamedata">
        <span>I</span>
        <span>{{ game.homeTeam?.longName }}</span>
        <span>-</span>
        <span>{{ game.awayTeam?.longName }}</span>
        <span>I</span>
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/countdown.scss" lang="scss"></style>
