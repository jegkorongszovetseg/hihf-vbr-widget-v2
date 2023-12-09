import { ref, watch } from 'vue';
import { watchOnce } from '@vueuse/core';

export function useInheritedPoints(rows, t) {
  const text = ref('');
  const isVisible = ref(false);

  // Verenybírósági döntés: XYZ csapatától 2 pont, XYZ csapatától 2 pont levonva.
  const createText = (rows) => {
    const actualTeams = rows.filter((row) => row.inherited_points);
    isVisible.value = actualTeams.length > 0;

    const mapObject = actualTeams.map((row) => ({
      team: row.team.longName,
      points: row.inherited_points,
    }));
    const convertedToText = mapObject.map((row) => t('key-team-points', row)).join(', ');
    text.value = [t('vb'), convertedToText, t('deducted')].join(' ');
  };

  watchOnce(rows, createText, { immediate: true });

  return {
    text,
    isVisible,
  };
}

function createMockResolveValue(data) {
  return {
    json: () => new Promise((resolve) => resolve(data)),
    ok: true,
  };
}
