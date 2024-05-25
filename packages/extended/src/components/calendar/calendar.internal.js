import {
  isToday,
  isBefore,
  isAfter,
  currentWeek,
  currentWeekStartEnd,
  addDays,
  subtractDays,
  startOfMonth,
  endOfMonth,
  min,
  max,
  isSame,
  isBetween,
} from '@mjsz-vbr-elements/core';
import { last, head } from 'ramda';

export const PANEL_GAMES_PLAYED = 'gamesPlayed';
export const PANEL_TODAYS_GAMES = 'todaysGames';
export const PANEL_NEXT_GAMES = 'nextGames';
export const PANEL_WEEK_GAMES = 'weekGames';

export const today = '2023-06-20';

export const gamesFilterMap = new Map()
  .set(PANEL_TODAYS_GAMES, () => ({ min: new Date(today), max: new Date(today), month: null }))
  .set(PANEL_WEEK_GAMES, () => ({
    min: currentWeekStartEnd(today).startDate,
    max: currentWeekStartEnd(today).endDate,
    month: null,
  }))
  .set(PANEL_GAMES_PLAYED, (months) => ({ min: last(months)?.min, max: last(months)?.max, month: last(months)?.name }))
  .set(PANEL_NEXT_GAMES, (months) => ({ min: head(months)?.min, max: head(months)?.max, month: head(months)?.name }));

export const monthDatesMap = new Map()
  .set(PANEL_TODAYS_GAMES, () => [])
  .set(PANEL_GAMES_PLAYED, (first, last) => calculateGamePlayedMonths(subtractDays(new Date(today), 1), first, last))
  .set(PANEL_NEXT_GAMES, (first, last) => calculateNextGamesMonths(addDays(new Date(today), 1), first, last))
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
        name: month,
        min: handleMinDates(originalStartDate, currentDate),
        max: handleMaxDates(endDate, currentDate),
      });
    }
  }

  function handleMinDates(date, currentDate) {
    if (direction) {
      return startOfMonth(currentDate);
    }
    return isAfter(startOfMonth(currentDate), date) ? startOfMonth(currentDate) : date;
  }

  function handleMaxDates(endDate, currentDate) {
    if (direction) {
      return isAfter(endOfMonth(currentDate), endDate) ? endDate : endOfMonth(currentDate);
    }
    return endOfMonth(currentDate);
  }

  return months;
}
