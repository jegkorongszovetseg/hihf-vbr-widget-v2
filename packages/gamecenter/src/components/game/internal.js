import { SORT_STATE_ASCEND, SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';

import { convertSecToMin, convertTimesSecToMin, rawConvert } from '@mjsz-vbr-elements/core/utils';
import { compose, mergeLeft, reject, replace, split, test, toUpper } from 'ramda';

export const DEAFULT_LOGO_TEAM_A
  = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzYgMzYiPjxwYXRoIGZpbGw9IiNERDJFNDQiIGQ9Ik0zNiAzMmE0IDQgMCAwIDEtNCA0SDRhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTRoMjhhNCA0IDAgMCAxIDQgNHYyOHoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQuNzQ3IDkuMTI1Yy41MjctMS40MjYgMS43MzYtMi41NzMgMy4zMTctMi41NzNjMS42NDMgMCAyLjc5MiAxLjA4NSAzLjMxOCAyLjU3M2w2LjA3NyAxNi44NjdjLjE4Ni40OTYuMjQ4LjkzMS4yNDggMS4xNDdjMCAxLjIwOS0uOTkyIDIuMDQ2LTIuMTM5IDIuMDQ2Yy0xLjMwMyAwLTEuOTU0LS42ODItMi4yNjQtMS42MTFsLS45MzEtMi45MTVoLTguNjJsLS45MyAyLjg4NGMtLjMxLjk2MS0uOTYxIDEuNjQyLTIuMjMyIDEuNjQyYy0xLjI0IDAtMi4yOTQtLjkzLTIuMjk0LTIuMTdjMC0uNDk2LjE1NS0uODY4LjIxNy0xLjAyM2w2LjIzMy0xNi44Njd6bS4zNCAxMS4yNTZoNS44OTFsLTIuODgzLTguOTkyaC0uMDYybC0yLjk0NiA4Ljk5MnoiLz48L3N2Zz4=';

export const DEAFULT_LOGO_TEAM_B
  = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzYgMzYiPjxwYXRoIGZpbGw9IiNERDJFNDQiIGQ9Ik0zNiAzMmE0IDQgMCAwIDEtNCA0SDRhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTRoMjhhNCA0IDAgMCAxIDQgNHYyOHoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTAuNDk4IDkuMjQ5YzAtMS40ODggMS4wMjMtMi4zMjUgMi40NDktMi4zMjVIMTguOWMzLjIyNCAwIDUuODMgMi4xNyA1LjgzIDUuNDU3YzAgMi4xNy0uOSAzLjYyOC0yLjg4NSA0LjU1OHYuMDYyYzIuNjM3LjM3MiA0LjcxMyAyLjU3MyA0LjcxMyA1LjI3MWMwIDQuMzcyLTIuOTE0IDYuNzI5LTcuMTkzIDYuNzI5aC02LjM4NmMtMS40MjcgMC0yLjQ4MS0uODk5LTIuNDgxLTIuMzU2VjkuMjQ5em00LjY1MSA2LjQxOGgyLjQxOWMxLjUxOSAwIDIuNTExLS44OTkgMi41MTEtMi40NWMwLTEuNDU3LTEuMTQ3LTIuMjAxLTIuNTExLTIuMjAxaC0yLjQxOXY0LjY1MXptMCA5LjI0aDMuNjU5YzEuNjc0IDAgMi45MTUtLjk2MSAyLjkxNS0yLjY5N2MwLTEuNDU4LTEuMTE3LTIuNDUtMy4yODctMi40NWgtMy4yODd2NS4xNDd6Ii8+PC9zdmc+';

export const PLAYER_STATS_COLUMNS = {
  row: {
    label: 'table.row.short',
    tooltip: 'table.row.tooltip',
    sortOrders: [{ target: 'row', direction: SORT_STATE_ASCEND }],
  },
  number: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
    class: 'is-text-italic',
    sortOrders: [{ target: 'number', direction: SORT_STATE_ASCEND }],
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-text-bold',
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },
  cora: {
    label: '',
    tooltip: '',
    class: 'is-text-bold',
  },
  position: {
    label: 'table.position.short',
    tooltip: 'table.position.tooltip',
    class: '',
    sortOrders: [{ target: 'position', direction: SORT_STATE_ASCEND }],
  },
  goal: {
    label: 'table.goals.short',
    tooltip: 'table.goals.tooltip',
    sortOrders: [
      { target: 'goal', direction: SORT_STATE_DESCEND },
      { target: 'assist', direction: SORT_STATE_DESCEND },
    ],
  },
  assist: {
    label: 'table.assists.short',
    tooltip: 'table.assists.tooltip',
    sortOrders: [
      { target: 'assist', direction: SORT_STATE_DESCEND },
      { target: 'goal', direction: SORT_STATE_DESCEND },
    ],
  },
  point: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    sortOrders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
  },
  plusMinus: {
    label: 'table.plusMinus.short',
    tooltip: 'table.plusMinus.tooltip',
    sortOrders: [{ target: 'plusMinus', direction: SORT_STATE_DESCEND }],
  },
  shots: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    sortOrders: [{ target: 'shots', direction: SORT_STATE_DESCEND }],
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
    sortOrders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
  },
  shf: {
    label: 'table.shf.short',
    tooltip: 'table.shf.tooltip',
    sortOrders: [{ target: 'shf', direction: SORT_STATE_DESCEND }],
  },
  toiMin: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
    sortOrders: [{ target: 'toi', direction: SORT_STATE_DESCEND }],
  },
};

export const GOALIES_STATS_COLUMNS = {
  jerseyNumber: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
    class: 'is-text-italic',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-text-bold',
  },
  mipMin: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
  },
  ga: {
    label: 'table.ga.short',
    tooltip: 'table.ga.tooltip',
  },
  gaa: {
    label: 'table.gaa.short',
    tooltip: 'table.gaa.tooltip',
  },
  sog: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
  },
  svs: {
    label: 'table.svs.short',
    tooltip: 'table.svs.tooltip',
  },
  svsPercent: {
    label: 'table.svsPercent.short',
    tooltip: 'table.svsPercent.tooltip',
  },
};

export const TEAM_OFFICIALS_COLUMNS = {
  role: {
    label: 'table.role.short',
    tooltip: 'table.role.tooltip',
    class: 'is-text-left',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-text-bold',
  },
};

export function callFunctions(...args) {
  for (const arg of args) {
    arg?.();
  }
}

export const convertPeriodName = name => replace('. ', '-', name || '');

export function rawPeriodIndex(gameData) {
  const periodResults = gameData?.periodResults ?? '';
  let rawLength = compose(reject(test(/-:-/)), split(','))(periodResults).length;
  if (gameData.isShootout) {
    rawLength = rawLength - 2;
  }
  if (gameData.isOvertime) {
    rawLength = rawLength - 1;
  }
  return rawLength;
}

export function convertPeriodEvents(gameData, gameEvents) {
  const pariodLength = gameData?.actualPeriod ?? rawPeriodIndex(gameData);
  const periods = {};
  if (gameData.isShootout) {
    periods.so = [];
    periods.ot = [];
  }
  if (gameData.isOvertime) {
    periods.ot = [];
  }
  for (let i = pariodLength; i > 0; i--) {
    periods[`p${i}`] = [];
  }
  const events = mergeLeft(gameEvents, periods);

  return events;
}

export function buildSOG(data, home, away, key) {
  const periods = [];
  let homeSum = 0;
  let awaySum = 0;
  for (let i = 0; i < data.length; i++) {
    periods.push(`${data[i][home]?.[key] ?? 0}:${data[i][away]?.[key] ?? 0}`);
    homeSum = homeSum + (data[i][home]?.[key] ?? 0);
    awaySum = awaySum + (data[i][away]?.[key] ?? 0);
  }
  return `(${periods.join(', ')}) ${homeSum}:${awaySum}`;
}

export function buildSaves(data, home, away, key) {
  const periods = [];
  let homeSum = 0;
  let awaySum = 0;
  for (let i = 0; i < data.length; i++) {
    periods.push(`${data[i][home]?.[key] ?? 0}:${data[i][away]?.[key] ?? 0}`);
    homeSum = homeSum + (data[i][home]?.[key] ?? 0);
    awaySum = awaySum + (data[i][away]?.[key] ?? 0);
  }
  return `(${periods.join(', ')}) ${homeSum}:${awaySum}`;
}

export function buildAdv(data) {
  const homeAdvTime = data?.home?.advTime ?? 0;
  const awayAdvTime = data?.away?.advTime ?? 0;
  const homeAdvTimePP1 = data?.home?.advTimePP1 ?? 0;
  const awayAdvTimePP1 = data?.away?.advTimePP1 ?? 0;
  const homeAdvTimePP2 = data?.home?.advTimePP2 ?? 0;
  const awayAdvTimePP2 = data?.away?.advTimePP2 ?? 0;

  return {
    advTime: `${convertSecToMin(homeAdvTime)} / ${convertSecToMin(awayAdvTime)}`,
    advTimePP1: `${convertSecToMin(homeAdvTimePP1)} / ${convertSecToMin(awayAdvTimePP1)}`,
    advTimePP2: `${convertSecToMin(homeAdvTimePP2)} / ${convertSecToMin(awayAdvTimePP2)}`,
  };
}

export function buildAdvPercent(data) {
  const homeADV = data?.home?.adv ?? 0;
  const homePPGF = data?.home?.ppgf ?? 0;

  const awayADV = data?.away?.adv ?? 0;
  const awayPPGF = data?.away?.ppgf ?? 0;

  const homePPPercent = (data?.home?.ppPercent ?? 0).toFixed(2);
  const awayPPPercent = (data?.away?.ppPercent ?? 0).toFixed(2);
  return `(${homeADV}/${homePPGF}) <b>${homePPPercent}%</b> / (${awayADV}/${awayPPGF}) <b>${awayPPPercent}%</b>`;
}

export function buildDvgPercent(data) {
  const homeDVG = data?.home?.dvg ?? 0;
  const homePK = data?.home?.pk ?? 0;

  const awayDVG = data?.away?.dvg ?? 0;
  const awayPK = data?.away?.pk ?? 0;

  const homePKPercent = (data?.home?.pkPercent ?? 0).toFixed(2);
  const awayPKPercent = (data?.away?.pkPercent ?? 0).toFixed(2);
  return `(${homeDVG}/${homePK}) <b>${homePKPercent}%</b> / (${awayDVG}/${awayPK}) <b>${awayPKPercent}%</b>`;
}

export function convertPenaltyCause(event) {
  return {
    ...event,
    penaltyCause: compose(toUpper, replace('_', '-'))(event.penaltyCause),
  };
}

// export function logObject(name, data) {
//   console.log(name);
//   return Object.keys(data).map((key) => console.log(key));
// }

export const convertPlayersTOI = data => rawConvert(data, convertTimesSecToMin(['toi']));
