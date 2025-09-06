// import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { useWebSocket } from '@vueuse/core';
import { computed, unref, watch } from 'vue';

export function useGameDataSocket(path, gameData) {
  // const { t } = useI18n();

  const { data, open, close } = useWebSocket(unref(path), {
    autoReconnect: {
      retries: 3,
    },
    immediate: false,
    onMessage: (_, event) => {
      const eventData = event.data;
      const updateEventData = JSON.parse(eventData);
      // console.log(updateEventData);
      if (updateEventData.type === 'welcome')
        return;
      gameData.value = updateEventData.message;
    },
  });

  const visitors = computed(() => JSON.parse(data.value)?.visitor ?? 0);

  watch(() => unref(gameData).gameStatus, (status) => {
    if (status <= 1)
      return open();
    close();
  }, {
    immediate: true,
  });

  return {
    visitors,
  };
}
