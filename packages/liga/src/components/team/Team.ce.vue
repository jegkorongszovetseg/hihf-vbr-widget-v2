<script setup>
import { ErrorProvider, ErrorNotice, I18NProvider, Image } from '@mjsz-vbr-elements/core/components';
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import DataProvider from './DataProvider.vue';
import PageInfo from './pages/Info.vue';
import PageRoster from './pages/Roster.vue';
import PageGames from './pages/Games.vue';
import Statistics from './pages/Statistics.vue';
import { PAGE_INFO, PAGE_GAMES, PAGE_PLAYER_STATS, PAGE_ROSTER } from './team.internal.js';

const messages = {};

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
});
</script>

<template>
  <div>
    <I18NProvider :locale="props.locale" :messages="messages">
      <ErrorProvider v-slot:default="{ hasError, error }">
        <ErrorNotice v-if="hasError" :error="error" />

        <DataProvider v-slot:default="{ page, roster, onChangePage }">
          <h1>Team</h1>
          <div :class="useMainClass('team-image-wrapper')">
            <div class="is-team-picture">
              <Image src="https://api.icehockey.hu/static/api/team-photo/21099.jpg" />
            </div>
            <div class="is-team-logo">
              <Image src="https://api.icehockey.hu/static/api/team-logo/21908.png" />
            </div>
          </div>

          <div>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_INFO }]"
              @click="onChangePage(PAGE_INFO)"
            >
              Info
            </button>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_GAMES }]"
              @click="onChangePage(PAGE_GAMES)"
            >
              Mérkőzések
            </button>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_PLAYER_STATS }]"
              @click="onChangePage(PAGE_PLAYER_STATS)"
            >
              Játékos statisztikák
            </button>
            <button
              :class="[useMainClass('tab-button'), { 'is-active': page === PAGE_ROSTER }]"
              @click="onChangePage(PAGE_ROSTER)"
            >
              Játékoskeret
            </button>
          </div>

          <PageInfo v-if="page === PAGE_INFO" />
          <PageGames v-if="page === PAGE_GAMES" />
          <Statistics v-if="page === PAGE_PLAYER_STATS" />
          <PageRoster v-if="page === PAGE_ROSTER" :data="roster" />
        </DataProvider>
      </ErrorProvider>
    </I18NProvider>
  </div>
</template>

<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
<style src="@mjsz-vbr-elements/shared/css/teams.css"></style>
<style src="@mjsz-vbr-elements/shared/css/table.css"></style>
<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/responsive-table.css"></style>
