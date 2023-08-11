import { ref, watch } from 'vue';
import { useTimeoutPoll } from '@vueuse/core';
import { useVisibilityChange } from '@mjsz-vbr-elements/core/composables';
import { callFunctions } from './internal.js';

export function handleServices(options = {}) {
  const { data, interval, services = [] } = options;

  const isRefreshable = ref(true);

  const { resume, pause } = useTimeoutPoll(() => callFunctions(...services), interval, { immediate: true });
  useVisibilityChange(isRefreshable, resume, pause);

  watch(data, (data) => {
    if (data.gameStatus === 'Végeredmény') {
      isRefreshable.value = false;
      pause();
    }
  });

  return {
    pause,
  };
}
