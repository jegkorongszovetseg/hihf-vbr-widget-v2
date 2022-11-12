import { head, compose, ascend, descend, map, pick, prop, sort } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@/utils/errors';

export const transformSeasons = (seasons, state) => {
  if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
};

export const transformSections = (sections, state) => {
  state.sections = sections.sectionName;
  if (state.sections && !state.sections.includes(state.section)) {
    state.section = head(state.sections);
  }
};

export const transformTeams = (teams, state) => {
  state.teams = convertTeams(teams);
};

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);

export const convertTeams = (teams) => sort(ascend(prop('teamName')), teams);
