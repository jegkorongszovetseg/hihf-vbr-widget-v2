import {
  convertTimesMinToMinSec,
  gameDateTime,
  gameResult,
  rawConvert,
  sortGames,
  teamName,
  teamOpponent,
  teamResultType,
  yearToNow,
} from '@mjsz-vbr-elements/core/utils';
import { filter, propEq, reject, reverse, toUpper } from 'ramda';

export const PANE_GAMES = 'games';
export const PANE_SEASONS = 'seasons';

export function transformPlayerData(data, locale) {
  return {
    ...data,
    name: data.player.nationality.includes('hu')
      ? `${data.player.lastName} ${data.player.firstName}`
      : `${data.player.firstName} ${data.player.lastName}`,
    age: yearToNow(data.birthDate, locale),
    position: toUpper(data.position),
  };
}

export const transformSeasonStats = data => rawConvert(reverse(data), teamName, convertTimesMinToMinSec(['mip']));

export function removeCurrentFromSeasonStats(championshipId, data) {
  return reject(propEq(championshipId, 'championshipId'))(data);
}

export function transformCurrentSeasonStats(championshipId, data) {
  return filter(propEq(championshipId, 'championshipId'))(data);
}

export function transformGames(data, state, locale, timezone) {
  return rawConvert(sortGames(data), gameDateTime(timezone, locale), teamResultType, gameResult(state.teamId), teamOpponent);
}
