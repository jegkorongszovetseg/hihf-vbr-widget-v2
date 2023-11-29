<script setup>
import {
  ErrorNotice,
  ErrorProvider,
  I18NProvider,
  LoadingIndicator,
  SeasonSelector,
  Image,
} from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
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

  championshipName: {
    type: String,
    default: '',
  },

  externalTeamResolver: {
    type: String,
    default: '',
  },
});

const externalTeamLink = (teamId, championshipId) =>
  externalTeamLinkResolver(props.externalTeamResolver, { team: { id: teamId }, championshipId });
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ error, hasError }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :api-key="props.apiKey"
          :locale="locale"
          :championship-name="championshipName"
          v-slot="{ teams, seasons, isLoading, championshipId, changeSeason }"
        >
          <SeasonSelector
            :seasons="seasons"
            :championship-id="championshipId"
            is-section-selection-disabled
            @on-change-season="changeSeason"
          />

          <LoadingIndicator v-if="isLoading" />

          <ul v-else :class="useMainClass('wrapped-grid')" style="--min-width: 80px; --max-width: 160px">
            <li v-for="team in teams" :key="team.teamId">
              <a :href="externalTeamLink(team.teamId, championshipId)" class="is-text-lg is-text-bold">
                <Image class="is-team-logo" :src="team.teamLogo" :key="team.teamId" />
                {{ team.teamName }}
              </a>
            </li>
          </ul>
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/teams.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
