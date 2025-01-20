<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },

  data: {
    type: [String, Number],
    default: '',
  },
});
</script>

<template>
  <dl class="gamecenter-game-stats-container">
    <dt>
      <slot>
        {{ title }}
      </slot>
    </dt>
    <dd v-html="data" />
  </dl>
</template>
