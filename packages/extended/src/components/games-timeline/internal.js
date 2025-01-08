import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '@mjsz-vbr-elements/core/composables';

export const CarouselContext = Symbol('CarouselContext');

export const transformGames = (games) => [...games].reverse();

export function useGameDataService({ apiKey }) {
  const { execute } = useAsyncState(
    (params) => fetchVBRData('/v2/game-data', apiKey, params),
    {},
    {
      immediate: false,
      resetOnExecute: false,
      // onError,
      // onSuccess,
    }
  );

  return {
    execute,
  };
}
