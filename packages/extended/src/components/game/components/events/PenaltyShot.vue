<script setup>
import { computed, ref } from 'vue';
import { reject, isEmpty } from 'ramda';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
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

</script>

<template>
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell">
    <TeamLogo :name="event.team.longName" :logo="event.team.logo" :key="event.team.id" :is-home-team="isHomeTeam" />
  </div>
  <div class="is-icon-cell"><IconHockeyPuck class="is-goal-icon" /></div>
  <div class="is-score">{{ event.score }}</div>
  <div>
    <span class="is-badge">
      {{ event.advantage }}
    </span>
  </div>
  <div>
    <span v-if="event.gws" class="">GWG</span>
    <span v-if="event.ps" class="">PS</span>
  </div>
  <div>
    <dl>
      <dt>
        <span class="is-player-number">{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
      </dt>
    </dl>
  </div>
</template>
