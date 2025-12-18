<script setup>
import { IconArrowDown, IconArrowUp } from '@mjsz-vbr-elements/shared/icons';
import TeamLogo from './TeamLogo.vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },

  isHomeTeam: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div class="is-time-cell">
    {{ event.eventTime }}
  </div>
  <div class="is-team-logo-cell">
    <TeamLogo :key="event.team.id" :name="event.team.longName" :logo="event.team.logo" :is-home-team="isHomeTeam" />
  </div>
  <div class="is-icon-cell">
    <IconArrowUp v-if="event.gkDirection === 'CSERE'" width="24" height="24" class="is-goalie-in-icon" />
    <IconArrowUp v-if="event.gkDirection === 'BE'" width="24" height="24" class="is-goalie-in-icon" />
    <IconArrowDown v-else width="24" height="24" class="is-goalie-out-icon" />
  </div>
  <div class="is-goalie-direction">
    {{ event.gkDirection }}
  </div>
  <div />
  <div />
  <div class="is-evented-person">
    <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
  </div>
</template>
