<script setup>
import { computed } from 'vue';
import { useColumns } from '../composables/useColumns.js';
import { useError } from '../composables/useErrors';
import * as Errors from '../utils/errors';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '../constants';
import ResponsiveTable from './ResponsiveTable.vue';
import DataTable from './DataTable.vue';
import Image from './Image.vue';
import LoadingIndicator from './LoadingIndicator.vue';

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },

  rows: {
    type: Array,
    default: () => [],
  },

  isLoading: {
    type: Boolean,
    deafult: false,
  },

  hideColumns: {
    type: String,
    default: '',
  },

  sort: {
    type: Object,
    default: () => ({}),
  },

  externalTeamResolver: {
    type: Function,
    required: true,
  },

  externalPlayerResolver: {
    type: Function,
    default: () => {},
  },

  isTeamLinked: {
    type: Boolean,
    default: false,
  },

  isPlayerLinked: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['sort']);

const { onError } = useError();

const currentColumns = computed(() => props.columns);
const { columns, error } = useColumns(currentColumns, props.hideColumns);
if (error.value)
  onError(
    new Errors.WidgetError(Errors.UndefinedColumn.message, {
      ...Errors.UndefinedColumn.options,
      cause: { column: error.value },
    })
  );

const onSort = (payload) => emit('sort', payload);
</script>

<template>
  <ResponsiveTable v-slot:default="{ el: rootElement }">
    <DataTable
      :columns="columns"
      :sort="props.sort"
      :rows="props.rows"
      :is-loading="isLoading"
      :append-to="rootElement"
      @sort="onSort"
    >
      <template v-slot:cell-index="{ row }">
        <span :class="row.indexClass">
          {{ row.index }}
        </span>
      </template>
      <template v-slot:cell-playerPortrait="{ row }">
        <div class="is-portrait-image">
          <Image :key="row.id || row.playerId" :src="row.playerPortrait" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>
      <template v-slot:cell-teamLogo="{ row }">
        <Image class="is-logo-image" :key="row.teamId || row.id" :src="row.teamLogo" />
      </template>
      <template v-if="isTeamLinked" v-slot:cell-teamName="{ row }">
        <a :href="externalTeamResolver(row.teamName)" target="_blank">{{ row.teamName }}</a>
      </template>
      <template v-if="isPlayerLinked" v-slot:cell-name="{ row }">
        <a :href="externalPlayerResolver(row.id)" target="_blank">{{ row.name }}</a>
      </template>

      <template v-slot:loading>
        <LoadingIndicator />
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
