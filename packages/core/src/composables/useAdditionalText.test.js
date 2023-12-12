import { ref, nextTick } from 'vue';
import { expect, describe, it, vi } from 'vitest';
import { useInheritedPoints } from './useAdditionalText';

describe('useInheritedPoints', () => {
  const mockT = vi.fn().mockImplementation(handleLabels);

  it('Vissza kell adnia egy csapat nevét és a levont pontokat mondatba', async () => {
    const rows = ref([]);

    const { isVisible, text } = useInheritedPoints(rows, mockT);
    await nextTick();

    rows.value = [
      {
        team: {
          longName: 'TeamA',
        },
        inherited_points: 2,
      },
    ];
    await nextTick();

    expect(isVisible.value).toBe(true);
    expect(text.value).toBe('VB határozat: TeamA csapatától 2 pont levonva.');

    rows.value = [
      {
        team: {
          longName: 'TeamB',
        },
        inherited_points: 5,
      },
    ];
    await nextTick();
    console.log('isVisible:', isVisible.value, text.value);
  });

  // it('Vissza kell adnia két csapat nevét és a levont pontokat mondatba', async () => {
  //   const rows = [
  //     {
  //       team: {
  //         longName: 'TeamA',
  //       },
  //       inherited_points: 1,
  //     },
  //     {
  //       team: {
  //         longName: 'TeamB',
  //       },
  //       inherited_points: 2,
  //     },
  //   ];

  //   const [results, app] = withSetup(() =>
  //     useInheritedPoints(
  //       computed(() => rows),
  //       mockT
  //     )
  //   );
  //   expect(results.isVisible.value).toBe(true);
  //   expect(results.text.value).toBe('VB határozat: TeamA csapatától 1 pont, TeamB csapatától 2 pont levonva.');

  //   app.unmount();
  // });

  // it('A szöveg nem jelenik meg, ha nincs pontlevonás', async () => {
  //   const rows = [
  //     {
  //       team: {
  //         longName: 'TeamA',
  //       },
  //       inherited_points: null,
  //     },
  //   ];

  //   const [results, app] = withSetup(() =>
  //     useInheritedPoints(
  //       computed(() => rows),
  //       mockT
  //     )
  //   );
  //   expect(results.isVisible.value).toBe(false);

  //   app.unmount();
  // });
});

function handleLabels(key, params) {
  switch (key) {
    case 'vb':
      return 'VB határozat:';
      break;
    case 'key-team-points':
      return `${params.team} csapatától ${params.points} pont`;
      break;
    case 'deducted':
      return 'levonva.';
      break;

    default:
      break;
  }
}
