import { SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';

export const PLAYERS_COLUMNS = {
  jerseyNr: {
    label: 'table.jerseyNr.short',
    tooltip: 'table.jerseyNr.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'jerseyNr', direction: SORT_STATE_ASCEND }],
  },
  playerPortrait: {
    label: '',
    class: 'is-has-image',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },

  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  position: {
    label: 'table.position.short',
    tooltip: 'table.position.tooltip',
    class: 'is-text-center is-text-light',
    sortOrders: [{ target: 'position', direction: SORT_STATE_ASCEND }],
  },
  nationality: {
    label: 'table.nationality.short',
    tooltip: 'table.nationality.tooltip',
    class: 'is-horizontal-content',
  },
  birthDate: {
    label: 'table.birthDate.short',
    tooltip: 'table.birthDate.tooltip',
    class: 'is-text-left',
    sortOrders: [{ target: 'birthDate', direction: SORT_STATE_ASCEND }],
  },
  birthPlace: {
    label: 'table.birthPlace.short',
    tooltip: 'table.birthPlace.tooltip',
    class: 'is-text-left',
    sortOrders: [{ target: 'birthPlace', direction: SORT_STATE_ASCEND }],
  },
};
