/**
 * Inserts a new column entry into a columns object at the given position (0-based index).
 *
 * @param {object} columns - The source columns object (e.g. COLUMNS_SCHEDULE).
 * @param {number} position - The 0-based index at which to insert the new column.
 * @param {object} newColumn - An object with a single key-value pair representing the new column.
 * @returns {object} A new columns object with the new column inserted at the specified position.
 *
 * @example
 * addColumn(COLUMNS_SCHEDULE, 5, { mjszTv: { label: 'TV', tooltip: 'MJSZ.TV' } })
 */
export function addColumn(columns, position, newColumn) {
  const entries = Object.entries(columns);
  const newEntries = Object.entries(newColumn);
  entries.splice(position, 0, ...newEntries);
  return Object.fromEntries(entries);
}
