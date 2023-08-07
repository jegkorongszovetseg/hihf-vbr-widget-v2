<script setup>
import { computed } from 'vue';
import { compose, groupBy, prop, reverse } from 'ramda';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import Event from './GameEvent.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  gameId: {
    type: Number,
    default: 0,
  },
});

const { state: gameData, execute } = useServices({
  options: {
    path: '/v2/game-data',
    apiKey: props.apiKey,
    params: computed(() => ({ gameId: props.gameId })),
  },
});

const { state: gameEvents, execute: getEvents } = useServices({
  options: {
    path: '/v2/game-events',
    apiKey: props.apiKey,
    params: { gameId: props.gameId },
  },
  transform: compose(groupBy(prop('eventPeriod')), reverse),
});
execute();
getEvents();
</script>

<template>
  <div>
    <div>
      <div>Name</div>
      <div>date</div>
      <div>local</div>
      <div>
        <div>Home</div>
        <div>0:0</div>
        <div>Away</div>
      </div>
    </div>

    <pre>
      {{ gameData }}
    </pre>

    <div>Statistics</div>

    <div>
      Events:
      <template v-for="(period, key) in gameEvents">
        <div>{{ key }}</div>
        <template v-for="event in period" :key="event.id">
          <Event :event="event" />
        </template>
      </template>
    </div>

    <div>Team Players Stats</div>

    <div>Team Goalies Stats</div>

    <div>Team Members</div>
  </div>
</template>
