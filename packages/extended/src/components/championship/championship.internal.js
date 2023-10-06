export const PANEL_SCHEDULE = 'schedule';
export const PANEL_STANDINGS = 'standings';
export const PANEL_PLAYERS = 'players';
export const PANEL_TEAMS = 'teams';

export const transformSections = (sections, state) => {
  state.championships = sections;
  state.selectedChampionshipId = sections?.[0]?.sectionId;
  state.phaseId = sections?.[0]?.phases[0]?.phaseId;
};
