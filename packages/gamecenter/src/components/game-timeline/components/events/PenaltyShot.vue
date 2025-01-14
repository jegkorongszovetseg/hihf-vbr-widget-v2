<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
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
      {{ t('eventType.Büntető') }} - <template v-if="event.goal">
        {{ t('events.score') }}
      </template>
      <template v-else>
        {{ t('events.missed') }}
      </template> - ({{ event.score }})
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
      <IconHockeyPuck />
    </template>
  </GameEventLayout>
</template>
