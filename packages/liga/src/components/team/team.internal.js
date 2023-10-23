import { groupBy, compose, sortBy, prop } from 'ramda';

export const PAGE_INFO = 'Info';
export const PAGE_GAMES = 'Games';
export const PAGE_PLAYER_STATS = 'Stats';
export const PAGE_ROSTER = 'Roster';

export const COLUMNS_ROSTER = {
  jerseyNumber: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  number: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  playerPortrait: {
    label: '',
    class: 'is-has-image',
  },
  lastName: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  nationality: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  born: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
};

export const transformRosters = compose(
  groupBy(groupByPosition),
  sortBy((d) => {
    if (['ld', 'rd'].includes(d.position)) return 1;
    if (['lw', 'rw', 'c'].includes(d.position)) return 2;
    return 0;
  }),
  sortBy(sortByJerseyNumber)
);

function groupByPosition(data) {
  if (['ld', 'rd'].includes(data.position)) return 'defenders';
  if (['lw', 'rw', 'c'].includes(data.position)) return 'forwards';
  return 'goalies';
}

function sortByJerseyNumber(d) {
  return Number(d.number);
}
