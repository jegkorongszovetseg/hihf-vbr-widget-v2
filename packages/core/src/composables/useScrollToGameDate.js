import { unrefElement, watchPausable } from '@vueuse/core';
import { find, propSatisfies } from 'ramda';
import { nextTick, unref } from 'vue';
import { format, isSameOrBefore } from '../utils/datetime';

export function useScrollToGameDate(options = {}) {
  const { items = [], element, offset = 0, enabled = true } = options;

  const condition = date => isSameOrBefore(date, 'day');

  const scrollToDatePosition = () => {
    // stop();
    if (!unref(enabled))
      return;
    const item = find(propSatisfies(condition, 'gameDate'))(unref(items));
    if (!item)
      return;
    const idDate = format(item.gameDate, 'YYYY-MM-DD');
    const dateElement = unrefElement(element).querySelector(`div[data-gamedate="${idDate}"]`);
    if (!dateElement)
      return;
    const topOffset = getComputedStyle(dateElement).getPropertyValue('--mvw-sticky-top-offset') || 0;
    const computedOffset
      = (dateElement.getBoundingClientRect()?.top ?? 0) - unref(offset) - Number.parseFloat(topOffset);
    window.scrollTo(0, computedOffset);
  };

  watchPausable(
    () => ({
      items: unref(items),
      element: unref(element),
    }),
    async ({ items, element }) => {
      if (items.length === 0 || !element)
        return;
      await nextTick();
      scrollToDatePosition();
    },
  );
}
