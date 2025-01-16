import { map } from 'ramda';

export const COLUMNS_SCHEDULE = {
  gameName: {
    label: 'table.gameName.short',
    tooltip: 'table.gameName.tooltip',
    class: 'is-text-left is-text-light',
  },
  gameDateDate: {
    label: 'table.gameDate.short',
    tooltip: 'table.gameDate.tooltip',
    class: 'is-text-left',
  },
  gameDateTime: {
    label: 'table.gameDateTime.short',
    tooltip: 'table.gameDateTime.tooltip',
    class: 'is-text-left',
  },
  divisionName: {
    label: 'table.section.short',
    tooltip: 'table.section.tooltip',
    class: 'is-has-image is-text-light',
  },
  homeTeamName: {
    label: 'table.organizer.short',
    tooltip: 'table.organizer.tooltip',
    class: 'is-text-left is-w-auto is-text-bold',
  },
  location: {
    label: 'table.location.short',
    tooltip: 'table.location.tooltip',
    class: 'is-text-left is-w-auto',
  },
  document: {
    label: 'table.document.short',
    tooltip: 'table.document.tooltip',
    class: 'is-text-left',
  },
};

export function transformRegistration(championshipId) {
  return data =>
    map(r => ({
      ...r,
      ...(r.registration && { registration: `${r.registration}/cid/${championshipId}` }),
    }))(data);
}
