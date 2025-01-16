import { noop, useDocumentVisibility } from '@vueuse/core';
import { unref, watch } from 'vue';

export function useVisibilityChange(enabled = false, onVisible = noop, onHidden = noop) {
  const visibility = useDocumentVisibility();
  watch(visibility, (visible) => {
    if (!unref(enabled))
      return;
    if (visible === 'visible')
      return onVisible();
    onHidden();
  });
}
