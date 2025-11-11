<script setup>
import { gameProps } from '@mjsz-vbr-elements/core';
import {
  ErrorNotice,
  ErrorProvider,
  FetchMoreObserver,
  I18NProvider,
  LoadingIndicator,
} from '@mjsz-vbr-elements/core/components';
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
        <nav class="tabs underlined mb-md">
          <div id="top" role="tablist" :aria-label="t('selection.sections')" class="flex overflow-x-auto">
            <button
              role="tab"
              type="button"
              :aria-selected="selectedPanel === PANEL_GAMES_PLAYED"
              @click="changePanel(PANEL_GAMES_PLAYED)"
            >
              {{ t('calendar.gamesPlayed') }}
            </button>
            <button
              role="tab"
              type="button"
              :aria-selected="selectedPanel === PANEL_TODAYS_GAMES"
              @click="changePanel(PANEL_TODAYS_GAMES)"
            >
              {{ t('calendar.todaysGames') }}
            </button>
            <button
              role="tab"
              type="button"
              :aria-selected="selectedPanel === PANEL_NEXT_GAMES"
              @click="changePanel(PANEL_NEXT_GAMES)"
            >
              {{ t('calendar.nextGames') }}
            </button>
            <button
              role="tab"
              type="button"
              :aria-selected="selectedPanel === PANEL_WEEK_GAMES"
              @click="changePanel(PANEL_WEEK_GAMES)"
            >
              {{ t('calendar.weekGames') }}
            </button>
          </div>
        </nav>

        <nav class="tabs filled">
          <div role="tablist" :aria-label="t('selection.sections')">
            <button
              v-for="month in months"
              :key="month.id"
              type="button"
              :aria-selected="selectedMonth === month.id"
              :disabled="isLoading"
              @click="setMonth(month)"
            >
              {{ month.name }}
            </button>
          </div>
        </nav>

        <div v-if="games.totalItems === 0 && !isLoading" class="text-center">
          {{ t('calendar.noGame') }}
        </div>

        <div>
          <LoadingIndicator v-if="isLoading" />

          <div v-for="(gameDay, key) in games.rows" :key="key" :data-gamedate="key">
            <span class="block h6 text-highlighted mt-xl mb-md">{{ format(new Date(key), 'LL dddd', timezone, locale) }}</span>
            <div class="card">
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

<!-- <style scoped>
@layer components {
  :where(.card-item) {
    display: grid;
    grid-gap: var(--size-16);
    grid-template-columns: 2fr 20px 1fr 20px 2fr;
    grid-template-areas: 'name name name name name' 'date date date date date' 'home-team home-team-logo game-data away-team-logo away-team';
    padding: var(--size-16);
    align-items: center;

    &:not(:last-of-type) {
      border-bottom: 1px solid var(--vbr-primary-color-100);
    }

    .is-logo-image {
      display: block;
      width: 100%;
      aspect-ratio: 1;
    }

    @container card-wrapper (width > 768px) {
      grid-template-columns: 2fr 40px 1fr 40px 2fr;
    }
  }
}
</style> -->

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/card.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/typography.css" />

<style src="@mjsz-vbr-elements/shared/css/components/game-item.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/cards.scss" lang="scss"></style> -->
