import { compose, sortBy, prop, map } from 'ramda';
import { playerName, teamName } from '@mjsz-vbr-elements/core/utils';

export const transformPlayers = (data) => compose(sortBy(prop('name')), map(compose(playerName, teamName)))(data);
