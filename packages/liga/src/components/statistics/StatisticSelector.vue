<script setup>
import { BaseSelect, FormField } from '@mjsz-vbr-elements/core/components';
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
  <div class="flex-container mb-md">
    <FormField :label="t('selection.season')" name="season">
      <BaseSelect id="season" v-model="seasonSelect">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </BaseSelect>
    </FormField>
    <FormField :label="t('selection.section')" name="section">
      <BaseSelect id="section" v-model="sectionSelect">
        <option
          v-for="sectionName in sections"
          :key="sectionName.phaseId"
          :value="sectionName.phaseId"
        >
          {{ sectionName.phaseName }}
        </option>
      </BaseSelect>
    </FormField>
    <FormField :label="t('selection.report')" name="report">
      <BaseSelect id="report" v-model="reportSelect">
        <option v-for="{ name, value } in reports" :key="value" :value="value">
          {{ name }}
        </option>
      </BaseSelect>
    </FormField>
    <template v-if="reportType === 'players'">
      <FormField :label=" t('selection.teams')" name="teams">
        <BaseSelect id="teams" v-model="teamSelect" :disabled="reportType !== 'players'">
          <option :value="null">
            {{ t('common.all') }}
          </option>
          <option v-for="{ teamId, teamName } in teams" :key="teamId" :value="teamId">
            {{ teamName }}
          </option>
        </BaseSelect>
      </FormField>
      <FormField :label="t('selection.filterName')" name="player">
        <input
          id="player"
          v-model="playerName"
          type="search"
          class="base-input"
          :disabled="reportType !== 'players'"
        >
      </FormField>
    </template>
  </div>

  <nav class="tabs underlined">
    <div role="tablist" :aria-label="t('selection.sections')">
      <button
        role="tab"
        type="button"
        :aria-selected="reportType === REPORT_TYPE_PLAYERS"
        @click="onStatTypeChange(REPORT_TYPE_PLAYERS)"
      >
        {{ t('selection.players') }}
      </button>
      <button
        role="tab"
        type="button"
        :aria-selected="reportType === REPORT_TYPE_TEAMS"
        @click="onStatTypeChange(REPORT_TYPE_TEAMS)"
      >
        {{ t('selection.teams') }}
      </button>
    </div>
  </nav>
</template>
