import { nextTick, unref } from 'vue';
import { unrefElement, watchPausable } from '@vueuse/core';
import { propSatisfies, find } from 'ramda';
import { format, isSameOrBefore } from '../utils/datetime';

export const useScrollToGameDate = (options = {}) => {
  const { items = [], element, offset = 0 } = options;

  const condition = (date) => isSameOrBefore(date, 'day');

  const scrollToDatePosition = () => {
    stop();
    const item = find(propSatisfies(condition, 'gameDate'))(unref(items));
    if (!item) return;
    const idDate = format(item.gameDate, 'YYYY-MM-DD');
    const dateElement = unrefElement(element).querySelector(`div[data-gamedate="${idDate}"]`);
    if (!dateElement) return;
    const topOffset = getComputedStyle(dateElement).getPropertyValue('--vbr-widget-sticky-top-offset') || 0;
    const computedOffset = (dateElement.getBoundingClientRect()?.top ?? 0) - unref(offset) - parseFloat(topOffset);
    window.scrollTo(0, computedOffset);
  };

  const { stop } = watchPausable(
    () => ({
      items: unref(items),
      element: unref(element),
    }),
    async ({ items, element }) => {
      if (items.length === 0 || !element) return;
      await nextTick();
      scrollToDatePosition();
    }
  );
};
