import { ref } from 'vue';
import { map, keys, trim, omit, split } from 'ramda';
import { useI18n } from './useI18n';

export const useColumns = (columns, hiddenColumns = '') => {
  const error = ref('');
  const { t } = useI18n();

  if (hiddenColumns) {
    try {
      const columnsToHide = validateColumnsName(columns, hiddenColumns);
      columns = omit(columnsToHide, columns);
    } catch (err) {
      error.value = t('errors.undefinedColumn', { column: err });
    }
  }

  const convert = (column) => ({
    ...column,
    ...(column.label && { label: t(column.label ?? '') }),
    ...(column.tooltip && { tooltip: t(column.tooltip ?? '') }),
  });
  const converted = map(convert, columns);
  return {
    columns: converted,
    error,
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
