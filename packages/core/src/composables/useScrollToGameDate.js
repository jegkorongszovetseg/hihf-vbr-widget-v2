import { nextTick, unref } from 'vue';
import { unrefElement, watchOnce } from '@vueuse/core';
import { propSatisfies, find } from 'ramda';
import { format, isSameOrBefore } from '../utils/datetime';

export const useScrollToGameDate = (options = {}) => {
  const { items = [], element } = options;

  // const currentDate = ref(null);

  const condition = (date) => {
    return isSameOrBefore(date, 'day');
  };

  const scrollToDatePosition = async () => {
    const item = find(propSatisfies(condition, 'gameDate'))(unref(items));
    if (!item) return;
    const idDate = format(item.gameDate, 'YYYY-MM-DD');
    // const idDate = '2023-12-30';
    await nextTick();
    console.log(idDate);
    const dateElement = unrefElement(element).querySelector(`div[data-gamedate="${idDate}"]`);
    if (!dateElement) return;
    // console.dir(dateElement);
    window.scrollTo(0, dateElement.offsetTop);
  };

  watchOnce(items, scrollToDatePosition);
};
