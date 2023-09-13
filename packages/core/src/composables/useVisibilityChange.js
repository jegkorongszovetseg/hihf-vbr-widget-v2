import { watch, unref } from 'vue';
import { useDocumentVisibility, noop } from '@vueuse/core';

export function useVisibilityChange(enabled = false, onVisible = noop, onHidden = noop) {
  const visibility = useDocumentVisibility();
  watch(visibility, (visible) => {
    if (!unref(enabled)) return;
    if (visible === 'visible') return onVisible();
    onHidden();
  });
}
