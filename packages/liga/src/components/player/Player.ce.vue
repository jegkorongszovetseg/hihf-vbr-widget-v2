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
          <h1 class="is-heading-1 is-uppercase">
            {{ playerData.name }}
          </h1>
          <div class="main-image-wrapper" style="--overlay-size: 180px">
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

          <div class="is-mt-5">
            <button
              type="button"
              class="tab-button" :class="{ 'is-active': pane === PANE_GAMES }"
              @click="onChangePane(PANE_GAMES)"
            >
              {{ t('players.games') }}
            </button>
            <button
              type="button"
              class="tab-button" :class="{ 'is-active': pane === PANE_SEASONS }"
              @click="onChangePane(PANE_SEASONS)"
            >
              {{ t('players.seasons') }}
            </button>
          </div>

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

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/common.scss';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/typography.css';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/forms.css';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/cards.css';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/grid.css';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/teams.css';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/table.css';
</style> -->

<!-- <style lang="scss">
@use '@mjsz-vbr-elements/shared/css/responsive-table.css';
</style> -->

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/typography.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/grid.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/forms.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/teams.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/cards.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/paginator.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/table.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/responsive-table.scss" lang="scss"></style>
