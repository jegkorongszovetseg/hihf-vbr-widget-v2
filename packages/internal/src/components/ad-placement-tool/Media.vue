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
    <video v-if="currentAd.params?.mediaType?.includes('video')" :width="currentAd.params.width" :height="currentAd.params.height" autoplay muted>
      <source :src="currentAd.params?.media" :type="currentAd.params?.mediaType">
    </video>
    <picture v-else>
      <source v-if="currentAd.type === 'responsive'" :srcset="`http://localhost:3007${currentAd.media[1].path}`" :media="mediaQuery">
      <img v-if="currentAd.type === 'popover'" :src="currentAd.media[0].path" :style="`width: min(100vw, ${currentAd.currentAd.media[0].width}px); height: min(100vh, ${currentAd.currentAd.media[0].height}px);`">
      <img v-else :src="`http://localhost:3007${currentAd.media[0].path}`">
    </picture>
  </component>
</template>

<style scoped>

</style>
