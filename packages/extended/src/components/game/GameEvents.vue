<script setup>
import { computed } from 'vue';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import Goal from './compnents/events/goal.vue';
import Penalty from './compnents/events/Penalty.vue';
import Goalies from './compnents/events/Goalies.vue';
import Timeout from './compnents/events/Timeout.vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },
});
const TYPE_MAP = new Map().set('Gól', Goal).set('Kiállítás', Penalty).set('Kapus', Goalies).set('Idő', Timeout);

const component = computed(() => TYPE_MAP.get(props.event.type));
</script>

<template>
  <div :class="useMainClass('gamecenter-game-event')">
    <component :is="component" :event="event" />
  </div>
</template>
