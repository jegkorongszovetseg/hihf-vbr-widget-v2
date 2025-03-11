export function groupSections(data) {
  const groupedBy = data.reduce((acc, item) => {
    if (!acc.has(item.phaseBaseId)) {
      acc.set(item.phaseBaseId, { phaseBaseId: item.phaseBaseId, phaseName: item.phaseName });
    }
    return acc;
  }, new Map());

  return Array.from(groupedBy, ([_, value]) => (value));
}
