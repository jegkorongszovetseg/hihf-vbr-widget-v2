<script setup lang="ts">
import { VBR_API_BASE_URL } from '@mjsz-vbr-elements/core/constants';
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

const mediaQuery = computed(() => `(min-width: ${props.currentAd?.breakpoint || props.mobileBreakpoint})`);

function setMedaiPath(path: string) {
  return `${VBR_API_BASE_URL}${path}`;
}
</script>

<template>
  <component :is="currentAd.link ? 'a' : 'div'" :href="currentAd.link || undefined" :target="currentAd.link ? '_blank' : undefined">
    <video v-if="currentAd.media?.[0]?.mediaType?.includes('video')" :width="currentAd.media?.[0].width" :height="currentAd.media?.[0].height" autoplay muted>
      <source :src="currentAd.media?.[0]?.media" :type="currentAd.media?.[0]?.mediaType">
    </video>
    <picture v-else>
      <source v-if="currentAd.type === 'responsive'" :srcset="setMedaiPath(currentAd.media[1].path)" :media="mediaQuery">
      <img v-if="currentAd.type === 'popover'" :src="setMedaiPath(currentAd.media?.[0].path)" :style="`width: clamp(0px, ${currentAd.media?.[0].width}px, 750px); height: auto;`">
      <img v-else :src="setMedaiPath(currentAd.media?.[0].path)">
    </picture>
  </component>
</template>
