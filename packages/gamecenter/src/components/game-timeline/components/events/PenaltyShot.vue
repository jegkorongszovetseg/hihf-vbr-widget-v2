<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import GameEventLayout from '../GameEventLayout.vue';
import TeamLogo from './TeamLogo.vue';

const props = defineProps({
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
    <template #default>
      <div class="is-time-cell">{{ event.eventTime }}</div>
      <div class="is-icon-cell"><IconHockeyPuck class="is-goal-so-icon" /></div>
      <div :class="['is-score-so', { 'is-score-so-goal': event.goal }]">{{ event.score }}</div>
      <div>
        <span :class="['is-badge is-large', { 'is-green': event.goal }]">
          <template v-if="event.goal">{{ t('events.score') }}</template>
          <template v-else>{{ t('events.missed') }}</template>
        </span>
      </div>
      <div class="is-evented-person">
        <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
      </div>
    </template>

    <template #team-logo>
      <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
    </template>

    <template #event-type-icon>
      <IconHockeyPuck />
    </template>
  </GameEventLayout>
</template>
