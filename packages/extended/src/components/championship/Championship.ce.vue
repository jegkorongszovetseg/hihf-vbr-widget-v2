<script setup>
import { computed, unref, ref } from 'vue';
import {
  externalGameLinkResolver,
  externalTeamLinkResolver,
  getLocalTimezone,
  offsetName,
} from '@mjsz-vbr-elements/core/utils';
import {
  Paginator,
  ErrorNotice,
  I18NProvider,
  ErrorProvider,
  // TimezoneSelector,
  StatisticsTable,
  AdditionalStandingsText,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import DataProvider from './DataProvider.vue';
import SeasonSelector from './SeasonSelector.vue';
import Selector from './Selector.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';
import { PANEL_SCHEDULE, PANEL_STANDINGS, PANEL_PLAYERS, PANEL_TEAMS } from './championship.internal';

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

  timezoneSelector: {
    type: Boolean,
    default: false,
  },

  externalGameResolver: {
    type: [String, Function],
    default: '',
  },

  limit: {
    type: Number,
    default: 20,
  },
});

const tooltipContainer = ref(null);
const timezone = ref(getLocalTimezone());
const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));
const tabButtonClasses = useMainClass('tab-button');
const sectionSelectorMainClass = useMainClass('section-selector');

const messages = { en, hu };

const externalGameLink = (params) => externalGameLinkResolver(props.externalGameResolver, params);
const resolveExternalTeamLink = (teamName) => externalTeamLinkResolver(props.externalTeamResolver, teamName);

// const onTimezoneChange = (tz) => {
//   timezone.value = tz;
// };
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          :limit="limit"
          v-slot="{
            sort,
            page,
            games,
            phases,
            report,
            phaseId,
            columns,
            seasons,
            reports,
            isLoading,
            selectedPanel,
            championships,
            championshipId,
            selectedChampionshipId,
            onSort,
            changePanel,
            changePhase,
            changeSeason,
            onChangeReport,
            onPaginatorChange,
            changeChampionship,
          }"
        >
          <SeasonSelector :seasons="seasons" :championship-id="championshipId" @update:championship-id="changeSeason" />

          <div :class="sectionSelectorMainClass">
            <button
              v-for="rawChampionships in championships"
              :key="rawChampionships.phaseId"
              @click="changeChampionship(rawChampionships.sectionId)"
              :class="[tabButtonClasses, { 'is-active': rawChampionships.sectionId === selectedChampionshipId }]"
            >
              {{ rawChampionships.sectionName }}
            </button>
          </div>

          <Selector
            :phases="phases"
            :phase-id="phaseId"
            :reports="reports"
            :report="report"
            :is-reports-visible="selectedPanel === PANEL_PLAYERS || selectedPanel === PANEL_TEAMS"
            @update:phase-id="changePhase"
            @update:report="onChangeReport"
          />

          <div :class="sectionSelectorMainClass">
            <button
              :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_SCHEDULE }]"
              @click="changePanel(PANEL_SCHEDULE)"
            >
              {{ t('selection.schedule') }}
            </button>
            <button
              :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_STANDINGS }]"
              @click="changePanel(PANEL_STANDINGS)"
            >
              {{ t('selection.standings') }}
            </button>
            <button
              :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_PLAYERS }]"
              @click="changePanel(PANEL_PLAYERS)"
            >
              {{ t('selection.playerStats') }}
            </button>
            <button
              :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_TEAMS }]"
              @click="changePanel(PANEL_TEAMS)"
            >
              {{ t('selection.teamStats') }}
            </button>
          </div>

          <!-- <TimezoneSelector
            v-if="props.timezoneSelector"
            class="is-mb-5"
            :key="props.locale"
            :locale="props.locale"
            :current-zone="timezone"
            @change="onTimezoneChange"
          /> -->

          <!-- :is-team-linked="isTeamLinked" -->
          <StatisticsTable
            :columns="columns"
            :rows="games.rows"
            :sort="sort"
            :is-loading="isLoading"
            :offset-name="currentOffsetName"
            :external-team-resolver="resolveExternalTeamLink"
            :external-game-resolver="externalGameLink"
            :append-to="tooltipContainer"
            :hide-columns="selectedPanel === PANEL_SCHEDULE ? 'broadcast' : ''"
            @sort="onSort"
          />

          <Paginator
            v-if="selectedPanel === PANEL_PLAYERS"
            :page="page"
            :items-per-page="props.limit"
            :total-items="games.totalItems"
            :range-length="5"
            @change="onPaginatorChange"
          />

          <template v-if="selectedPanel === PANEL_STANDINGS">
            <AdditionalStandingsText :rows="games.rows" additional-key="inheritedPoints" />
            <AdditionalStandingsText :rows="games.rows" additional-key="penaltyPoints" />
          </template>
        </DataProvider>

        <div ref="tooltipContainer" />
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/dropdown.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/paginator.css"></style>
