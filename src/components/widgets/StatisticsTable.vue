<script setup>
import { computed } from 'vue';
import { useColumns } from '../../composables/useColumns.js';
import ResponsiveTable from '../ResponsiveTable.vue';
import Image from '../Image.vue';
import DataTable from '../DataTable.vue';
import ErrorNotice from '../ErrorNotice.vue';
import { DEFAULT_PORTRAIT_IMAGE_URL } from '../../constants';

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
});

const emit = defineEmits(['sort']);

const currentColumns = computed(() => props.columns);
const { columns, error } = useColumns(currentColumns.value, props.hideColumns);

const onSort = (payload) => emit('sort', payload);
</script>

<template>
  <ErrorNotice v-if="error">{{ error }}</ErrorNotice>
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
          <Image :key="row.id" :src="row.playerPortrait" :default-src="DEFAULT_PORTRAIT_IMAGE_URL" />
        </div>
      </template>
      <template v-slot:cell-teamLogo="{ row }">
        <Image class="is-logo-image" :key="row.teamId" :src="row.teamLogo" />
      </template>
    </DataTable>
  </ResponsiveTable>
</template>
