import { ref, unref, watch } from 'vue';
import { refDebounced } from '@vueuse/shared';

export function useLazyLoadingState(task = [], options = {}) {
  const { delay = 0 } = options;

  const baseState = ref(false);

  const getValue = (_task) => {
    if (Array.isArray(_task)) {
      return _task.map((item) => unref(item)).some(Boolean);
    }
    return _task;
  };

  const isLoading = refDebounced(baseState, delay);

  watch(
    task,
    (task) => {
      console.log('task:', task);
      baseState.value = getValue(task);
    },
    { immediate: true, deep: true }
  );

  watch(isLoading, (il) => console.log('IS_LOADING:', il));

  return isLoading;
}
