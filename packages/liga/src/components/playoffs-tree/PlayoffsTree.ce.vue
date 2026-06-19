<script setup>
import { ErrorNotice, I18NProvider, LoadingIndicator } from '@mjsz-vbr-elements/core/components';
import { useErrorProvider, useServices } from '@mjsz-vbr-elements/core/composables';
import { computed } from 'vue';
import { buildPlayoffTree } from './buildPlayoffTree.js';
// import { games } from './internal.js';

const props = defineProps({
  numberOfTeams: {
    type: Number,
    default: 6,
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

const { state: playoffs, isLoading } = useServices({
  options: {
    path: '/v2/playoffs-tree',
    apiKey: props.apiKey,
    params: computed(() => ({ championshipId: props.championshipId })),
    immediate: true,
  },
  onError,
});

const treeData = computed(() => buildPlayoffTree(playoffs.value.toReversed(), props.numberOfTeams));
// const treeData = computed(() => buildPlayoffTree(games.toReversed(), props.numberOfTeams));
const treeColumns = computed(() => Math.ceil(Math.log2(props.numberOfTeams)));

function nodeStyle(node) {
  const styles = { anchorName: `--${node.id}` };
  if (node.childIds.length >= 2) {
    styles['--child-top'] = `--${node.childIds[0]}`;
    styles['--child-bottom'] = `--${node.childIds[1]}`;
    styles['--self'] = `--${node.id}`;
  }
  return styles;
}
</script>

<template>
  <I18NProvider :locale="props.locale" :messages="messages">
    <ErrorNotice v-if="hasError" :error="error" />

    <LoadingIndicator v-if="isLoading" />

    <div v-else-if="!hasError" class="playoffs-tree" :style="{ gridTemplateColumns: `repeat(${treeColumns}, 1fr)` }">
      <div v-for="(column, colIndex) in treeData.columns" :key="colIndex" class="tree-column">
        <div
          v-for="(node, nodeIndex) in column"
          :key="nodeIndex"
          class="tree-node"
          :class="{ 'is-bye': node.type === 'bye', 'has-children': node.childIds.length > 0 }"
          :style="nodeStyle(node)"
        >
          <template v-if="node.type === 'match'">
            <div class="match-team">
              {{ node.match.homeTeam?.longName }}
            </div>
            <div class="match-result">
              {{ node.match.seriesStandings }}
            </div>
            <div class="match-team">
              {{ node.match.awayTeam?.longName }}
            </div>
          </template>
          <template v-else>
            <div class="bye-node" />
          </template>
        </div>
      </div>
    </div>
  </I18NProvider>
</template>

<style src="@mjsz-vbr-elements/shared/css/core.css" />

<style src="@mjsz-vbr-elements/shared/css/components/error-notice.css" />

<style src="@mjsz-vbr-elements/shared/css/components/playoffs-tree.css" />

<style lang="scss" scoped>
.tree-node {
  text-align: center;
}

.bye-node {
  min-height: 4rem;
  border: 1px dashed #e0e0e0;
  border-radius: 4px;
}
</style>
