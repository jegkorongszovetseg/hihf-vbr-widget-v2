import type { Ref } from 'vue';
import { toValue, watchEffect } from 'vue';

export function useIcehockeyClasses(enabled: Ref<boolean>) {
  const addClass = () => window?.document.querySelector('html').classList.add('icehockey');
  const removeClass = () => window?.document.querySelector('html').classList.remove('icehockey');

  watchEffect(() => {
    if (toValue(enabled))
      return addClass();
    removeClass();
  });
}

// window?.document.querySelector('html')
