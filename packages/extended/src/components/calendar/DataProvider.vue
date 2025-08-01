<script setup>
import { useError, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, format, isAfter, isBefore } from '@mjsz-vbr-elements/core/utils';
import { useUrlSearchParams } from '@vueuse/core';
import { head, last } from 'ramda';
import { computed, ref, shallowRef, toRefs, watch } from 'vue';
import {
  gamesFilterMap,
  getMonthsBetweenDates,
  monthDatesMap,
  PANEL_GAMES_PLAYED,
  PANEL_NEXT_GAMES,
  PANEL_TODAYS_GAMES,
  today,
  transformGames,
} from './calendar.internal';

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

const limit = 20;

const { timezone, locale } = toRefs(props);

const { onError } = useError();

const params = useUrlSearchParams('history');

const selectedPanel = ref(params.panel || PANEL_TODAYS_GAMES);
const selectedMonth = ref(null);
const page = ref(0);

const firstAndLastDates = shallowRef({
  firstGame: today,
  lastGame: today,
});

const datesFilter = shallowRef({
  min: format(today, 'YYYY-MM-DD'),
  max: format(today, 'YYYY-MM-DD'),
});

const {
  state: games,
  isLoading,
  execute: fetchGames,
} = useServices({
  options: {
    path: '/v2/calendar',
    apiKey: props.apiKey,
    params: computed(() => ({
      seasonId: props.seasonId,
      firstDate: datesFilter.value.min,
      lastDate: datesFilter.value.max,
    })),
    resetOnExecute: true,
  },
  transform: data => transformGames(data, firstAndLastDates),
  onError,
});

const convertedGames = computed(() =>
  convert(games.value)
    .schedule(timezone.value, locale.value)
    .more(0, page.value * limit + limit)
    .groupByDays()
    .value(),
);

const months = computed(() =>
  getMonthsBetweenDates(
    ...monthDatesMap.get(selectedPanel.value)(firstAndLastDates.value.firstGame, firstAndLastDates.value.lastGame),
    selectedPanel.value === PANEL_GAMES_PLAYED,
    locale.value,
  ),
);

watch(
  selectedPanel,
  async (selectedPanel) => {
    const { min, max, id } = gamesFilterMap.get(selectedPanel)(params.month);
    datesFilter.value = { min: format(min, 'YYYY-MM-DD'), max: format(max, 'YYYY-MM-DD') };
    selectedMonth.value = id;
    await fetchGames();
    if (!params.month)
      monthOverwrite();
  },
  {
    immediate: true,
  },
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

function monthOverwrite() {
  if (![PANEL_GAMES_PLAYED, PANEL_NEXT_GAMES].includes(selectedPanel.value))
    return;
  const { firstGame, lastGame } = firstAndLastDates.value;
  if (isBefore(today, firstGame)) {
    const { min, max, id } = gamesFilterMap.get(selectedPanel.value)(head(months.value)?.id);
    datesFilter.value = { min: format(min, 'YYYY-MM-DD'), max: format(max, 'YYYY-MM-DD') };
    selectedMonth.value = id;
    return fetchGames();
  }
  if (isAfter(today, lastGame)) {
    const { min, max, id } = gamesFilterMap.get(selectedPanel.value)(last(months.value)?.id);
    datesFilter.value = { min: format(min, 'YYYY-MM-DD'), max: format(max, 'YYYY-MM-DD') };
    selectedMonth.value = id;
    fetchGames();
  }
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
      more,
      setMonth,
      changePanel,
    }"
  />
</template>
