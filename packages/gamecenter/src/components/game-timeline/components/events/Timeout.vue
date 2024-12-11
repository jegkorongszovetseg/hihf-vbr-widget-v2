<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconTimer from '@mjsz-vbr-elements/shared/icons/IconTimer';
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
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam" :event-type="event.type">
    <template #title>
      {{ t('events.timeout') }}
    </template>

    <template #team-logo>
      <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconTimer />
    </template>
  </GameEventLayout>
</template>
