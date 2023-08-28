import { replace, compose, reject, test, split, mergeRight } from 'ramda';

import { SORT_STATE_DESCEND, SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';

export const PLAYER_STATS_COLUMNS = {
  row: {
    label: 'sor',
    class: 'is-text-left',
    sortOrders: [{ target: 'row', direction: SORT_STATE_ASCEND }],
  },
  number: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
    class: '',
    sortOrders: [{ target: 'number', direction: SORT_STATE_ASCEND }],
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: '',
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },
  position: {
    label: 'position',
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
    class: '',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: '',
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

export function callFunctions() {
  for (const arg of arguments) {
    arg?.();
  }
}

export const convertPeriodName = (name) => replace('. ', '-', name);

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
  const pariodLength = rawPeriodIndex(gameData);
  let periods = {};
  if (gameData.isShootout) {
    periods['Büntetők'] = [];
    periods['Hosszabbítás'] = [];
  }
  if (gameData.isOvertime) {
    periods['Hosszabbítás'] = [];
  }
  for (let i = pariodLength; i > 0; i--) {
    periods[`${i}. harmad`] = [];
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
    dvgTime: `${data[home].dvgTime} / ${data[away].dvgTime}`,
    dvgTimePP1: `${data[home].dvgTimePP1} / ${data[away].dvgTimePP1}`,
    dvgTimePP2: `${data[home].dvgTimePP2} / ${data[away].dvgTimePP2}`,
  };
};

export const buildAdvPercent = (data, { home, away }) => {
  const homeADV = data[home].adv;
  const homePPGF = data[home].ppgf;

  const awayADV = data[away].adv;
  const awayPPGF = data[away].ppgf;

  const homePPPercent = data[home].ppPercent.toFixed(2);
  const awayPPPercent = data[away].ppPercent.toFixed(2);
  return `(${homeADV}/${homePPGF}) <b>${homePPPercent}%</b> / (${awayADV}/${awayPPGF}) <b>${awayPPPercent}%</b>`;
};

export const buildDvgPercent = (data, { home, away }) => {
  const homeDVG = data[home].dvg;
  const homePPGA = data[home].ppga;

  const awayDVG = data[away].dvg;
  const awayPPGA = data[away].ppga;

  const homePKPercent = data[home].pkPercent.toFixed(2);
  const awayPKPercent = data[away].pkPercent.toFixed(2);
  return `(${homePPGA}/${homeDVG}) <b>${homePKPercent}%</b> / (${awayPPGA}/${awayDVG}) <b>${awayPKPercent}%</b>`;
};
