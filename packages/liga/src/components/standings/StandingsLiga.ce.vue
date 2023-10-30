<script setup>
import { ref } from 'vue';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  LoadingIndicator,
  StatisticsTable,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { COLUMNS_STANDINGS_P_3 } from '@mjsz-vbr-elements/core/columns';
import DataProvider from './DataProvider.vue';
import Selector from './Selector.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

const liveTable = {
  ...COLUMNS_STANDINGS_P_3,
  score: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
  },
};

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

  externalTeamResolver: {
    type: [String, Function],
    default: '',
  },
});

const messages = { en, hu };

const tooltipContainer = ref(null);

const externalTeamLink = (teamId) => externalTeamLinkResolver(props.externalTeamResolver, teamId);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :championship-name="championshipName"
          v-slot="{
            sort,
            teams,
            seasons,
            section,
            sections,
            isLoading,
            championshipId,
            onSort,
            liveRows,
            changeSeason,
            changeSection,
          }"
        >
          <Selector :seasons="seasons" :championship-id="championshipId" @update:championship-id="changeSeason" />
          <div :class="useMainClass('section-selector')">
            <button
              v-for="rawSection in sections"
              :key="rawSection.phaseId"
              @click="changeSection(rawSection.phaseName)"
              :class="[useMainClass('tab-button'), { 'is-active': rawSection.phaseName === section }]"
            >
              {{ rawSection.phaseName }}
            </button>
          </div>

          <LoadingIndicator v-if="isLoading" />

          <!-- LIVE STANDINGS -->
          <StatisticsTable
            :rows="liveRows.rows"
            :columns="liveTable"
            :sort="sort"
            :external-team-resolver="externalTeamLink"
            :append-to="tooltipContainer"
            @sort="onSort"
          />

          <StatisticsTable
            :rows="teams.rows"
            :columns="COLUMNS_STANDINGS_P_3"
            :sort="sort"
            :external-team-resolver="externalTeamLink"
            :append-to="tooltipContainer"
            @sort="onSort"
          />
        </DataProvider>

        <div ref="tooltipContainer" />
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
