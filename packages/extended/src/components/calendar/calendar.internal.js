import {
  isBefore,
  isAfter,
  currentWeekStartEnd,
  addDays,
  subtractDays,
  startOfMonth,
  endOfMonth,
  rawConvert,
  convertGamePeriodResults,
} from '@mjsz-vbr-elements/core';
import { last, head } from 'ramda';

export const PANEL_GAMES_PLAYED = 'gamesPlayed';
export const PANEL_TODAYS_GAMES = 'todaysGames';
export const PANEL_NEXT_GAMES = 'nextGames';
export const PANEL_WEEK_GAMES = 'weekGames';

export const transformGames = (games, dateRage) => {
  dateRage.value = { firstGame: games.firstGame, lastGame: games.lastGame };
  return rawConvert(games.games, convertGamePeriodResults);
};

export const today = '2024-03-16';

export const gamesFilterMap = new Map()
  .set(PANEL_TODAYS_GAMES, () => ({ min: new Date(), max: new Date(), month: null, id: null }))
  .set(PANEL_WEEK_GAMES, () => ({
    min: currentWeekStartEnd().startDate,
    max: currentWeekStartEnd().endDate,
    month: null,
    id: null,
  }))
  .set(PANEL_GAMES_PLAYED, (paramsMonth = null) => {
    const { year, month } = handleMonthParam(paramsMonth);
    return {
      min: handleMinDates(new Date(year, month, 1), true),
      max: handleMaxDates(new Date(year, month, 1), true),
      id: `${year}-${month}`,
    };
  })
  .set(PANEL_NEXT_GAMES, (paramsMonth = null) => {
    const { year, month } = handleMonthParam(paramsMonth);
    return {
      min: handleMinDates(new Date(year, month, 1)),
      max: handleMaxDates(new Date(year, month, 1)),
      id: `${year}-${month}`,
    };
  });

export const monthDatesMap = new Map()
  .set(PANEL_TODAYS_GAMES, () => [])
  .set(PANEL_GAMES_PLAYED, (first, last) => calculateGamePlayedMonths(subtractDays(new Date(), 1), first, last))
  .set(PANEL_NEXT_GAMES, (first, last) => calculateNextGamesMonths(addDays(new Date(), 1), first, last))
  .set(PANEL_WEEK_GAMES, () => []);

function calculateGamePlayedMonths(today, first, last) {
  if (isBefore(today, first)) return [];
  if (isAfter(today, last)) return [first, last];
  return [first, today];
}

function calculateNextGamesMonths(today, first, last) {
  if (isBefore(today, first)) return [first, last];
  if (isAfter(today, last)) return [];
  return [today, last];
}

export function getMonthsBetweenDates(startDate, endDate, direction, locale = 'hu') {
  const originalStartDate = startDate;
  const originalEndDate = endDate;
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const months = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    const month = currentDate.toLocaleString(locale, { month: 'short' });
    setMonthObject(month);
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  // Ha az utolsó hónap az endDate hónapja, de még nem került bele a listába
  if (currentDate.getMonth() === endDate.getMonth()) {
    const lastMonth = endDate.toLocaleString(locale, { month: 'short' });
    setMonthObject(lastMonth);
  }

  function setMonthObject(month) {
    if (months.findIndex((item) => item.name === month) === -1) {
      months.push({
        id: `${currentDate.getFullYear()}-${currentDate.getMonth()}`,
        name: month,
      });
    }
  }

  return months;
}

function handleMonthParam(monthParam) {
  if (!monthParam) return { year: new Date().getFullYear(), month: new Date().getMonth() };
  const [year, month] = monthParam.split('-');
  return { year, month };
}

function handleMinDates(date, direction) {
  if (direction) {
    return startOfMonth(date);
  }
  const limitDate = addDays(new Date(), 1);
  return isBefore(startOfMonth(date), limitDate) ? limitDate : startOfMonth(date);
}

function handleMaxDates(date, direction = false) {
  if (direction) {
    const limitDate = subtractDays(new Date(), 1);
    return isAfter(endOfMonth(date), limitDate) ? limitDate : endOfMonth(date);
  }
  return endOfMonth(date);
}
