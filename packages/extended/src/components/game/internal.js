import { replace } from 'ramda';

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

export const gamePeriodCount = (gameData) => {
  // R.compose(R.reject(R.test(/-:-/)), R.split(','))('(0:0, -:-, -:-)')
};
