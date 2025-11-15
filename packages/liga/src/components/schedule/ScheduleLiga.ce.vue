<script setup>
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  LoadingIndicator,
  TimezoneSelector,
} from '@mjsz-vbr-elements/core/components';
import { gameProps } from '@mjsz-vbr-elements/core/constants';
import { externalGameLinkResolver, format, getLocalTimezone, offsetName } from '@mjsz-vbr-elements/core/utils';
import { unrefElement } from '@vueuse/core';
import { computed, ref, unref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import DataProvider from './DataProvider.vue';
import GameItem from './Item.vue';
import ScheduleSelector from './ScheduleSelector.vue';

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

const DEFAULT_LIGA_GAME_RESOLVER = '/game/id/{gameId}';

const messages = { en, hu };

const mainElement = ref(null);
const selectorElement = ref(null);
const timezone = ref(getLocalTimezone());

const currentOffsetName = computed(() => offsetName(new Date(), unref(timezone), props.locale));
const scrollToGameDate = computed(() => props.scrollToGameDate.toLowerCase() === 'true');

const selectorHeight = computed(() => {
  return unrefElement(selectorElement)?.clientHeight ?? 0;
});

function onTimezoneChange(tz) {
  timezone.value = tz;
}

function resolveExternalGameLink(game) {
  return externalGameLinkResolver(props.externalGameResolver || DEFAULT_LIGA_GAME_RESOLVER, game);
}
const externalGameResolverTarget = computed(() => (props.isGameTargetExternal ? '_blank' : '_self'));
</script>

<template>
  <div ref="mainElement">
    <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
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
          :locale="locale"
          :timezone="timezone"
          :championship-name="championshipName"
          :main-element="mainElement"
          :auto-refresh="props.autoRefresh"
          :scroll-offset="selectorHeight"
          :scroll-to-game-date="scrollToGameDate"
        >
          <ScheduleSelector
            ref="selectorElement"
            class="sticky blured-bg"
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
          <nav class="tabs underlined mb-md">
            <div role="tablist">
              <button
                v-for="rawSection in sections"
                :key="rawSection.id"
                role="tab"
                type="button"
                :aria-selected="rawSection.phaseName === section"
                @click="changeSection(rawSection.phaseName)"
              >
                {{ rawSection.phaseName }}
              </button>
            </div>
          </nav>

          <nav v-if="subPhases.length > 1" class="tabs filled">
            <div role="tablist">
              <button
                role="tab"
                type="button"
                :aria-selected="subPhase === ''"
                @click="changeSubSection('')"
              >
                {{ t('common.all') }}
              </button>
              <button
                v-for="{ phaseTypeName } in subPhases"
                :key="phaseTypeName"
                role="tab"
                type="button"
                :aria-selected="phaseTypeName === subPhase"
                @click="changeSubSection(phaseTypeName)"
              >
                {{ phaseTypeName }}
              </button>
            </div>
          </nav>

          <TimezoneSelector
            v-if="props.timezoneSelector"
            :key="props.locale"
            class="is-mb-5"
            :locale="props.locale"
            :current-zone="timezone"
            @change="onTimezoneChange"
          />

          <LoadingIndicator v-if="isLoading" />

          <template v-else>
            <div v-for="(gameDay, key) in games.rows" :key="key" :data-gamedate="key">
              <h6>{{ format(new Date(key), 'L dddd', timezone, locale) }}</h6>
              <div class="card">
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

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/card.css" />

<style src="@mjsz-vbr-elements/shared/css/components/game-item.css" />

<style src="@mjsz-vbr-elements/shared/css/components/timezone-selector.css" />

<style src="@mjsz-vbr-elements/shared/css/components/typography.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/badge.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/cards.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/grid.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style> -->
