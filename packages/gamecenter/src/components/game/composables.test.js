import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createApp, ref } from 'vue';
import { handleServices } from './composables';

describe('game/composables', () => {
  describe('handleServices', () => {
    const getGameData = vi.fn();
    const getGameStats = vi.fn();
    const getEvents = vi.fn();
    const getGameOfficials = vi.fn();

    beforeEach(() => {
      vi.useFakeTimers();
    });

    it('mérkőzés nem kezdődött el', async () => {
      const gameData = ref({});

      withSetup(() => handleServices({
        data: gameData,
        services: { getGameData, getGameStats, getEvents, getGameOfficials },
        interval: 30000,
      }));

      // handleServices({
      //   data: gameData,
      //   services: { getGameData, getGameStats, getEvents, getGameOfficials },
      //   interval: 30000,
      // });
      // console.log(getGameData.mock.calls);
      expect(getGameData).toBeCalled();
      await vi.advanceTimersByTimeAsync(1000);
      expect(getGameData).toBeCalled();

      gameData.value = {
        gameStatus: 0,
      };
      expect(getGameData).not.toBeCalled();

      gameData.value = {
        gameStatus: 1,
      };

      // console.log(getGameData.mock.calls);
      // expect(getGameOfficials).toHaveBeenCalled();
    });
  });
});

export function withSetup(composable) {
  let result;
  const app = createApp({

    setup() {
      result = composable();
      return () => {};
    },
  });

  // app.mount(
  //   document.createElement('div'),
  // );
  return [
    result,
    app,
  ];
}
