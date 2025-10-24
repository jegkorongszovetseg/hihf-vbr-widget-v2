import { convertSeasons, convertTeams, head, InvalidSeasonName, path, selectFirstPhaseName, WidgetError } from '@mjsz-vbr-elements/core/utils';

export function transformSeasons(seasons, state) {
  if (seasons.length === 0)
    throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId)
    state.championshipId = head(state.seasons).championshipId;
}

export function transformSections(sections, state) {
  state.sections = path([0, 'phases'], sections);
  state.section = selectFirstPhaseName(state.sections);
}

export function transformTeams(teams, state) {
  state.teams = convertTeams(teams);
}
