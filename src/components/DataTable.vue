<script setup>
import { computed, toRefs } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useMainClass } from '../composables/useMainClass';
import { SORT_STATE_ASCEND, SORT_STATE_DESCEND, SORT_STATE_ORIGINAL } from '../constants.js';
import IconSort from './icons/IconSort.vue';
import IconSortAsc from './icons/IconSortAsc.vue';
import IconSortDesc from './icons/IconSortDesc.vue';
import FloatingPanel from './FloatingPanel.vue';
import { refDebounced } from '@vueuse/shared';

const props = defineProps({
  columns: {
    type: Object,
    default: () => ({}),
  },

  rows: {
    type: Array,
    default: () => [],
  },

  sort: {
    type: Object,
    default: () => ({}),
  },

  isLoading: {
    type: Boolean,
    default: false,
  },

  appendTo: {
    type: [Object, String],
    default: null,
  },
});

const { isLoading, appendTo } = toRefs(props);

const emit = defineEmits(['sort']);

const { t } = useI18n();
const mainClassName = useMainClass('table');

const columns = computed(() => props.columns);
const columnCount = computed(() => Object.keys(props.columns).length);
const isLoadingDebounced = refDebounced(isLoading, 300);

const sortBy = (column, prop) => {
  if (!column.sortOrders) return;
  emit('sort', { target: prop, orders: column.sortOrders });
};
</script>

<template>
  <table :class="mainClassName">
    <thead>
      <tr>
        <template v-for="(column, prop) in columns" :key="prop">
          <FloatingPanel
            placement="top"
            :content="column.tooltip"
            :disabled="!column.tooltip"
            :append-to="appendTo"
            v-slot:default="{ setRef, show, hide }"
          >
            <th
              :ref="setRef"
              :class="[
                [column.class],
                {
                  'is-active': prop === sort.sortTarget && sort.orders[0].direction !== SORT_STATE_ORIGINAL,
                  'is-sortable': column.sortOrders,
                  'is-desc': prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_DESCEND,
                  'is-asc': prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ASCEND,
                },
              ]"
              @mouseenter="show"
              @mouseleave="hide"
              @focus="show"
              @blur="hide"
              @click="sortBy(column, prop)"
              @keydown.space.prevent="sortBy(column, prop)"
              @keydown.enter.prevent="sortBy(column, prop)"
              :tabindex="column.sortOrders ? 0 : -1"
              role="button"
            >
              <slot :name="`header-${prop}`" :column="column">
                {{ column.label }}
              </slot>
              <IconSort v-if="column.sortOrders && prop !== sort.sortTarget" class="is-icon-sort"></IconSort>
              <IconSort
                v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ORIGINAL"
                class="is-icon-sort"
              ></IconSort>
              <IconSortAsc
                v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_DESCEND"
                class="is-icon-sort"
              ></IconSortAsc>
              <IconSortDesc
                v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ASCEND"
                class="is-icon-sort"
              ></IconSortDesc>
            </th>
          </FloatingPanel>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in props.rows" :key="index">
        <td
          v-for="(_, prop) in columns"
          :key="prop"
          :class="[
            [_.class],
            {
              'is-active': prop === sort.sortTarget && sort.orders[0].direction !== SORT_STATE_ORIGINAL,
            },
          ]"
        >
          <slot :name="`cell-${prop}`" :row="row" :prop="prop">
            {{ row[prop] }}
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr v-if="rows.length === 0 && !isLoading">
        <td :colspan="columnCount">{{ t('common.noData') }}</td>
      </tr>
      <tr v-if="isLoadingDebounced">
        <td :colspan="columnCount">{{ t('common.loading') }}</td>
      </tr>
    </tfoot>
  </table>
</template>
