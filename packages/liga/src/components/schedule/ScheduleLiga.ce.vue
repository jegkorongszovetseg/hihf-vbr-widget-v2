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
import { gameProps } from '@mjsz-vbr-elements/core';
import DataProvider from './DataProvider.vue';
import ScheduleSelector from './ScheduleSelector.vue';
import GameItem from './Item.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

const DEFAULT_LIGA_GAME_RESOLVER = '/game/id/{gameId}';

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

  scrollToGameDate: {
    type: String,
    default: 'true',
  },

  ...gameProps,
});

const mainElement = ref(null);
const selectorElement = ref(null);
const timezone = ref(getLocalTimezone());

const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));
const scrollToGameDate = computed(() => props.scrollToGameDate.toLowerCase() === 'true');

const selectorHeight = computed(() => {
  return unrefElement(selectorElement)?.clientHeight ?? 0;
});

const onTimezoneChange = (tz) => {
  timezone.value = tz;
};

const resolveExternalGameLink = (game) =>
  externalGameLinkResolver(props.externalGameResolver || DEFAULT_LIGA_GAME_RESOLVER, game);
const externalGameResolverTarget = computed(() => (props.isGameTargetExternal ? '_blank' : '_self'));
</script>

<template>
  <div ref="mainElement">
    <I18NProvider :locale="props.locale" :messages="messages" v-slot="{t}">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          :main-element="mainElement"
          :auto-refresh="props.autoRefresh"
          :scroll-offset="selectorHeight"
          :scroll-to-game-date="scrollToGameDate"
          v-slot="{
            seasons,
            championshipId,
            sections,
            section,
            teams,
            games,
            months,
            isLoading,
            subPhases,
            subPhase,
            selectedMonth,
            selectedTeam,
            selectedTeamGameType,
            changeSeason,
            changeMonth,
            changeSection,
            changeTeam,
            changeTeamType,
            changeSubSection,
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
          <div :class="useMainClass('section-selector')">
            <button
              v-for="rawSection in sections"
              :key="rawSection.id"
              @click="changeSection(rawSection.name)"
              :class="[useMainClass('tab-button'), { 'is-active': rawSection.name === section }]"
            >
              {{ rawSection.name }}
            </button>
          </div>

          <div v-if="subPhases.length > 1" :class="[useMainClass('toggle-group')]">
            <button @click="changeSubSection('')" :class="{ 'is-active': subPhase === '' }">{{ t('common.all') }}</button>
            <button
              v-for="{ name } in subPhases"
              @click="changeSubSection(name)"
              :class="{ 'is-active': name === subPhase }"
            >
              {{ name }}
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
                  <GameItem
                    :game="game"
                    :offset-name="currentOffsetName"
                    :game-link="resolveExternalGameLink"
                    :target="externalGameResolverTarget"
                  />
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
