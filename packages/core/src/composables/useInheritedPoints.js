import { ref } from 'vue';
import { watchOnce } from '@vueuse/core';

export function useInheritedPoints(rows, t) {
  const text = ref('');
  const isVisible = ref(false);

  // Verenybírósági döntés: XYZ csapatától 2 pont, XYZ csapatától 2 pont levonva.
  const createText = (rows) => {
    const inheritedTeams = rows.filter((row) => row.inherited_points);
    const isVisible = inheritedTeams.length > 0;
    isVisible.value = isVisible;

    if (!isVisible) return (text.value = '');

    const teamObject = inheritedTeams.map((row) => ({
      team: row.team.longName,
      points: row.inherited_points,
    }));
    const convertedToText = teamObject.map((row) => t('key-team-points', row)).join(', ');
    text.value = [t('vb'), convertedToText, t('deducted')].join(' ');
  };

  watchOnce(rows, createText, { immediate: true });

  return {
    text,
    isVisible,
  };
}
