<script setup>
import { computed, ref, shallowRef, toRefs, watch } from 'vue';
import { useUrlSearchParams } from '@vueuse/core';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import {
  convert,
  format,
} from '@mjsz-vbr-elements/core/utils';
import {
  PANEL_GAMES_PLAYED,
  PANEL_TODAYS_GAMES,
  PANEL_NEXT_GAMES,
  gamesFilterMap,
  today,
  getMonthsBetweenDates,
  monthDatesMap,
  transformGames,
} from './calendar.internal';

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

const firstAndLastDates = shallowRef({
  firstGame: new Date(),
  lastGame: new Date(),
});

const datesFilter = shallowRef({
  min: format(new Date(), 'YYYY-MM-DD'),
  max: format(new Date(), 'YYYY-MM-DD'),
});

const {
  state: games,
  isLoading,
  execute: fetchGames,
} = useServices({
  options: {
    path: '/v2/games-calendar',
    apiKey: props.apiKey,
    params: computed(() => ({
      seasonId: props.seasonId,
      firstDate: datesFilter.value.min,
      lastDate: datesFilter.value.max,
    })),
    resetOnExecute: true,
  },
  transform: (data) => transformGames(data, firstAndLastDates),
  // onError,
});

const convertedGames = computed(() =>
  convert(games.value)
    .schedule(timezone.value, locale.value)
    .more(0, page.value * limit + limit)
    .groupByDays()
    .value()
);

const isFetchMoreButtonActive = computed(() => [PANEL_GAMES_PLAYED, PANEL_NEXT_GAMES].includes(selectedPanel.value));

const months = computed(() =>
  getMonthsBetweenDates(
    ...monthDatesMap.get(selectedPanel.value)(firstAndLastDates.value.firstGame, firstAndLastDates.value.lastGame),
    selectedPanel.value === PANEL_GAMES_PLAYED,
    locale.value
  )
);

watch(
  selectedPanel,
  (selectedPanel) => {
    const { min, max, id } = gamesFilterMap.get(selectedPanel)(params.month);
    datesFilter.value = { min: format(min, 'YYYY-MM-DD'), max: format(max, 'YYYY-MM-DD') };
    selectedMonth.value = id;
    fetchGames();
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
  const { min, max, id } = gamesFilterMap.get(selectedPanel.value)(payload.id);
  selectedMonth.value = id;
  params.month = id;

  datesFilter.value = {
    min: format(min, 'YYYY-MM-DD'),
    max: format(max, 'YYYY-MM-DD'),
  };
  page.value = 0;
  fetchGames();
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
