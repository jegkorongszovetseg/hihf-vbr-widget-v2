import { compose, descend, map, pick, prop, sort } from 'ramda';
import { COLUMNS_FIELD_PLAYERS } from '../internal';

export const REPORTS_MAP = new Map().set('fieldplayers', {
  api: '/v1/playersStatsPeriod',
  columns: COLUMNS_FIELD_PLAYERS,
  sort: {}, // Todo
});

export const REPORTS_SELECT = [
  {
    name: 'Field Players',
    value: 'fieldplayers',
  },
  {
    name: 'Report2',
    value: 'report2',
  },
];

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);
