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

const referees = computed(() => props.gameOfficials?.gameOfficials?.['Játékvezető'].join(', ') ?? '');
const linesmen = computed(() => props.gameOfficials?.gameOfficials?.['Vonalbíró'].join(', ') ?? '');
</script>

<template>
  <div :class="useMainClass('gamecenter-game-stats')">
    <div :class="useMainClass('gamecenter-game-stats-container-wrapper')">
      <GameStatsContainer title="JÁTÉKVEZETŐ" :data="referees" />
      <GameStatsContainer title="VONALBÍRÓ" :data="linesmen" />
      <GameStatsContainer title="NÉZŐSZÁM" :data="gameData?.attendance ?? 0" />
    </div>
  </div>
</template>
