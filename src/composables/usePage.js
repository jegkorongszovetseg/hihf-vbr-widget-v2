import { ref, unref, watch } from 'vue';
import { findIndex, propSatisfies } from 'ramda';
import { isSameOrBefore } from '../utils/datetime';

export const usePage = (options = {}) => {
  const { initial = 1, items = [], limit, auto = false } = options;
  const page = ref(initial);

  const condition = (date) => {
    return isSameOrBefore(date, 'day');
  };

  const calculatePage = () => {
    if (!auto) return;
    const index = findIndex(propSatisfies(condition, 'gameDate'))(unref(items));
    page.value = index === -1 ? 1 : Math.floor(index / limit) + 1;
  };

  watch(items, calculatePage);

  const change = (value) => {
    page.value = value;
  };

  return {
    page,
    change,
  };
};
