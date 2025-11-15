<script setup>
import { SORT_STATE_DESCEND } from '@mjsz-vbr-elements/core';
import {
  ErrorNotice,
  I18NProvider,
  LoadingIndicator,
} from '@mjsz-vbr-elements/core/components';
import { useErrorProvider, useServices } from '@mjsz-vbr-elements/core/composables';
import { convert, externalPlayerLinkResolver, externalStatisticLinkResolver, externalTeamLinkResolver, isEmpty, last } from '@mjsz-vbr-elements/core/utils';
import { useArraySome } from '@vueuse/core';
import { computed, ref } from 'vue';
import en from '../../locales/en.json';
import hu from '../../locales/hu.json';
import { groupSections } from './internal';
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

const phaseBaseId = ref(0);

const { onError, error, hasError, reset } = useErrorProvider();

const { isLoading: isSectionsLoading, state: sections, execute: fetchSections } = useServices({
  options: {
    path: '/v2/championship-sections',
    apiKey: props.apiKey,
    params: { championshipId: props.championshipId },
    immediate: true,
  },
  transform: data => groupSections(data[0].phases || []),
  onSuccess: (data) => {
    phaseBaseId.value = last(data)?.phaseBaseId ?? 0;
    fetchData();
  },
  onError,
});

const { isLoading: isPlayersStatsLoading, state: playersStats, execute: fetchPlayerStats } = useServices({
  options: {
    path: '/v2/players-stats',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, phaseBaseId: phaseBaseId.value })),
    immediate: false,
  },
  onError,
});

const { isLoading: isGoaliesStatsLoading, state: goaliesStats, execute: fetchGoaliesStats } = useServices({
  options: {
    path: '/v2/players-goalie',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, phaseBaseId: phaseBaseId.value, more: true })),
    immediate: false,
  },
  onError,
});

const { isLoading: isPlayersPenaltyStatsLoading, state: penaltyStats, execute: fetchPenaltyStats } = useServices({
  options: {
    path: '/v2/players-penalty',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId, phaseBaseId: phaseBaseId.value })),
    immediate: false,
  },
  onError,
});

const isLoading = useArraySome([isPlayersStatsLoading, isGoaliesStatsLoading, isPlayersPenaltyStatsLoading, isSectionsLoading], Boolean);

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

function fetchData() {
  fetchPlayerStats();
  fetchGoaliesStats();
  fetchPenaltyStats();
}

function onChangeSection(id) {
  phaseBaseId.value = id;
  fetchData();
}

function onRetry() {
  reset();
  fetchSections();
  fetchData();
}
</script>

<template>
  <I18NProvider v-slot="{ t }" :locale="props.locale" :messages="messages">
    <div class="liga-top-list" data-theme="dark">
      <div v-if="hasError" style="padding: 1rem;">
        <ErrorNotice :error="error" use-retry @retry="onRetry" />
      </div>
      <template v-else>
        <nav v-if="!isEmpty(sections) && sections.length > 1" class="tabs underlined">
          <div role="tablist" class="liga-top-list-selector">
            <button
              v-for="section in sections"
              :key="section.phaseBaseId"
              role="tab"
              type="button"
              :aria-selected="section.phaseBaseId === phaseBaseId"
              @click="onChangeSection(section.phaseBaseId)"
            >
              {{ section.phaseName }}
            </button>
          </div>
        </nav>

        <LoadingIndicator v-if="isLoading" />

        <div v-else class="grid-container" style="--min-width: 185px; --gap: 0;">
          <TopListContainer :title="t('report.points')" :list="points.rows" data-key="points" external-id="points" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
          <TopListContainer :title="t('report.goals')" :list="goals.rows" data-key="goals" external-id="goals" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
          <TopListContainer :title="t('report.assists')" :list="assists.rows" data-key="assists" external-id="assists" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
          <TopListContainer :title="t('report.goalies')" :list="goalies.rows" data-key="svsPercent" external-id="goalies" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
          <TopListContainer :title="t('report.penalties')" :list="penalty.rows" data-key="pim" external-id="playerspenalties" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
          <TopListContainer title="+/-" :list="plusMinus.rows" data-key="plusMinus" external-id="plusminus" :player-resolver="externalPlayerLink" :team-resolver="externalTeamLink" :stat-resolver="externalStatsLink" />
        </div>
      </template>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/tabs.css" />

<style src="@mjsz-vbr-elements/shared/css/components/top-list.css" />

<style src="@mjsz-vbr-elements/shared/css/components/avatar.css" />
