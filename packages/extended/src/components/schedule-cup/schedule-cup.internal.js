export const COLUMNS_SCHEDULE = {
  gameName: {
    label: 'table.gameName.short',
    tooltip: 'table.gameName.tooltip',
    class: 'text-start text-dimmed',
  },
  gameDateDate: {
    label: 'table.gameDate.short',
    tooltip: 'table.gameDate.tooltip',
    class: 'text-start',
  },
  gameDateTime: {
    label: 'table.gameDateTime.short',
    tooltip: 'table.gameDateTime.tooltip',
    class: 'text-start',
  },
  divisionName: {
    label: 'table.section.short',
    tooltip: 'table.section.tooltip',
    class: 'is-has-image text-dimmed',
  },
  homeTeamName: {
    label: 'table.organizer.short',
    tooltip: 'table.organizer.tooltip',
    class: 'text-start w-auto font-bold',
  },
  location: {
    label: 'table.location.short',
    tooltip: 'table.location.tooltip',
    class: 'text-start w-auto',
  },
  document: {
    label: 'table.document.short',
    tooltip: 'table.document.tooltip',
    class: 'text-start',
  },
};

export function transformRegistration(championshipId) {
  return data =>
    data.map(r => ({
      ...r,
      ...(r.registration && { registration: `${r.registration}/cid/${championshipId}` }),
    }));
}
