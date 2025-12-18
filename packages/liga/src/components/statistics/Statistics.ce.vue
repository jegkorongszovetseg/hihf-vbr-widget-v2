<script setup>
import { ErrorNotice, ErrorProvider, I18NProvider, Paginator, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { playerStatsProps, teamStatsProps } from '@mjsz-vbr-elements/core/props';
import { externalPlayerLinkResolver, externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import StatisticSelector from './StatisticSelector.vue';
import StatisticsProvider from './StatisticsProvider.vue';

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

  ...teamStatsProps,
});

const messages = { en, hu };

const tooltipContainer = ref(null);

const resolveExternalTeamLink = teamName => externalTeamLinkResolver(props.externalTeamResolver, teamName);
const resolveExternalPlayerLink = playerId => externalPlayerLinkResolver(props.externalPlayerLink, playerId);
</script>

<template>
  <div>
    <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot="{ hasError, error }">
        <StatisticsProvider
          v-slot="{
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
          :championship-name="championshipName"
          :championship-id="championshipId"
          :limit="props.limit"
          :api-key="apiKey"
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
            :append-to="tooltipContainer"
            @sort="onSort"
          />

          <div class="grid-container">
            <Paginator
              :page="page"
              :items-per-page="props.limit"
              :total-items="rows.totalItems"
              :range-length="5"
              @change="onPaginatorChange"
            />
            <div v-if="rows.totalItems > 0" class="text-muted text-end">
              {{ t('table.info', { min: range[0], max: range[1], total: rows.totalItems }) }}
            </div>
          </div>

          <div ref="tooltipContainer" />
        </StatisticsProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/avatar.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/paginator.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />
