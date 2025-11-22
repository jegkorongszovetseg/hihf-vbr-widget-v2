import type { Ref } from 'vue';
import { toValue, watchEffect } from 'vue';

export function useLigaCss(enabled: Ref<boolean>) {
  // onMounted(() => document.body.classList.add('liga'));
  // onUnmounted(() => document.body.classList.remove('liga'));

  const addClass = () => document.body.classList.add('liga');
  const removeClass = () => document.body.classList.remove('liga');

  watchEffect(() => {
    if (toValue(enabled))
      return addClass();
    removeClass();
  });
}
