<script setup>
import { computed } from 'vue';
import { compose, groupBy, prop, reverse, isEmpty } from 'ramda';
import { useUrlSearchParams } from '@vueuse/core';
import { useServices, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider } from '@mjsz-vbr-elements/core/components';
import { handleServices } from './composables';
import Event from './GameEvents.vue';
import GameData from './GameData.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

const messages = { en, hu };

const REFRESH_DELAY = 10000;

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
    path: '/v2/game-events',
    apiKey: props.apiKey,
    params: { gameId: gameId.value },
  },
  transform: compose(groupBy(prop('eventPeriod')), reverse),
});

handleServices({ data: gameData, services: [getGameData, getEvents], interval: REFRESH_DELAY });
</script>

<template>
  <div :class="useMainClass('gamecenter')">
    <I18NProvider :locale="props.locale" :messages="messages">
      <GameData v-if="!isEmpty(gameData)" :game-data="gameData" :locale="props.locale" />

      <!-- <pre>
        {{ gameData }}
      </pre> -->

      <div>Statistics</div>

      <div>
        Events:
        <template v-for="(period, key) in gameEvents">
          <div>{{ key }}</div>
          <!-- <template>
            <div>
              No event in this period
            </div>
          </template> -->
          <template v-for="event in period" :key="event.id">
            <Event :event="event" />
          </template>
        </template>
      </div>

      <div>Team Players Stats</div>

      <div>Team Goalies Stats</div>

      <div>Team Members</div>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/game-center.css"></style>
