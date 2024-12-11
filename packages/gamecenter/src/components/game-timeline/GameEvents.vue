<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import GameEvent from './components/GameEvent.vue';

const props = defineProps({
  gameEvents: {
    type: Array,
    required: true,
  },

  gameData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-game-events')">
    <TransitionGroup name="transition-event">
      <GameEvent v-for="event in gameEvents" :key="event.eventId" :event="event" :home-team-id="gameData.homeTeam.id" />
    </TransitionGroup>
    <div id="event-tooltip-container" />
  </div>
</template>
