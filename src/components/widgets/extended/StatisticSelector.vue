<script setup>
const props = defineProps({
  seasons: {
    type: Array,
    defauét: () => [],
  },

  championshipId: {
    type: Number,
    default: null,
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
    type: String,
    default: '',
  },

  playerFilter: {
    type: String,
    default: '',
  },
});

const onStatTypeChange = () => {};
const onSeasonChange = () => {};
const onSectionChange = () => {};
const onReportChange = () => {};
const onTeamChange = () => {};
const onPlayerInput = () => {};
</script>

<template>
  <div>
    <div>
      <button type="button" @click="onStatTypeChange('players')">Players</button>
      <button type="button" @click="onStatTypeChange('teams')">Teams</button>
    </div>
    <div>
      <label>Szezon</label>
      <select :value="championshipId" @change="onSeasonChange">
        <option v-for="season in seasons" :key="season.championshipId" :value="season.championshipId">
          {{ season.seasonName }}
        </option>
      </select>
    </div>
    <div>
      <label>Szakasz</label>
      <select :value="section" @change="onSectionChange">
        <option v-for="sectionName in sections" :key="sectionName" :value="sectionName">{{ sectionName }}</option>
      </select>
    </div>
    <div>
      <label>Riport</label>
      <select :value="currentReport" @change="onReportChange">
        <option v-for="{ name, value } in reports" :key="value" :value="value">{{ name }}</option>
      </select>
    </div>
    <div>
      <label>Teams</label>
      <select :value="teamFilter" @change="onTeamChange" :disabled="reportType !== 'players'">
        <option value="">All</option>
        <option v-for="{ teamId, teamName } in teams" :key="teamId" :value="teamId">{{ teamName }}</option>
      </select>
    </div>
    <div>
      <input type="text" :value="playerFilter" @input="onPlayerInput" />
    </div>
  </div>
</template>
