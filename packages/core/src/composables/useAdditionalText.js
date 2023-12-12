import { ref } from 'vue';
import { watchOnce } from '@vueuse/core';
import { filter, prop } from 'ramda';

export function useAdditionalText(rows, key, t) {
  const text = ref('');
  const isVisible = ref(false);

  // Verenybírósági döntés: XYZ csapatától 2 pont, XYZ csapatától 2 pont levonva.
  const createText = (rows) => {
    const inheritedTeams = filter(prop(key), rows);
    // const inheritedTeams = rows.filter((row) => row.inherited_points);
    const visibility = inheritedTeams.length > 0;
    isVisible.value = visibility;

    if (!visibility) return (text.value = '');

    const teamObject = inheritedTeams.map((row) => ({
      team: row.team.longName,
      points: row.inherited_points,
    }));
    const convertedToText = teamObject.map((row) => t('key-team-points', row)).join(', ');
    text.value = [t('vb'), convertedToText, t('deducted')].join(' ');
  };

  watchOnce(rows, createText);

  return {
    text,
    isVisible,
  };
}
