import { SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core/constants';
import { convertSeasons, convertTeams, head, InvalidSeasonName, removeUnneededPhases, selectFirstPhaseName, selectLastSections, WidgetError } from '@mjsz-vbr-elements/core/utils';

export function transformSeasons(seasons, state) {
  if (seasons.length === 0)
    throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId)
    state.championshipId = head(state.seasons).championshipId;
}

export function transformStandingSections(sections, state) {
  state.sections = removeUnneededPhases(sections);
  state.section = selectFirstPhaseName(state.sections);
}

export function transformPhases(sections, state) {
  state.sections = [...sections];
  if (!state.section)
    state.section = selectLastSections(state.sections);
}

export function transformTeams(teams, state) {
  state.teams = convertTeams(teams);
}

export const COLUMNS_PLAYERS = {
  jerseyNr: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
    class: 'font-bold',
    sortOrders: [{ target: 'jerseyNr', direction: SORT_STATE_ASCEND }],
  },
  playerPortrait: {
    label: '',
    class: 'has-avatar',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'text-start w-auto font-bold',
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'text-start w-auto font-bold',
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
    class: 'text-end',
    sortOrders: [{ target: 'birthDate', direction: SORT_STATE_ASCEND }],
  },
  birthPlace: {
    label: 'table.birthPlace.short',
    tooltip: 'table.birthPlace.tooltip',
    class: 'text-end',
    sortOrders: [{ target: 'birthPlace', direction: SORT_STATE_ASCEND }],
  },
};

export const COLUMNS_GAMES = {
  gameDateDate: {
    label: 'table.gameDate.short',
    tooltip: 'table.gameDate.tooltip',
    class: 'text-start',
  },
  gameDateTime: {
    label: 'table.gameDateTime.short',
    tooltip: 'table.gameDateTime.tooltip',
    class: 'text-start',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'text-start text-dimmed',
  },
  gameResult: {
    label: 'table.result.short',
    tooltip: 'table.result.tooltip',
    class: 'font-bold',
  },
  gameResultType: {
    label: '',
    tooltip: '',
  },
  opponent: {
    label: 'table.opponent.short',
    tooltip: 'table.opponent.tooltip',
    class: 'text-start text-dimmed',
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
    class: 'text-start font-bold',
  },
  toi: {
    label: 'table.toi.short',
    tooltip: 'table.toi.tooltip',
    class: 'text-start',
  },
  sa: {
    label: 'table.sa.short',
    tooltip: 'table.sa.tooltip',
    class: 'text-start',
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
    class: 'text-start',
  },
  shga: {
    label: 'table.shga.short',
    tooltip: 'table.shga.tooltip',
    class: 'text-start',
  },
  saves: {
    label: 'table.saves.short',
    tooltip: 'table.saves.tooltip',
    class: 'text-start',
  },
  svsPercent: {
    label: 'table.svsPercent.short',
    tooltip: 'table.svsPercent.tooltip',
    class: 'text-start',
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

  powerplay: {
    label: 'table.pp.short',
    tooltip: 'table.pp.tooltip',
  },
  penaltyKilling: {
    label: 'table.pk.short',
    tooltip: 'table.pk.tooltip',
  },
};

export const COLUMNS_PLAYER_SEASON_STATS = {
  playerPortrait: {
    label: '',
    class: 'has-avatar',
  },
  season: {
    label: 'table.season.short',
    tooltip: 'table.season.tooltip',
    class: 'text-start text-dimmed',
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'text-start w-auto',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'font-bold text-start',
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
