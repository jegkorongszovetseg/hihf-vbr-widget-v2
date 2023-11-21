import { head, compose, ascend, descend, map, pick, prop, sort, path } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@mjsz-vbr-elements/core/utils';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';

export const transformSeasons = (seasons, state) => {
  if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
};

export const transformSections = (sections, state) => {
  state.sections = path([0, 'phases'], sections);
  // if (state.sections && !state.sections.includes(state.section)) {
  state.section = compose(prop('phaseName'), head)(state.sections);
  // }
};

export const transformTeams = (teams, state) => {
  state.teams = convertTeams(teams);
};

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('seasonName'))), map(pick(['championshipId', 'seasonName'])))(seasons);

export const convertTeams = (teams) => sort(ascend(prop('teamName')), teams);

export const COLUMNS_PLAYERS = {
  jerseyNr: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
    class: 'is-text-bold is-text-xl',
    sortOrders: [{ target: 'jerseyNr', direction: SORT_STATE_ASCEND }],
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
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  position: {
    label: 'table.position.short',
    tooltip: 'table.position.tooltip',
  },
  nationality: {
    label: 'table.nationality.short',
    tooltip: 'table.nationality.tooltip',
  },
  birthDate: {
    label: 'table.birthDate.short',
    tooltip: 'table.birthDate.tooltip',
    class: 'is-text-right',
    sortOrders: [{ target: 'birthDate', direction: SORT_STATE_ASCEND }],
  },
  birthPlace: {
    label: 'table.birthPlace.short',
    tooltip: 'table.birthPlace.tooltip',
    class: 'is-text-right',
    sortOrders: [{ target: 'birthPlace', direction: SORT_STATE_ASCEND }],
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
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-text-light',
  },
  gameResult: {
    label: 'table.result.short',
    tooltip: 'table.result.tooltip',
    class: 'is-text-bold',
  },
  gameResultType: {
    label: '',
    tooltip: '',
  },
  opponent: {
    label: 'table.opponent.short',
    tooltip: 'table.opponent.tooltip',
    class: 'is-text-left is-text-light',
  },
  resultType: {
    label: 'table.resultType.short',
    tooltip: 'table.resultType.tooltip',
    class: '',
  },
  goals: {
    label: 'table.goals.short',
    tooltip: 'table.goals.tooltip',
  },
  assists: {
    label: 'table.assists.short',
    tooltip: 'table.assists.tooltip',
  },
  points: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
  },
  plusMinus: {
    label: 'table.plusMinus.short',
    tooltip: 'table.plusMinus.tooltip',
  },
  sog: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
    class: 'is-text-left is-text-bold',
  },
  toi: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
    class: 'is-text-left',
  },
  sa: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
    class: 'is-text-left',
  },
  ga: {
    label: 'table.ga.short',
    tooltip: 'table.ga.tooltip',
  },
  gaa: {
    label: 'table.gaa.short',
    tooltip: 'table.gaa.tooltip',
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
  saves: {
    label: 'table.saves.short',
    tooltip: 'table.saves.tooltip',
    class: 'is-text-left',
  },
  svsPercent: {
    label: 'table.svsPercent.short',
    tooltip: 'table.svsPercent.tooltip',
    class: 'is-text-left',
  },
  shots: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
  },
  shotPercent: {
    label: 'table.sogPercent.short',
    tooltip: 'table.sogPercent.tooltip',
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
  },

  pp: {
    label: 'table.pp.short',
    tooltip: 'table.pp.tooltip',
  },
  pk: {
    label: 'table.pk.short',
    tooltip: 'table.pk.tooltip',
  },
};

export const COLUMNS_PLAYER_SEASON_STATS = {
  playerPortrait: {
    label: '',
    class: 'is-has-image',
  },
  seasonId: {
    label: 'table.season.short',
    tooltip: 'table.season.tooltip',
    class: 'is-text-left',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-bold is-text-left',
  },
  gp: {
    label: 'table.game.short',
    tooltip: 'table.game.tooltip',
  },
  goals: {
    label: 'table.goals.short',
    tooltip: 'table.goals.tooltip',
  },
  assists: {
    label: 'table.assists.short',
    tooltip: 'table.assists.tooltip',
  },
  points: {
    label: 'table.points.short',
    tooltip: 'table.points.tooltip',
  },
  plusMinus: {
    label: 'table.plusMinus.short',
    tooltip: 'table.plusMinus.tooltip',
  },
  shots: {
    label: 'table.sog.short',
    tooltip: 'table.sog.tooltip',
  },
  shotPercent: {
    label: 'table.sogPercent.short',
    tooltip: 'table.sogPercent.tooltip',
  },

  gkd: {
    label: 'table.gpgk.short',
    tooltip: 'table.gpgk.tooltip',
  },
  gpi: {
    label: 'table.gpi.short',
    tooltip: 'table.gpi.tooltip',
  },
  mipMin: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
  },
  mipPercent: {
    label: 'table.toiPercent.short',
    tooltip: 'table.toiPercent.tooltip',
  },
  ga: {
    label: 'table.ga.short',
    tooltip: 'table.ga.tooltip',
  },
  gaa: {
    label: 'table.gaa.short',
    tooltip: 'table.gaa.tooltip',
  },
  sog: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
  },
  svs: {
    label: 'table.svs.short',
    tooltip: 'table.svs.tooltip',
  },
  svsPercent: {
    label: 'table.svsPercent.short',
    tooltip: 'table.svsPercent.tooltip',
  },
  p2: {
    label: 'table.minorPenalties.short',
    tooltip: 'table.minorPenalties.tooltip',
    class: 'is-possible-empty',
  },
  p5: {
    label: 'table.majorPenalties.short',
    tooltip: 'table.majorPenalties.tooltip',
    class: 'is-possible-empty',
  },
  p10: {
    label: 'table.misconducts.short',
    tooltip: 'table.misconducts.tooltip',
    class: 'is-possible-empty',
  },
  p20: {
    label: 'table.gameMisconducts.short',
    tooltip: 'table.gameMisconducts.tooltip',
    class: 'is-possible-empty',
  },
  p25: {
    label: 'table.matchPenalties.short',
    tooltip: 'table.matchPenalties.tooltip',
    class: 'is-possible-empty',
  },
  pim: {
    label: 'table.pim.short',
    tooltip: 'table.pim.tooltip',
    class: 'is-possible-empty',
  },
  pimPerGame: {
    label: 'table.pimPerGame.short',
    tooltip: 'table.pimPerGame.tooltip',
  },
};
