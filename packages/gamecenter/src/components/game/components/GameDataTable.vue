<script setup>
import { ref } from 'vue';
import { useMainClass, useI18n } from '@mjsz-vbr-elements/core/composables';
import { ResponsiveTable, DataTable, FloatingPanel } from '@mjsz-vbr-elements/core/components';
import IconStar from '@mjsz-vbr-elements/shared/icons/IconStar';

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

const onSort = (payload) => emit('sort', payload);
</script>

<template>
  <div :class="useMainClass('gamecenter-data-table')">
    <h2>{{ title }}</h2>
    <ResponsiveTable v-slot:default="{ el: rootElement }">
      <DataTable
        :columns="props.columns"
        :rows="props.rows"
        :append-to="tooltipContainer || rootElement"
        :sort="sort"
        @sort="onSort"
      >
        <template v-slot:cell-name="{ row }">
          {{ row.name }}
          <FloatingPanel v-if="row.isBP" placement="top" :content="t('bestPlayer')" :append-to="tooltipContainer">
            <template v-slot:default="{ setRef, show, hide }">
              <span class="is-text-dark" :ref="setRef" @mouseenter="show" @mouseleave="hide" @focus="show" @blur="hide">
                <IconStar />
              </span>
            </template>
          </FloatingPanel>
        </template>
        <template v-slot:cell-cora="{ row }">
          <template v-if="row.isPlayerC">C</template>
          <template v-if="row.isPlayerA">A</template>
        </template>
      </DataTable>
    </ResponsiveTable>
    <div ref="tooltipContainer" />
  </div>
</template>
