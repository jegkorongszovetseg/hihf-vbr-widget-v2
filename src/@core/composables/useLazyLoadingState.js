import { refDebounced } from '@vueuse/shared';
import { unref, computed } from 'vue';

export function useLazyLoadingState(task = [], options = {}) {
  const { delay = 0 } = options;

  const state = computed(() => {
    if (Array.isArray(unref(task))) {
      return task.map((item) => unref(item)).some(Boolean);
    }
    return unref(task);
  });

  const isLoading = refDebounced(state, delay);

  return isLoading;
}
