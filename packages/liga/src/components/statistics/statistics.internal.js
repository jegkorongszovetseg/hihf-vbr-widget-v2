import { ascend, compose, descend, map, pick, prop, sort } from 'ramda';
// import { SORT_STATE_DESCEND } from '@vbr-widget/core';
import {
  SORT_STATE_DESCEND,
  COLUMNS_FIELD_PLAYERS,
  COLUMNS_FIELD_PLAYERS_PENALTY,
  COLUMNS_GOALIES,
  COLUMNS_SCORING_EFFICIENCY,
  COLUMNS_TEAMS_FAIRPLAY,
  COLUMNS_TEAMS_PENALTY_KILLING,
  COLUMNS_TEAMS_POWERPLAY,
  COLUMNS_TEAM_ATTENDANCE,
} from '@mjsz-vbr-elements/core';

export const REPORT_TYPE_PLAYERS = 'players';
export const REPORT_TYPE_TEAMS = 'teams';

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
    api: '/v2/players-penalty',
    columns: COLUMNS_FIELD_PLAYERS_PENALTY,
    sort: {
      sortTarget: 'pim',
      orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('goalies', {
    api: '/v2/players-goalie',
    params: { less: false },
    columns: COLUMNS_GOALIES,
    sort: {
      sortTarget: 'svsPercent',
      orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('goaliesunderlimit', {
    api: '/v2/players-goalie',
    params: { less: true },
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
    api: '/v2/team-powerplay',
    columns: COLUMNS_TEAMS_PENALTY_KILLING,
    sort: {
      sortTarget: 'pkPercent',
      orders: [{ target: 'pkPercent', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('teamPowerplay', {
    api: '/v2/team-powerplay',
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

export const PLAYERS_REPORTS_SELECT = (t) => {
  return [
    // {
    //   name: t('report.points'),
    //   value: 'points',
    // },
    // {
    //   name: t('report.goals'),
    //   value: 'goals',
    // },
    // {
    //   name: t('report.assists'),
    //   value: 'assists',
    // },
    // {
    //   name: '+/-',
    //   value: 'plusminus',
    // },
    {
      name: t('report.penalties'),
      value: 'playerspenalties',
    },
    {
      name: t('report.goalies'),
      value: 'goalies',
    },
    {
      name: t('report.goaliesLimit'),
      value: 'goaliesunderlimit',
    },
  ];
};

export const TEAMS_REPORTS_SELECT = (t) => {
  return [
    // {
    //   name: t('report.teamAttendance'),
    //   value: 'teamAttandance',
    // },
    // {
    //   name: t('report.teamFairplay'),
    //   value: 'teamFairplay',
    // },
    {
      name: t('report.teamPowerplay'),
      value: 'teamPowerplay',
    },
    {
      name: t('report.teamPenaltyKilling'),
      value: 'teamPenaltiKilling',
    },
    // {
    //   name: t('report.teamScoringEfficiency'),
    //   value: 'teamScoringEfficiency',
    // },
  ];
};

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);

export const convertTeams = (teams) => sort(ascend(prop('teamName')), teams);

export const setDefaultReport = (params) => {
  if (params.report) return params.report;
  if (params.type) {
    return params.type === REPORT_TYPE_PLAYERS ? 'playerspenalties' : 'teamPowerplay'; // playerspenalties => points, teamPowerplay =>  teamAttandance
  }
  return 'playerspenalties';
};
