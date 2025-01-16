import { playerName } from '@mjsz-vbr-elements/core';
import { keys, map } from 'ramda';

export function convertTeamMembersToRows(data, t) {
  const members = map((key) => {
    return {
      ...(data[key].name ? { name: data[key].name } : data[key].firstName ? playerName(data[key]) : { name: '' }),
      role: t(`teamMembers.${key}`),
    };
  })(keys(data));
  return members;
}
