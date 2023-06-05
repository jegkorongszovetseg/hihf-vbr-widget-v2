import { watch, unref } from 'vue';
import { useDocumentVisibility, noop } from '@vueuse/core';

export function useVisibilityChange(enabled = false, onVisible = noop, onHidden = noop) {
  if (!unref(enabled)) return;
  const visibility = useDocumentVisibility();
  watch(visibility, (visible) => {
    if (visible === 'visible') return onVisible();
    onHidden();
  });
}
