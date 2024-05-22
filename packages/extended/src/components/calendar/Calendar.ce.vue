<script setup>
import { ref } from 'vue';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import { getLocalTimezone, format } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import GameItem from './Item.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';
import { PANEL_GAMES_PLAYED, PANEL_TODAYS_GAMES, PANEL_NEXT_GAMES, PANEL_WEEK_GAMES } from './calendar.internal';

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

  seasonId: {
    type: String,
    default: '',
  },
});

const timezone = ref(getLocalTimezone());

const tabButtonClasses = useMainClass('tab-button');
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
    <DataProvider
      :locale="props.locale"
      :timezone="timezone"
      :seasonId="seasonId"
      :apiKey="apiKey"
      #default="{ games, selectedPanel, isLoading, changePanel, fetchMore }"
    >
      <div class="flex overflow-x-auto is-mb-5">
        <button
          :class="[
            tabButtonClasses,
            'basis-[fit-content] shrink-0',
            { 'is-active': selectedPanel === PANEL_GAMES_PLAYED },
          ]"
          @click="changePanel(PANEL_GAMES_PLAYED)"
        >
          {{ t('calendar.gamesPlayed') }}
        </button>
        <button
          :class="[
            tabButtonClasses,
            'basis-[fit-content] shrink-0',
            { 'is-active': selectedPanel === PANEL_TODAYS_GAMES },
          ]"
          @click="changePanel(PANEL_TODAYS_GAMES)"
        >
          {{ t('calendar.todaysGames') }}
        </button>
        <button
          :class="[
            tabButtonClasses,
            'basis-[fit-content] shrink-0',
            { 'is-active': selectedPanel === PANEL_NEXT_GAMES },
          ]"
          @click="changePanel(PANEL_NEXT_GAMES)"
        >
          {{ t('calendar.nextGames') }}
        </button>
        <button
          :class="[
            tabButtonClasses,
            'basis-[fit-content] shrink-0',
            { 'is-active': selectedPanel === PANEL_WEEK_GAMES },
          ]"
          @click="changePanel(PANEL_WEEK_GAMES)"
        >
          {{ t('calendar.weekGames') }}
        </button>
      </div>

      <LoadingIndicator v-if="isLoading" />

      <div id="container-top">
        <div v-if="games.totalItems === 0 && !isLoading">No game</div>

        <div v-for="(gameDay, key) in games.rows" :key="key" :data-gamedate="key">
          <span class="is-text-base">{{ format(new Date(key), 'LL dddd', timezone, locale) }}</span>
          <div class="is-card">
            <template v-for="game in gameDay" :key="game.id">
              <GameItem :game="game" :locale="locale" :timezone="timezone" />
            </template>
          </div>
        </div>
      </div>
      <a href="#container-top" @click="fetchMore">More</a>
    </DataProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
