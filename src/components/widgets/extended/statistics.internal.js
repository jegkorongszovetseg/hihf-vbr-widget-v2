import { compose, descend, map, pick, prop, sort } from 'ramda';
import { COLUMNS_FIELD_PLAYERS, COLUMNS_FIELD_PLAYERS_PENALTY } from '../internal';

export const REPORTS_MAP = new Map()
  .set('fieldplayers', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {}, // Todo
  })
  .set('playerspenalties', {
    api: '/v1/playersPenaltyPeriod',
    columns: COLUMNS_FIELD_PLAYERS_PENALTY,
    sort: {}, // Todo
  });

export const REPORTS_SELECT = [
  {
    name: 'Field Players',
    value: 'fieldplayers',
  },
  {
    name: 'Field Players Penalties',
    value: 'playerspenalties',
  },
];

export const convertSeasons = (seasons) =>
  compose(sort(descend(prop('championshipId'))), map(pick(['championshipId', 'seasonName'])))(seasons);
