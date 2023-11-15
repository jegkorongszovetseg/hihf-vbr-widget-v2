import { pipe, prop, head } from 'ramda';

export function transformAllSeason(data, state) {
  state.seasonsList = data;
  state.seasonId = pipe(head, prop('id'))(data);
}

export function transformSeasons(data, state) {
  state.championshipList = data;
  state.championshipId = pipe(head, prop('championshipId'))(data);
}
