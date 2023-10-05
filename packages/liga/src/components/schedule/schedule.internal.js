import { ref, watch } from 'vue';
import { noop, watchOnce } from '@vueuse/core';
import { pick, head, last } from 'ramda';
import { isBetween } from '@mjsz-vbr-elements/core/utils';

export const useCollectMonths = (rows = [], locale = 'hu', onUpdated = noop) => {
  const months = ref([]);
  const selectedMonth = ref(null);
  const filtered = ref([]);

  const collect = () => {
    filtered.value = rows.value.reduce((acc, game) => {
      const gameDate = new Date(game.gameDate);
      const key = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(gameDate)?.toLowerCase();
      const month = new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(gameDate);
      if (!acc[key]) acc[key] = { value: gameDate.getMonth(), name: capitalizeFirstLetter(month) };
      return acc;
    }, {});
    months.value = Object.values(filtered.value);
  };

  const setCurrentMonth = () => {
    const ib = isBetween(new Date(), head(rows.value)?.gameDate, last(rows.value)?.gameDate);
    const currentMonth = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(new Date())?.toLowerCase();
    const isInRange = pick([currentMonth], filtered.value);
    selectedMonth.value = isInRange && ib ? new Date().getMonth() : head(months.value)?.value;
    onUpdated(selectedMonth.value);
  };

  watch([rows, locale], collect);
  watchOnce(rows, () => {
    collect();
    setCurrentMonth();
  });

  return {
    months,
    selectedMonth,
  };
};

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
