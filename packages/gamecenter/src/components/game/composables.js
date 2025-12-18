import { useVisibilityChange } from '@mjsz-vbr-elements/core/composables';
import { convertMinToSec, isEmpty } from '@mjsz-vbr-elements/core/utils';
import { useTimeoutPoll } from '@vueuse/core';
import { computed, ref, unref, watch } from 'vue';
import { callFunctions, rawPeriodIndex } from './internal.js';

const DEAFULT_PERIOD_LENGTH_MIN = 20;
const INTERVAL = 1000 * 30;
const LAZY_INTERVAL = 1000 * 60 * 5;

export function handleServices(options = {}) {
  const { data, services } = options;
  const { getGameData, getGameStats, getEvents, getGameOfficials } = services;

  const isRefreshable = ref(false);

  const { resume, pause, isActive } = useTimeoutPoll(
    () => callFunctions(getGameData, getGameStats, getEvents),
    INTERVAL,
    { immediate: false, immediateCallback: false },
  );

  const { pause: pauseGameData } = useTimeoutPoll(
    () => getGameData(),
    LAZY_INTERVAL,
    {
      immediate: true,
      immediateCallback: true,
    },
  );

  const { pause: pauseGameOfficials } = useTimeoutPoll(
    () => getGameOfficials(),
    LAZY_INTERVAL,
    {
      immediate: true,
      immediateCallback: true,
    },
  );

  useVisibilityChange(isRefreshable, () => {
    resume();
    getGameData();
  }, () => {
    pause();
  });

  watch(data, (data) => {
    if (data.gameStatus === 1 && !isActive.value) {
      isRefreshable.value = true;
      pauseGameData();
      pauseGameOfficials();
      resume();
      getGameStats();
      getEvents();
    }
    if (data.gameStatus > 1) {
      isRefreshable.value = false;
      callFunctions(getGameStats, getEvents);
      pauseGameData();
      pauseGameOfficials();
    }
  });
}

// actualTime: "60:00"
// periodTime: 0
// overtimeLength: 5
export function usePeriodTime(gameData = {}) {
  const periodLength = gameData?.periodLength ?? DEAFULT_PERIOD_LENGTH_MIN;
  const periodLengthSec = computed(() => {
    let periodLengthSec = periodLength * 60;
    if (unref(gameData).isOvertime || unref(gameData).isShootout) {
      periodLengthSec = unref(gameData).overtimeLength * 60;
    }
    return periodLengthSec;
  });

  const value = computed(() => {
    const gameDateValue = unref(gameData);
    const fromPeriodTime = periodLengthSec.value - Number.parseInt(gameDateValue.periodTime, 10) * 60;

    let periodCount = rawPeriodIndex(unref(gameData)) - 1;
    if (gameDateValue.isOvertime || gameDateValue.isShootout) {
      periodCount++;
    }
    const fromActualTime = convertMinToSec(gameDateValue.actualTime) - periodCount * periodLength * 60;
    return Math.max(fromPeriodTime, fromActualTime);
  });

  return {
    value,
    max: periodLengthSec,
  };
}

export function useApiErrors() {
  const errors = ref([]);

  function add(key, message) {
    if (typeof message === 'object' && message !== null) {
      message = message.message;
    }
    errors.value.push({ key, message });
  }

  function remove(key) {
    if (isEmpty(errors.value))
      return;
    const index = errors.value.findIndex(error => error.key === key);
    errors.value.splice(index, 1);
  }

  return {
    errors,
    add,
    remove,
  };
}
