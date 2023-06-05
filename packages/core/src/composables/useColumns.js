import { computed, ref, unref } from 'vue';
import { map, keys, trim, omit, split } from 'ramda';
import { useI18n } from './useI18n';

export const useColumns = (columns, hiddenColumns = '', variables = {}) => {
  const errorRef = ref('');
  const { t } = useI18n();

  if (hiddenColumns) {
    try {
      const columnsToHide = validateColumnsName(unref(columns), hiddenColumns);
      columns = omit(columnsToHide, unref(columns));
    } catch (err) {
      errorRef.value = err;
    }
  }

  const convert = (column) => ({
    ...column,
    ...(column.label && { label: t(column.label ?? '', unref(variables)) }),
    ...(column.tooltip && { tooltip: t(column.tooltip ?? '') }),
  });
  const converted = computed(() => map(convert, unref(columns)));
  return {
    columns: converted,
    error: errorRef,
  };
};

export const validateColumnsName = (columns, hiddenColumns = '') => {
  const hiddenColumnsArray = map(trim, split(',', hiddenColumns));
  const columnsArray = keys(columns);
  if (hiddenColumnsArray[0] === '') return resolve([]);
  const index = hiddenColumnsArray.findIndex((column) => !columnsArray.includes(column));
  if (index > -1) {
    throw hiddenColumnsArray[index];
  }
  return hiddenColumnsArray;
};
