<script setup>
import { ErrorNotice, ErrorProvider, I18NProvider, Image } from '@mjsz-vbr-elements/core/components';
import { ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
// import { externalTeamLinkResolver, offsetName } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import Games from './Games.vue';
import { PANE_GAMES, PANE_SEASONS } from './player.internal';
import PlayerInfo from './PlayerInfo.vue';
import Seasons from './Seasons.vue';
import SeasonsStats from './SeasonStats.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  playerId: {
    type: String,
    default: '',
  },

  championshipId: {
    type: String,
    default: '',
  },

  externalGameResolver: {
    type: String,
    default: '',
  },

  externalTeamResolver: {
    type: String,
    default: '',
  },
});

const messages = { en, hu };

const tooltipContainer = ref(null);

// const externalTeamLink = (teamId) => externalTeamLinkResolver(props.externalPlayerResolver, { teamId });
</script>

<template>
  <div class="is-mb-5">
    <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          v-slot="{
            pane,
            isGamesLoading,
            isPlayerSeasonsLoading,
            playerData,
            playerGames,
            playerSeasonStats,
            currentSeasonStats,
            gameColumns,
            seasonColumns,
            currentSeasonColumns,
            onChangePane,
          }"
          :api-key="props.apiKey"
          :locale="locale"
          :championship-id="championshipId"
          :player-id="props.playerId"
        >
          <h1 class="uppercase">
            {{ playerData.name }}
          </h1>
          <div class="hero" style="--overlay-size: 180px">
            <div class="is-main-image">
              <Image
                :key="playerData.player?.playerId"
                :src="playerData.playerAction"
                default-src="https://www.ersteliga.hu/assets/images/logo_liga@2x.png"
              />
            </div>
            <div class="is-ovarlay-image">
              <Image :key="playerData.player?.playerId" :src="playerData?.player?.picture" />
            </div>
          </div>

          <PlayerInfo :data="playerData" :append-to="tooltipContainer" />

          <SeasonsStats
            :rows="currentSeasonStats"
            :columns="currentSeasonColumns"
            :is-loading="isPlayerSeasonsLoading"
            :append-to="tooltipContainer"
          />

          <nav class="tabs underlined">
            <div role="tablist" :aria-label="t('selection.sections')">
              <button
                role="tab"
                type="button"
                :aria-selected="pane === PANE_GAMES"
                @click="onChangePane(PANE_GAMES)"
              >
                {{ t('players.games') }}
              </button>
              <button
                role="tab"
                type="button"
                :aria-selected="pane === PANE_SEASONS"
                @click="onChangePane(PANE_SEASONS)"
              >
                {{ t('players.seasons') }}
              </button>
            </div>
          </nav>

          <Games
            v-if="pane === PANE_GAMES"
            :rows="playerGames"
            :columns="gameColumns"
            :is-loading="isGamesLoading"
            :append-to="tooltipContainer"
            :game-resolver="props.externalGameResolver"
          />

          <Seasons
            v-if="pane === PANE_SEASONS"
            :rows="playerSeasonStats"
            :columns="seasonColumns"
            :append-to="tooltipContainer"
          />

          <div ref="tooltipContainer" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/responsive-table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/table.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/floating-content.css" />

<style src="@mjsz-vbr-elements/shared/css/components/avatar.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/typography.css" />

<style src="@mjsz-vbr-elements/shared/css/components/badge.css" />

<style src="@mjsz-vbr-elements/shared/css/components/hero.css" />

<!-- <style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/grid.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/teams.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/cards.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style> -->

<!-- <style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style> -->
