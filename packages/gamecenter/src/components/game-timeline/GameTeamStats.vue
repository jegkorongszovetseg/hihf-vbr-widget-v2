<script setup>
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import { convertSecToMin } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';
import StatisticsDoubleBar from './components/StatisticsDoubleBar.vue';
import { buildAdv, buildAdvPercent, buildDvgPercent, buildSOG } from './internal';

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
  buildSOG(props.gameStats?.teamPenalties ?? [], homeTeamId.value, awayTeamId.value, 'penaltyLength'),
);

const advPercent = computed(() => buildAdvPercent(props.gameStats?.teamPowerPlay ?? {}));
const dvgPercent = computed(() => buildDvgPercent(props.gameStats?.teamPowerPlay ?? {}));
const advTime = computed(() => buildAdv(props.gameStats?.teamPowerPlay ?? {}));
</script>

<template>
  <div :class="useMainClass('gamecenter-timeline-team-stats')">
    <h1 class="is-heading-2">
      {{ t('teamsStats.sog') }}
    </h1>
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

    <h1 class="is-heading-2">
      {{ t('teamsStats.saves') }}
    </h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd }, key) in saves" :key="key">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`section.${key}`)"
        />
      </template>
    </div>

    <h1 class="is-heading-2">
      {{ t('teamsStats.pim') }}
    </h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd }, key) in pim" :key="key">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`section.${key}`)"
        />
      </template>
    </div>

    <h1 class="is-heading-2">
      {{ t('teamsStats.advPercent') }}
    </h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd, suffix }, key) in advPercent" :key="key">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`stats.${key}`)"
          :value-suffix="suffix"
        />
      </template>
    </div>

    <h1 class="is-heading-2">
      {{ t('teamsStats.penaltyKilling') }}
    </h1>
    <div class="is-stat-container">
      <template v-for="({ max, valueStart, valueEnd, suffix }, key) in dvgPercent" :key="key">
        <StatisticsDoubleBar
          :max="max"
          :value-start="valueStart"
          :value-end="valueEnd"
          :title="t(`stats.${key}`)"
          :value-suffix="suffix"
        />
      </template>
    </div>

    <h1 class="is-heading-2">
      {{ t('teamsStats.advantageTime') }}
    </h1>
    <div class="is-stat-container">
      <StatisticsDoubleBar
        :max="advTime.advTime.max"
        :value-start="advTime.advTime.valueStart"
        :value-end="advTime.advTime.valueEnd"
        :title="t('section.all')"
      >
        <template #value-start>
          {{ convertSecToMin(advTime.advTime.valueStart) }}
        </template>
        <template #value-end>
          {{ convertSecToMin(advTime.advTime.valueEnd) }}
        </template>
      </StatisticsDoubleBar>

      <StatisticsDoubleBar
        :max="advTime.advTimePP1.max"
        :value-start="advTime.advTimePP1.valueStart"
        :value-end="advTime.advTimePP1.valueEnd"
        :title="t('teamsStats.advantageTimePP1')"
      >
        <template #value-start>
          {{ convertSecToMin(advTime.advTimePP1.valueStart) }}
        </template>
        <template #value-end>
          {{ convertSecToMin(advTime.advTimePP1.valueEnd) }}
        </template>
      </StatisticsDoubleBar>

      <StatisticsDoubleBar
        :max="advTime.advTimePP2.max"
        :value-start="advTime.advTimePP2.valueStart"
        :value-end="advTime.advTimePP2.valueEnd"
        :title="t('teamsStats.advantageTimePP2')"
      >
        <template #value-start>
          {{ convertSecToMin(advTime.advTimePP2.valueStart) }}
        </template>
        <template #value-end>
          {{ convertSecToMin(advTime.advTimePP2.valueEnd) }}
        </template>
      </StatisticsDoubleBar>
    </div>
  </div>
</template>
