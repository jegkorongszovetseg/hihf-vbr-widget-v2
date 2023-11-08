import { groupBy, compose, sortBy, filter, pathEq, map, head, omit } from 'ramda';
import { playerName, teamName, upperCase, format } from '@mjsz-vbr-elements/core/utils';

export const PAGE_INFO = 'Info';
export const PAGE_GAMES = 'Games';
export const PAGE_PLAYER_STATS = 'Stats';
export const PAGE_ROSTER = 'Roster';

export const COLUMNS_ROSTER = {
  jerseyNr: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
  },
  playerPortrait: {
    label: '',
    class: 'is-has-image',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  teamName: {
    label: 'table.teamName.short',
    tooltip: 'table.teamName.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  position: {
    label: 'table.position.short',
    tooltip: 'table.position.tooltip',
  },
  nationality: {
    label: 'table.nationality.short',
    tooltip: 'table.nationality.tooltip',
    class: 'is-text-left',
  },
  birthDate: {
    label: 'table.birthDate.short',
    tooltip: 'table.birthDate.tooltip',
    class: 'is-text-left',
  },
  birthPlace: {
    label: 'table.birthPlace.short',
    tooltip: 'table.birthPlace.tooltip',
    class: 'is-text-right',
  },
};

export const COLUMNS_GAMES = {
  gameDateDate: {
    label: 'table.gameDate.short',
    tooltip: 'table.gameDate.tooltip',
    class: 'is-text-left',
  },
  gameDateTime: {
    label: 'table.gameDateTime.short',
    tooltip: 'table.gameDateTime.tooltip',
    class: 'is-text-left',
  },
  gameResult: {
    label: 'table.result.short',
    tooltip: 'table.result.tooltip',
    class: 'is-has-image',
  },
  opponent: {
    label: 'table.opponent.short',
    tooltip: 'table.opponent.tooltip',
    class: 'is-text-left',
  },
  resultType: {
    label: 'table.resultType.short',
    tooltip: 'table.resultType.tooltip',
    class: '',
  },
  sog: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    class: 'is-text-left is-text-bold',
  },
  sa: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
    class: 'is-text-left',
  },
  ppgf: {
    label: 'table.ppgf.short',
    tooltip: 'table.ppgf.tooltip',
    class: 'is-text-left',
  },
  shga: {
    label: 'table.shga.short',
    tooltip: 'table.shga.tooltip',
    class: 'is-text-left',
  },
};

export const COLUMNS_TEAM_INFO = {
  teamKeyIntl: {
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

export const transformTeamInfo = (data) => {
  data = head(data);

  const organizationdData = omit(
    ['team', 'organizationType', 'organizationShortName', 'organizationLogo', 'organizationRepresentatives', 'arenas'],
    data
  );
  const tableData = [];

  for (let [key, value] of Object.entries(organizationdData)) {
    // let val = value;
    if (key === 'organizationFoundingDate') {
      value = format(value, 'YYYY');
    }
    if (key === 'organizationAddresses') {
      value = Object.values(value?.headquarter ?? {}).join(' ');
    }
    tableData.push({ teamKey: key, teamValue: value });
  }
  return { team: data?.team, organizationInfo: tableData };
};

export const transformRosters = (data, teamId) =>
  compose(
    groupBy(groupByPosition),
    sortBy((d) => {
      if (['ld', 'rd'].includes(d.position?.toLowerCase())) return 1;
      if (['lw', 'rw', 'c'].includes(d.position?.toLowerCase())) return 2;
      return 0;
    }),
    sortBy(sortByJerseyNumber),
    map(compose(playerName, teamName, upperCase(['position']))),
    filter(pathEq(Number(teamId), ['team', 'id']))
  )(data);

function groupByPosition(data) {
  if (['ld', 'rd'].includes(data.position?.toLowerCase())) return 'defenders';
  if (['lw', 'rw', 'c'].includes(data.position?.toLowerCase())) return 'forwards';
  return 'goalies';
}

function sortByJerseyNumber(d) {
  return Number(d.jerseyNr);
}
