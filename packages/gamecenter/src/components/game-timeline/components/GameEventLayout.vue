<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { EVENT_TYPE_GOAL, EVENT_TYPE_PENALTY, EVENT_TYPE_TIMEOUT, EVENT_TYPE_GOALIE, EVENT_TYPE_PENALTY_SHOT } from '../constants';

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

  event: {
    type: Object,
    default: () => ({}),
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
    <div :class="['is-details-container', { 'is-goal': event.type === EVENT_TYPE_GOAL }]">
      <div class="is-details-title">
        <slot name="title" />
      </div>
      
      <slot name="details-list" />

      <div class="is-team-logo">
        <slot name="team-logo" />
      </div>
      <div class="is-event-type-icon">
        <slot name="event-type-icon" />
      </div>
    </div>

    <div class="is-timestamp">
      <p>{{ timestamp }}</p>
    </div>

    <!-- <div
      :class="[
        'is-event-type',
        {
          'is-goal': eventType === EVENT_TYPE_GOAL,
          'is-penalty': eventType === EVENT_TYPE_PENALTY,
          'is-timeout': eventType === EVENT_TYPE_TIMEOUT,
          'is-goalie-in': eventType === EVENT_TYPE_GOALIE,
          'is-goalie-out': eventType === EVENT_TYPE_GOALIE && event.gkDirection === 'KI',
          'is-penalty-shot-goal': eventType === EVENT_TYPE_PENALTY_SHOT && event.goal,
          'is-penalty-shot-no-goal': eventType === EVENT_TYPE_PENALTY_SHOT && !event.goal,
        },
      ]"
    >
      <p><slot name="event-type-icon" />{{ t(`eventType.${eventType}`) }}</p>
    </div> -->
  </div>
</template>
