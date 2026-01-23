import { isAfter } from '@mjsz-vbr-elements/core/utils';
import { noop, useEventListener, useIntersectionObserver, useTimeoutFn } from '@vueuse/core';
import { unref, watch } from 'vue';

export function usePopover(dialogRef, timeout = 30000, {
  check,
  set,
}) {
  const { start, stop } = useTimeoutFn(hide, timeout, { immediate: false });

  useEventListener(dialogRef, 'click', (event) => {
    if (event.target === unref(dialogRef))
      hide();
  });

  watch(dialogRef, (reference) => {
    if (!reference)
      return;
    if (check?.())
      return;
    show();
    start();
  });

  function show() {
    set?.();
    unref(dialogRef).showModal();
  }

  function hide() {
    unref(dialogRef).close();
    stop();
  }

  return {
    hide,
  };
}

export function useImpression(target, { minVisibleRatio = 0.5, minVisibleTime = 1000, fetch = noop }) {
  let hasTracked = false;

  const { stop } = useIntersectionObserver(
    target,
    onIntersectionObserver,
    {
      threshold: [0, minVisibleRatio, 1],
    },
  );

  const { isPending, start: startTimer, stop: stopTimer } = useTimeoutFn(() => {
    hasTracked = true;
    stop();
    fetch();
  }, minVisibleTime, {
    immediate: false,
  });

  function onIntersectionObserver([entry]) {
    // console.log(entry);
    if (entry.intersectionRatio >= minVisibleRatio) {
      if (hasTracked)
        return;
      if (!isPending.value) {
        startTimer();
      }
    }
    else {
      stopTimer();
    }
  }
}

export function validateEndDateTime(date) {
  return isAfter(new Date(), new Date(date), 'minute');
}
