<script setup>
import { BaseSelect } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';
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

  phaseId: {
    type: Number,
    default: null,
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
  set: value => emit('onSeasonChange', value),
});

const sectionSelect = computed({
  get: () => props.phaseId,
  set: value => emit('onSectionChange', value),
});

const reportSelect = computed({
  get: () => props.currentReport,
  set: value => emit('onReportChange', value),
});

const teamSelect = computed({
  get: () => props.teamFilter,
  set: value => emit('onTeamChange', value),
});

const playerName = computed({
  get: () => props.playerFilter,
  set: value => emit('onPlayerInput', value),
});

function onStatTypeChange(value) {
  emit('onStatTypeChange', value);
}
</script>

<template>
  <div class="g-row is-mb-5" style="flex-wrap: wrap; gap: 20px; margin: 20px 0">
    <div>
      <label for="season" class="label">{{ t('selection.season') }}</label>
      <BaseSelect id="season" v-model="seasonSelect">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="section" class="label">{{ t('selection.section') }}</label>
      <BaseSelect id="section" v-model="sectionSelect">
        <option
          v-for="sectionName in sections"
          :key="sectionName.phaseId"
          :value="sectionName.phaseId"
        >
          {{ sectionName.phaseName }}
        </option>
      </BaseSelect>
    </div>
    <div>
      <label for="report" class="label">{{ t('selection.report') }}</label>
      <BaseSelect id="report" v-model="reportSelect">
        <option v-for="{ name, value } in reports" :key="value" :value="value">
          {{ name }}
        </option>
      </BaseSelect>
    </div>
    <template v-if="reportType === 'players'">
      <div>
        <label for="teams" class="label">{{ t('selection.teams') }}</label>
        <BaseSelect id="teams" v-model="teamSelect" :disabled="reportType !== 'players'">
          <option :value="null">
            {{ t('common.all') }}
          </option>
          <option v-for="{ teamId, teamName } in teams" :key="teamId" :value="teamId">
            {{ teamName }}
          </option>
        </BaseSelect>
      </div>
      <div>
        <label for="player" class="label">{{ t('selection.filterName') }}</label>
        <input
          id="player"
          v-model="playerName"
          type="text"
          class="base-input"
          :disabled="reportType !== 'players'"
        >
      </div>
    </template>
  </div>

  <div>
    <button
      type="button"
      class="tab-button" :class="{ 'is-active': reportType === REPORT_TYPE_PLAYERS }"
      @click="onStatTypeChange(REPORT_TYPE_PLAYERS)"
    >
      {{ t('selection.players') }}
    </button>
    <button
      type="button"
      class="tab-button" :class="{ 'is-active': reportType === REPORT_TYPE_TEAMS }"
      @click="onStatTypeChange(REPORT_TYPE_TEAMS)"
    >
      {{ t('selection.teams') }}
    </button>
  </div>
</template>
