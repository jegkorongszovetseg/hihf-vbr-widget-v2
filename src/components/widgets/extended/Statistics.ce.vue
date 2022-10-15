<script setup>
import StatisticsProvider from './StatisticsProvider.vue';
const routes = [
  {
    name: '',
    component: '',
    meta: {
      columns: '',
    },
  },
];
</script>

<template>
  <div>
    <StatisticsProvider championship-name="Erste Liga" v-slot:default="{ seasons, sections, championshipId, onSeasonChange, onSectionChange }">
      <div>
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
          <select @change="onSectionChange">
            <option v-for="sectionName in sections" :key="sectionName" :value="sectionName">{{ sectionName }}</option>
          </select>
        </div>
        <div>
          <label>Riport</label>
          <select>
            <option></option>
          </select>
        </div>
      </div> 

      <div>Table</div>

      table: - columns - rows - component
    </StatisticsProvider>
  </div>
</template>
