<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { isEmpty } from '@mjsz-vbr-elements/core/utils';
import { computed, toRefs } from 'vue';
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

const { gameData } = toRefs(props);

const { t } = useI18n();

const attendanceData = computed(() => {
  return gameData.value?.attendance ?? 0;
});

const referees = computed(() =>
  joinOfficals([props.gameOfficials?.gameOfficials?.first_referee, props.gameOfficials?.gameOfficials?.second_referee]),
);
const linesmen = computed(() =>
  joinOfficals([
    props.gameOfficials?.gameOfficials?.first_line_judge,
    props.gameOfficials?.gameOfficials?.second_line_judge,
  ]),
);
</script>

<template>
  <div v-if="!isEmpty(referees) || !isEmpty(linesmen)" class="gamecenter-game-stats">
    <div class="gamecenter-game-stats-container-wrapper">
      <GameStatsContainer :title="t('gameStats.referees')" :data="referees" />
      <GameStatsContainer :title="t('gameStats.linesmen')" :data="linesmen" />
      <GameStatsContainer v-if="gameData.attendance" :title="t('gameStats.attendance')" :data="attendanceData" />
    </div>
  </div>
</template>
