import { unref } from 'vue';
import { useAsyncState, noop } from '@vueuse/core';
import { fetchVBRData } from './useFetchVBRApi';

export const useServices = ({ options = {}, transform = (v) => v, onError = noop, onSuccess = noop }) => {
  const { path, apiKey, params, resetOnExecute = false, immediate = false } = options;

  const { state, error, isLoading, execute } = useAsyncState(
    () => fetchVBRData(path, apiKey, unref(params)).then((response) => transform(response)),
    [],
    {
      immediate,
      resetOnExecute,
      onError,
      onSuccess,
    }
  );

  return {
    state,
    error,
    isLoading,
    execute,
  };
};
