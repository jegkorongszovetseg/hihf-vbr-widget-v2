<script setup>
import { I18NProvider } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import Carousel from './Carousel.vue';
import Game from './Game.vue';
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
});

const {
  state,
  isLoading: seasonsLoading,
  execute: fetchSeasons,
} = useServices({
  options: {
    path: '/v2/public-calendar',
    apiKey: props.apiKey,
    params: { seasonId: 217 },
  },
  // transform: (res) => transformSeasons(res, state),
  // onError,
});

fetchSeasons();
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <Carousel :elements="state" #default="{ element }">
      <Game :game-data="element" />
    </Carousel>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/games-timeline.css"></style>
