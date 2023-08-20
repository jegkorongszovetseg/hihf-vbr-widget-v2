<script setup>
import { computed } from 'vue';
import { replace } from 'ramda';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import GameEvent from './components/GameEvent.vue';
import { convertPeriodEvents } from './internal';

const props = defineProps({
  gameEvents: {
    type: Object,
    required: true,
  },

  gameData: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const covertedGameEvents = computed(() => convertPeriodEvents(props.gameData, props.gameEvents));

const convertPeriodName = (name) => replace('. ', '-', name);
</script>

<template>
  <div :class="useMainClass('gamecenter-game-events')">
    <template v-for="(period, key) in covertedGameEvents" :key="key">
      <div class="is-period-header">{{ t(`periods.${convertPeriodName(key)}`) }}</div>
      <div v-if="period.length === 0">Nem történt esemény a harmadban</div>
      <template v-for="event in period" :key="event.id">
        <div :class="useMainClass('gamecenter-game-event')">
          <GameEvent :event="event" />
        </div>
      </template>
    </template>
  </div>
</template>
