<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { IconArrowDown, IconArrowUp, IconChange } from '@mjsz-vbr-elements/shared/icons';
import GameEventLayout from '../GameEventLayout.vue';
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

const { t } = useI18n();
</script>

<template>
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam" :event-type="event.type" :event="event">
    <template #title>
      {{ t('eventType.Kapus') }} - {{ t(`eventType.goalie.${event.gkDirection}`) }}
    </template>

    <template #details-list>
      <ul class="is-details-list">
        <li class="is-evented-person">
          <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
        </li>
      </ul>
    </template>

    <template #team-logo>
      <TeamLogo :key="event.team.id" :name="event.team.longName" :logo="event.team.logo" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconChange v-if="event.gkDirection === 'CSERE'" width="24" height="24" class="is-goalie-in-icon" />
      <IconArrowUp v-if="event.gkDirection === 'BE'" width="24" height="24" class="is-goalie-in-icon" />
      <IconArrowDown v-if="event.gkDirection === 'KI'" width="24" height="24" class="is-goalie-out-icon" />
    </template>
  </GameEventLayout>
</template>
