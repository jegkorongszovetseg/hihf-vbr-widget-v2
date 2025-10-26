import { playerName } from '@mjsz-vbr-elements/core/utils';

export function convertTeamMembersToRows(data, t) {
  const members = Object.keys(data).map((key) => {
    return {
      ...(data[key].name ? { name: data[key].name } : data[key].firstName ? playerName(data[key]) : { name: '' }),
      role: t(`teamMembers.${key}`),
    };
  });
  return members;
}
