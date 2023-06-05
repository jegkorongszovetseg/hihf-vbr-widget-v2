import { computed, ref, unref, watch } from 'vue';
import { useTimeoutFn } from '@vueuse/core';

export function useLazyLoadingState(task = [], options = {}) {
  const { delay = 0 } = options;

  const isLoding = ref(false);

  const state = computed(() => {
    const _task = unref(task);
    if (Array.isArray(_task)) {
      return _task.map((item) => unref(item)).some(Boolean);
    }
    return _task;
  });

  const { start, stop } = useTimeoutFn(() => {
    isLoding.value = true;
  }, delay);

  watch(
    state,
    (_state) => {
      if (_state) return start();
      stop();
      isLoding.value = false;
    },
    { immediate: true, deep: true }
  );

  return isLoding;
}
