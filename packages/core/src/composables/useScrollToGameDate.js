import { nextTick, unref } from 'vue';
import { unrefElement, watchOnce } from '@vueuse/core';
import { propSatisfies, find } from 'ramda';
import { format, isSameOrBefore } from '../utils/datetime';

export const useScrollToGameDate = (options = {}) => {
  const { items = [], element, offset = 0 } = options;

  const condition = (date) => {
    return isSameOrBefore(date, 'day');
  };

  const scrollToDatePosition = async () => {
    const item = find(propSatisfies(condition, 'gameDate'))(unref(items));
    if (!item) return;
    const idDate = format(item.gameDate, 'YYYY-MM-DD');
    await nextTick();
    const dateElement = unrefElement(element).querySelector(`div[data-gamedate="${idDate}"]`);
    if (!dateElement) return;
    window.scrollTo(0, dateElement.offsetTop - unref(offset));
  };

  watchOnce(items, scrollToDatePosition);
};
