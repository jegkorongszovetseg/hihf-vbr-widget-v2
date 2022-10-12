<script setup>
import { computed, ref } from 'vue';
import { flip, shift } from '@floating-ui/dom';
import { useFloating } from '../composables/useFloating';
import { useMainClass } from '../composables/useMainClass';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },

  placement: {
    type: String,
    default: 'bottom',
  },

  theme: {
    type: String,
    default: 'tooltip',
  },

  content: {
    type: String,
    default: '',
  },

  appendTo: {
    type: [Object, String],
    default: 'body',
  },

  parent: {
    type: Object,
    default: null,
  },
});

const mainClassName = useMainClass('floating-content');

const open = ref(false);

const { x, y, reference, floating, strategy, update } = useFloating({
  placement: props.placement,
  middleware: [flip(), shift({ padding: 5 })],
  append: computed(() => props.appendTo),
  enabled: open
});

const show = () => {
  if (props.disabled) return;
  open.value = true;
  update();
};

const hide = () => {
  open.value = false;
};

const setSlotRef = (el) => {
  reference.value = el;
};
</script>

<template>
  <slot :set-ref="setSlotRef" :show="show" :hide="hide"></slot>
  <div
    ref="floating"
    :style="{
      position: strategy,
      top: y ? `${y}px` : '',
      left: x ? `${x}px` : '',
    }"
  >
    <div v-if="open" :class="[mainClassName, [`is-${props.theme}`]]">
      <slot name="content">{{ content }}</slot>
    </div>
  </div>
</template>
