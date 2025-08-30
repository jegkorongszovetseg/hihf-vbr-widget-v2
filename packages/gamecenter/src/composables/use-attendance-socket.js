import { useWebSocket } from '@vueuse/core';
import { computed, unref, watch } from 'vue';
import { getWebsocketURL } from '../utils/get-websocket-url';

export function useAttendanceSocket(gameData, gameId) {
  const { data, open, close } = useWebSocket(getWebsocketURL(`/socket/vbr/v2/game-attendance?gameid=${gameId}`), {
    autoReconnect: true,
    // heartbeat: true,
    immediate: false,
  });

  const visitors = computed(() => JSON.parse(data.value)?.visitor ?? 0);

  const visitorsLabelKey = computed(() => {
    const status = unref(gameData).gameStatus;
    if (status === 0)
      return 'gameData.visitorsWaiting';
    return 'gameData.visitors';
  });

  watch(() => unref(gameData).gameStatus, (status) => {
    if (status <= 1)
      return open();
    close();
  }, {
    immediate: true,
  });

  return {
    visitors,
    visitorsLabelKey,
  };
}
