import { sortBy, prop } from 'ramda';
import {
  COLUMNS_GOALIES,
  COLUMNS_SCHEDULE,
  COLUMNS_STANDINGS_P_3,
  COLUMNS_TEAMS_POWERPLAY,
  COLUMNS_TEAMS_PENALTY_KILLING,
  COLUMNS_FIELD_PLAYERS_PENALTY,
} from '@mjsz-vbr-elements/core/columns';
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';

export const PANEL_SCHEDULE = 'schedule';
export const PANEL_STANDINGS = 'standings';
export const PANEL_PLAYERS = 'players';
export const PANEL_TEAMS = 'teams';

export const transformSections = (sections, state) => {
  state.championships = sortBy(prop('sectionName'))(sections);
  state.selectedChampionshipId = sections?.[0]?.sectionId;
  state.phaseId = sections?.[0]?.phases[0]?.phaseId;
};

export const convertPhaseName = (phases) => {
  return phases.map((phase) => ({
    ...phase,
    phaseName: [phase.phaseName, phase.phaseSubType?.phaseSubTypeName ?? '', phase.phaseType?.phaseTypeName ?? ''].join(
      ' '
    ),
  }));
};

export const ALL_REPORTS_MAP = new Map()
  .set('schedule', {
    api: '/v2/games-list',
    columns: COLUMNS_SCHEDULE,
    sort: {},
  })
  .set('standings', {
    api: '/v2/standings',
    columns: COLUMNS_STANDINGS_P_3,
    sort: {},
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
