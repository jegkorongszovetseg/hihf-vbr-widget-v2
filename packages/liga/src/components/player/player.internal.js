import { reverse, toUpper, filter, propEq, reject } from 'ramda';
import {
  rawConvert,
  sortGames,
  gameDateTime,
  teamResultType,
  gameResult,
  teamOpponent,
  teamName,
  yearToNow,
} from '@mjsz-vbr-elements/core/utils';

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

export const transformSeasonStats = (data) => rawConvert(reverse(data), teamName);

export const removeCurrentFromSeasonStats = (championshipId, data) =>
  reject(propEq(championshipId, 'championshipId'))(data);

export const transformCurrentSeasonStats = (championshipId, data) =>
  filter(propEq(championshipId, 'championshipId'))(data);

export const transformGames = (data, state, locale, timezone) =>
  rawConvert(
    sortGames(data),
    gameDateTime(timezone, locale),
    teamResultType(state.teamId),
    gameResult(state.teamId),
    teamOpponent(state.teamId)
  );
