import { groupBy, compose, sortBy, prop } from 'ramda';

export const PAGE_INFO = 'Info';
export const PAGE_GAMES = 'Games';
export const PAGE_PLAYER_STATS = 'Stats';
export const PAGE_ROSTER = 'Roster';

export const COLUMNS_ROSTER = {
  // jerseyNumber: {
  //   label: 'table.blank',
  //   class: 'is-text-left',
  // },
  number: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
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
  firstName: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  nationality: {
    label: 'table.nationality.short',
    tooltip: 'table.nationality.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  birthDate: {
    label: 'table.birthDate.short',
    tooltip: 'table.birthDate.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  birthPlace: {
    label: 'table.birthPlace.short',
    tooltip: 'table.birthPlace.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
};

export const COLUMNS_GAMES = {
  gameDate: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  gameTime: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  result: {
    label: '',
    class: 'is-has-image',
  },
  opponent: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  resultType: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  shot: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
};

export const COLUMNS_TEAM_INFO = {
  teamKey: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamValue: {
    label: 'table.blank',
    class: 'is-text-left',
  },
};

export const COLUMNS_TEAM_INFO_ICERINK = {
  teamKey: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamValue: {
    label: 'table.blank',
    class: 'is-text-left',
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
