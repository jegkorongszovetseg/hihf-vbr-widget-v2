<script setup>
import { ref } from 'vue';
import { ErrorNotice, I18NProvider, ErrorProvider, LoadingIndicator, Image } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
// import { externalTeamLinkResolver, offsetName } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import Games from './Games.vue';
import Seasons from './Seasons.vue';
import PlayerInfo from './PlayerInfo.vue';
import hu from '../../locales/hu.json';
import en from '../../locales/en.json';

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
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider :locale="locale" v-slot="{ playerData, playerGames, playerSeasonStats, gameColumns, isLoading }">
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

          <!-- <pre>
            {{ playerData }}
          </pre> -->

          <Seasons :rows="playerSeasonStats" :append-to="tooltipContainer" />

          <Games :rows="playerGames" :columns="gameColumns" :append-to="tooltipContainer" />

          <div ref="tooltipContainer" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
