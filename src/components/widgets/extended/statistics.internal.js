import { compose, descend, map, pick, prop, sort } from 'ramda';
import { SORT_STATE_DESCEND } from '../../../constants';
import {
  COLUMNS_FIELD_PLAYERS,
  COLUMNS_FIELD_PLAYERS_PENALTY,
  COLUMNS_GOALIES,
  COLUMNS_TEAMS_FAIRPLAY,
  COLUMNS_TEAM_ATTENDANCE,
} from '../internal';

export const REPORTS_MAP = new Map()
  .set('points', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'point',
      orders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('fieldplayers', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'point',
      orders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('playerspenalties', {
    api: '/v1/playersPenaltyPeriod',
    columns: COLUMNS_FIELD_PLAYERS_PENALTY,
    sort: {
      sortTarget: 'pim',
      orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('goalies', {
    api: '/v1/playersGoaliePeriod',
    columns: COLUMNS_GOALIES,
    sort: {
      sortTarget: 'svsPercent',
      orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('goaliesunderlimit', {
    api: '/v1/playersGoalieUnderPeriod',
    columns: COLUMNS_GOALIES,
    sort: {
      sortTarget: 'svsPercent',
      orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('teamattandance', {
    api: '/v1/teamAttendancePeriod',
    columns: COLUMNS_TEAM_ATTENDANCE,
    sort: {
      sortTarget: 'totalAttendanceAvg',
      orders: [{ target: 'totalAttendanceAvg', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('teamFairplay', {
    api: '/v1/teamFairplayPeriod',
    columns: COLUMNS_TEAMS_FAIRPLAY,
    sort: {
      sortTarget: 'pim',
      orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
    },
  });

export const REPORTS_SELECT = [
  {
    name: 'Points',
    value: 'points',
  },
  {
    name: 'Field Players',
    value: 'fieldplayers',
  },
  {
    name: 'Field Players Penalties',
    value: 'playerspenalties',
  },
  {
    name: 'Goalies',
    value: 'goalies',
  },
  {
    name: 'Goalies under 40%',
    value: 'goaliesunderlimit',
  },
  {
    name: 'Team Attendance',
    value: 'teamattandance',
  },
  {
    name: 'Team Fairplay',
    value: 'teamFairplay',
  },
];

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);
