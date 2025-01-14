import { InvalidSeasonName, WidgetError } from '@mjsz-vbr-elements/core/utils';
import { compose, descend, head, map, path, pick, prop, sort, sortBy } from 'ramda';

export function transformSeasons(seasons, state) {
  if (seasons.length === 0)
    throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId)
    state.championshipId = head(state.seasons).championshipId;
}

export function transformSections(sections, state) {
  state.sections = sortBy(prop('sectionId'))(sections);
  state.sectionId = compose(prop('sectionId'), head)(state.sections);
  state.phaseId = path([0, 'phases', 0], sections)?.phaseId ?? null;
}

export function convertSeasons(seasons) {
  return compose(sort(descend(prop('seasonName'))), map(pick(['championshipId', 'seasonName'])))(seasons);
}
