import { unref, getCurrentInstance, inject } from 'vue';
import { useAsyncState, noop } from '@vueuse/core';
import { fetchVBRData } from './useFetchVBRApi';

export const useServices = ({ options = {}, transform = (v) => v, onError = noop, onSuccess = noop }) => {
  const { path, apiKey, params, resetOnExecute = false, immediate = false } = options;

  const vm = getCurrentInstance();
  console.log(vm);
  console.log(vm.proxy.globalProperties);

  const go = inject('globalOptions', null);
  console.log('go', go);

  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(() => fetchVBRData(path, apiKey, unref(params)).then((response) => transform(response)), [], {
    immediate,
    resetOnExecute,
    onError,
    onSuccess,
  });

  return {
    state: apiState,
    error,
    isLoading,
    execute,
  };
};
