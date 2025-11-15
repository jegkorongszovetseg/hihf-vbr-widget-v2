<script setup>
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  Image,
  LoadingIndicator,
  SeasonSelector,
} from '@mjsz-vbr-elements/core/components';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import DataProvider from './DataProvider.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipName: {
    type: String,
    default: '',
  },

  externalTeamResolver: {
    type: String,
    default: '',
  },
});

const messages = { en, hu };

function externalTeamLink(teamId, championshipId) {
  return externalTeamLinkResolver(props.externalTeamResolver, { team: { id: teamId }, championshipId });
}
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          v-slot="{ teams, seasons, isLoading, championshipId, changeSeason }"
          :api-key="props.apiKey"
          :locale="locale"
          :championship-name="championshipName"
        >
          <SeasonSelector
            :seasons="seasons"
            :championship-id="championshipId"
            is-section-selection-disabled
            @on-change-season="changeSeason"
          />

          <LoadingIndicator v-if="isLoading" />

          <div v-else role="list" class="grid-container" style="--min-width: 80px; --max-width: 160px; --gap: calc(var(--size-16) * 2); --align-items: start;">
            <div v-for="team in teams" :key="team.teamId" role="listitem">
              <a :href="externalTeamLink(team.teamId, championshipId)" class="text-lg font-bold">
                <Image :key="team.teamId" class="is-team-logo" :src="team.teamLogo" />
                <div class="text-center">
                  {{ team.teamName }}
                </div>
              </a>
            </div>
          </div>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/form-field.css" />
