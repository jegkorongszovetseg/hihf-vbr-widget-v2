<script setup>
import { playerStatsProps } from '@mjsz-vbr-elements/core';
import { ErrorProvider, ErrorNotice, Paginator, StatisticsTable, I18NProvider } from '@mjsz-vbr-elements/core/components';
import StatisticsProvider from './StatisticsProvider.vue';
import StatisticSelector from './StatisticSelector.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

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

const messages = { en, hu };

const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamLink, teamName);
const resolveExternalPlayerLink = (playerId) => externalPlayerLinkResolver(props.externalPlayerLink, playerId);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages" >
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

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
