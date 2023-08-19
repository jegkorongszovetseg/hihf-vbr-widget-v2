import { SORT_STATE_DESCEND, SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';

export const PLAYER_STATS_COLUMNS = {
  row: {
    label: 'sor',
    class: 'is-text-left',
    sortOrders: [{ target: 'row', direction: SORT_STATE_ASCEND }],
  },
  number: {
    label: '#',
    class: '',
    sortOrders: [{ target: 'number', direction: SORT_STATE_ASCEND }],
  },
  name: {
    label: 'name',
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
};

export function callFunctions() {
  for (const arg of arguments) {
    arg?.();
  }
}
