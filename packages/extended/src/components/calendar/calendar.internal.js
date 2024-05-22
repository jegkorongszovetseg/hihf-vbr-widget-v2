import {
  isToday,
  isBefore,
  isAfter,
  currentWeek,
  currentWeekStartEnd,
  addDays,
  subtractDays,
} from '@mjsz-vbr-elements/core';

export const PANEL_GAMES_PLAYED = 'gamesPlayed';
export const PANEL_TODAYS_GAMES = 'todaysGames';
export const PANEL_NEXT_GAMES = 'nextGames';
export const PANEL_WEEK_GAMES = 'weekGames';

// const todaysGamesFilter = (date) => {
//   return isToday(date);
// };

// const gamesPlayedFilter = (date) => {
//   return isBefore(date, new Date());
// };

// const nextGamesFilter = (date) => {
//   return isAfter(date, new Date());
// };

// const weekGamesFilter = (date) => {
//   return currentWeek(date);
// };

const today = '2024-04-05';

export const gamesFilterMap = new Map()
  .set(PANEL_TODAYS_GAMES, { min: new Date(today), max: new Date(today) })
  .set(PANEL_GAMES_PLAYED, { min: subtractDays(new Date(today), 1), max: subtractDays(new Date(today), 10) })
  .set(PANEL_NEXT_GAMES, { min: addDays(new Date(today), 1), max: addDays(new Date(today), 10) })
  .set(PANEL_WEEK_GAMES, { min: currentWeekStartEnd(today).startDate, max: currentWeekStartEnd(today).endDate });

// export const gamesFilterMap = new Map()
//   .set(PANEL_TODAYS_GAMES, todaysGamesFilter)
//   .set(PANEL_GAMES_PLAYED, gamesPlayedFilter)
//   .set(PANEL_NEXT_GAMES, nextGamesFilter)
//   .set(PANEL_WEEK_GAMES, weekGamesFilter);
