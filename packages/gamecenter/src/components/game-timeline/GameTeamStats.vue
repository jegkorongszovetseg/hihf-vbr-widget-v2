<script setup>
import { computed } from 'vue';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import StatisticsDoubleBar from './components/StatisticsDoubleBar.vue';
import { buildSOG } from './internal';

const props = defineProps({
  gameStats: {
    type: Object,
    required: true,
  },

  gameData: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const homeTeamId = computed(() => props.gameData?.homeTeam?.id ?? '');
const awayTeamId = computed(() => props.gameData?.awayTeam?.id ?? '');

const sog = computed(() => buildSOG(props.gameStats?.teamSOG ?? [], awayTeamId.value, homeTeamId.value, 'shots'));
const saves = computed(() => buildSOG(props.gameStats?.teamSOG ?? [], homeTeamId.value, awayTeamId.value, 'saves'));
const pim = computed(() =>
  buildSOG(props.gameStats?.teamPenalties ?? [], homeTeamId.value, awayTeamId.value, 'penaltyLength')
);
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-team-stats')">
    <!-- <h1>Team Stats</h1> -->
    <!-- <StatisticsDoubleBar :max="100" :value-start="33" :value-end="55" value-suffix="%" title="SOG" /> -->

    <h1 class="is-heading-1">{{ t('teamsStats.sog') }}</h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd }, index) in sog" :key="index">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`section.${index}`)"
        />
      </template>
    </div>

    <h1 class="is-heading-1">{{ t('teamsStats.saves') }}</h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd }, index) in saves">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`section.${index}`)"
        />
      </template>
    </div>

    <h1 class="is-heading-1">{{ t('teamsStats.pim') }}</h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd }, index) in pim">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`section.${index}`)"
        />
      </template>
    </div>
  </div>
</template>
