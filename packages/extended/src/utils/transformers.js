import { convertSeasons, filterAndSortSections, head, InvalidSeasonName, path, selectFirstSectionId, WidgetError } from '@mjsz-vbr-elements/core/utils';

export function transformSeasons(seasons, state) {
  if (seasons.length === 0)
    throw new WidgetError(InvalidSeasonName.message, InvalidSeasonName.options);
  state.seasons = convertSeasons(seasons);
  if (!state.championshipId)
    state.championshipId = head(state.seasons).championshipId;
}

export function transformSections(sections, state) {
  state.sections = filterAndSortSections(sections);
  state.sectionId = selectFirstSectionId(state.sections);
  state.phaseId = path([0, 'phases', 0], sections)?.phaseId ?? null;
}
