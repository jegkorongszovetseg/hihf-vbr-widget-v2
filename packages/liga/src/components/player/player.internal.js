import { reverse, toUpper } from 'ramda';
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
    name: data.nationality.includes('hu') ? `${data.lastname} ${data.firstname}` : `${data.firstname} ${data.lastname}`,
    age: yearToNow(data.birthDate, locale),
    position: toUpper(data.position),
  };
}

export const transformSeasonStats = (data) => rawConvert(reverse(data), teamName);

export const transformGames = (data, state, locale, timezone) =>
  rawConvert(
    sortGames(data),
    gameDateTime(timezone, locale),
    teamResultType(state.teamId),
    gameResult(state.teamId),
    teamOpponent(state.teamId)
  );
