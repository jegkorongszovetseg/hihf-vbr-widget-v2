<script setup>
import IconSort from '@mjsz-vbr-elements/shared/icons/IconSort';
import IconSortAsc from '@mjsz-vbr-elements/shared/icons/IconSortAsc';
import IconSortDesc from '@mjsz-vbr-elements/shared/icons/IconSortDesc';
import { computed, toRefs } from 'vue';
import { useI18n } from '../composables/useI18n';
import { useLazyLoadingState } from '../composables/useLazyLoadingState';
import { useMainClass } from '../composables/useMainClass';
import { LAZY_LOADING_STATE_DELAY, SORT_STATE_ASCEND, SORT_STATE_DESCEND, SORT_STATE_ORIGINAL } from '../constants.js';
import FloatingPanel from './FloatingPanel.vue';

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

const emit = defineEmits(['sort']);
const { isLoading, appendTo } = toRefs(props);
const isLazyLoadingState = useLazyLoadingState(isLoading, { delay: LAZY_LOADING_STATE_DELAY });

const { t } = useI18n();
const mainClassName = useMainClass('table');

const columns = computed(() => props.columns);
const columnCount = computed(() => Object.keys(props.columns).length);

function sortBy(column, prop) {
  if (!column.sortOrders)
    return;
  emit('sort', { target: prop, orders: column.sortOrders });
}
</script>

<template>
  <table :class="mainClassName">
    <thead>
      <tr>
        <template v-for="(column, prop) in columns" :key="prop">
          <FloatingPanel
            v-slot="{ setRef, show, hide }"
            placement="top"
            :content="column.tooltip"
            :disabled="!column.tooltip"
            :append-to="appendTo"
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
              :tabindex="column.sortOrders ? 0 : -1"
              role="button"
              @mouseenter="show"
              @mouseleave="hide"
              @focus="show"
              @blur="hide"
              @click="sortBy(column, prop)"
              @keydown.space.prevent="sortBy(column, prop)"
              @keydown.enter.prevent="sortBy(column, prop)"
            >
              <slot :name="`header-${prop}`" :column="column">
                {{ column.label }}
              </slot>
              <IconSort v-if="column.sortOrders && prop !== sort.sortTarget" class="is-icon-sort" />
              <IconSort
                v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ORIGINAL"
                class="is-icon-sort"
              />
              <IconSortAsc
                v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_DESCEND"
                class="is-icon-sort"
              />
              <IconSortDesc
                v-if="prop === sort.sortTarget && sort.orders[0].direction === SORT_STATE_ASCEND"
                class="is-icon-sort"
              />
            </th>
          </FloatingPanel>
        </template>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in props.rows" :key="index" :class="row.rowClasses">
        <td
          v-for="(_, prop) in columns"
          :key="prop"
          :class="[
            [_.class],
            {
              'is-active': prop === sort.sortTarget && sort.orders[0].direction !== SORT_STATE_ORIGINAL,
              'is-zero': row[prop] === 0 || row[prop] === '00:00',
            },
          ]"
        >
          <slot :name="`cell-${prop}`" :row="row" :prop="prop">
            {{ row[prop] }}
          </slot>
        </td>
      </tr>
    </tbody>
    <tfoot v-if="isLazyLoadingState && rows.length === 0">
      <tr>
        <td :colspan="columnCount">
          <slot name="loading">
            {{ t('common.loading') }}
          </slot>
        </td>
      </tr>
    </tfoot>
    <tfoot v-if="rows.length === 0 && !isLoading && !isLazyLoadingState">
      <tr>
        <td :colspan="columnCount">
          <slot name="empty">
            {{ t('common.noData') }}
          </slot>
        </td>
      </tr>
    </tfoot>
  </table>
</template>
