<script setup>
import { ref, computed } from 'vue';
import { ErrorNotice, I18NProvider, ErrorProvider, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import { externalTeamLinkResolver, offsetName } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import Games from './Games.vue';
import Seasons from './Seasons.vue';
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

        <DataProvider :locale="locale" v-slot="{ playerData, playerGames, playerSeasonStats, isLoading }">
          <LoadingIndicator v-if="isLoading" />

          <pre>
            {{ playerData }}
          </pre>
          <!-- <pre>
            {{ playerSeasonStats }}
          </pre> -->
          <Seasons :rows="playerSeasonStats" :append-to="tooltipContainer" />

          <Games :rows="playerGames" :append-to="tooltipContainer" />

          <div ref="tooltipContainer" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
