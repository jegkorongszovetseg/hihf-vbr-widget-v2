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

// const limitInDay = 10;
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
  min: null,
  max: null,
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

const filteredGames = computed(() =>
  games.value.filter((game) => isBetween(game.gameDate, datesFilter.value.min, datesFilter.value.max))
);

const convertedGames = computed(() =>
  convert(filteredGames.value)
    .schedule(timezone.value, locale.value)
    .more(0, page.value * limit + limit)
    .groupByDays()
    .value()
);

const firstAndLastDates = computed(() => {
  const gameDates = (games.value || [])
    .filter((game) => !isSame(game.gameDate, new Date('1970-01-01')))
    .map((game) => game.gameDate);
  const firstDate = min(gameDates);
  const lastDate = max(gameDates);
  return { firstDate, lastDate };
});

const isFetchMoreButtonActive = computed(() => [PANEL_GAMES_PLAYED, PANEL_NEXT_GAMES].includes(selectedPanel.value));

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
    const { min, max, id } = gamesFilterMap.get(selectedPanel)(months.value, params.month);
    datesFilter.value = { min, max };
    selectedMonth.value = id;
    params.month = id;
  },
  {
    immediate: true,
  }
);

function changePanel(value) {
  selectedPanel.value = value;
  params.panel = value;
  page.value = 0;
  params.month = null;
}

function setMonth(payload) {
  const { min, max, id } = payload;
  selectedMonth.value = id;
  params.month = id;

  datesFilter.value = {
    min,
    max,
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
      games: convertedGames,
      isFetchMoreButtonActive,
      more,
      setMonth,
      changePanel,
    }"
  />
</template>
