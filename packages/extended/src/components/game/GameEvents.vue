<script setup>
import { computed } from 'vue';
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

const component = computed(() => TYPE_MAP.get(props.type));
</script>

<template>
  <component :is="component" />
  <!-- <div style="display: flex; gap: 16px">
    <div>{{ component }}</div>
    <div>{{ event.eventTime }}</div>
    <div>{{ event.teamName }}</div>
    <div>{{ event.type }}</div>
    <div>c</div>
    <div>d</div>
    <div>Name</div>
  </div> -->
</template>
