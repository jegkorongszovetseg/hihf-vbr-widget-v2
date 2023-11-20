<script setup>
import { ErrorProvider, ErrorNotice, I18NProvider, Image } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { externalPlayerLinkResolver, externalGameLinkResolver } from '@mjsz-vbr-elements/core/utils';
import DataProvider from './DataProvider.vue';
import PageInfo from './pages/Info.vue';
import PageRoster from './pages/Roster.vue';
import PageGames from './pages/Games.vue';
import Statistics from './pages/Statistics.vue';
import { PAGE_INFO, PAGE_GAMES, PAGE_PLAYER_STATS, PAGE_ROSTER } from './team.internal.js';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';

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

  teamId: {
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

  externalGameResolver: {
    type: String,
    default: '',
  },
});

const externalPlayerLink = (params) => externalPlayerLinkResolver(props.externalPlayerResolver, params);
const externalGameLink = (params) => externalGameLinkResolver(props.externalGameResolver, params);
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages" v-slot="{ t }">
      <ErrorProvider v-slot:default="{ hasError, error }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider
          :championship-id="props.championshipId"
          :team-id="teamId"
          v-slot:default="{
            teamInfo,
            championshipId,
            page,
            roster,
            games,
            statistics,
            fieldPlayers,
            fieldPlayersPenalty,
            onChangePage,
          }"
        >
          <h1 class="is-heading-1 is-uppercase is-mb-5">{{ teamInfo?.team?.longName }}</h1>
          <div :class="useMainClass('main-image-wrapper')" style="--overlay-radius: 0px">
            <div class="is-main-image">
              <Image
                :src="teamInfo?.team?.teamPhoto"
                default-src="https://www.ersteliga.hu/assets/images/logo_liga@2x.png"
              />
            </div>
            <div class="is-ovarlay-image">
              <Image :src="teamInfo?.team?.logo" :key="teamInfo?.team?.id" />
            </div>
          </div>

          <div class="is-mt-5">
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_INFO }]"
              @click="onChangePage(PAGE_INFO)"
            >
              {{ t('teams.tabs.teamInfo') }}
            </button>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_GAMES }]"
              @click="onChangePage(PAGE_GAMES)"
            >
              {{ t('teams.tabs.games') }}
            </button>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_PLAYER_STATS }]"
              @click="onChangePage(PAGE_PLAYER_STATS)"
            >
              {{ t('teams.playerStats') }}
            </button>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_ROSTER }]"
              @click="onChangePage(PAGE_ROSTER)"
            >
              {{ t('teams.roster') }}
            </button>
          </div>

          <PageInfo v-if="page === PAGE_INFO" :data="teamInfo.organizationInfo" />
          <PageGames v-if="page === PAGE_GAMES" :data="games" :game-resolver="externalGameLink" />
          <Statistics
            v-if="page === PAGE_PLAYER_STATS"
            :field-players="statistics.fieldPlayers"
            :goalies="statistics.goalies"
            :championship-id="championshipId"
            :external-player-resolver="externalPlayerLink"
          />
          <PageRoster
            v-if="page === PAGE_ROSTER"
            :data="roster"
            :championship-id="championshipId"
            :external-player-resolver="externalPlayerLink"
          />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/grid.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/teams.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/cards.css"></style>
<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/typography.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
