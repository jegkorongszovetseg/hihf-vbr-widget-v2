<script setup>
import { computed } from 'vue';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import GameEvent from './components/GameEvent.vue';
import { convertPeriodEvents, convertPeriodName } from '../game/internal';

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
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-game-events')">
    <template v-for="(period, key) in covertedGameEvents" :key="key">
      <div class="is-period-header">
        <div />
        <span>{{ t(`periods.${convertPeriodName(key)}`) }}</span>
      </div>
      <div v-if="period.length === 0" class="is-no-action">{{ t('events.noEventsInPeriod') }}</div>
      <TransitionGroup name="transition-event">
        <GameEvent v-for="event in period" :key="event.eventId" :event="event" :home-team-id="gameData.homeTeam.id" />
      </TransitionGroup>
    </template>
    <div id="event-tooltip-container" />
  </div>
</template>
