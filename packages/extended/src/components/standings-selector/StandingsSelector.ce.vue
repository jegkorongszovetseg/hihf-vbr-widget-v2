<script setup>
import { COLUMNS_SHORT } from '@mjsz-vbr-elements/core';
import { ErrorNotice, ErrorProvider, I18NProvider, StatisticsTable } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
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

const test = [
  {
    name: 'Erste Liga',
    phase: 'Alapszakasz',
    championshipId: 3783,
    phaseId: 45658,
    isPlayoffs: false,
  },
  {
    name: 'Andersen Liga',
    phase: 'Alapszakasz',
    championshipId: 3783,
    phaseId: 45658,
    isPlayoffs: false,
  },
];
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider v-slot="{ state, phaseName, championshipName, onChange }" :data="test">
        <div :class="useMainClass('standings-selector')">
          <dl>
            <dt>{{ championshipName }}</dt>
            <dd>{{ phaseName }}</dd>
            <ChampionshipSelector class="is-championship-selector" :data="test" @change="onChange" />
          </dl>

          <!-- :is-loading="isLoading"
          :hide-columns="props.hideColumns"
          :is-team-linked="isTeamLinked"
          :append-to="tooltipContainer" -->
          <StatisticsTable :columns="COLUMNS_SHORT" :rows="state.rows" :external-team-resolver="() => {}" />

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
