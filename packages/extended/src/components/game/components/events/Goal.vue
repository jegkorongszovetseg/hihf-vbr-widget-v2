<script setup>
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import TeamLogo from './TeamLogo.vue';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="is-time-cell">{{ event.eventTime }}</div>
  <div class="is-team-logo-cell"><TeamLogo :name="event.teamName" :logo="event.teamLogo" :key="event.teamId" /></div>
  <div class="is-icon-cell"><IconHockeyPuck /></div>
  <div>{{ event.score }}</div>
  <div>{{ event.advantage }}</div>
  <div>
    <span v-if="event.gws" class="">GWG</span>
    <span v-if="event.ps" class="">PS</span>
  </div>
  <div>
    <dl>
      <dt>
        <span>{{ event.jerseyNumber }}</span> {{ event.lastName }} {{ event.firstName }}
      </dt>
      <dt>Assists</dt>
      <dd>PoI</dd>
    </dl>
  </div>
</template>
