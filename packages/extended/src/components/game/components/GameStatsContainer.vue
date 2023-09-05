<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

defineProps({
  title: {
    type: String,
    default: '',
  },

  data: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <dl :class="useMainClass('gamecenter-game-stats-container')">
    <dt>
      <slot>
        {{ title }}
      </slot>
    </dt>
    <dd v-html="data" />
  </dl>
</template>
