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
  <div><TeamLogo :name="event.teamName" :logo="event.teamLogo" :key="event.teamId" /></div>
  <div>{{ event.type }}</div>
  <div>{{ event.gkDirection }}</div>
  <div></div>
  <div></div>
  <div>
    <span class="">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
  </div>
</template>
