import { compose, descend, map, pick, prop, sort } from 'ramda';
import { SORT_STATE_DESCEND } from '../../../constants';
import { COLUMNS_FIELD_PLAYERS, COLUMNS_FIELD_PLAYERS_PENALTY } from '../internal';

export const REPORTS_MAP = new Map()
  .set('fieldplayers', {
    api: '/v1/playersStatsPeriod',
    columns: COLUMNS_FIELD_PLAYERS,
    sort: {
      sortTarget: 'point',
      orders: [{ target: 'point', direction: SORT_STATE_DESCEND }],
    },
  })
  .set('playerspenalties', {
    api: '/v1/playersPenaltyPeriod',
    columns: COLUMNS_FIELD_PLAYERS_PENALTY,
    sort: {
      sortTarget: 'pim',
      orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
    },
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
