import { SORT_STATE_ASCEND, SORT_STATE_DESCEND } from './constants';

export const COLUMNS_SCHEDULE = {
  gameName: {
    label: 'table.gameName.short',
    tooltip: 'table.gameName.tooltip',
    class: 'is-text-left is-text-light',
  },
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
  homeTeamName: {
    label: 'table.homeTeam.short',
    tooltip: 'table.homeTeam.tooltip',
    class: 'is-text-right is-w-auto is-text-bold',
  },
  homeTeamLogo: {
    label: '',
    class: 'is-has-image',
  },
  gameResult: {
    label: '',
    class: 'is-text-bold is-text-xl',
  },
  gameResultType: {
    label: '',
    tooltip: '',
  },
  awayTeamLogo: {
    label: '',
    class: 'is-has-image',
  },
  awayTeamName: {
    label: 'table.awayTeam.short',
    tooltip: 'table.awayTeam.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  location: {
    label: 'table.location.short',
    tooltip: 'table.location.tooltip',
    class: 'is-text-left',
  },
  broadcast: {
    label: 'table.broadcast.short',
    tooltip: 'table.broadcast.tooltip',
  },
  more: {
    label: '',
  },
};

export const COLUMNS_STANDINGS_P_3 = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gamesPlayed: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gamesPlayed', direction: SORT_STATE_DESCEND }],
  },
  w: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
    sortOrders: [
      { target: 'w', direction: SORT_STATE_DESCEND },
      { target: 'otw', direction: SORT_STATE_DESCEND },
    ],
  },
  otw: {
    label: 'table.otw.short',
    tooltip: 'table.otw.tooltip',
    sortOrders: [{ target: 'otw', direction: SORT_STATE_DESCEND }],
  },
  sow: {
    label: 'table.sow.short',
    tooltip: 'table.sow.tooltip',
    sortOrders: [{ target: 'sow', direction: SORT_STATE_DESCEND }],
  },
  sol: {
    label: 'table.sol.short',
    tooltip: 'table.sol.tooltip',
    sortOrders: [{ target: 'sol', direction: SORT_STATE_DESCEND }],
  },
  otl: {
    label: 'table.otl.short',
    tooltip: 'table.otl.tooltip',
    sortOrders: [{ target: 'otl', direction: SORT_STATE_ASCEND }],
  },
  l: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
    sortOrders: [{ target: 'l', direction: SORT_STATE_ASCEND }],
  },
  gf: {
    label: 'table.goalFor.short',
    tooltip: 'table.goalFor.tooltip',
    sortOrders: [{ target: 'gf', direction: SORT_STATE_DESCEND }],
  },
  ga: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
    sortOrders: [{ target: 'ga', direction: SORT_STATE_ASCEND }],
  },
  gd: {
    label: 'table.goalDiff.short',
    tooltip: 'table.goalDiff.tooltip',
    sortOrders: [{ target: 'gd', direction: SORT_STATE_DESCEND }],
  },
  points: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    class: 'is-text-bold',
    sortOrders: [
      { target: 'points', direction: SORT_STATE_DESCEND },
      { target: 'gd', direction: SORT_STATE_DESCEND },
      { target: 'gf', direction: SORT_STATE_DESCEND },
    ],
  },
};

export const COLUMNS_STANDINGS_P_2 = {
  index: {
    label: '#',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gamesPlayed: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gamesPlayed', direction: SORT_STATE_DESCEND }],
  },
  w: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
    sortOrders: [
      { target: 'w', direction: SORT_STATE_DESCEND },
      { target: 'd', direction: SORT_STATE_DESCEND },
    ],
  },
  d: {
    label: 'table.draw.short',
    tooltip: 'table.draw.tooltip',
    sortOrders: [
      { target: 'd', direction: SORT_STATE_DESCEND },
      { target: 'w', direction: SORT_STATE_DESCEND },
    ],
  },
  l: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
    sortOrders: [{ target: 'l', direction: SORT_STATE_ASCEND }],
  },
  gf: {
    label: 'table.goalFor.short',
    tooltip: 'table.goalFor.tooltip',
    sortOrders: [{ target: 'gf', direction: SORT_STATE_DESCEND }],
  },
  ga: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
    sortOrders: [{ target: 'ga', direction: SORT_STATE_ASCEND }],
  },
  gd: {
    label: 'table.goalDiff.short',
    tooltip: 'table.goalDiff.tooltip',
    sortOrders: [{ target: 'gd', direction: SORT_STATE_DESCEND }],
  },
  points: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    class: 'is-text-bold',
    sortOrders: [{ target: 'points', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_FIELD_PLAYERS = {
  index: {
    label: '#',
    class: 'is-text-left',
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
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }],
  },
  g: {
    label: 'table.goals.short',
    tooltip: 'table.goals.tooltip',
    sortOrders: [
      { target: 'g', direction: SORT_STATE_DESCEND },
      { target: 'a', direction: SORT_STATE_DESCEND },
    ],
  },
  a: {
    label: 'table.assists.short',
    tooltip: 'table.assists.tooltip',
    sortOrders: [
      { target: 'a', direction: SORT_STATE_DESCEND },
      { target: 'g', direction: SORT_STATE_DESCEND },
    ],
  },
  point: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    sortOrders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
  },
  plusMinus: {
    label: 'table.plusMinus.short',
    tooltip: 'table.plusMinus.tooltip',
    sortOrders: [{ target: 'plusMinus', direction: SORT_STATE_DESCEND }],
  },
  shoot: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    sortOrders: [{ target: 'shoot', direction: SORT_STATE_DESCEND }],
  },
  shootPercent: {
    label: 'table.sogPercent.short',
    tooltip: 'table.sogPercent.tooltip',
    sortOrders: [{ target: 'shootPercent', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_FIELD_PLAYERS_PENALTY = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
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
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }],
  },
  p2: {
    label: 'table.minorPenalties.short',
    tooltip: 'table.minorPenalties.tooltip',
    sortOrders: [
      { target: 'p2', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p5: {
    label: 'table.majorPenalties.short',
    tooltip: 'table.majorPenalties.tooltip',
    sortOrders: [
      { target: 'p5', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p10: {
    label: 'table.misconducts.short',
    tooltip: 'table.misconducts.tooltip',
    sortOrders: [
      { target: 'p10', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p20: {
    label: 'table.gameMisconducts.short',
    tooltip: 'table.gameMisconducts.tooltip',
    sortOrders: [
      { target: 'p20', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p25: {
    label: 'table.matchPenalties.short',
    tooltip: 'table.matchPenalties.tooltip',
    sortOrders: [
      { target: 'p25', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
    sortOrders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_GOALIES = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
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
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gkd: {
    label: 'table.gpgk.short',
    tooltip: 'table.gpgk.tooltip',
    sortOrders: [{ target: 'gkd', direction: SORT_STATE_DESCEND }],
  },
  gpi: {
    label: 'table.gpi.short',
    tooltip: 'table.gpi.tooltip',
    sortOrders: [{ target: 'gpi', direction: SORT_STATE_DESCEND }],
  },
  mip: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
    sortOrders: [{ target: 'mip', direction: SORT_STATE_DESCEND }],
  },
  mipPercent: {
    label: 'table.toiPercent.short',
    tooltip: 'table.toiPercent.tooltip',
    sortOrders: [{ target: 'mipPercent', direction: SORT_STATE_DESCEND }],
  },
  ga: {
    label: 'table.ga.short',
    tooltip: 'table.ga.tooltip',
    sortOrders: [{ target: 'ga', direction: SORT_STATE_DESCEND }],
  },
  gaa: {
    label: 'table.gaa.short',
    tooltip: 'table.gaa.tooltip',
    sortOrders: [{ target: 'gaa', direction: SORT_STATE_DESCEND }],
  },
  sog: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
    sortOrders: [{ target: 'sog', direction: SORT_STATE_DESCEND }],
  },
  svs: {
    label: 'table.svs.short',
    tooltip: 'table.svs.tooltip',
    sortOrders: [{ target: 'svs', direction: SORT_STATE_DESCEND }],
  },
  svsPercent: {
    label: 'table.svsPercent.short',
    tooltip: 'table.svsPercent.tooltip',
    sortOrders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_TEAM_ATTENDANCE = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  home: {
    label: 'table.homeHeader.short',
  },
  homeGame: {
    label: 'table.homeGame.short',
    tooltip: 'table.homeGame.tooltip',
    sortOrders: [{ target: 'homeGame', direction: SORT_STATE_DESCEND }],
  },
  homeAttendance: {
    label: 'table.homeAttendance.short',
    tooltip: 'table.homeAttendance.tooltip',
    sortOrders: [{ target: 'homeAttendance', direction: SORT_STATE_DESCEND }],
  },
  homeAttendanceAvg: {
    label: 'table.homeAttendanceAvg.short',
    tooltip: 'table.homeAttendanceAvg.tooltip',
    sortOrders: [{ target: 'homeAttendanceAvg', direction: SORT_STATE_DESCEND }],
  },
  away: {
    label: 'table.awayHeader.short',
  },
  awayGame: {
    label: 'table.awayGame.short',
    tooltip: 'table.awayGame.tooltip',
    sortOrders: [{ target: 'awayGame', direction: SORT_STATE_DESCEND }],
  },
  awayAttendance: {
    label: 'table.awayAttendance.short',
    tooltip: 'table.awayAttendance.tooltip',
    sortOrders: [{ target: 'awayAttendance', direction: SORT_STATE_DESCEND }],
  },
  awayAttendanceAvg: {
    label: 'table.awayAttendanceAvg.short',
    tooltip: 'table.awayAttendanceAvg.tooltip',
    sortOrders: [{ target: 'awayAttendanceAvg', direction: SORT_STATE_DESCEND }],
  },
  total: {
    label: 'table.totalHeader.short',
  },
  totalGame: {
    label: 'table.totalGame.short',
    tooltip: 'table.totalGame.tooltip',
    sortOrders: [{ target: 'totalGame', direction: SORT_STATE_DESCEND }],
  },
  totalAttendance: {
    label: 'table.totalAttendance.short',
    tooltip: 'table.totalAttendance.tooltip',
    sortOrders: [{ target: 'totalAttendance', direction: SORT_STATE_DESCEND }],
  },
  totalAttendanceAvg: {
    label: 'table.totalAttendanceAvg.short',
    tooltip: 'table.totalAttendanceAvg.tooltip',
    sortOrders: [{ target: 'totalAttendanceAvg', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_TEAMS_FAIRPLAY = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }],
  },
  p2: {
    label: 'table.minorPenalties.short',
    tooltip: 'table.minorPenalties.tooltip',
    sortOrders: [
      { target: 'p2', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p5: {
    label: 'table.majorPenalties.short',
    tooltip: 'table.majorPenalties.tooltip',
    sortOrders: [
      { target: 'p5', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p10: {
    label: 'table.misconducts.short',
    tooltip: 'table.misconducts.tooltip',
    sortOrders: [
      { target: 'p10', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p20: {
    label: 'table.gameMisconducts.short',
    tooltip: 'table.gameMisconducts.tooltip',
    sortOrders: [
      { target: 'p20', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  p25: {
    label: 'table.matchPenalties.short',
    tooltip: 'table.matchPenalties.tooltip',
    sortOrders: [
      { target: 'p25', direction: SORT_STATE_DESCEND },
      { target: 'pim', direction: SORT_STATE_DESCEND },
    ],
  },
  pimPerGame: {
    label: 'table.pimPerGame.short',
    tooltip: 'table.pimPerGame.tooltip',
    sortOrders: [{ target: 'pimPerGame', direction: SORT_STATE_DESCEND }],
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
    sortOrders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_TEAMS_PENALTY_KILLING = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }],
  },
  dvg: {
    label: 'table.powerplayDisadvantages.short',
    tooltip: 'table.powerplayDisadvantages.tooltip',
    sortOrders: [{ target: 'dvg', direction: SORT_STATE_DESCEND }],
  },
  dvgTime: {
    label: 'table.dvgTime.short',
    tooltip: 'table.dvgTime.tooltip',
    sortOrders: [{ target: 'dvgTimeSec', direction: SORT_STATE_DESCEND }],
  },
  dvgTimePP1: {
    label: 'table.dvgTimePP1.short',
    tooltip: 'table.dvgTimePP1.tooltip',
    sortOrders: [{ target: 'dvgTimePP1Sec', direction: SORT_STATE_DESCEND }],
  },
  dvgTimePP2: {
    label: 'table.dvgTimePP2.short',
    tooltip: 'table.dvgTimePP2.tooltip',
    sortOrders: [{ target: 'dvgTimePP2', direction: SORT_STATE_DESCEND }],
  },
  ppga: {
    label: 'table.ppga.short',
    tooltip: 'table.ppga.tooltip',
    sortOrders: [{ target: 'ppga', direction: SORT_STATE_DESCEND }],
  },
  shgf: {
    label: 'table.shgf.short',
    tooltip: 'table.shgf.tooltip',
    sortOrders: [{ target: 'shgf', direction: SORT_STATE_DESCEND }],
  },
  pkPercent: {
    label: 'table.pkPercent.short',
    tooltip: 'table.pkPercent.tooltip',
    sortOrders: [{ target: 'pkPercent', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_TEAMS_POWERPLAY = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }],
  },
  adv: {
    label: 'table.adv.short',
    tooltip: 'table.adv.tooltip',
    sortOrders: [{ target: 'adv', direction: SORT_STATE_DESCEND }],
  },
  advTime: {
    label: 'table.advTime.short',
    tooltip: 'table.advTime.tooltip',
    sortOrders: [{ target: 'advTimeSec', direction: SORT_STATE_DESCEND }],
  },
  advTimePP1: {
    label: 'table.advTimePP1.short',
    tooltip: 'table.advTimePP1.tooltip',
    sortOrders: [{ target: 'advTimePP1Sec', direction: SORT_STATE_DESCEND }],
  },
  advTimePP2: {
    label: 'table.advTimePP2.short',
    tooltip: 'table.advTimePP2.tooltip',
    sortOrders: [{ target: 'advTimePP2Sec', direction: SORT_STATE_DESCEND }],
  },
  ppgf: {
    label: 'table.ppgf.short',
    tooltip: 'table.ppgf.tooltip',
    sortOrders: [{ target: 'ppgf', direction: SORT_STATE_DESCEND }],
  },
  shga: {
    label: 'table.shga.short',
    tooltip: 'table.shga.tooltip',
    sortOrders: [{ target: 'shga', direction: SORT_STATE_DESCEND }],
  },
  ppPercent: {
    label: 'table.ppPercent.short',
    tooltip: 'table.ppPercent.tooltip',
    sortOrders: [{ target: 'ppPercent', direction: SORT_STATE_DESCEND }],
  },
};

export const COLUMNS_SCORING_EFFICIENCY = {
  index: {
    label: 'table.blank',
    class: 'is-text-left',
  },
  teamLogo: {
    label: '',
    class: 'is-has-image',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  m: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'gp', direction: SORT_STATE_DESCEND }],
  },
  plus: {
    label: 'table.goalFor.short',
    tooltip: 'table.goalFor.tooltip',
    sortOrders: [{ target: 'plus', direction: SORT_STATE_DESCEND }],
  },
  minus: {
    label: 'table.goalAgainst.short',
    tooltip: 'table.goalAgainst.tooltip',
    sortOrders: [{ target: 'minus', direction: SORT_STATE_ASCEND }],
  },
  gk: {
    label: 'table.goalDiff.short',
    tooltip: 'table.goalDiff.tooltip',
    sortOrders: [{ target: 'gk', direction: SORT_STATE_DESCEND }],
  },
  GFGP: {
    label: 'table.gfgp.short',
    tooltip: 'table.gfgp.tooltip',
    sortOrders: [{ target: 'GFGP', direction: SORT_STATE_DESCEND }],
  },
  GAGP: {
    label: 'table.gagp.short',
    tooltip: 'table.gagp.tooltip',
    sortOrders: [{ target: 'GAGP', direction: SORT_STATE_ASCEND }],
  },
  Shots: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    sortOrders: [{ target: 'Shots', direction: SORT_STATE_DESCEND }],
  },
  SA: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
    sortOrders: [{ target: 'SA', direction: SORT_STATE_ASCEND }],
  },
  ShotsGP: {
    label: 'table.sogp.short',
    tooltip: 'table.sogp.tooltip',
    sortOrders: [{ target: 'ShotsGP', direction: SORT_STATE_DESCEND }],
  },
  SAGP: {
    label: 'table.sagp.short',
    tooltip: 'table.sagp.tooltip',
    sortOrders: [{ target: 'SAGP', direction: SORT_STATE_ASCEND }],
  },
  GFShots: {
    label: 'table.sogPercent.short',
    tooltip: 'table.sogPercent.tooltip',
    sortOrders: [{ target: 'GFShots', direction: SORT_STATE_DESCEND }],
  },
};
