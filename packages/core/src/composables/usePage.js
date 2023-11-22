import { ref, unref } from 'vue';
import { findIndex, propSatisfies } from 'ramda';
import { watchOnce } from '@vueuse/core';
import { isSameOrBefore } from '../utils/datetime';

export const usePage = (options = {}) => {
  const { initial = 1, items = [], limit, auto = false } = options;
  const page = ref(unref(initial));

  const condition = (date) => {
    return isSameOrBefore(date, 'day');
  };

  const calculatePage = () => {
    if (!auto) return;
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
};
