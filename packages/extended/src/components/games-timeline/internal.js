import { fetchVBRData } from '@mjsz-vbr-elements/core/composables';
import { isAfter, isEmpty } from '@mjsz-vbr-elements/core/utils';
import { useAsyncState } from '@vueuse/core';

export const CarouselContext = Symbol('CarouselContext');

// export const transformGames = (games) => [...games].reverse();

export function useGameDataService({ apiKey }) {
  const { execute } = useAsyncState(
    params => fetchVBRData('/v2/game-data', apiKey, params).then(data => ({ ...data, ...params })),
    {},
    {
      immediate: false,
      resetOnExecute: false,
    },
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
    }
    else {
      acc.push(item);
    }
    return acc;
  }, []);
  return merged;
}

export function getInitialIndex(games) {
  if (isEmpty(games))
    return 0;

  const today = new Date();
  const firstGameIndex = games.findIndex(game => !isAfter(new Date(game.gameDate), today, 'day'));

  if (firstGameIndex === -1)
    return games.length;
  if (firstGameIndex === 0 && isAfter(today, new Date(games[0].gameDate), 'day'))
    return 0;

  return firstGameIndex + 1;
}

function createMap(data, key) {
  const createdMap = new Map();
  for (const obj of data) {
    createdMap.set(obj[key], obj);
  }
  return createdMap;
}

export function isPeriodTimeVisible(period) {
  if (period.includes('_int'))
    return false;
  if (['wu', 'pre', 'so', 'end'].includes(period))
    return false;
  return true;
}
