<script setup>
import { ErrorNotice, I18NProvider, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import { useErrorProvider, useServices } from '@mjsz-vbr-elements/core/composables';
import { groupBy, prop as Rprop } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';

const props = defineProps({
  numberOfTeams: {
    type: Number,
    default: 8,
  },
  championshipId: {
    type: [Number, String],
    default: 0,
  },
  apiKey: {
    type: String,
    default: '',
  },
});

const { onError, error, hasError } = useErrorProvider();

// const treeColumns = computed(() => Math.log2(props.numberOfTeams));

const { state: playoffs, isLoading } = useServices({
  options: {
    path: '/v2/playoffs-tree',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId })),
    immediate: true,
  },
  onError,
});

const groupLines = groupBy(Rprop('divisionStage2Name'));

const grouped = computed(() => groupLines(playoffs.value.toReversed()));
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorNotice v-if="hasError" :error="error" />

    <LoadingIndicator v-if="isLoading" />

    <div class="tree-container">
      <div v-for="(columns, key) in grouped" :key="key">
        <div v-for="(match, index) in columns" :key="index">
          {{ match.divisionStage2Name }}
          <div>{{ match.homeTeam.longName }}</div>
          <div>{{ match.awayTeam.longName }}</div>
        </div>
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style lang="scss" scoped>
.tree-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  > div {
    display: grid;
    align-content: space-around;
    gap: 2rem;
  }
}
</style>
