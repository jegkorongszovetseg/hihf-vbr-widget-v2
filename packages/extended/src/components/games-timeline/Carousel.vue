<script setup>
import { computed, nextTick, onMounted, provide, ref, watch } from 'vue';
import { unrefElement, useScroll } from '@vueuse/core';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { sortByDomNode } from '@mjsz-vbr-elements/core/utils';
import IconLeft from '@mjsz-vbr-elements/shared/icons/IconLeft';
import IconRight from '@mjsz-vbr-elements/shared/icons/IconRight';
import { CarouselContext } from './internal';

const props = defineProps({
  initialIndex: {
    type: Number,
    default: 0,
  },

  elements: {
    type: Array,
    default: () => [],
  },
});

const containerRef = ref(null);
const currentIndex = ref(props.initialIndex);

const carouselItems = ref([]);

const api = {
  register: (id) => {
    carouselItems.value.push(id);
    carouselItems.value = sortByDomNode(carouselItems.value, (id) => {
      return unrefElement(containerRef.value).querySelector(`#${id}`);
    });
  },
  unregister: (id) => {
    let idx = carouselItems.value.indexOf(id);
    if (idx !== -1) carouselItems.value.splice(idx, 1);
  },
};

provide(CarouselContext, api);

const { arrivedState } = useScroll(containerRef);

const currentElement = computed(() =>
  unrefElement(containerRef).querySelector(`#${carouselItems.value[currentIndex.value]}`)
);

onMounted(() => updateScrollPosition());

watch(
  () => props.initialIndex,
  (value) => {
    currentIndex.value = value;
    nextTick(() => updateScrollPosition());
  }
);

function prev() {
  if (arrivedState.left) return;
  currentIndex.value--;
  updateScrollPosition({ behavior: 'smooth' });
}
function next() {
  if (arrivedState.right) return;
  currentIndex.value++;
  updateScrollPosition({ behavior: 'smooth' });
}

function updateScrollPosition(options) {
  currentElement.value?.scrollIntoView({ inline: 'start', block: 'nearest', ...options });
}

function onScrollend() {
  const parentLeft = unrefElement(containerRef).getBoundingClientRect()?.left;
  const newIndex = Array.from(unrefElement(containerRef).children).findIndex(
    (element) => Math.round(element.getBoundingClientRect().left - parentLeft) >= 0
  );
  currentIndex.value = newIndex;
}
</script>

<template>
  <div :class="useMainClass('games-timeline')">
    <button type="button" :disabled="arrivedState.left" @click="prev"><IconLeft /></button>
    <div ref="containerRef" @scrollend="onScrollend">
      <slot />
    </div>
    <button type="button" :disabled="arrivedState.right" @click="next"><IconRight /></button>
  </div>
</template>
