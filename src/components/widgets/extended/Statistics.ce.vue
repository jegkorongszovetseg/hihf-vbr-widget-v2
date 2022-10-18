<script setup>
import StatisticsProvider from './StatisticsProvider.vue';
import I18NProvider from '../../I18NProvider.vue';
import StatisticsTable from '../StatisticsTable.vue';
import Paginator from '../../Paginator.vue';

const props = defineProps({
  limit: {
    type: Number,
    default: 20,
  },
});
</script>

<template>
  <div>
    <I18NProvider locale="hu">
      <StatisticsProvider
        championship-name="Erste Liga"
        :limit="props.limit"
        v-slot:default="{
          sort,
          seasons,
          sections,
          championshipId,
          reports,
          columns,
          rows,
          page,
          onSort,
          onSeasonChange,
          onSectionChange,
          onPaginatorChange,
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

        <StatisticsTable :columns="columns" :rows="rows.rows" :sort="sort" @sort="onSort" />

        <Paginator
          :page="page"
          :items-per-page="props.limit"
          :total-items="rows.totalItems"
          :range-length="5"
          @change="onPaginatorChange"
        />
      </StatisticsProvider>
    </I18NProvider>
  </div>
</template>
