<script setup>
import StatisticsProvider from './StatisticsProvider.vue';
import I18NProvider from '../../I18NProvider.vue';
import StatisticsTable from '../StatisticsTable.vue';
import Paginator from '../../Paginator.vue';
import { playerStatsProps } from '../internal.props';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  ...playerStatsProps,
});

const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
const resolveExternalPlayerLink = (playerId) => externalPlayerLinkResolver(props.externalPlayerLink, playerId);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
      <StatisticsProvider
        championship-name="Erste Liga"
        :limit="props.limit"
        v-slot:default="{
          sort,
          seasons,
          section,
          sections,
          championshipId,
          reports,
          columns,
          rows,
          page,
          loading,
          currentReport,
          teams,
          teamFilter,
          onSort,
          onSeasonChange,
          onReportChange,
          onSectionChange,
          onPaginatorChange,
          onTeamChange,
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
            <select :value="teamFilter" @change="onTeamChange">
              <option value="">All</option>
              <option v-for="{ teamId, teamName } in teams" :key="teamId" :value="teamId">{{ teamName }}</option>
            </select>
          </div>
          <div>Input</div>
        </div>

        <StatisticsTable
          :columns="columns"
          :rows="rows.rows"
          :sort="sort"
          :is-loading="loading"
          :external-team-resolver="resolveExternalTeamLink"
          :external-player-resolver="resolveExternalPlayerLink"
          :is-team-linked="isTeamLinked"
          :is-player-linked="isPlayerLinked"
          @sort="onSort"
        />

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
