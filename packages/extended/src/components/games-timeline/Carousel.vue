<script setup>
import { computed, onMounted, ref } from 'vue';
import { unrefElement } from '@vueuse/core';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';

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

const currentElement = computed(() => unrefElement(containerRef).querySelector(`[data-index="${currentIndex.value}"]`));

onMounted(() => updateScrollPosition());

function prev() {
  if (currentIndex.value === 0) return;
  currentIndex.value--;
  updateScrollPosition({ behavior: 'smooth' });
}
function next() {
  console.log(currentIndex.value, props.elements.length - 1);
  if (currentIndex.value === props.elements.length - 1) return;
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
    <button type="button" @click="prev">{{ currentIndex }}</button>
    <div ref="containerRef" @scrollend="onScrollend">
      <div v-for="(element, index) in elements" :key="element.id" class="is-slide" style="flex-basis: 25%" :data-index="index">
        <slot :element="element">
          {{ index }}
        </slot>
      </div>
    </div>
    <button type="button" @click="next">N</button>
  </div>
</template>
