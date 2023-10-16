<script setup>
import { ref, computed, unref } from 'vue';
import { externalGameLinkResolver, format, getLocalTimezone, offsetName } from '@mjsz-vbr-elements/core/utils';
import { ErrorNotice, ErrorProvider, I18NProvider, LoadingIndicator, TimezoneSelector } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import DataProvider from './DataProvider.vue';
import ScheduleSelector from './ScheduleSelector.vue';
import GameItem from './Item.vue';
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

  // championshipId: {
  //   type: Number,
  //   default: 0,
  // },

  autoRefresh: {
    type: Boolean,
    default: false,
  },

  timezoneSelector: {
    type: Boolean,
    default: false,
  },

  externalGameLink: {
    type: [String, Function],
    default: '',
  },
});
const timezone = ref(getLocalTimezone());
const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));
const tabButtonClasses = useMainClass('tab-button');
const sectionSelectorMainClass = useMainClass('section-selector');

const messages = { en, hu };

const externalGameLink = (gameId) => externalGameLinkResolver(props.externalGameLink, gameId);

const onTimezoneChange = (tz) => {
  timezone.value = tz;
};
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          :auto-refresh="props.autoRefresh"
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
            <div v-for="(gameDay, key) in games.rows" :key="key">
              <span class="is-text-base">{{ format(key, 'L dddd', timezone, locale) }}</span>
              <div class="is-card">
                <template v-for="game in gameDay" :key="game.id">
                  <GameItem :game="game" :offset-name="currentOffsetName" :game-link="externalGameLink"/>
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
