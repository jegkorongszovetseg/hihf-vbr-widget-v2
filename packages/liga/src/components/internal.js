import { head, compose, ascend, descend, map, pick, prop, sort, path } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@mjsz-vbr-elements/core/utils';

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

export const NATIONALITY_FLAG_MAP = new Map()
  .set('Magyar', 'hu')
  .set('Hokimagyar', 'hu')
  .set('Román', 'ro')
  .set('Amerikai', 'us')
  .set('Izraeli', 'il')
  .set('Kanadai', 'ca')
  .set('Lett', 'lv')
  .set('Orosz', 'ru')
  .set('Finn', 'fi')
  .set('Szlovén', 'si')
  .set('Holland', 'nl')
  .set('Fehérorosz', 'by')
  .set('Cseh', 'cz')
  .set('Ukrán', 'ua')
  .set('Litván', 'lt')
  .set('Olasz', 'it')
  .set('Angol', 'gb-eng')
  .set('Szerb', 'rs')
  .set('Svéd', 'se');
