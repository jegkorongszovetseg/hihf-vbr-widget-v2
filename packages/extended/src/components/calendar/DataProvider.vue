<script setup>
import { computed, ref, shallowRef, toRefs, watch } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  addDays,
  subtractDays,
  isBetween,
  isAfter,
  isBefore,
  min,
  max,
  isSame,
} from '@mjsz-vbr-elements/core/utils';
import {
  PANEL_GAMES_PLAYED,
  PANEL_TODAYS_GAMES,
  PANEL_NEXT_GAMES,
  gamesFilterMap,
  today,
  getMonthsBetweenDates,
  monthDatesMap,
} from './calendar.internal';

const limitInDay = 10;
const limit = 20;

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

const params = useUrlSearchParams('history');

const selectedPanel = ref(params.panel || PANEL_TODAYS_GAMES);
const selectedMonth = ref(null);
const page = ref(0);

const datesFilter = shallowRef({
  min: new Date(today),
  max: new Date(today),
});

const {
  state: games,
  isLoading,
  execute: fetchGames,
} = useServices({
  options: {
    path: '/v2/games-calendar',
    apiKey: props.apiKey,
    params: { seasonId: props.seasonId },
  },
  // transform: (res) => transformSections(res, state),
  // onError,
});

fetchGames();

const sliced = computed(() =>
  games.value
    .filter((game) => isBetween(game.gameDate, datesFilter.value.min, datesFilter.value.max))
    .slice(0, page.value * limit + limit)
);

const convertedGames = computed(() => {
  // const base = selectedPanel.value === PANEL_GAMES_PLAYED ? sliced.value.reverse() : sliced.value;
  let converted = convert(sliced.value).schedule(timezone.value, locale.value).groupByDays().value();
  // if (selectedPanel.value === PANEL_GAMES_PLAYED) {
  //   const rows = Object.keys(converted.rows).reduce((sum, item) => {
  //     sum[item] = converted.rows[item].reverse();
  //     return sum;
  //   }, {});
  //   converted = {
  //     totalItems: converted.totalItems,
  //     rows,
  //   };
  // }
  return converted;
});

const firstAndLastDates = computed(() => {
  const gameDates = (games.value || [])
    .filter((game) => !isSame(game.gameDate, new Date('1970-01-01')))
    .map((game) => game.gameDate);
  const firstDate = min(gameDates);
  const lastDate = max(gameDates);
  return { firstDate, lastDate };
});

const isPaginationVisible = computed(() => [PANEL_GAMES_PLAYED, PANEL_NEXT_GAMES].includes(selectedPanel.value));

const months = computed(() =>
  getMonthsBetweenDates(
    ...monthDatesMap.get(selectedPanel.value)(firstAndLastDates.value.firstDate, firstAndLastDates.value.lastDate),
    selectedPanel.value === PANEL_GAMES_PLAYED,
    locale.value
  )
);

watch(
  [() => selectedPanel.value, () => firstAndLastDates.value],
  ([selectedPanel, firstAndLastDates]) => {
    if (!selectedPanel || !firstAndLastDates.firstDate) return;
    const { min, max, month } = gamesFilterMap.get(selectedPanel)(months.value);
    datesFilter.value = { min, max };
    selectedMonth.value = month;
  },
  {
    immediate: true,
  }
);

function changePanel(value) {
  selectedPanel.value = value;
  params.panel = value;
  page.value = 0;
}

// function next() {
//   const isGamePlayed = selectedPanel.value === PANEL_GAMES_PLAYED;

//   const min = isGamePlayed ? subtractDays(nextAndPrevDates.value.next, limitInDay) : nextAndPrevDates.value.next;
//   const max = isGamePlayed ? nextAndPrevDates.value.next : addDays(nextAndPrevDates.value.next, limitInDay);
//   setDatesFilter(min, max);
//   datesFilter.value = {
//     min,
//     max,
//   };
// }

// function prev() {
//   if (selectedPanel.value === PANEL_GAMES_PLAYED) {
//     datesFilter.value = {
//       min: addDays(nextAndPrevDates.value.prev, limitInDay),
//       max: nextAndPrevDates.value.prev,
//     };
//   }

//   const min = subtractDays(nextAndPrevDates.value.prev, limitInDay);
//   const max = nextAndPrevDates.value.prev;

//   setDatesFilter(min, max);
// }

// function setDatesFilter(min, max) {
//   const isBeforeMin = isBefore(min, new Date(today), 'day');

//   const newMin = isBeforeMin ? addDays(new Date(today), 1) : min;

//   datesFilter.value = {
//     min: newMin,
//     max,
//   };
// }

function setMonth(payload) {
  selectedMonth.value = payload.name;

  datesFilter.value = {
    min: payload.min,
    max: payload.max,
  };
  page.value = 0;
}

function more() {
  page.value += 1;
}
</script>

<template>
  <slot
    v-bind="{
      today,
      months,
      isLoading,
      datesFilter,
      selectedMonth,
      selectedPanel,
      // nextAndPrevDates,
      isPaginationVisible,
      games: convertedGames,
      // next,
      // prev,
      more,
      setMonth,
      changePanel,
    }"
  />
</template>
