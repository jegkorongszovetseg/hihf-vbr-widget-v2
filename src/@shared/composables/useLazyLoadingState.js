import { refDebounced } from '@vueuse/shared';
import { unref, computed } from 'vue';

export function useLazyLoadingState(task = [], options = {}) {
  const { delay } = options;

  const state = computed(() => task.map((item) => unref(item)).some(Boolean));

  const isLoading = refDebounced(state, delay);

  return isLoading;
}
