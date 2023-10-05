export const transformSections = (sections, state) => {
  // state.sections = sections;
  state.championships = sections;
  state.selectedChampionshipId = sections?.[0]?.sectionId;
  state.phaseId = sections?.[0]?.phases[0]?.phaseId;
  // state.section = compose(prop('phaseName'), head)(state.sections);
};
