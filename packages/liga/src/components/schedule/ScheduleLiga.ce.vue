<script setup>
import { ref, computed, unref } from 'vue';
import { unrefElement } from '@vueuse/core';
import { externalGameLinkResolver, format, getLocalTimezone, offsetName } from '@mjsz-vbr-elements/core/utils';
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  LoadingIndicator,
  TimezoneSelector,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import DataProvider from './DataProvider.vue';
import ScheduleSelector from './ScheduleSelector.vue';
import GameItem from './Item.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

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

  championshipName: {
    type: String,
    default: '',
  },

  autoRefresh: {
    type: Boolean,
    default: false,
  },

  timezoneSelector: {
    type: Boolean,
    default: false,
  },

  externalGameResolver: {
    type: [String, Function],
    default: '',
  },

  scrollToGameDate: {
    type: Boolean,
    default: true,
  },
});

console.log(typeof props.scrollToGameDate, Boolean(props.scrollToGameDate));

const mainElement = ref(null);
const selectorElement = ref(null);
const timezone = ref(getLocalTimezone());
const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));
const tabButtonClasses = useMainClass('tab-button');
const sectionSelectorMainClass = useMainClass('section-selector');

const selectorHeight = computed(() => {
  return unrefElement(selectorElement)?.clientHeight ?? 0;
});

const externalGameLink = (gameId) => `/game/id/${gameId}`;
// const externalGameLink = (gameId) => externalGameLinkResolver(props.externalGameLink, gameId);

const onTimezoneChange = (tz) => {
  timezone.value = tz;
};
</script>

<template>
  <div ref="mainElement">
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          :main-element="mainElement"
          :auto-refresh="props.autoRefresh"
          :scroll-offset="selectorHeight"
          v-slot="{
            seasons,
            championshipId,
            sections,
            section,
            teams,
            games,
            months,
            isLoading,
            selectedMonth,
            selectedTeam,
            selectedTeamGameType,
            changeSeason,
            changeMonth,
            changeSection,
            changeTeam,
            changeTeamType,
          }"
        >
          <ScheduleSelector
            ref="selectorElement"
            class="is-sticky is-blured-bg"
            :seasons="seasons"
            :championship-id="championshipId"
            :months="months"
            :selected-month="selectedMonth"
            :teams="teams"
            :selected-team="selectedTeam"
            :selected-team-game-type="selectedTeamGameType"
            @update:championship-id="changeSeason"
            @update:selected-month="changeMonth"
            @update:selected-team="changeTeam"
            @update:selected-team-game-type="changeTeamType"
          />
          <div :class="sectionSelectorMainClass">
            <button
              v-for="rawSection in sections"
              :key="rawSection.phaseId"
              @click="changeSection(rawSection.phaseName)"
              :class="[tabButtonClasses, { 'is-active': rawSection.phaseName === section }]"
            >
              {{ rawSection.phaseName }}
            </button>
          </div>

          <TimezoneSelector
            v-if="props.timezoneSelector"
            class="is-mb-5"
            :key="props.locale"
            :locale="props.locale"
            :current-zone="timezone"
            @change="onTimezoneChange"
          />

          <LoadingIndicator v-if="isLoading" />

          <template v-else>
            <div v-for="(gameDay, key) in games.rows" :key="key" :data-gamedate="key">
              <span class="is-text-base">{{ format(new Date(key), 'L dddd', timezone, locale) }}</span>
              <div class="is-card">
                <template v-for="game in gameDay" :key="game.id">
                  <GameItem :game="game" :offset-name="currentOffsetName" :game-link="externalGameLink" />
                </template>
              </div>
            </div>
          </template>
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
