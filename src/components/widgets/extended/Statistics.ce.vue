<script setup>
import StatisticsProvider from './StatisticsProvider.vue';
import I18NProvider from '../../I18NProvider.vue';
import StatisticsTable from '../StatisticsTable.vue';
</script>

<template>
  <div>
    <I18NProvider locale="hu">
      <StatisticsProvider
        championship-name="Erste Liga"
        v-slot:default="{
          seasons,
          sections,
          championshipId,
          reports,
          columns,
          rows,
          component,
          onSeasonChange,
          onSectionChange,
        }"
      >
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
              <option v-for="{ name, value } in reports" :key="value" :value="value">{{ name }}</option>
            </select>
          </div>
        </div>

        <div>Table</div>

        <StatisticsTable :columns="columns" :rows="rows" />
      </StatisticsProvider>
    </I18NProvider>
  </div>
</template>
