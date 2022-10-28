import { ascend, compose, curry, descend, map, pick, prop, sort } from 'ramda';
import { SORT_STATE_DESCEND } from '../../../constants';
import {
  COLUMNS_FIELD_PLAYERS,
  COLUMNS_FIELD_PLAYERS_PENALTY,
  COLUMNS_GOALIES,
  COLUMNS_SCORING_EFFICIENCY,
  COLUMNS_TEAMS_FAIRPLAY,
  COLUMNS_TEAMS_PENALTY_KILLING,
  COLUMNS_TEAMS_POWERPLAY,
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
  .set('goals', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'g',
      orders: [{ target: 'g', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('assists', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'a',
      orders: [{ target: 'a', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('plusminus', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'plusMinus',
      orders: [{ target: 'plusMinus', direction: SORT_STATE_DESCEND }],
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
  .set('teamAttandance', {
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
  })
  .set('teamPenaltiKilling', {
    api: '/v1/teamPowerPlayPeriod',
    columns: COLUMNS_TEAMS_PENALTY_KILLING,
    sort: {
      sortTarget: 'pkPercent',
      orders: [{ target: 'pkPercent', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('teamPowerplay', {
    api: '/v1/teamPowerPlayPeriod',
    columns: COLUMNS_TEAMS_POWERPLAY,
    sort: {
      sortTarget: 'ppPercent',
      orders: [{ target: 'ppPercent', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('teamScoringEfficiency', {
    api: '/v1/standings',
    columns: COLUMNS_SCORING_EFFICIENCY,
    sort: {
      sortTarget: 'GFShots',
      orders: [{ target: 'GFShots', direction: SORT_STATE_DESCEND }],
    },
  });

export const PLAYERS_REPORTS_SELECT = [
  {
    name: 'Points',
    value: 'points',
  },
  {
    name: 'Goals',
    value: 'goals',
  },
  {
    name: 'Assists',
    value: 'assists',
  },
  {
    name: '+/-',
    value: 'plusminus',
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
];

export const TEAMS_REPORTS_SELECT = [
  {
    name: 'Team Attendance',
    value: 'teamAttandance',
  },
  {
    name: 'Team Fairplay',
    value: 'teamFairplay',
  },
  {
    name: 'Team Penalty Killing',
    value: 'teamPenaltiKilling',
  },
  {
    name: 'Team Powerplay',
    value: 'teamPowerplay',
  },
  {
    name: 'Team Scoring Efficiency',
    value: 'teamScoringEfficiency',
  },
];

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);

export const convertTeams = (teams) => sort(ascend(prop('teamName')), teams);

// export const convertTimes = (data, targets = []) => {
//   data = data.map((row) => {
//     targets.map((key) => {
//       if (!row[key]) return row;
//       return (row[`${key}Sec`] = convertMinToSec(row[key]));
//     });
//     return row;
//   });
//   return data;
// };
