<script setup>
import { COLUMNS_STANDINGS_P_3 } from '@mjsz-vbr-elements/core/columns';
import {
  AdditionalStandingsText,
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  SeasonSelector,
} from '@mjsz-vbr-elements/core/components';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import DataProvider from './DataProvider.vue';
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
          <SeasonSelector
            :seasons="seasons"
            :championship-id="championshipId"
            :sections="sections"
            :section-id="section"
            @on-change-season="changeSeason"
            @on-change-section="changeSection"
          />

          <nav v-if="isLiveStandingsActive" class="tabs filled mb-md">
            <div role="tablist" :aria-label="t('selection.sections')">
              <button
                role="tab"
                type="button"
                :aria-selected="standingsType === TOGGLE_LIVE"
                @click="onChangeStandingsType(TOGGLE_LIVE)"
              >
                {{ t('standings.live') }}
              </button>
              <button
                role="tab"
                type="button"
                :aria-selected="standingsType === TOGGLE_DEFAULT "
                @click="onChangeStandingsType(TOGGLE_DEFAULT)"
              >
                {{ t('standings.default') }}
              </button>
            </div>
          </nav>

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

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/avatar.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />

<style src="@mjsz-vbr-elements/shared/css/components/badge.css" />
