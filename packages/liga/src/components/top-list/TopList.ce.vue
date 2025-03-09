<script setup>
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import {
  I18NProvider,
  LoadingIndicator,
} from '@mjsz-vbr-elements/core/components';
import { useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, externalPlayerLinkResolver, externalStatisticLinkResolver, externalTeamLinkResolver } from '@mjsz-vbr-elements/core/utils';
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

  limit: {
    type: [Number, String],
    default: 3,
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
}).slice(props.limit).playerName().value());

const goals = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'goals',
  orders: [{ target: 'goals', direction: SORT_STATE_DESCEND }, { target: 'assists', direction: SORT_STATE_DESCEND }],
}).slice(props.limit).playerName().value());

const assists = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'assists',
  orders: [{ target: 'assists', direction: SORT_STATE_DESCEND }, { target: 'goals', direction: SORT_STATE_DESCEND }],
}).slice(props.limit).playerName().value());

const plusMinus = computed(() => convert(playersStats.value).sorted({
  sortTarget: 'plusMinus',
  orders: [{ target: 'plusMinus', direction: SORT_STATE_DESCEND }],
}).slice(props.limit).playerName().value());

const goalies = computed(() => convert(goaliesStats.value).sorted({
  sortTarget: 'svsPercent',
  orders: [{ target: 'svsPercent', direction: SORT_STATE_DESCEND }],
}).slice(props.limit).playerName().value());

const penalty = computed(() => convert(penaltyStats.value).sorted({
  sortTarget: 'pim',
  orders: [{ target: 'pim', direction: SORT_STATE_DESCEND }],
}).slice(props.limit).playerName().value());

const externalPlayerLink = params => externalPlayerLinkResolver(props.externalPlayerResolver, { ...params, championshipId: props.championshipId });
const externalTeamLink = params => externalTeamLinkResolver(props.externalTeamResolver, { ...params, championshipId: props.championshipId });
const externalStatsLink = id => externalStatisticLinkResolver(props.externalStatisticResolver, { id });
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
    <div class="liga-top-list">
      <LoadingIndicator v-if="isLoading" />
      <div v-else class="liga-top-list-wrapper">
        <TopListContainer :title="t('report.points')" :list="points.rows" data-key="points" external-id="points" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
        <TopListContainer :title="t('report.goals')" :list="goals.rows" data-key="goals" external-id="goals" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
        <TopListContainer :title="t('report.assists')" :list="assists.rows" data-key="assists" external-id="assists" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
        <TopListContainer :title="t('report.goalies')" :list="goalies.rows" data-key="svsPercent" external-id="goalies" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
        <TopListContainer :title="t('report.penalties')" :list="penalty.rows" data-key="pim" external-id="playerspenalties" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
        <TopListContainer title="+/-" :list="plusMinus.rows" data-key="plusMinus" external-id="plusminus" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/common.scss" lang="scss"></style>

<style src="@mjsz-vbr-elements/shared/css/top-list.scss" lang="scss"></style>
