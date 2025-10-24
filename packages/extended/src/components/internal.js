import { convertSeasons, convertTeams, head, InvalidSeasonName, selectFirstPhaseName, WidgetError } from '@mjsz-vbr-elements/core/utils';
import { path } from 'ramda';

export function transformSeasons(seasons, state) {
  if (seasons.length === 0)
    throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId)
    state.championshipId = head(state.seasons).championshipId;
}

export function transformSections(sections, state) {
  state.sections = path([0, 'phases'], sections);
  // if (state.sections && !state.sections.includes(state.section)) {
  state.section = selectFirstPhaseName(state.sections);
  // }
}

export function transformTeams(teams, state) {
  state.teams = convertTeams(teams);
}
