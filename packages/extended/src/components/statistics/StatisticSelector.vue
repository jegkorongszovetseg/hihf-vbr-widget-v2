<script setup>
import { computed } from 'vue';
import { useMainClass, useI18n } from '@mjsz-vbr-elements/core/composables';
import { BaseSelect } from '@mjsz-vbr-elements/core/components';
import { REPORT_TYPE_PLAYERS, REPORT_TYPE_TEAMS } from './statistics.internal';

const props = defineProps({
  seasons: {
    type: Array,
    defauét: () => [],
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  sections: {
    type: Array,
    defauét: () => [],
  },

  section: {
    type: String,
    default: '',
  },

  reports: {
    type: Array,
    defauét: () => [],
  },

  currentReport: {
    type: String,
    default: '',
  },

  teams: {
    type: Array,
    defauét: () => [],
  },

  reportType: {
    type: String,
    default: '',
  },

  teamFilter: {
    type: Number,
    default: null,
  },

  playerFilter: {
    type: String,
    default: '',
  },
});

const emit = defineEmits([
  'onPlayerInput',
  'onSeasonChange',
  'onSectionChange',
  'onReportChange',
  'onTeamChange',
  'onStatTypeChange',
]);

const { t } = useI18n();

const seasonSelect = computed({
  get: () => props.championshipId,
  set: (value) => emit('onSeasonChange', value),
});

const sectionSelect = computed({
  get: () => props.section,
  set: (value) => emit('onSectionChange', value),
});

const reportSelect = computed({
  get: () => props.currentReport,
  set: (value) => emit('onReportChange', value),
});

const teamSelect = computed({
  get: () => props.teamFilter,
  set: (value) => emit('onTeamChange', value),
});

const playerName = computed({
  get: () => props.playerFilter,
  set: (value) => emit('onPlayerInput', value),
});

const onStatTypeChange = (value) => {
  emit('onStatTypeChange', value);
};

const baseInputClass = useMainClass('base-input');
const baseLabelClass = useMainClass('label');
const tabButtonClasses = useMainClass('tab-button');
</script>

<template>
  <div class="g-row is-mb-5" style="flex-wrap: wrap; gap: 20px; margin: 20px 0">
    <div>
      <label for="season" :class="baseLabelClass">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="seasonSelect">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="section" :class="baseLabelClass">{{ t('selection.section') }}</label>
      <BaseSelect id="section" v-model="sectionSelect">
        <option v-for="sectionName in sections" :key="sectionName" :value="sectionName">{{ sectionName }}</option>
      </BaseSelect>
    </div>
    <div>
      <label for="report" :class="baseLabelClass">{{ t('selection.report') }}</label>
      <BaseSelect id="report" v-model="reportSelect">
        <option v-for="{ name, value } in reports" :key="value" :value="value">{{ name }}</option>
      </BaseSelect>
    </div>
    <template v-if="reportType === 'players'">
      <div>
        <label for="teams" :class="baseLabelClass">{{ t('selection.teams') }}</label>
        <BaseSelect id="teams" v-model="teamSelect" :disabled="reportType !== 'players'">
          <option :value="null">{{ t('common.all') }}</option>
          <option v-for="{ teamId, teamName } in teams" :key="teamId" :value="teamId">{{ teamName }}</option>
        </BaseSelect>
      </div>
      <div>
        <label for="player" :class="baseLabelClass">{{ t('selection.filterName') }}</label>
        <input
          id="player"
          type="text"
          v-model="playerName"
          :class="baseInputClass"
          :disabled="reportType !== 'players'"
        />
      </div>
    </template>
  </div>

  <div>
    <button
      type="button"
      @click="onStatTypeChange(REPORT_TYPE_PLAYERS)"
      :class="[tabButtonClasses, { 'is-active': reportType === REPORT_TYPE_PLAYERS }]"
    >
      {{ t('selection.players') }}
    </button>
    <button
      type="button"
      @click="onStatTypeChange(REPORT_TYPE_TEAMS)"
      :class="[tabButtonClasses, { 'is-active': reportType === REPORT_TYPE_TEAMS }]"
    >
      {{ t('selection.teams') }}
    </button>
  </div>
</template>
