import { playerName, teamName } from '@mjsz-vbr-elements/core/utils';
import { compose, map, prop, sortBy } from 'ramda';

export const transformPlayers = data => compose(sortBy(prop('name')), map(compose(playerName, teamName)))(data);
