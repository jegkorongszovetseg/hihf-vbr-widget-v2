import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { useWebSocket } from '@vueuse/core';
import { computed, unref, watch } from 'vue';

export function useAttendanceSocket(path, gameData) {
  const { t } = useI18n();

  const { data, open, close } = useWebSocket(unref(path), {
    autoReconnect: {
      retries: 3,
    },
    immediate: false,
  });

  const visitors = computed(() => JSON.parse(data.value)?.visitor ?? 0);

  const isVisible = computed(() => visitors.value > 0);

  const visitorsLabel = computed(() => {
    const status = unref(gameData).gameStatus;
    if (status === 0)
      return t('gameData.visitorsWaiting', [visitors.value]);
    return t('gameData.visitors', [visitors.value]);
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
    isVisible,
    visitorsLabel,
  };
}
