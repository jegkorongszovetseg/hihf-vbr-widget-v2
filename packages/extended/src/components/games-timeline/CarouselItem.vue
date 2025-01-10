<script setup>
import { h, inject, onMounted, onUnmounted, useId, useSlots } from 'vue';
import { CarouselContext } from './internal';

const slots = useSlots();

const id = `mjsz-vbr-carousel-item-${useId()}`;

const api = inject(CarouselContext, null);

onMounted(() => api?.register(id));
onUnmounted(() => api?.unregister(id));

const render = () => {
  return h('div', { id, class: 'is-slide' }, slots.default());
};
</script>

<template>
  <render>
    <slot />
  </render>
</template>
