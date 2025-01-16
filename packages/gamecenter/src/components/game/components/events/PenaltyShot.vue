<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
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
  <div class="is-time-cell">
    {{ event.eventTime }}
  </div>
  <div class="is-team-logo-cell">
    <TeamLogo :key="event.team.id" :name="event.team.longName" :logo="event.team.logo" :is-home-team="isHomeTeam" />
  </div>
  <div class="is-icon-cell">
    <IconHockeyPuck class="is-goal-so-icon" />
  </div>
  <div class="is-score-so" :class="[{ 'is-score-so-goal': event.goal }]">
    {{ event.score }}
  </div>
  <div>
    <span class="is-badge is-large" :class="[{ 'is-green': event.goal }]">
      <template v-if="event.goal">{{ t('events.score') }}</template>
      <template v-else>{{ t('events.missed') }}</template>
    </span>
  </div>
  <div>
    <!-- <span v-if="event.gws" class="">GWS</span> -->
  </div>
  <div class="is-evented-person">
    <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
  </div>
</template>
