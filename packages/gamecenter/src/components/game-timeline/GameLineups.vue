<script setup>
import { computed } from 'vue';
import { useMainClass, useI18n } from '@mjsz-vbr-elements/core/composables';
import { Image } from '@mjsz-vbr-elements/core/components';
import { playerName } from '@mjsz-vbr-elements/core/utils';
import IconHockeyPuck from '@mjsz-vbr-elements/shared/icons/IconHockeyPuck';
import { groupLines } from './internal';

const props = defineProps({
  data: {
    type: Object,
    daefault: () => ({}),
  },

  homeTeamId: {
    type: Number,
  },

  homeTeamName: {
    type: String,
    default: '',
  },

  awayTeamId: {
    type: Number,
  },

  awayTeamName: {
    type: String,
    default: '',
  },
});

const { t } = useI18n();

const homePlayers = computed(() => groupLines(props.data?.[props.homeTeamId] ?? []));
const awayPlayers = computed(() => groupLines(props.data?.[props.awayTeamId] ?? []));
</script>
<template>
  <div :class="useMainClass('gamecenter-timeline-lineups')">
    <div>
      <!-- <h1 class="is-heading-1">{{ homeTeamName }}</h1> -->
      <template v-for="(row, index) in homePlayers">
        <h2 class="is-heading-2">{{ t(`rows.row-${index}`) }}</h2>
        <div :class="useMainClass('gamecenter-timeline-lineups-lines')">
          <ul v-for="player in row" :key="player.position" :class="['is-player-wrapper', `is-${player.position}`]">
            <li><Image :src="player.player.picture" /></li>
            <li>{{ player.number }}</li>
            <li>{{ playerName(player)?.name ?? '' }} <IconHockeyPuck v-for="i in player.goal" /></li>
            <li>{{ player.position }}</li>
          </ul>
        </div>
      </template>
    </div>

    <div>
      <!-- <h1 class="is-heading-1">{{ awayTeamName }}</h1> -->
      <template v-for="(row, index) in awayPlayers">
        <h2 class="is-heading-2">{{ t(`rows.row-${index}`) }}</h2>
        <div :class="[useMainClass('gamecenter-timeline-lineups-lines'), 'is-away-team']">
          <ul v-for="player in row" :key="player.position" :class="['is-player-wrapper', `is-${player.position}`]">
            <li><Image :src="player.player.picture" /></li>
            <li>{{ player.number }}</li>
            <li>{{ playerName(player)?.name ?? '' }} <IconHockeyPuck v-for="i in player.goal" /></li>
            <li>{{ player.position }}</li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
