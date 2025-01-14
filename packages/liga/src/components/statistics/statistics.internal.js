import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import {
  COLUMNS_FIELD_PLAYERS,
  COLUMNS_FIELD_PLAYERS_PENALTY,
  COLUMNS_FIELD_PLAYERS_TOI,
  COLUMNS_GOALIES,
  COLUMNS_SCORING_EFFICIENCY,
  COLUMNS_TEAM_ATTENDANCE,
  COLUMNS_TEAMS_FAIRPLAY,
  COLUMNS_TEAMS_PENALTY_KILLING,
  COLUMNS_TEAMS_POWERPLAY,
} from '@mjsz-vbr-elements/core/columns';
import { ascend, compose, descend, map, pick, prop, sort } from 'ramda';

export const REPORT_TYPE_PLAYERS = 'players';
export const REPORT_TYPE_TEAMS = 'teams';

export const REPORTS_MAP = new Map()
  .set('points', {
    api: '/v2/players-stats',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'points',
      orders: [{ target: 'points', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('goals', {
    api: '/v2/players-stats',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'goals',
      orders: [
        { target: 'goals', direction: SORT_STATE_DESCEND },
        { target: 'assists', direction: SORT_STATE_DESCEND },
      ],
    },
  })
  .set('assists', {
    api: '/v2/players-stats',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'assists',
      orders: [
        { target: 'assists', direction: SORT_STATE_DESCEND },
        { target: 'goals', direction: SORT_STATE_DESCEND },
      ],
    },
  })
  .set('plusminus', {
    api: '/v2/players-stats',
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
  .set('playerstoi', {
    api: '/v2/players-toi',
    columns: COLUMNS_FIELD_PLAYERS_TOI,
    sort: {
      sortTarget: 'toiMin',
      orders: [{ target: 'toi', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('goalies', {
    api: '/v2/players-goalie',
    params: { more: true },
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
    api: '/v2/team-attendance',
    columns: COLUMNS_TEAM_ATTENDANCE,
    sort: {
      sortTarget: 'totalAttendanceAvg',
      orders: [{ target: 'totalAttendanceAvg', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('teamFairplay', {
    api: '/v2/team-fairplay',
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
    api: '/v2/team-scoring-efficiency',
    columns: COLUMNS_SCORING_EFFICIENCY,
    sort: {
      sortTarget: 'sp',
      orders: [{ target: 'sp', direction: SORT_STATE_DESCEND }],
    },
  });

export function PLAYERS_REPORTS_SELECT(t) {
  return [
    {
      name: t('report.points'),
      value: 'points',
    },
    {
      name: t('report.goals'),
      value: 'goals',
    },
    {
      name: t('report.assists'),
      value: 'assists',
    },
    {
      name: '+/-',
      value: 'plusminus',
    },
    {
      name: t('report.penalties'),
      value: 'playerspenalties',
    },
    {
      name: t('report.toi'),
      value: 'playerstoi',
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
}

export function TEAMS_REPORTS_SELECT(t) {
  return [
    {
      name: t('report.teamAttendance'),
      value: 'teamAttandance',
    },
    {
      name: t('report.teamFairplay'),
      value: 'teamFairplay',
    },
    {
      name: t('report.teamPowerplay'),
      value: 'teamPowerplay',
    },
    {
      name: t('report.teamPenaltyKilling'),
      value: 'teamPenaltiKilling',
    },
    {
      name: t('report.teamScoringEfficiency'),
      value: 'teamScoringEfficiency',
    },
  ];
}

export function convertSeasons(seasons) {
  return compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);
}

export const convertTeams = teams => sort(ascend(prop('teamName')), teams);

export function setDefaultReport(params) {
  if (params.report)
    return params.report;
  if (params.type) {
    return params.type === REPORT_TYPE_PLAYERS ? 'points' : 'teamAttandance';
  }
  return 'points';
}
