import { format, localeSort, playerName, teamName, upperCase } from '@mjsz-vbr-elements/core/utils';
import {
  compose,
  filter,
  groupBy,
  indexBy,
  innerJoin,
  join,
  lensProp,
  map,
  mergeLeft,
  mergeWith,
  omit,
  over,
  path,
  pathEq,
  pipe,
  reject,
  replace,
  sortBy,
  values,
} from 'ramda';

export const PAGE_INFO = 'Info';
export const PAGE_GAMES = 'Games';
export const PAGE_PLAYER_STATS = 'Stats';
export const PAGE_ROSTER = 'Roster';

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

export function transformTeamInfo(data) {
  const organizationdData = omit(
    ['team', 'organizationType', 'organizationShortName', 'organizationLogo', 'organizationRepresentatives', 'arenas'],
    data,
  );
  const tableData = [];

  for (let [key, value] of Object.entries(organizationdData)) {
    if (key === 'organizationFoundingDate') {
      value = format(value, 'YYYY');
    }
    if (key === 'organizationAddresses') {
      value = convertAddress(value?.headquarter ?? {});
    }
    tableData.push({ teamKey: key, teamValue: value });
  }
  return { team: data?.team, organizationInfo: tableData };
}

export function transformRosters(data) {
  return compose(
    groupBy(groupByPosition),
    sortBy((d) => {
      if (['ld', 'rd', 'd'].includes(d.position?.toLowerCase()))
        return 1;
      if (['lw', 'rw', 'c'].includes(d.position?.toLowerCase()))
        return 2;
      return 0;
    }),
    sortBy(sortByJerseyNumber),
    map(compose(playerName, teamName, upperCase(['position']))),
  )(data);
}

export function transformFieledPlayersStats(row, teamId) {
  return pipe(filter(pathEq(teamId, ['team', 'id'])), map(playerName))(row);
}

export function mergeArrayByTeamId(a, b) {
  return values(mergeWith(mergeLeft, indexBy(path(['player', 'playerId']), a), indexBy(path(['player', 'playerId']), b)));
}

export function mergePlayerStats({ goalieStats, fieldPlayers, playersPenalty }) {
  const goaliesIds = map(path(['player', 'playerId']))(goalieStats);
  const rejectGoalies = r => goaliesIds.includes(r.player.playerId);
  const withoutGoalies = reject(rejectGoalies)(playersPenalty);
  const onlyGoalies = innerJoin((record, id) => record.player.playerId === id, playersPenalty, goaliesIds);

  const mergedFieldPlayers = mergeArrayByTeamId(fieldPlayers, withoutGoalies);
  const mergedGoalies = mergeArrayByTeamId(goalieStats, onlyGoalies);
  return {
    fieldPlayers: localeSort(mergedFieldPlayers),
    goalies: localeSort(mergedGoalies),
  };
}

function groupByPosition(data) {
  if (['ld', 'rd'].includes(data.position?.toLowerCase()))
    return 'defenders';
  if (['lw', 'rw', 'c'].includes(data.position?.toLowerCase()))
    return 'forwards';
  return 'goalies';
}

function sortByJerseyNumber(d) {
  return Number(d.jerseyNr);
}

function convertAddress(data) {
  const addCommaToCityName = data.city ? over(lensProp('city'), replace(/$/, ',')) : () => ({});
  return compose(join(' '), values, addCommaToCityName, omit(['type']))(data);
}
