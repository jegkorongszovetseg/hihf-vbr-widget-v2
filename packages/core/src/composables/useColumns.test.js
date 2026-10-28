import { describe, expect, it, vi } from 'vitest';
import { useColumns } from './useColumns';

vi.mock('./useI18n', () => ({
  useI18n: () => ({ t: key => key }),
}));

describe('useColumns', () => {
  it('removes sortOrders when sorting is disabled without mutating source columns', () => {
    const sourceColumns = {
      sortable: { sortOrders: [{ target: 'name', direction: 'asc' }] },
      unsortable: { label: 'Name' },
    };
    const { columns } = useColumns(sourceColumns, { sort: false });

    expect(columns.value.sortable).not.toHaveProperty('sortOrders');
    expect(columns.value.unsortable).toEqual({ label: 'Name' });
    expect(sourceColumns.sortable).toHaveProperty('sortOrders');
  });
});
