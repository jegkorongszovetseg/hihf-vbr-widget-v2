import { ref, nextTick } from 'vue';
import { expect, describe, it, vi } from 'vitest';
import { path, split } from 'ramda';
import { useAdditionalText } from './useAdditionalText';
import hu from '../locales/hu.json';

describe('useAdditionalText', () => {
  const mockT = vi.fn().mockImplementation(handleLabels);

  it('Működik, hogy csak az első betültés után változnak az adatok (watchOnce)', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'inheritedPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        inheritedPoints: 2,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(true);

    rows.value = [
      {
        team: {
          longName: 'TeamB',
        },
        inheritedPoints: 5,
      },
    ];
    await nextTick();
    expect(isVisible.value).toBe(true);
  });

  it('Hozott pontok szöveg nem jelenik meg, mert nincs olyan csapat', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'inheritedPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        inheritedPoints: null,
      },
      {
        team: {
          longName: 'TeamB',
        },
        inheritedPoints: null,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(false);
    expect(text.value).toBe('');
  });

  it('Hozott pontok szöveg megjelenik, ha van egy inheritedPoints tartalmazó csapat', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'inheritedPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        inheritedPoints: 2,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(true);
    expect(text.value).toBe('Hozott pontok: TeamA 2 pont');

    // console.log('isVisible:', isVisible.value, text.value);
  });

  it('Hozott pontok szöveg megjelenik - és vesszővel van elválasztva - ha van több inheritedPoints tartalmazó csapat', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'inheritedPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        inheritedPoints: 3,
      },
      {
        team: {
          longName: 'TeamB',
        },
        inheritedPoints: 2,
      },
      {
        team: {
          longName: 'TeamC',
        },
        inheritedPoints: 1,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(true);
    expect(text.value).toBe('Hozott pontok: TeamA 3 pont, TeamB 2 pont, TeamC 1 pont');
  });

  it('Büntető pontok szöveg nem jelenik meg, mert nincs olyan csapat', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'penaltyPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        penaltyPoints: null,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(false);
    expect(text.value).toBe('');
  });

  it('Büntető pontok szöveg megjelenik, ha van egy penaltyPoints tartalmazó csapat', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'penaltyPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        penaltyPoints: 2,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(true);
    expect(text.value).toBe('Versenybírósági döntés: TeamA csapatától 2 pont levonva.');
  });

  it('Büntető pontok szöveg megjelenik - és vesszővel van elválasztva -, ha van több penaltyPoints tartalmazó csapat', async () => {
    const rows = ref([]);

    const { isVisible, text } = useAdditionalText(rows, 'penaltyPoints', mockT);
    await nextTick();

    expect(isVisible.value).toBe(false);

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        penaltyPoints: 2,
      },
      {
        team: {
          longName: 'TeamB',
        },
        penaltyPoints: 1,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(true);
    expect(text.value).toBe('Versenybírósági döntés: TeamA csapatától 2 pont, TeamB csapatától 1 pont levonva.');
  });
});

function handleLabels(key, params) {
  switch (key) {
    case 'additionalText.inheritedPoints.content':
      return `${params.team} ${params.points} pont`;
    case 'additionalText.penaltyPoints.content':
      return `${params.team} csapatától ${params.points} pont`;
    default:
      return path(split('.', key), hu);
  }
}
