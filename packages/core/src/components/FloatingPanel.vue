<script setup>
import { flip, offset, shift } from '@floating-ui/dom';
import { onClickOutside, unrefElement } from '@vueuse/core';
import { computed, ref } from 'vue';
import { arrow, useFloating } from '../composables/useFloating';

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

  offset: {
    type: Number,
    default: 2,
  },

  isArrowVisible: {
    type: Boolean,
    default: true,
  },
});

const open = ref(false);
const arrowRef = ref(null);

const { x, y, arrowX, arrowY, placement, reference, floating, strategy } = useFloating({
  placement: props.placement,
  middleware: [flip(), shift({ padding: 5 }), offset(props.offset), arrow({ element: arrowRef, padding: 5 })],
  append: computed(() => props.appendTo),
  enabled: open,
});

function show() {
  if (props.disabled)
    return;
  if (open.value)
    return;
  open.value = true;
}

function hide() {
  if (!open.value)
    return;
  open.value = false;
}

function setSlotRef(el) {
  reference.value = el;
}

const events = {
  onMouseenter: show,
  onMouseleave: hide,
  onFocus: show,
  onBlur: hide,
};

onClickOutside(floating, () => {
  if (!open.value)
    return;
  hide();
}, {
  ignore: [reference],
});

function toggle() {
  if (open.value)
    return hide();
  show();
}

function nextFocus(event) {
  if (!open.value)
    return;
  const focusable = unrefElement(floating).querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  focusable[0]?.focus();
  event.preventDefault();
}
</script>

<template>
  <slot :set-ref="setSlotRef" :next-focus="nextFocus" :open="open" :toggle="toggle" :show="show" :hide="hide" :events="events" />
  <div
    ref="floating"
    :data-placement="placement"
    :style="{
      position: strategy,
      top: y ? `${y}px` : '',
      left: x ? `${x}px` : '',
    }"
  >
    <transition name="transition-fade">
      <div v-if="open" class="floating-content" :class="[[`is-${props.theme}`]]">
        <slot name="content" :close="hide">
          {{ content }}
        </slot>
        <div
          v-if="isArrowVisible"
          ref="arrowRef"
          class="is-arrow"
          :style="{
            position: strategy,
            top: arrowY ? `${arrowY}px` : '',
            left: arrowX ? `${arrowX}px` : '',
          }"
        />
      </div>
    </transition>
  </div>
</template>
