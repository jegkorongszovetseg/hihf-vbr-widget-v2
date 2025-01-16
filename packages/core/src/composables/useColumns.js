import { keys, map, omit, split, trim } from 'ramda';
import { computed, ref, unref } from 'vue';
import { useI18n } from './useI18n';

export function useColumns(columns, hiddenColumns = '', variables = {}) {
  const errorRef = ref('');
  const { t } = useI18n();

  const validatedColumns = computed(() => {
    if (unref(hiddenColumns)) {
      try {
        const columnsToHide = validateColumnsName(unref(columns), unref(hiddenColumns));
        return omit(columnsToHide, unref(columns));
      }
      catch (err) {
        errorRef.value = err;
      }
    }
    return unref(columns);
  });

  const convert = column => ({
    ...column,
    ...(column.label && { label: t(column.label ?? '', unref(variables)) }),
    ...(column.tooltip && { tooltip: t(column.tooltip ?? '') }),
  });
  const converted = computed(() => map(convert, validatedColumns.value));
  return {
    columns: converted,
    error: errorRef,
  };
}

export function validateColumnsName(columns, hiddenColumns = '') {
  const hiddenColumnsArray = map(trim, split(',', hiddenColumns));
  const columnsArray = keys(columns);
  if (hiddenColumnsArray[0] === '')
    return [];
  const index = hiddenColumnsArray.findIndex(column => !columnsArray.includes(column));
  if (index > -1) {
    throw hiddenColumnsArray[index];
  }
  return hiddenColumnsArray;
}
