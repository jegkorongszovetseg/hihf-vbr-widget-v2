import {
  addDays,
  convertGamePeriodResults,
  currentWeekStartEnd,
  endOfMonth,
  isAfter,
  isBefore,
  rawConvert,
  startOfMonth,
  subtractDays,
} from '@mjsz-vbr-elements/core';

export const PANEL_GAMES_PLAYED = 'gamesPlayed';
export const PANEL_TODAYS_GAMES = 'todaysGames';
export const PANEL_NEXT_GAMES = 'nextGames';
export const PANEL_WEEK_GAMES = 'weekGames';

export function transformGames(games, dateRage) {
  dateRage.value = { firstGame: games.firstGame, lastGame: games.lastGame };
  return rawConvert(games.games, convertGamePeriodResults);
}

// '2024-06-08'
export const today = new Date();

export const gamesFilterMap = new Map()
  .set(PANEL_TODAYS_GAMES, () => ({ min: today, max: today, month: null, id: null }))
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
  .set(PANEL_GAMES_PLAYED, (first, last) => calculateGamePlayedMonths(subtractDays(today, 1), first, last))
  .set(PANEL_NEXT_GAMES, (first, last) => calculateNextGamesMonths(addDays(today, 1), first, last))
  .set(PANEL_WEEK_GAMES, () => []);

function calculateGamePlayedMonths(today, first, last) {
  if (isBefore(today, first))
    return [];
  if (isAfter(today, last))
    return [first, last];
  return [first, today];
}

function calculateNextGamesMonths(today, first, last) {
  if (isBefore(today, first))
    return [first, last];
  if (isAfter(today, last))
    return [];
  return [today, last];
}

export function getMonthsBetweenDates(startDate, endDate, direction, locale = 'hu') {
  // const originalStartDate = startDate;
  // const originalEndDate = endDate;
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
    if (months.findIndex(item => item.name === month) === -1) {
      months.push({
        id: `${currentDate.getFullYear()}-${currentDate.getMonth()}`,
        name: month,
      });
    }
  }

  return months;
}

export function handleMonthParam(monthParam) {
  if (!monthParam)
    return { year: today.getFullYear(), month: today.getMonth() };
  const [year, month] = monthParam.split('-');
  return { year, month };
}

function handleMinDates(date, direction) {
  if (direction) {
    return startOfMonth(date);
  }
  const limitDate = addDays(today, 1);
  return isBefore(startOfMonth(date), limitDate) ? limitDate : startOfMonth(date);
}

function handleMaxDates(date, direction = false) {
  if (direction) {
    const limitDate = subtractDays(today, 1);
    return isAfter(endOfMonth(date), limitDate) ? limitDate : endOfMonth(date);
  }
  return endOfMonth(date);
}
