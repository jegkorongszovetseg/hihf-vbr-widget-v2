import { head, compose, ascend, descend, map, pick, prop, sort, path } from 'ramda';
import { InvalidSeasonName, WidgetError } from '@mjsz-vbr-elements/core/utils';
import { SORT_STATE_ASCEND } from '@mjsz-vbr-elements/core';

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

// export const NATIONALITY_FLAG_MAP = new Map()
//   .set('Magyar', 'hu')
//   .set('Hokimagyar', 'hu')
//   .set('Román', 'ro')
//   .set('Amerikai', 'us')
//   .set('Izraeli', 'il')
//   .set('Kanadai', 'ca')
//   .set('Lett', 'lv')
//   .set('Orosz', 'ru')
//   .set('Finn', 'fi')
//   .set('Szlovén', 'si')
//   .set('Szlovák', 'sk')
//   .set('Holland', 'nl')
//   .set('Fehérorosz', 'by')
//   .set('Cseh', 'cz')
//   .set('Ukrán', 'ua')
//   .set('Litván', 'lt')
//   .set('Olasz', 'it')
//   .set('Angol', 'gb-eng')
//   .set('Szerb', 'rs')
//   .set('Svéd', 'se')
//   .set('Német', 'de')
//   .set('Brit', 'gb')
//   .set('Kazah', 'kz');

export const COLUMNS_PLAYERS = {
  jerseyNr: {
    label: 'table.jerseyNumber.short',
    tooltip: 'table.jerseyNumber.tooltip',
    sortOrders: [{ target: 'jerseyNr', direction: SORT_STATE_ASCEND }],
  },
  playerPortrait: {
    label: '',
    class: 'is-has-image',
  },
  name: {
    label: 'table.name.short',
    tooltip: 'table.name.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'name', direction: SORT_STATE_ASCEND }],
  },
  teamName: {
    label: 'table.team.short',
    tooltip: 'table.team.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
    sortOrders: [{ target: 'teamName', direction: SORT_STATE_ASCEND }],
  },
  position: {
    label: 'table.position.short',
    tooltip: 'table.position.tooltip',
  },
  nationality: {
    label: 'table.nationality.short',
    tooltip: 'table.nationality.tooltip',
    class: 'is-horizontal-content',
  },
  birthDate: {
    label: 'table.birthDate.short',
    tooltip: 'table.birthDate.tooltip',
    class: 'is-text-right',
    sortOrders: [{ target: 'birthDate', direction: SORT_STATE_ASCEND }],
  },
  birthPlace: {
    label: 'table.birthPlace.short',
    tooltip: 'table.birthPlace.tooltip',
    class: 'is-text-right',
    sortOrders: [{ target: 'birthPlace', direction: SORT_STATE_ASCEND }],
  },
};
