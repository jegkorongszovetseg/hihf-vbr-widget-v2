<script setup>
import TeamLogo from './TeamLogo.vue';
import IconArrowDown from '@mjsz-vbr-elements/shared/icons/IconArrowDown';
import IconArrowUp from '@mjsz-vbr-elements/shared/icons/IconArrowUp';
import GameEventLayout from '../GameEventLayout.vue';

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
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam" :event-type="event.type" :event="event">
    <template #title> Kapus {{ event.gkDirection }} </template>

    <template #default>
      <!-- <div class="is-icon-cell">
        <IconArrowUp v-if="event.gkDirection === 'CSERE'" width="24" height="24" class="is-goalie-in-icon" />
        <IconArrowUp v-if="event.gkDirection === 'BE'" width="24" height="24" class="is-goalie-in-icon" />
        <IconArrowDown v-else width="24" height="24" class="is-goalie-out-icon" />
      </div> -->
      <!-- <div class="is-goalie-direction">{{ event.gkDirection }}</div> -->
      <li class="is-evented-person">
        <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
      </li>
    </template>

    <template #team-logo>
      <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconArrowUp v-if="event.gkDirection === 'CSERE'" width="24" height="24" class="is-goalie-in-icon" />
      <IconArrowUp v-if="event.gkDirection === 'BE'" width="24" height="24" class="is-goalie-in-icon" />
      <IconArrowDown v-else width="24" height="24" class="is-goalie-out-icon" />
    </template>
  </GameEventLayout>
</template>
