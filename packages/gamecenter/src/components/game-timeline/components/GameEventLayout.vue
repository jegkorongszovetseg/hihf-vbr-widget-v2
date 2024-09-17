<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { EVENT_TYPE_GOAL, EVENT_TYPE_PENALTY } from '../constants';

const props = defineProps({
  timestamp: {
    type: String,
    required: true,
  },

  eventType: {
    type: String,
    default: '',
    // required: true,
  },

  isHomeTeam: {
    type: Boolean,
    default: true,
  },
});
const { t } = useI18n();
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-game-event')" :data-team="isHomeTeam ? 'home' : 'away'">
    <div class="is-timeline"></div>
    <div class="is-details">
      <div class="is-details-title">
        <slot name="title" />
      </div>
      <ul class="is-details-list">
        <slot />
      </ul>
      <div class="is-team-logo">
        <slot name="team-logo" />
      </div>
    </div>

    <div class="is-timestamp">
      <p>{{ timestamp }}</p>
    </div>

    <div
      :class="[
        'is-event-type',
        { 'is-goal': eventType === EVENT_TYPE_GOAL, 'is-penalty': eventType === EVENT_TYPE_PENALTY },
      ]"
    >
      <p><slot name="event-type-icon" />{{ t(`eventType.${eventType}`) }}</p>
    </div>
  </div>
</template>
