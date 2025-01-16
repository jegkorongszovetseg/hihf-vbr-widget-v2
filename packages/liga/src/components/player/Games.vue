<script setup>
import { useColumns } from '@mjsz-vbr-elements/core/composables';
import { externalGameLinkResolver, offsetName } from '@mjsz-vbr-elements/core/utils';
import { computed } from 'vue';
import GamesDataTable from '../common/GamesDataTable.vue';

const props = defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },

  isLoading: {
    type: Boolean,
    default: false,
  },

  gameResolver: {
    type: [String, Function],
    default: '',
  },

  championshipId: {
    type: String,
    default: '',
  },
});

const { columns } = useColumns(
  computed(() => props.columns),
  null,
  computed(() => ({ offsetName: offsetName(new Date(), null, 'hu') })),
);
const resolveExternalGameLink = params => externalGameLinkResolver(props.gameResolver, params);
</script>

<template>
  <GamesDataTable :rows="rows" :columns="columns" :is-loading="isLoading" :append-to="appendTo" :game-resolver="resolveExternalGameLink" />
</template>
