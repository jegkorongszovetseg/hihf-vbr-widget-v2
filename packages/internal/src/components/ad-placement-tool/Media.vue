<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  currentAd: {
    type: Object,
    required: true,
  },

  mobileBreakpoint: {
    type: String,
    required: true,
  },
});

const mediaQuery = computed(() => `(min-width: ${props.currentAd.params?.breakpoint || props.mobileBreakpoint})`);
</script>

<template>
  <component :is="currentAd.link ? 'a' : 'div'" :href="currentAd.link || undefined">
    <video v-if="currentAd.params?.mediaType?.includes('video')" :width="currentAd.params.width" :height="currentAd.params.height" controls autoplay muted>
      <source :src="currentAd.params?.media" :type="currentAd.params?.mediaType">
    </video>
    <picture v-else>
      <source v-if="currentAd.type === 'responsive'" :srcset="currentAd.params?.mediaLarge" :media="mediaQuery">
      <img v-if="currentAd.type === 'popover'" :src="currentAd.params.media" :style="`width: min(100vw, ${currentAd.params.width}px); height: min(100vh, ${currentAd.params.height}px);`">
      <img v-else :src="currentAd.params.media">
    </picture>
  </component>
</template>

<style scoped>

</style>
