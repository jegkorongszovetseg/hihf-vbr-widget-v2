<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';
import GameEvent from './components/GameEvent.vue';
import { convertPeriodEvents, convertPeriodName } from './internal';

const props = defineProps({
  gameEvents: {
    type: Object,
    required: true,
  },

  gameData: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const covertedGameEvents = computed(() => convertPeriodEvents(props.gameData, props.gameEvents));
</script>

<template>
  <div class="gamecenter-game-events">
    <template v-for="(period, key) in covertedGameEvents" :key="key">
      <div class="is-period-header">
        {{ t(`periods.${convertPeriodName(key)}`) }}
      </div>
      <div v-if="period.length === 0" class="is-no-action">
        {{ t('events.noEventsInPeriod') }}
      </div>
      <template v-for="event in period" :key="event.id">
        <div class="gamecenter-game-event">
          <GameEvent :event="event" :home-team-id="gameData.homeTeam.id" />
        </div>
      </template>
    </template>
    <div id="event-tooltip-container" />
  </div>
</template>
