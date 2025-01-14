<script setup>
import { COLUMNS_STANDINGS_P_3 } from '@mjsz-vbr-elements/core/columns';
import {
  AdditionalStandingsText,
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import DataProvider from './DataProvider.vue';
import Selector from './Selector.vue';
import { COLUMNS_LIVE_STANDINGS_P_3, TOGGLE_DEFAULT, TOGGLE_LIVE } from './standings.internal';
import StandingsTable from './StandingsTable.vue';

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

const externalTeamLink = teamId => externalTeamLinkResolver(props.externalTeamResolver, teamId);
</script>

<template>
  <div>
    <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          v-slot="{
            sort,
            teams,
            seasons,
            section,
            sections,
            liveRows,
            isLoading,
            standingsType,
            championshipId,
            isLiveStandingsActive,
            onSort,
            changeSeason,
            changeSection,
            onChangeStandingsType,
          }"
          :locale="locale"
          :championship-name="championshipName"
        >
          <Selector :seasons="seasons" :championship-id="championshipId" @update:championship-id="changeSeason" />
          <div :class="useMainClass('section-selector')">
            <button
              v-for="rawSection in sections"
              :key="rawSection.phaseId"
              :class="[useMainClass('tab-button'), { 'is-active': rawSection.phaseName === section }]"
              @click="changeSection(rawSection.phaseName)"
            >
              {{ rawSection.phaseName }}
            </button>
          </div>

          <div v-if="isLiveStandingsActive" :class="useMainClass('toggle-group')">
            <button :class="{ 'is-active': standingsType === TOGGLE_LIVE }" @click="onChangeStandingsType(TOGGLE_LIVE)">
              {{ t('standings.live') }}
            </button>
            <button
              :class="{ 'is-active': standingsType === TOGGLE_DEFAULT }"
              @click="onChangeStandingsType(TOGGLE_DEFAULT)"
            >
              {{ t('standings.default') }}
            </button>
          </div>

          <StandingsTable
            v-if="standingsType === TOGGLE_LIVE && isLiveStandingsActive"
            :rows="liveRows.rows"
            :columns="COLUMNS_LIVE_STANDINGS_P_3"
            :external-team-resolver="externalTeamLink"
            :is-loading="isLoading"
            :append-to="tooltipContainer"
          />

          <StandingsTable
            v-if="standingsType === TOGGLE_DEFAULT || !isLiveStandingsActive"
            :rows="teams.rows"
            :columns="COLUMNS_STANDINGS_P_3"
            :sort="sort"
            :external-team-resolver="externalTeamLink"
            :append-to="tooltipContainer"
            :is-loading="isLoading"
            @sort="onSort"
          />

          <AdditionalStandingsText :rows="teams.rows" additional-key="inheritedPoints" />
          <AdditionalStandingsText :rows="teams.rows" additional-key="penaltyPoints" />
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

<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
