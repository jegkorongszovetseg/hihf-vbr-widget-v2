<script setup>
import { computed } from 'vue';

const props = defineProps({
  max: {
    type: Number,
    default: 100,
  },

  valueStart: {
    type: [Number, String],
    default: 0,
  },

  valueEnd: {
    type: [Number, String],
    default: 0,
  },

  title: {
    type: String,
    default: '',
  },

  valueSuffix: {
    type: String,
    default: '',
  },
});

const barWidthStart = computed(() => ({ width: `${(props.valueStart / props.max) * 100 || 0}%` }));
const barWidthEnd = computed(() => ({ width: `${(props.valueEnd / props.max) * 100 || 0}%` }));
</script>

<template>
  <div class="double-bar">
    <div class="is-value is-value-start">
      <slot name="value-start">
        {{ valueStart }}
        <template v-if="valueSuffix">
          {{ valueSuffix }}
        </template>
      </slot>
    </div>
    <div class="is-bar is-bar-start">
      <div class="is-bar-start--progress" :style="barWidthStart" />
    </div>
    <div class="is-bar is-bar-end">
      <div class="is-bar-end--progress" :style="barWidthEnd" />
    </div>
    <div class="is-value is-value-end">
      <slot name="value-end">
        {{ valueEnd }}
        <template v-if="valueSuffix">
          {{ valueSuffix }}
        </template>
      </slot>
    </div>
    <div class="is-title">
      {{ title }}
    </div>
  </div>
</template>
