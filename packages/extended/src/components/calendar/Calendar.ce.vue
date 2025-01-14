<script setup>
import { gameProps } from '@mjsz-vbr-elements/core';
import {
  ErrorNotice,
  ErrorProvider,
  FetchMoreObserver,
  I18NProvider,
  LoadingIndicator,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { externalGameLinkResolver, format, getLocalTimezone } from '@mjsz-vbr-elements/core/utils';
import { computed, ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { PANEL_GAMES_PLAYED, PANEL_NEXT_GAMES, PANEL_TODAYS_GAMES, PANEL_WEEK_GAMES } from './calendar.internal';
import DataProvider from './DataProvider.vue';
import GameItem from './Item.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  seasonId: {
    type: String,
    default: '',
  },

  ...gameProps,
});

const messages = { en, hu };

const timezone = ref(getLocalTimezone());

const tabButtonClasses = useMainClass('tab-button');

const externalGameResolverTarget = computed(() => (props.isGameTargetExternal ? '_blank' : '_self'));

const resolveExternalGameLink = game => externalGameLinkResolver(props.externalGameResolver || '/game/id/{id}', game);
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
    <ErrorProvider v-slot="{ error, hasError }">
      <ErrorNotice v-if="hasError" :error="error" />

      <DataProvider
        v-slot="{
          games,
          months,
          isLoading,
          selectedPanel,
          selectedMonth,
          more,
          setMonth,
          changePanel,
        }"
        :locale="props.locale"
        :timezone="timezone"
        :season-id="seasonId"
        :api-key="apiKey"
      >
        <div id="top" class="flex overflow-x-auto is-mb-5">
          <button
            class="basis-[fit-content] shrink-0" :class="[
              tabButtonClasses,
              { 'is-active': selectedPanel === PANEL_GAMES_PLAYED },
            ]"
            @click="changePanel(PANEL_GAMES_PLAYED)"
          >
            {{ t('calendar.gamesPlayed') }}
          </button>
          <button
            class="basis-[fit-content] shrink-0" :class="[
              tabButtonClasses,
              { 'is-active': selectedPanel === PANEL_TODAYS_GAMES },
            ]"
            @click="changePanel(PANEL_TODAYS_GAMES)"
          >
            {{ t('calendar.todaysGames') }}
          </button>
          <button
            class="basis-[fit-content] shrink-0" :class="[
              tabButtonClasses,
              { 'is-active': selectedPanel === PANEL_NEXT_GAMES },
            ]"
            @click="changePanel(PANEL_NEXT_GAMES)"
          >
            {{ t('calendar.nextGames') }}
          </button>
          <button
            class="basis-[fit-content] shrink-0" :class="[
              tabButtonClasses,
              { 'is-active': selectedPanel === PANEL_WEEK_GAMES },
            ]"
            @click="changePanel(PANEL_WEEK_GAMES)"
          >
            {{ t('calendar.weekGames') }}
          </button>
        </div>

        <div :class="[useMainClass('toggle-group')]">
          <button
            v-for="month in months"
            :key="month.id"
            type="button"
            :class="{ 'is-active': selectedMonth === month.id }"
            :disabled="isLoading"
            @click="setMonth(month)"
          >
            {{ month.name }}
          </button>
        </div>

        <div v-if="games.totalItems === 0 && !isLoading" class="is-text-center">
          {{ t('calendar.noGame') }}
        </div>

        <div>
          <LoadingIndicator v-if="isLoading" />

          <div v-for="(gameDay, key) in games.rows" :key="key" :data-gamedate="key">
            <span class="is-text-base">{{ format(new Date(key), 'LL dddd', timezone, locale) }}</span>
            <div class="is-card">
              <template v-for="game in gameDay" :key="game.id">
                <GameItem
                  :game="game"
                  :locale="locale"
                  :timezone="timezone"
                  :game-link="resolveExternalGameLink"
                  :target="externalGameResolverTarget"
                />
              </template>
            </div>
          </div>
        </div>

        <FetchMoreObserver
          v-if="!isLoading && games.currentItems < games.totalItems"
          :options="{ rootMargin: '400px' }"
          @intersect="more"
        >
          <button @click="more">
            {{ t('calendar.more') }}
          </button>
        </FetchMoreObserver>
      </DataProvider>
    </ErrorProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>

<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>

<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
