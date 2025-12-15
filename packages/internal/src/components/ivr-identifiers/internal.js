import { head, prop } from '@mjsz-vbr-elements/core/utils';

const getFirstProp = key => data => prop(key, head(data));

export function transformAllSeason(data, state) {
  state.seasonsList = data;
  state.seasonId = getFirstProp('id')(data);
}

export function transformSeasons(data, state) {
  state.championshipList = data;
  state.championshipId = getFirstProp('championshipId')(data);
}

export function transformSections(data, state) {
  state.sections = data;
  state.sectionId = getFirstProp('sectionId')(data);
}
