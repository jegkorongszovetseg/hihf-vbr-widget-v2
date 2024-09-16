<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  timestamp: {
    type: String,
    required: true,
  },

  isHomeTeam: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-game-event')" :data-team="isHomeTeam ? undefined : 'away'">
    <div class="is-timeline"></div>
    <div class="is-details">
      <!-- <div class="is-details-panel"> -->
        <ul class="is-details-list">
          <slot />
        </ul>
        <div class="is-team-logo">
          <slot name="team-logo" />
        </div>
      <!-- </div> -->
    </div>

    <!-- <div class="is-team-logo">
      <slot name="team-logo" />
    </div> -->

    <div class="is-timestamp">
      <p>{{ timestamp }}</p>
    </div>

    <div class="is-event-type">
      <p><slot name="event-type-icon" /> Penalty</p>
    </div>
  </div>
</template>
