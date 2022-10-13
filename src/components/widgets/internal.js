import { SORT_STATE_ASCEND, SORT_STATE_DESCEND } from '../../constants';

export const COLUMNS_SCHEDULE = {
  name: {
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
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },
  m: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'm', direction: SORT_STATE_DESCEND }],
  },
  p3: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
    sortOrders: [
      { target: 'p3', direction: SORT_STATE_DESCEND },
      { target: 'p2', direction: SORT_STATE_DESCEND },
    ],
  },
  p2: {
    label: 'table.otw.short',
    tooltip: 'table.otw.tooltip',
    sortOrders: [{ target: 'p2', direction: SORT_STATE_DESCEND }],
  },
  p1: {
    label: 'table.otl.short',
    tooltip: 'table.otl.tooltip',
    sortOrders: [{ target: 'p1', direction: SORT_STATE_ASCEND }],
  },
  p0: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
    sortOrders: [{ target: 'p0', direction: SORT_STATE_ASCEND }],
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
  p: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    class: 'is-text-bold',
    sortOrders: [{ target: 'p', direction: SORT_STATE_DESCEND }],
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
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },
  m: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
    sortOrders: [{ target: 'm', direction: SORT_STATE_DESCEND }],
  },
  p2: {
    label: 'table.wins.short',
    tooltip: 'table.wins.tooltip',
    sortOrders: [
      { target: 'p2', direction: SORT_STATE_DESCEND },
      { target: 'p1', direction: SORT_STATE_DESCEND },
    ],
  },
  p1: {
    label: 'table.draw.short',
    tooltip: 'table.draw.tooltip',
    sortOrders: [
      { target: 'p1', direction: SORT_STATE_DESCEND },
      { target: 'p2', direction: SORT_STATE_DESCEND },
    ],
  },
  p0: {
    label: 'table.losses.short',
    tooltip: 'table.losses.tooltip',
    sortOrders: [{ target: 'p0', direction: SORT_STATE_ASCEND }],
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
  p: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
    class: 'is-text-bold',
    sortOrders: [{ target: 'p', direction: SORT_STATE_DESCEND }],
  },
};
