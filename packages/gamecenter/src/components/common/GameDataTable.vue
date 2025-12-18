<script setup>
import { DataTable, FloatingPanel, ResponsiveTable } from '@mjsz-vbr-elements/core/components';
import { useI18n } from '@mjsz-vbr-elements/core/composables';
import { IconStar } from '@mjsz-vbr-elements/shared/icons';
import { ref } from 'vue';

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },

  rows: {
    type: Array,
    default: () => [],
  },

  title: {
    type: String,
    default: '',
  },

  sort: {
    type: Object,
    default: () => ({}),
  },
});
const emit = defineEmits(['sort']);

const tooltipContainer = ref(null);

const { t } = useI18n();

const onSort = payload => emit('sort', payload);
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <ResponsiveTable v-slot="{ el: rootElement }">
      <DataTable
        :columns="props.columns"
        :rows="props.rows"
        :append-to="tooltipContainer || rootElement"
        :sort="sort"
        @sort="onSort"
      >
        <template #cell-name="{ row }">
          {{ row.name }}
          <FloatingPanel v-if="row.isBP" placement="top" :content="t('bestPlayer')" :append-to="tooltipContainer">
            <template #default="{ setRef, events }">
              <span :ref="setRef" class="text-highlighted" v-bind="events">
                <IconStar />
              </span>
            </template>
          </FloatingPanel>
        </template>
        <template #cell-cora="{ row }">
          <template v-if="row.isPlayerC">
            C
          </template>
          <template v-if="row.isPlayerA">
            A
          </template>
        </template>
      </DataTable>
    </ResponsiveTable>
    <div ref="tooltipContainer" />
  </div>
</template>
