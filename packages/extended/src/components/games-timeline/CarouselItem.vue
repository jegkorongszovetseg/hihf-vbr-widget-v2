<script setup>
import { inject, onMounted, onUnmounted, useId } from 'vue';
import { CarouselContext } from './internal';

const id = `mjsz-vbr-carousel-item-${useId()}`;

const api = inject(CarouselContext, null);

onMounted(() => api?.register(id));
onUnmounted(() => api?.unregister(id));
</script>

<template>
  <div :id="id" class="is-slide">
    <slot />
  </div>
</template>
