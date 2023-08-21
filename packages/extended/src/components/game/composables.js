import { ref, watch, computed, unref } from 'vue';
import { useAsyncQueue, useTimeoutPoll } from '@vueuse/core';
import { useVisibilityChange } from '@mjsz-vbr-elements/core/composables';
import { convertMinToSec } from '@mjsz-vbr-elements/core/utils';
import { callFunctions, rawPeriodIndex } from './internal.js';

const DEAFULT_PERIOD_LENGTH_MIN = 20;

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

// actualTime: "60:00"
// periodTime: 0
// overtimeLength: 5
export function usePeriodTime(gameData = {}) {
  const periodLengthSec = computed(() => {
    let periodLengthSec = DEAFULT_PERIOD_LENGTH_MIN * 60;
    if (unref(gameData).isOvertime || unref(gameData).isShootout) {
      periodLengthSec = unref(gameData).overtimeLength * 60;
    }
    return periodLengthSec;
  });

  const value = computed(() => {
    const gameDateValue = unref(gameData);
    if (gameDateValue.isOvertime || gameDateValue.isShootout) {
      periodLengthSec.value = gameDateValue.overtimeLength * 60;
    }
    const fromPeriodTime = periodLengthSec.value - gameDateValue.periodTime * 60;

    let periodCount = rawPeriodIndex(unref(gameData)) - 1;
    if (gameDateValue.isOvertime || gameDateValue.isShootout) {
      periodCount++;
    }
    const fromActualTime = convertMinToSec(gameDateValue.actualTime) - periodCount * DEAFULT_PERIOD_LENGTH_MIN * 60;
    return Math.max(fromPeriodTime, fromActualTime);
  });

  return {
    value,
    max: periodLengthSec,
  };
}
