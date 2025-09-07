import { useWebSocket } from '@vueuse/core';
import { unref, watch } from 'vue';

export function useGameDataSocket(path, gameData) {
  const { open, close } = useWebSocket(unref(path), {
    autoReconnect: {
      retries: 3,
    },
    immediate: false,
    onMessage: (_, event) => {
      const eventData = event.data;
      const updateEventData = JSON.parse(eventData);
      if (updateEventData.type === 'welcome')
        return;
      gameData.value = updateEventData.message;
    },
  });

  watch(() => unref(gameData).gameStatus, (status) => {
    if (status === 1)
      return open();
    close();
  }, {
    immediate: true,
  });

  return {
    gameData,
  };
}
