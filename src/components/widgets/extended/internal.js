import { head } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@/utils/errors';
import { convertSeasons } from './statistics.internal';

export const transformSeasons = (seasons, state) => {
  if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
};
