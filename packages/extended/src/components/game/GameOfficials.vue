<script setup>
import { computed } from 'vue';
import { useI18n, useMainClass } from '@mjsz-vbr-elements/core/composables';
import GameStatsContainer from './components/GameStatsContainer.vue';

const props = defineProps({
  gameOfficials: {
    type: Object,
    required: true,
  },

  gameData: {
    type: Object,
    required: true,
  },
});

const { t } = useI18n();

const referees = computed(() => props.gameOfficials?.gameOfficials?.['Játékvezető'].join(', ') ?? '');
const linesmen = computed(() => props.gameOfficials?.gameOfficials?.['Vonalbíró'].join(', ') ?? '');
</script>

<template>
  <div :class="useMainClass('gamecenter-game-stats')">
    <div :class="useMainClass('gamecenter-game-stats-container-wrapper')">
      <GameStatsContainer :title="t('gameStats.referees')" :data="referees" />
      <GameStatsContainer :title="t('gameStats.linesmen')" :data="linesmen" />
      <GameStatsContainer :title="t('gameStats.attendance')" :data="gameData?.attendance ?? 0" />
    </div>
  </div>
</template>
