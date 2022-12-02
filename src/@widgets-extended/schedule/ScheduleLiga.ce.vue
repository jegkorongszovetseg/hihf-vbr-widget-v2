<script setup>
import { format, getLocalTimezone } from '@vbr-widget/utils';
import { ErrorNotice, ErrorProvider, I18NProvider, LoadingIndicator } from '@vbr-widget/components';
import DataProvider from './DataProvider.vue';
import ScheduleSelector from './ScheduleSelector.vue';
import GameItem from './Item.vue';
import { useMainClass } from '@vbr-widget/composables';

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

  championshipId: {
    type: Number,
    default: 0,
  },

  autoRefresh: {
    type: Boolean,
    default: false,
  },
});
const timezone = getLocalTimezone();
const tabButtonClasses = useMainClass('tab-button');
const sectionSelectorMainClass = useMainClass('section-selector');
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale">
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
              :key="rawSection"
              @click="changeSection(rawSection)"
              :class="[tabButtonClasses, { 'is-active': rawSection === section }]"
            >
              {{ rawSection }}
            </button>
          </div>

          <LoadingIndicator v-if="isLoading" />

          <template v-else>
            <div v-for="(gameDay, key) in games.rows" :key="key">
              {{ format(key, 'L dddd', timezone, locale) }}
              <div class="is-card">
                <template v-for="game in gameDay" :key="game.id">
                  <GameItem :game="game" />
                </template>
              </div>
            </div>
          </template>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style lang="postcss" src="@vbr-widget/assets/common.css"></style>
<style lang="postcss" src="@vbr-widget/assets/typography.css"></style>
<style lang="postcss" src="@vbr-widget/assets/forms.css"></style>
<style lang="postcss" src="@vbr-widget/assets/grid.css"></style>
<style lang="postcss" src="@vbr-widget/assets/cards.css"></style>
