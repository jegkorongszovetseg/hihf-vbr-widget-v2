<script setup>
import { computed, reactive, ref, shallowRef, toRefs, watch } from 'vue';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, addDays, subtractDays, isBetween } from '@mjsz-vbr-elements/core/utils';
import { PANEL_GAMES_PLAYED, PANEL_TODAYS_GAMES, PANEL_NEXT_GAMES, gamesFilterMap } from './calendar.internal';

const limitInDay = 10;

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  seasonId: {
    type: String,
    required: true,
  },

  apiKey: {
    type: String,
    default: '',
  },

  timezone: {
    type: String,
    default: '',
  },
});
const { timezone, locale } = toRefs(props);

const selectedPanel = ref(PANEL_TODAYS_GAMES);

const datesFilter = shallowRef({
  min: new Date('2024-04-05'),
  max: new Date('2024-04-05'),
});

const { state: games, isLoading, execute: fetchGames } = useServices({
  options: {
    path: '/v2/games-calendar',
    apiKey: props.apiKey,
    params: { seasonId: props.seasonId },
  },
  // transform: (res) => transformSections(res, state),
  // onError,
});

fetchGames();

// const filteredGames = computed(() =>
//   games.value.filter((game) => gamesFilterMap.get(selectedPanel.value)(game.gameDate))
// );

const sliced = computed(() =>
  games.value.filter((game) => isBetween(game.gameDate, datesFilter.value.min, datesFilter.value.max))
);

const convertedGames = computed(() => {
  const base = selectedPanel.value === PANEL_GAMES_PLAYED ? sliced.value.reverse() : sliced.value;
  let converted = convert(base).schedule(timezone.value, locale.value).groupByDays().value();
  console.log(converted);
  if (selectedPanel.value === PANEL_GAMES_PLAYED) {
    // console.log(Object.keys(converted.rows).map((date) => converted.rows[date].reverse()));
    const rows = Object.keys(converted.rows).reduce((sum, item) => {
      sum[item] = converted.rows[item].reverse();
      return sum;
    }, {});
    converted = {
      totalItems: converted.totalItems,
      rows,
    };
  }
  return converted;
});

watch(selectedPanel, (selectedPanel) => {
  datesFilter.value = gamesFilterMap.get(selectedPanel);
});

function changePanel(value) {
  selectedPanel.value = value;
}

function fetchMore() {
  if (selectedPanel.value === PANEL_GAMES_PLAYED) {
    datesFilter.value = {
      min: subtractDays(datesFilter.value.min, limitInDay),
      max: subtractDays(datesFilter.value.max, limitInDay),
    };
  }
  if (selectedPanel.value === PANEL_NEXT_GAMES) {
    datesFilter.value = {
      min: addDays(datesFilter.value.min, limitInDay),
      max: addDays(datesFilter.value.max, limitInDay),
    };
  }
}
</script>

<template>
  <slot v-bind="{ selectedPanel, games: convertedGames, isLoading, changePanel, fetchMore }" />
</template>
