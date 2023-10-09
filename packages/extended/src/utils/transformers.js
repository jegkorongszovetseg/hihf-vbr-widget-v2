import { head, compose, descend, map, pick, prop, sort, path } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@mjsz-vbr-elements/core/utils';

export const transformSeasons = (seasons, state) => {
  if (seasons.length === 0) throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId) state.championshipId = head(state.seasons).championshipId;
};

export const transformSections = (sections, state) => {
  state.sections = sections;
  state.sectionId = compose(prop('sectionId'), head)(sections);
  state.phaseId = path([0, 'phases', 0], sections)?.phaseId ?? null;
};

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('seasonName'))), map(pick(['championshipId', 'seasonName'])))(seasons);
