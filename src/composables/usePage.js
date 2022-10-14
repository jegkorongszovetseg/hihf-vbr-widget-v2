import { ref, unref, watch } from 'vue';
import { findIndex, propSatisfies } from 'ramda';
import { isSameOrBefore } from '../utils/datetime';

export const usePage = ({ initial = 1, items, limit, auto = false }) => {
  const page = ref(initial);

  const condition = (date) => {
    return isSameOrBefore(date, 'day');
  };

  const calculatePage = () => {
    if (!auto) return;
    const index = findIndex(propSatisfies(condition, 'gameDate'))(unref(items));
    page.value = Math.floor(index / limit) + 1;
  };

  watch(items, calculatePage);

  return page;
};
