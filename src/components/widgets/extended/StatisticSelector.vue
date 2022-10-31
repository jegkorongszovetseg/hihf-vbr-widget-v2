<script setup>
import { computed } from 'vue';
import { useI18n } from '../../../composables/useI18n';
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
</script>

<template>
  <div>
    <div>
      <button type="button" @click="onStatTypeChange(REPORT_TYPE_PLAYERS)">Players</button>
      <button type="button" @click="onStatTypeChange(REPORT_TYPE_TEAMS)">Teams</button>
    </div>
    <div>
      <label for="season">Szezon</label>
      <select id="season" v-model="seasonSelect">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </select>
    </div>
    <div>
      <label for="section">Szakasz</label>
      <select id="section" v-model="sectionSelect">
        <option v-for="sectionName in sections" :key="sectionName" :value="sectionName">{{ sectionName }}</option>
      </select>
    </div>
    <div>
      <label for="report">Riport</label>
      <select id="report" v-model="reportSelect">
        <option v-for="{ name, value } in reports" :key="value" :value="value">{{ name }}</option>
      </select>
    </div>
    <div>
      <label for="teams">Teams</label>
      <select id="teams" v-model="teamSelect" :disabled="reportType !== 'players'">
        <option :value="null">{{ t('common.all') }}</option>
        <option v-for="{ teamId, teamName } in teams" :key="teamId" :value="teamId">{{ teamName }}</option>
      </select>
    </div>
    <div>
      <input type="text" v-model="playerName" :disabled="reportType !== 'players'" />
    </div>
  </div>
</template>
