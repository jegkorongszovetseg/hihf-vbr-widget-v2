import { useEventListener, useTimeoutFn } from '@vueuse/core';
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
    if (check())
      return;
    show();
    start();
  });

  function show() {
    set();
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
