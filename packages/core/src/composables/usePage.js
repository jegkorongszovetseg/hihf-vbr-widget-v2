import { watchOnce } from '@vueuse/core';
import { findIndex, propSatisfies } from 'ramda';
import { ref, unref } from 'vue';
import { isSameOrBefore } from '../utils/datetime';

export function usePage(options = {}) {
  const { initial = 1, items = [], limit, auto = false } = options;
  const page = ref(unref(initial));

  const condition = (date) => {
    return isSameOrBefore(date, 'day');
  };

  const calculatePage = () => {
    if (!auto)
      return;
    const index = findIndex(propSatisfies(condition, 'gameDate'))(unref(items));
    page.value = index === -1 ? 1 : Math.floor(index / limit) + 1;
  };

  watchOnce(items, calculatePage);

  const change = (value) => {
    page.value = value;
  };

  return {
    page,
    change,
  };
}
