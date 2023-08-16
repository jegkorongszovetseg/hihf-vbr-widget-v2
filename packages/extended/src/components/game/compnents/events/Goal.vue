<script setup>
import TeamLogo from './TeamLogo.vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>{{ event.eventTime }}</div>
  <div><TeamLogo :name="event.teamName" :logo="event.teamLogo" /></div>
  <div>{{ event.type }}-Icon</div>
  <div>{{ event.score }}</div>
  <div>eq</div>
  <div></div>
  <div>Name</div>
</template>
