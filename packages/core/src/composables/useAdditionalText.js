import { ref } from 'vue';
import { watchOnce } from '@vueuse/core';
import { filter, prop } from 'ramda';

export function useAdditionalText(rows, key, t) {
  const text = ref('');
  const isVisible = ref(false);

  // Verenybírósági döntés: XYZ csapatától 2 pont, XYZ csapatától 2 pont levonva.
  const createText = (rows) => {
    const inheritedTeams = filter(prop(key), rows);
    const visibility = inheritedTeams.length > 0;
    isVisible.value = visibility;

    if (!visibility) return (text.value = '');

    const teamObject = inheritedTeams.map((row) => ({
      team: row.team.longName,
      points: prop(key, row),
    }));
    const convertedToText = teamObject.map((row) => t(`additionalText.${key}.content`, row)).join(', ');
    text.value = [
      t(`additionalText.${key}.prependix`),
      convertedToText,
      ...(t(`additionalText.${key}.appendix`) && [t(`additionalText.${key}.appendix`)]),
    ].join(' ');
  };

  watchOnce(rows, createText);

  return {
    text,
    isVisible,
  };
}
