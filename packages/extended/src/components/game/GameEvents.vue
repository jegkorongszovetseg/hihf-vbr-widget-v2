<script setup>
import { replace } from 'ramda';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import GameEvent from './GameEvent.vue';

const props = defineProps({
  gameEvents: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const convertPeriodName = (name) => replace('. ', '-', name);
</script>

<template>
  <div :class="useMainClass('gamecenter-game-events')">
    <template v-for="(period, key) in gameEvents">
      <div class="is-period-header">{{ t(`periods.${convertPeriodName(key)}`) }}</div>
      <template v-for="event in period" :key="event.id">
        <div :class="useMainClass('gamecenter-game-event')">
          <GameEvent :event="event" />
        </div>
      </template>
    </template>
  </div>
</template>
