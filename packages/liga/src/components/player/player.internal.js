import { reverse, toUpper, filter, propEq } from 'ramda';
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
