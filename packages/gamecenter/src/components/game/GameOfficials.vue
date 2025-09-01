<script setup>
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { compose, isEmpty, join, map, reject } from 'ramda';
import { computed, toRefs } from 'vue';
// import { useAttendanceSocket } from '../../composables/use-attendance-socket';
// import { getWebsocketURL } from '../../utils/get-websocket-url';
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

  // gameId: {
  //   type: [Number, String],
  //   default: 0,
  // },
});

const { gameData } = toRefs(props);

const { t } = useI18n();

// const { visitors, visitorsLabelKey } = useAttendanceSocket(getWebsocketURL(`/socket/vbr/v2/game-attendance?gameid=${props.gameId}`), gameData);

const attendanceData = computed(() => {
  // if (gameData.value.gameStatus <= 1)
  //   return t(visitorsLabelKey.value, [visitors.value]);
  return gameData.value?.attendance ?? 0;
});

const referees = computed(() =>
  compose(
    join(', '),
    map(item => `${item.lastName} ${item.firstName}`),
    reject(item => !item),
  )([props.gameOfficials?.gameOfficials?.first_referee, props.gameOfficials?.gameOfficials?.second_referee]),
);
const linesmen = computed(() =>
  compose(
    join(', '),
    map(item => `${item.lastName} ${item.firstName}`),
    reject(item => !item),
  )([
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
