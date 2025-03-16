import { useVisibilityChange } from '@mjsz-vbr-elements/core/composables';
import { convertMinToSec } from '@mjsz-vbr-elements/core/utils';
import { useTimeoutPoll } from '@vueuse/core';
import { isEmpty } from 'ramda';
import { computed, ref, shallowRef, unref, watch } from 'vue';
import { callFunctions, rawPeriodIndex } from './internal.js';

const DEAFULT_PERIOD_LENGTH_MIN = 20;
const INTERVAL = 1000 * 10; // 1000 * 30;
const LAZY_INTERVAL = 1000 * 60 * 5;

export function handleServices(options = {}) {
  const { data, services } = options;
  const { getGameData, getGameStats, getEvents, getGameOfficials } = services;

  const interval = shallowRef(LAZY_INTERVAL);

  const isRefreshable = ref(true);

  // const { resume, pause, isActive } = useTimeoutPoll(
  //   () => callFunctions(getGameData, getGameStats, getEvents),
  //   interval,
  //   { immediate: false, immediateCallback: true },
  // );

  const { resume: resumGameData, pause: pauseGameData } = useTimeoutPoll(
    () => getGameData(),
    interval,
    {
      immediate: true,
      // immediateCallback: true,
    },
  );

  const { resume: resumGameOfficials, pause: pauseGameOfficials } = useTimeoutPoll(
    () => getGameOfficials(),
    LAZY_INTERVAL,
    {
      immediate: true,
      immediateCallback: true,
    },
  );

  const { resume: resumeGameEvents, pause: pauseGameEvents, isActive: isGameEventsActive } = useTimeoutPoll(
    () => getEvents(),
    interval,
    {
      immediate: false,
      immediateCallback: true,
    },
  );

  const { resume: resumeGameStats, pause: pauseGameStats, isActive: isGameStatsActive } = useTimeoutPoll(
    () => getGameStats(),
    interval,
    {
      immediate: false,
      immediateCallback: true,
    },
  );

  useVisibilityChange(isRefreshable, () => {
    resumGameData();
    resumGameOfficials();
    resumeGameEvents();
    resumeGameStats();
    getGameData();
  }, () => {
    pauseGameData();
    pauseGameOfficials();
    pauseGameEvents();
    pauseGameStats();
  });

  watch(data, (data) => {
    data.gameStatus = 0;

    if (data.gameStatus === 0) {
      isRefreshable.value = false;
    }

    if (data.gameStatus === 1 && !isGameEventsActive.value && !isGameStatsActive.value) {
      isRefreshable.value = true;
      pauseGameData();
      interval.value = INTERVAL;
      resumGameData();
      resumeGameEvents();
      resumeGameStats();
    }
    if (data.gameStatus > 1) {
      isRefreshable.value = false;
      callFunctions(getGameStats, getEvents);
      pauseGameData();
      pauseGameOfficials();
      pauseGameEvents();
      pauseGameStats();
    }
  });

  getGameData();
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
