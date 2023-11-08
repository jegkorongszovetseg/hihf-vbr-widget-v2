import { compose, sortBy, path, map } from 'ramda';
import { rawConvert, playerName, teamName } from '@mjsz-vbr-elements/core/utils';

export const transformPlayers = (data) =>
  compose(map(compose(playerName, teamName)), sortBy(path(['player', 'lastName'])))(data);
