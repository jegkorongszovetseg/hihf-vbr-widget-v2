<script setup>
import { useResizeObserver } from '@vueuse/core';
import { nextTick, ref, useTemplateRef } from 'vue';

defineProps({
  statusText: {
    type: String,
  },
});

const wrapperElement = useTemplateRef('root');
const isOverflow = ref(false);
const marqueeTrackWidth = ref(0);

useResizeObserver(wrapperElement, async (entries) => {
  const entry = entries[0];
  const trackWidth = entry.target.firstChild?.clientWidth ?? 0;
  const { width } = entry.contentRect;
  if (trackWidth > width) {
    isOverflow.value = true;
    await nextTick();
    marqueeTrackWidth.value = entry.target.firstChild?.clientWidth ?? 0;
  }
});
</script>

<template>
  <div ref="root" class="marquee" :data-overflow="isOverflow">
    <div class="marquee-track" :style="{ '--_width': `${marqueeTrackWidth}px` }">
      <span>{{ statusText }}</span>
      <span v-if="isOverflow" aria-hidden="true">{{ statusText }}</span>
    </div>
  </div>
</template>
