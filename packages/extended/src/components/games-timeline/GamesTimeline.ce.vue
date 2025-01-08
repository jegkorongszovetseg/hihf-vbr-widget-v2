<script setup>
import { computed } from 'vue';
import { isEmpty } from 'ramda';
import { I18NProvider } from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { isAfter, offsetName, format, getLocalTimezone } from '@mjsz-vbr-elements/core/utils';
import Carousel from './Carousel.vue';
import CarouselItem from './CarouselItem.vue';
import Game from './Game.vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { transformGames } from './internal';

const messages = { en, hu };
const timezone = getLocalTimezone();

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  externalGameResolver: {
    type: [String, Function],
    default: '',
  },
});

const {
  state: games,
  isLoading,
} = useServices({
  options: {
    path: '/v2/public-calendar',
    apiKey: props.apiKey,
    params: { seasonId: 217 },
    immediate: true,
  },
  transform: (res) => transformGames(res, props.locale),
  // onError,
});

const initialIndex = computed(() => {
  if (isEmpty(games.value)) return 0;
  return games.value.findIndex((game) => !isAfter(new Date(game.gameDate), new Date(), 'day')) + 1;
});

const convertedGames = computed(() =>
  games.value.map((game) => ({
    ...game,
    gameDateTime: `${format(game.gameDate, 'L LT', timezone, props.locale)} (${offsetName(
      game.gameDate,
      timezone,
      props.locale
    )})`,
  }))
);

function navigateTo(url) {
  console.log('URL', url);
  // window.location.href = url;
}
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <Carousel :initial-index="initialIndex">
      <template v-if="!isLoading">
        <CarouselItem>SLOT Default1</CarouselItem>
        <CarouselItem v-for="element in convertedGames" :key="element.id">
          <Game :game-data="element" @navigate-to="navigateTo" />
        </CarouselItem>
        <CarouselItem>SLOT Default2</CarouselItem>

      </template>
    </Carousel>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.css"></style>
<style src="@mjsz-vbr-elements/shared/css/games-timeline.css"></style>
