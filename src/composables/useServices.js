import { useAsyncState, noop } from '@vueuse/core';
import { head } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@/utils/errors';
import { fetchVBRData } from './useFetchVBRApi';
import { convertSeasons, convertTeams } from '@/components/widgets/extended/statistics.internal';

export const useServices = ({ options = {}, transform = noop, onError = noop }) => {
  const { path, apiKey, params } = options;
  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(() => fetchVBRData(path, apiKey, params).then((response) => transform(response)), [], {
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

export const useSeasons = ({ apiKey = '', state, onError = noop }) => {
  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(
    () =>
      fetchVBRData('/v1/championshipSeasons', apiKey, {
        championshipName: state.championshipName,
      }).then((seasons) => {
        if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
        state.seasons = convertSeasons(seasons);
        if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
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

export const useSection = ({ apiKey = '', state, onError = noop }) => {
  const {
    state: apiState,
    error,
    isLoading,
    execute,
  } = useAsyncState(
    () =>
      fetchVBRData('/v1/championshipSections', apiKey, {
        championshipId: state.championshipId,
      }).then((sections) => {
        state.sections = sections.sectionName;
        if (state.sections && !state.sections.includes(state.section)) {
          state.section = head(state.sections);
        }
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
