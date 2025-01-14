<script setup>
import { computed } from 'vue';
import Goal from './events/Goal.vue';
import Goalies from './events/Goalies.vue';
import Penalty from './events/Penalty.vue';
import PenaltyShot from './events/PenaltyShot.vue';
import Period from './events/Period.vue';
import Timeout from './events/Timeout.vue';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  },

  homeTeamId: {
    type: Number,
    required: true,
  },
});
const TYPE_MAP = new Map()
  .set('Gól', Goal)
  .set('Kiállítás', Penalty)
  .set('Kapus', Goalies)
  .set('Idő', Timeout)
  .set('Büntető', PenaltyShot)
  .set('Period', Period);

const component = computed(() => TYPE_MAP.get(props.event.type));
const isHomeTeam = computed(() => props.event?.team?.id === props.homeTeamId);
</script>

<template>
  <component :is="component" :event="event" :is-home-team="isHomeTeam" />
</template>
