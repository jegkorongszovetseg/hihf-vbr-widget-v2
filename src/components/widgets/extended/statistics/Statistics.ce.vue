<script setup>
import { playerStatsProps } from '../internal.props';
import StatisticsProvider from './StatisticsProvider.vue';
import I18NProvider from '../../I18NProvider.vue';
import StatisticsTable from '../StatisticsTable.vue';
import Paginator from '../../Paginator.vue';
import ErrorNotice from '../../ErrorNotice.vue';
import StatisticSelector from './StatisticSelector.vue';
import ErrorProvider from '../../ErrorProvider.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipName: {
    type: String,
    default: '',
  },

  championshipId: {
    type: Number,
    default: 0,
  },

  hideColumns: {
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
      <ErrorProvider v-slot:default="{ message, hasError, error }">
        <StatisticsProvider
          :championship-name="championshipName"
          :championship-id="championshipId"
          :limit="props.limit"
          :api-key="apiKey"
          v-slot:default="{
            sort,
            columns,
            rows,
            page,
            range,
            loading,
            selectorProps,
            selectorListeners,
            onPaginatorChange,
            onSort,
          }"
        >
          <ErrorNotice v-if="hasError" :error="error" />

          <StatisticSelector v-else v-bind="selectorProps" v-on="selectorListeners" />

          <StatisticsTable
            :columns="columns"
            :rows="rows.rows"
            :sort="sort"
            :is-loading="loading"
            :external-team-resolver="resolveExternalTeamLink"
            :external-player-resolver="resolveExternalPlayerLink"
            :is-team-linked="isTeamLinked"
            :is-player-linked="isPlayerLinked"
            :hide-columns="hideColumns"
            @sort="onSort"
          />

          <div style="display: flex; align-items: center">
            <Paginator
              :page="page"
              :items-per-page="props.limit"
              :total-items="rows.totalItems"
              :range-length="5"
              @change="onPaginatorChange"
            />
            <div style="flex-grow: 1; text-align: right">{{ range.join('-') }} / {{ rows.totalItems }} db</div>
          </div>
        </StatisticsProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@/assets/common.css"></style>
<style src="@/assets/forms.css"></style>
<style src="@/assets/table.css"></style>
<style src="@/assets/responsive-table.css"></style>
<style src="@/assets/paginator.css"></style>
