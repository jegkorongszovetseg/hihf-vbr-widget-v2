<script setup>
import { ErrorProvider, I18NProvider, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import ChampionshipSelector from './ChampionshipSelector.vue';
import DataProvider from './DataProvider.vue';
import { COLUMNS_STANDINGS_P_3 } from '@mjsz-vbr-elements/core';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';

const messages = { en, hu };

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

const test = [
  {
    name: 'Erste Liga',
    phase: 'Alapszakasz',
    championshipId: 3783,
    phaseId: 45658,
    isPlayoffs: false,
  },
];
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot:default="{ error, hasError }">
      <DataProvider :data="test" #default="{ state }">
        <div :class="useMainClass('standings-selector')">
          <dl>
            <dt>Erste Liga</dt>
            <dd>Alpszakasz</dd>
            <ChampionshipSelector class="is-championship-selector" />
          </dl>

          <!-- :is-loading="isLoading"
          :hide-columns="props.hideColumns"
          :external-team-resolver="resolveExternalTeamLink"
          :is-team-linked="isTeamLinked"
          :append-to="tooltipContainer" -->
          <StatisticsTable :columns="COLUMNS_STANDINGS_P_3" :rows="state" />

          <!-- <pre>{{ props.data }}</pre> -->
        </div>
      </DataProvider>

    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/standings-selector.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
