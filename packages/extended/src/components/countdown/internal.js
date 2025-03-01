import { noop, useIntervalFn } from '@vueuse/core';
import { ref, shallowRef, toValue, watch } from 'vue';

export function countdown(_targetDate, onFinished = noop) {
  const date = ref({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });
  const finished = shallowRef(false);

  const targetDate = shallowRef(null);

  const { pause, resume } = useIntervalFn(() => {
    const now = new Date().getTime();
    let distance = targetDate.value - now;
    if (distance <= 0) {
      pause();
      distance = 0;
      finished.value = true;
      onFinished();
    }
    date.value = splitDate(distance);
  }, 1000, { immediate: false, immediateCallback: true });

  watch(() => toValue(_targetDate), (_targetDate) => {
    targetDate.value = new Date(_targetDate).getTime();
    resume();
  }, { immediate: false });

  return { date, finished };
}

export function splitDate(distance) {
  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0'),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0'),
    seconds: Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0'),
  };
}
