import { ref, watch } from 'vue';
import { pick, head, last } from 'ramda';
import { isBetween } from '@/utils/datetime';

export const transformSchedule = (games) => {};

export const useCollectMonths = (rows = [], locale = 'hu') => {
  const months = ref([]);
  const selectedMonth = ref(null);

  const collect = () => {
    const filtered = rows.value.reduce((acc, game) => {
      const gameDate = new Date(game.gameDate);
      const key = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(gameDate)?.toLowerCase();
      const month = new Intl.DateTimeFormat(locale.value, { month: 'long' }).format(gameDate);
      if (!acc[key]) acc[key] = { value: gameDate.getMonth(), name: capitalizeFirstLetter(month) };
      return acc;
    }, {});
    months.value = Object.values(filtered);

    const ib = isBetween(new Date(), head(rows.value)?.gameDate, last(rows.value)?.gameDate);
    const currentMonth = new Intl.DateTimeFormat('en-GB', { month: 'long' }).format(new Date())?.toLowerCase();
    const isInRange = pick([currentMonth], filtered);
    selectedMonth.value = isInRange && ib ? new Date().getMonth() : head(months.value)?.value;
  };

  watch([rows, locale], collect);

  return {
    months,
    selectedMonth,
  };
};

function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
