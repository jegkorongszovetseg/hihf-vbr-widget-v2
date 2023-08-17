import { ref, watch } from 'vue';
import { useAsyncQueue, useTimeoutPoll } from '@vueuse/core';
import { useVisibilityChange } from '@mjsz-vbr-elements/core/composables';
import { callFunctions } from './internal.js';

export function handleServices(options = {}) {
  const { data, interval, services = [] } = options;

  const isRefreshable = ref(false);

  useAsyncQueue([...services]);

  const { resume, pause, isActive } = useTimeoutPoll(() => callFunctions(...services), interval, { immediate: false });
  useVisibilityChange(isRefreshable, resume, pause);

  watch(data, (data) => {
    if (data.gameStatus <= 1 && !isActive.value) {
      isRefreshable.value = true;
      resume();
    }
    if (data.gameStatus > 1) {
      isRefreshable.value = false;
      pause();
    }
  });

  return {
    pause,
  };
}
