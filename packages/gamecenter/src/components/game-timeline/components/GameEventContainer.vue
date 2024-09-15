<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

const props = defineProps({
  timestamp: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div :class="useMainClass('event-container')">
    <div class="timeline"></div>
    <div class="details">
      <div class="details-panel">
        <slot />
        <div class="team-logo">
          <slot name="team-logo" />
        </div>
      </div>
    </div>
    <div class="time">
      <p>{{ timestamp }}</p>
    </div>
    <div class="event-type">
      <p>Penalty</p>
    </div>
  </div>
</template>
