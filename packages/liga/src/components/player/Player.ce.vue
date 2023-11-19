<script setup>
import { ref } from 'vue';
import { ErrorNotice, I18NProvider, ErrorProvider, LoadingIndicator, Image } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
// import { externalTeamLinkResolver, offsetName } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import Games from './Games.vue';
import Seasons from './Seasons.vue';
import SeasonsStats from './SeasonStats.vue';
import PlayerInfo from './PlayerInfo.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';
import { PANE_GAMES, PANE_SEASONS } from './player.internal';

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

  externalPlayerResolver: {
    type: String,
    default: '',
  },
});

const tooltipContainer = ref(null);

// const externalTeamLink = (teamId) => externalTeamLinkResolver(props.externalPlayerResolver, { teamId });
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages" v-slot="{ t }">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :locale="locale"
          v-slot="{
            pane,
            isLoading,
            playerData,
            playerGames,
            playerSeasonStats,
            currentSeasonStats,
            gameColumns,
            seasonColumns,
            currentSeasonColumns,
            onChangePane,
          }"
        >
          <LoadingIndicator v-if="isLoading" />

          <div :class="useMainClass('main-image-wrapper')" style="--overlay-size: 180px">
            <div class="is-main-image">
              <Image
                :src="playerData.playerAction"
                default-src="https://www.ersteliga.hu/assets/images/logo_liga@2x.png"
              />
            </div>
            <div class="is-ovarlay-image">
              <Image :src="playerData?.player?.picture" :key="playerData.player?.playerId" />
            </div>
          </div>

          <PlayerInfo :data="playerData" />

          <SeasonsStats :rows="currentSeasonStats" :columns="currentSeasonColumns" :append-to="tooltipContainer" />

          <div class="is-mt-5">
            <button
              type="button"
              :class="[useMainClass('tab-button'), { 'is-active': pane === PANE_GAMES }]"
              @click="onChangePane(PANE_GAMES)"
            >
              {{ t('players.games') }}
            </button>
            <button
              type="button"
              :class="[useMainClass('tab-button'), { 'is-active': pane === PANE_SEASONS }]"
              @click="onChangePane(PANE_SEASONS)"
            >
              {{ t('players.seasons') }}
            </button>
          </div>

          <Games
            v-if="pane === PANE_GAMES"
            :rows="playerGames"
            :columns="gameColumns"
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