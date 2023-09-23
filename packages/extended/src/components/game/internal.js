import { replace, compose, reject, test, split, mergeRight } from 'ramda';

import { SORT_STATE_DESCEND, SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';

export const DEAFULT_LOGO_TEAM_A =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzYgMzYiPjxwYXRoIGZpbGw9IiNERDJFNDQiIGQ9Ik0zNiAzMmE0IDQgMCAwIDEtNCA0SDRhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTRoMjhhNCA0IDAgMCAxIDQgNHYyOHoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTQuNzQ3IDkuMTI1Yy41MjctMS40MjYgMS43MzYtMi41NzMgMy4zMTctMi41NzNjMS42NDMgMCAyLjc5MiAxLjA4NSAzLjMxOCAyLjU3M2w2LjA3NyAxNi44NjdjLjE4Ni40OTYuMjQ4LjkzMS4yNDggMS4xNDdjMCAxLjIwOS0uOTkyIDIuMDQ2LTIuMTM5IDIuMDQ2Yy0xLjMwMyAwLTEuOTU0LS42ODItMi4yNjQtMS42MTFsLS45MzEtMi45MTVoLTguNjJsLS45MyAyLjg4NGMtLjMxLjk2MS0uOTYxIDEuNjQyLTIuMjMyIDEuNjQyYy0xLjI0IDAtMi4yOTQtLjkzLTIuMjk0LTIuMTdjMC0uNDk2LjE1NS0uODY4LjIxNy0xLjAyM2w2LjIzMy0xNi44Njd6bS4zNCAxMS4yNTZoNS44OTFsLTIuODgzLTguOTkyaC0uMDYybC0yLjk0NiA4Ljk5MnoiLz48L3N2Zz4=';

export const DEAFULT_LOGO_TEAM_B =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMzYgMzYiPjxwYXRoIGZpbGw9IiNERDJFNDQiIGQ9Ik0zNiAzMmE0IDQgMCAwIDEtNCA0SDRhNCA0IDAgMCAxLTQtNFY0YTQgNCAwIDAgMSA0LTRoMjhhNCA0IDAgMCAxIDQgNHYyOHoiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMTAuNDk4IDkuMjQ5YzAtMS40ODggMS4wMjMtMi4zMjUgMi40NDktMi4zMjVIMTguOWMzLjIyNCAwIDUuODMgMi4xNyA1LjgzIDUuNDU3YzAgMi4xNy0uOSAzLjYyOC0yLjg4NSA0LjU1OHYuMDYyYzIuNjM3LjM3MiA0LjcxMyAyLjU3MyA0LjcxMyA1LjI3MWMwIDQuMzcyLTIuOTE0IDYuNzI5LTcuMTkzIDYuNzI5aC02LjM4NmMtMS40MjcgMC0yLjQ4MS0uODk5LTIuNDgxLTIuMzU2VjkuMjQ5em00LjY1MSA2LjQxOGgyLjQxOWMxLjUxOSAwIDIuNTExLS44OTkgMi41MTEtMi40NWMwLTEuNDU3LTEuMTQ3LTIuMjAxLTIuNTExLTIuMjAxaC0yLjQxOXY0LjY1MXptMCA5LjI0aDMuNjU5YzEuNjc0IDAgMi45MTUtLjk2MSAyLjkxNS0yLjY5N2MwLTEuNDU4LTEuMTE3LTIuNDUtMy4yODctMi40NWgtMy4yODd2NS4xNDd6Ii8+PC9zdmc+';

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
  shoot: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    sortOrders: [{ target: 'shoot', direction: SORT_STATE_DESCEND }],
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
    sortOrders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
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
  member: {
    label: 'table.teamOfficials.short',
    tooltip: 'table.teamOfficials.tooltip',
    class: 'is-text-left',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-text-bold',
  },
};

export function callFunctions() {
  for (const arg of arguments) {
    arg?.();
  }
}

export const convertPeriodName = (name) => replace('. ', '-', name || '');

export const rawPeriodIndex = (gameData) => {
  const periodResults = gameData?.periodResults ?? '';
  let rawLength = compose(reject(test(/-:-/)), split(','))(periodResults).length;
  if (gameData.isShootout) {
    rawLength = rawLength - 2;
  }
  if (gameData.isOvertime) {
    rawLength = rawLength - 1;
  }
  return rawLength;
};

export const convertPeriodEvents = (gameData, gameEvents) => {
  const pariodLength = gameData?.actualPeriod ?? rawPeriodIndex(gameData);
  let periods = {};
  if (gameData.isShootout) {
    periods['Büntetők'] = [];
    periods['Hosszabbítás'] = [];
  }
  if (gameData.isOvertime) {
    periods['Hosszabbítás'] = [];
  }
  for (let i = pariodLength; i > 0; i--) {
    periods[`${i}. játékrész`] = [];
  }
  const events = mergeRight(periods, gameEvents);
  return events;
};

export const buildSOG = (data, home, away, key) => {
  let periods = [];
  let homeSum = 0;
  let awaySum = 0;
  for (let i = 0; i < data.length; i++) {
    periods.push(`${data[i][home]?.[key] ?? 0}:${data[i][away]?.[key] ?? 0}`);
    homeSum = homeSum + (data[i][home]?.[key] ?? 0);
    awaySum = awaySum + (data[i][away]?.[key] ?? 0);
  }
  return `(${periods.join(', ')}) ${homeSum}:${awaySum}`;
};

export const buildSaves = (data, home, away, key) => {
  let periods = [];
  let homeSum = 0;
  let awaySum = 0;
  for (let i = 0; i < data.length; i++) {
    periods.push(`${data[i][home]?.[key] ?? 0}:${data[i][away]?.[key] ?? 0}`);
    homeSum = homeSum + (data[i][home]?.[key] ?? 0);
    awaySum = awaySum + (data[i][away]?.[key] ?? 0);
  }
  return `(${periods.join(', ')}) ${homeSum}:${awaySum}`;
};

export const buildAdv = (data, { home, away }) => {
  return {
    dvgTime: `${data[home]?.dvgTime ?? 0} / ${data[away]?.dvgTime ?? 0}`,
    dvgTimePP1: `${data[home]?.dvgTimePP1 ?? 0} / ${data[away]?.dvgTimePP1 ?? 0}`,
    dvgTimePP2: `${data[home]?.dvgTimePP2 ?? 0} / ${data[away]?.dvgTimePP2 ?? 0}`,
  };
};

export const buildAdvPercent = (data, { home, away }) => {
  const homeADV = data[home]?.adv ?? 0;
  const homePPGF = data[home]?.ppgf ?? 0;

  const awayADV = data[away]?.adv ?? 0;
  const awayPPGF = data[away]?.ppgf ?? 0;

  const homePPPercent = (data[home]?.ppPercent ?? 0).toFixed(2);
  const awayPPPercent = (data[away]?.ppPercent ?? 0).toFixed(2);
  return `(${homeADV}/${homePPGF}) <b>${homePPPercent}%</b> / (${awayADV}/${awayPPGF}) <b>${awayPPPercent}%</b>`;
};

export const buildDvgPercent = (data, { home, away }) => {
  const homeDVG = data[home]?.dvg ?? 0;
  const homePPGA = data[home]?.ppga ?? 0;

  const awayDVG = data[away]?.dvg ?? 0;
  const awayPPGA = data[away]?.ppga ?? 0;

  const homePKPercent = (data[home]?.pkPercent ?? 0).toFixed(2);
  const awayPKPercent = (data[away]?.pkPercent ?? 0).toFixed(2);
  return `(${homePPGA}/${homeDVG}) <b>${homePKPercent}%</b> / (${awayPPGA}/${awayDVG}) <b>${awayPKPercent}%</b>`;
};

export const convertTeamMembersToRows = (data) => {
  return Object.keys(data).map((member) => ({ member, name: data[member] }));
};
