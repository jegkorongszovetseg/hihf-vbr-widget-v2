<script setup>
import { computed } from 'vue';
import Goal from './events/goal.vue';
import Penalty from './events/Penalty.vue';
import Goalies from './events/Goalies.vue';
import Timeout from './events/Timeout.vue';

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
  <component :is="component" :event="event" />
</template>
