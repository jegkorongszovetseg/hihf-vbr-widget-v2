import { COLUMNS_SCHEDULE, COLUMNS_STANDINGS_P_3 } from '@mjsz-vbr-elements/core/columns';

export const PANEL_SCHEDULE = 'schedule';
export const PANEL_STANDINGS = 'standings';
export const PANEL_PLAYERS = 'players';
export const PANEL_TEAMS = 'teams';

export const transformSections = (sections, state) => {
  state.championships = sections;
  state.selectedChampionshipId = sections?.[0]?.sectionId;
  state.phaseId = sections?.[0]?.phases[0]?.phaseId;
};

export const ALL_REPORTS_MAP = new Map()
  .set('schedule', {
    api: '/v2/games-list',
    columns: COLUMNS_SCHEDULE,
    sort: {},
  })
  .set('standings', {
    api: '/v2/standings',
    columns: COLUMNS_STANDINGS_P_3,
    sort: {},
  });
