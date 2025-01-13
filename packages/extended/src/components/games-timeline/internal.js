import { useAsyncState } from '@vueuse/core';
import { fetchVBRData } from '@mjsz-vbr-elements/core/composables';

export const CarouselContext = Symbol('CarouselContext');

// export const transformGames = (games) => [...games].reverse();

export function useGameDataService({ apiKey }) {
  const { execute } = useAsyncState(
    (params) => fetchVBRData('/v2/game-data', apiKey, params).then((data) => ({ ...data, ...params })),
    {},
    {
      immediate: false,
      resetOnExecute: false,
    }
  );

  return {
    execute,
  };
}

export function mergeGames(income, base, key) {
  const baseMap = createMap(base, key);

  const merged = income.reduce((acc, item) => {
    if (baseMap.has(item.id)) {
      acc.push({ ...baseMap.get(item.id), ...item });
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
  return merged;
}

function createMap(data, key) {
  const createdMap = new Map();
  for (const obj of data) {
    createdMap.set(obj[key], obj);
  }
  return createdMap;
}

export function isPeriodTimeVisible(period) {
  if (period.includes('_int')) return false;
  if (['wu', 'pre', 'so', 'end'].includes(period)) return false;
  return true;
}
