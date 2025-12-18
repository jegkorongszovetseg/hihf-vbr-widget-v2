import { convertAddress, format, map, omit, pick } from '@mjsz-vbr-elements/core/utils';

export const PAGE_INFO = 'Info';
export const PAGE_GAMES = 'Games';
export const PAGE_PLAYER_STATS = 'Stats';
export const PAGE_ROSTER = 'Roster';

export const COLUMNS_TEAM_INFO = {
  teamKeyIntl: {
    label: 'table.blank',
    class: 'text-start',
  },
  teamValue: {
    label: 'table.blank',
    class: 'text-start',
  },
};

export const COLUMNS_TEAM_INFO_ICERINK = {
  teamKey: {
    label: 'table.blank',
    class: 'text-start',
  },
  teamValue: {
    label: 'table.blank',
    class: 'text-start',
  },
};

export function transformTeamInfo(data) {
  const organizationdData = pick(
    ['organizationAddresses', 'organizationCountry', 'organizationEmail', 'organizationFoundingDate', 'organizationName', 'organizationPhoneNumber', 'organizationWebpage'],
    data,
  );
  const tableData = [];

  for (let [key, value] of Object.entries(organizationdData)) {
    if (key === 'organizationFoundingDate') {
      value = format(value, 'YYYY');
    }
    if (key === 'organizationAddresses') {
      value = convertAddress(value?.headquarter ?? {});
    }
    tableData.push({ teamKey: key, teamValue: value });
  }
  return { team: data?.team, organizationInfo: tableData };
}

export function removeSortOrders(columns) {
  return map(omit(['sortOrders']), columns);
}
