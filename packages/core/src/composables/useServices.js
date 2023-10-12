import { unref } from 'vue';
import { useAsyncState, noop } from '@vueuse/core';
import { fetchVBRData } from './useFetchVBRApi';

export const useServices = ({ options = {}, transform = (v) => v, onError = noop, onSuccess = noop }) => {
  const { path, apiKey, params, resetOnExecute = false } = options;

  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(() => fetchVBRData(path, apiKey, unref(params)).then((response) => transform(response)), [], {
    immediate: false,
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
