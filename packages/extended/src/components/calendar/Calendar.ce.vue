<script setup>
import { computed, ref } from 'vue';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider, LoadingIndicator, FetchMoreObserver } from '@mjsz-vbr-elements/core/components';
import { getLocalTimezone, format, externalGameLinkResolver } from '@mjsz-vbr-elements/core/utils';
import { gameProps } from '@mjsz-vbr-elements/core';
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

  ...gameProps,
});

const timezone = ref(getLocalTimezone());

const tabButtonClasses = useMainClass('tab-button');

const externalGameResolverTarget = computed(() => (props.isGameTargetExternal ? '_blank' : '_self'));

const resolveExternalGameLink = (game) => externalGameLinkResolver(props.externalGameResolver || '/game/id/{id}', game);
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
    <DataProvider
      :locale="props.locale"
      :timezone="timezone"
      :seasonId="seasonId"
      :apiKey="apiKey"
      #default="{
        today,
        games,
        months,
        isLoading,
        datesFilter,
        selectedPanel,
        selectedMonth,
        isFetchMoreButtonActive,
        more,
        setMonth,
        changePanel,
      }"
    >
      <div id="top" class="flex overflow-x-auto is-mb-5">
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

      <div v-if="!isLoading" :class="[useMainClass('toggle-group')]">
        <button
          type="button"
          v-for="month in months"
          :class="{ 'is-active': selectedMonth === month.id }"
          @click="setMonth(month)"
        >
          {{ month.name }}
        </button>
      </div>
      
      <div v-if="games.totalItems === 0 && !isLoading" class="is-text-center">{{ t('calendar.noGame') }}</div>

      <!-- <pre>{{ datesFilter }}</pre>
        <pre>{{ today }}</pre>
        <pre>Selected-month: {{ selectedMonth }}</pre>
        <pre>Total: {{ games.totalItems }}</pre> -->
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
        v-if="!isLoading && games.currentItems < games.totalItems && isFetchMoreButtonActive"
        :options="{ rootMargin: '400px' }"
        @intersect="more"
      >
        <button @click="more">More</button>
      </FetchMoreObserver>
    </DataProvider>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
