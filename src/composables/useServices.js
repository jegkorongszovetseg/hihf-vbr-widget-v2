import { unref } from 'vue';
import { useAsyncState, noop } from '@vueuse/core';
import { head } from 'ramda';
import { fetchVBRData } from './useFetchVBRApi';
import { convertTeams } from '@/components/widgets/extended/statistics/statistics.internal';

export const useServices = ({ options = {}, transform = noop, onError = noop }) => {
  const { path, apiKey, params } = options;

  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(() => fetchVBRData(path, apiKey, unref(params)).then((response) => transform(response)), [], {
    immediate: false,
    onError,
  });

  return {
    state: apiState,
    error,
    isLoading,
    execute,
  };
};

export const useTeams = ({ apiKey = '', state, onError = noop }) => {
  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(
    () =>
      fetchVBRData('/v1/championshipTeams', apiKey, {
        championshipId: state.championshipId,
      }).then((teams) => {
        state.teams = convertTeams(teams);
      }),
    [],
    {
      immediate: false,
      onError,
    }
  );

  return {
    state: apiState,
    error,
    isLoading,
    execute,
  };
};
