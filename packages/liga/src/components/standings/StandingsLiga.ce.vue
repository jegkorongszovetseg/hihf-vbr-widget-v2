<script setup>
import { ref, computed, unref } from 'vue';
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
            seasons,
            championshipId,
            sections,
            section,
            teams,
            isLoading,
            selectedMonth,
            selectedTeam,
            selectedTeamGameType,
            changeSeason,
            changeSection,
            changeTeamType,
          }"
        >
          <Selector
            :seasons="seasons"
            :championship-id="championshipId"
            :selected-month="selectedMonth"
            :selected-team="selectedTeam"
            :selected-team-game-type="selectedTeamGameType"
            @update:championship-id="changeSeason"
            @update:selected-month="changeMonth"
            @update:selected-team="changeTeam"
            @update:selected-team-game-type="changeTeamType"
          />
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

          <StatisticsTable :rows="teams.rows" :columns="COLUMNS_STANDINGS_P_3" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
