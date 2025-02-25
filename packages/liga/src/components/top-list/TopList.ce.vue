<script setup>
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import {
  I18NProvider,
  LoadingIndicator,
} from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { convert } from '@mjsz-vbr-elements/core/utils';
import { useArraySome } from '@vueuse/core';
import { computed } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import TopListContainer from './List.vue';

const props = defineProps({
  locale: {
    type: String,
    default: 'hu',
  },

  apiKey: {
    type: String,
    default: '',
  },

  championshipId: {
    type: String,
    default: '',
  },

  externalTeamResolver: {
    type: String,
    default: '',
  },

  externalPlayerResolver: {
    type: String,
    default: '',
  },

  externalStatisticResolver: {
    type: String,
    default: '',
  },
});

const messages = { en, hu };

const { isLoading: isPlayersStatsLoading, state: playersStats } = useServices({
  options: {
    path: '/v2/players-stats',
    apiKey: props.apiKey,
    params: { championshipId: props.championshipId },
    immediate: true,
  },
  // onError,
});

const { isLoading: isGoaliesStatsLoading, state: goaliesStats } = useServices({
  options: {
    path: '/v2/players-goalie',
    apiKey: props.apiKey,
    params: { championshipId: props.championshipId, more: true },
    immediate: true,
  },
  // onError,
});

const { isLoading: isPlayersPenaltyStatsLoading, state: penaltyStats } = useServices({
  options: {
    path: '/v2/players-penalty',
    apiKey: props.apiKey,
    params: { championshipId: props.championshipId },
    immediate: true,
  },
  // onError,
});

const isLoading = useArraySome([isPlayersStatsLoading, isGoaliesStatsLoading, isPlayersPenaltyStatsLoading], Boolean);

const points = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'points',
  orders: [{ target: 'points', direction: SORT_STATE_DESCEND }, { target: 'goals', direction: SORT_STATE_DESCEND }],
}).slice().playerName().value());

const goals = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'goals',
  orders: [{ target: 'goals', direction: SORT_STATE_DESCEND }, { target: 'assists', direction: SORT_STATE_DESCEND }],
}).slice().playerName().value());

const assists = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'assists',
  orders: [{ target: 'assists', direction: SORT_STATE_DESCEND }, { target: 'goals', direction: SORT_STATE_DESCEND }],
}).slice().playerName().value());

const plusMinus = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'plusMinus',
  orders: [{ target: 'plusMinus', direction: SORT_STATE_DESCEND }],
}).slice().playerName().value());

const goalies = computed(() => convert(goaliesStats.value).sorted({
  sortTarget: 'svsPercent',
  orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
}).slice().playerName().value());

const penalty = computed(() => convert(penaltyStats.value).sorted({
  sortTarget: 'pim',
  orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
}).slice().playerName().value());
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <LoadingIndicator v-if="isLoading" />
    <div class="liga-top-list">
      <TopListContainer title="Pontok" :list="points.rows" data-key="points" />
      <TopListContainer title="Gólok" :list="goals.rows" data-key="goals" />
      <TopListContainer title="Gólpasszok" :list="assists.rows" data-key="assists" />
      <TopListContainer title="Kapusok" :list="goalies.rows" data-key="svsPercent" />
      <TopListContainer title="Büntetések" :list="penalty.rows" data-key="pim" />
      <TopListContainer title="+/-" :list="plusMinus.rows" data-key="plusMinus" />
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/top-list.scss" lang="scss"></style>
