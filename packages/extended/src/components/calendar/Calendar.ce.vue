<script setup>
import { useMainClass } from '@mjsz-vbr-elements/core/composables';
import { I18NProvider } from '@mjsz-vbr-elements/core/components';
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

  seasonId: {
    type: String,
    default: '',
  },
});

const tabButtonClasses = useMainClass('tab-button');

function changeTab() {}
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages" #default="{ t }">
    <div>
      <button :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_SCHEDULE }]" @click="changeTab()">
        {{ t('calendar.gamesPlayed') }}
      </button>
      <button :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_SCHEDULE }]" @click="changeTab()">
        {{ t('calendar.todaysGames') }}
      </button>
      <button :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_SCHEDULE }]" @click="changeTab()">
        {{ t('calendar.nextGames') }}
      </button>
      <button :class="[tabButtonClasses, { 'is-active': selectedPanel === PANEL_SCHEDULE }]" @click="changeTab()">
        {{ t('calendar.weekGames') }}
      </button>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/forms.css"></style>
