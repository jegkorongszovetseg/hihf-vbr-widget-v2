<script setup>
import { COLUMNS_STANDINGS_SHORT } from '@mjsz-vbr-elements/core';
import { AdditionalStandingsText, ErrorNotice, ErrorProvider, I18NProvider, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import ChampionshipSelector from './ChampionshipSelector.vue';
import DataProvider from './DataProvider.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  data: {
    type: Array,
    default: () => [],
  },

});

const messages = { en, hu };

const tooltipContainer = ref(null);
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider v-slot="{ convertedRows, isLoading, phaseName, championshipName, phaseId, onChange }" :data="data">
        <div class="standings-selector">
          <dl>
            <dt>{{ t('selection.standings') }}</dt>
            <dd>{{ championshipName }} - {{ phaseName }}</dd>
            <ChampionshipSelector class="is-championship-selector" :data="data" :selected="phaseId" :target="tooltipContainer" @change="onChange" />
          </dl>

          <StatisticsTable
            :is-loading="isLoading"
            :columns="COLUMNS_STANDINGS_SHORT"
            :rows="convertedRows.rows"
            :append-to="tooltipContainer"
            :external-team-resolver="() => {}"
          />

          <AdditionalStandingsText :rows="convertedRows.rows" additional-key="inheritedPoints" />
          <AdditionalStandingsText :rows="convertedRows.rows" additional-key="penaltyPoints" />
        </div>
        <div ref="tooltipContainer" />
      </DataProvider>
    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/standings-selector.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/dropdown.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style>
