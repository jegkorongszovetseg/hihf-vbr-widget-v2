import { InvalidSeasonName, WidgetError } from '@mjsz-vbr-elements/core/utils';
import { ascend, compose, descend, head, map, path, pick, prop, sort } from 'ramda';

export const convertTeams = teams => sort(ascend(prop('teamName')), teams);

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
  state.section = compose(prop('phaseName'), head)(state.sections);
  // }
}

export function transformTeams(teams, state) {
  state.teams = convertTeams(teams);
}

export function convertSeasons(seasons) {
  return compose(sort(descend(prop('seasonName'))), map(pick(['championshipId', 'seasonName'])))(seasons);
}
