<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { IconHockeyPuck } from '@mjsz-vbr-elements/shared/icons';
import { usePlayerResolver } from '../../composables';
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
const { resolver: playerResolver } = usePlayerResolver();
</script>

<template>
  <GameEventLayout :timestamp="event.eventTime" :is-home-team="isHomeTeam" :event-type="event.type" :event="event">
    <template #title>
      {{ t('eventType.Büntető') }} - <template v-if="event.goal">
        {{ t('events.score') }}
      </template>
      <template v-else>
        {{ t('events.missed') }}
      </template>
      <template v-if="event.score">
        - ({{ event.score }})
      </template>
    </template>

    <template #details-list>
      <ul class="is-details-list">
        <li class="is-evented-person">
          <span class="is-player-number">{{ event.jerseyNumber }}&nbsp;</span>
          <a :href="playerResolver({ player: { playerId: event.playerId } })" target="_blank">
            {{ event.lastName }} {{ event.firstName }}
          </a>
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
