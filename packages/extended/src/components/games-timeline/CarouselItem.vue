<script setup>
import { h, inject, onMounted, useSlots } from 'vue';
import { useId } from '@mjsz-vbr-elements/core/composables';
import { CarouselContext } from './internal';

const slots = useSlots();

const id = `mjsz-vbr-carousel-item-${useId()}`;

const api = inject(CarouselContext, null);

onMounted(() => api?.register(id));

const render = () => {
  return h('div', { id, class: 'is-slide' }, slots.default());
};
</script>

<template>
  <render>
    <slot />
  </render>
</template>
