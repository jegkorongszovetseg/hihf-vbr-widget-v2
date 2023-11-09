<script setup>
import { ref } from 'vue';
import { ErrorNotice, I18NProvider, ErrorProvider, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
// import PlayersDataTable from '../common/PlayersDataTable.vue';
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

        <DataProvider
          :locale="locale"
          :championship-name="championshipName"
          :limit="limit"
          v-slot="{ playerData, playerGames, isLoading }"
        >
          <LoadingIndicator v-if="isLoading" />

          <pre>
            {{ playerData }}
          </pre>
          <pre>
            {{ playerGames }}
          </pre>

          <div ref="tooltipContainer" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>
