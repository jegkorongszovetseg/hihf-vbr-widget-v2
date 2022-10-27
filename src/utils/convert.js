import {
  always,
  anyPass,
  ascend,
  compose,
  descend,
  equals,
  filter,
  ifElse,
  includes,
  map,
  pipe,
  prop,
  propEq,
  sortWith,
  toLower,
} from 'ramda';
import { SORT_STATE_ASCEND, SORT_STATE_ORIGINAL } from '../constants.js';
import { format, convertMinToSec } from './datetime.js';

const convert = (data = []) => {
  return {
    result: [...data],
    filteredRowsLength: 0,
    isFiltered: false,

    value() {
      return {
        rows: this.result,
        totalItems: this.filteredRowsLength,
        totalItems: this.isFiltered ? this.filteredRowsLength : data.length,
      };
    },

    filter(name, condition = [], exact = false) {
      if (name) {
        const predicate = condition.map((key) =>
          exact ? propEq(key, name) : pipe(prop(key), toLower, includes(name))
        );
        const filteredRows = filter(anyPass([...predicate]), this.result);
        this.isFiltered = true;
        this.filteredRowsLength = filteredRows.length;
        this.result = filteredRows;
      }
      return this;
    },

    sorted(sort) {
      if (!sort.sortTarget) return this;
      if (sort.orders[0].direction === SORT_STATE_ORIGINAL) return this;
      const sortDirection = ifElse(equals(SORT_STATE_ASCEND), always(ascend), always(descend));
      this.result = sortWith(sort.orders.map((s) => compose(sortDirection(s.direction), prop)(s.target)))(this.result);
      return this;
    },

    addIndex(target = null) {
      this.result.reduce((rows, row, index) => {
        const lastRow = rows[rows.length - 1] || [];
        const isSameRow = target && lastRow[target] === row[target];
        row.index = isSameRow ? lastRow.index : index + 1;
        row.indexClass = isSameRow ? 'is-duplicated' : null;
        rows.push(row);
        return rows;
      }, []);
      return this;
    },

    addContinuousIndex() {
      this.result = this.result.map((row, index) => ({
        ...row,
        index: index + 1,
      }));
      return this;
    },

    pagination(page, limit) {
      page = Number(page);
      limit = Number(limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      this.result = this.result.slice(startIndex, endIndex);
      return this;
    },

    playerName() {
      this.result = this.result.map((row) => ({
        ...row,
        name: `${row.lastName} ${row.firstName}`,
      }));
      return this;
    },

    schedule(timezone = '', locale = 'hu') {
      this.result = this.result.map((row) => ({
        ...row,
        gameResult: `${row.homeTeamScore}-${row.awayTeamScore}`,
        gameDateDate: format(row.gameDate, 'L dddd', timezone, locale),
        gameDateTime: format(row.gameDate, 'HH:mm', timezone, locale),
      }));
      return this;
    },

    convertTimes(targets = []) {
      this.result = this.result.map((row) => {
        targets.map((key) => {
          if (!row[key]) return row;
          return (row[`${key}Sec`] = convertMinToSec(row[key]));
        });
        return row;
      });
      return this;
    },
  };
};

export default convert;

export const rawConvert = (data, ...fn) => map(compose(...fn))(data);

export const playerName = (row) => ({
  ...row,
  name: `${row.lastName} ${row.firstName}`,
});

export const convertTimes =
  (targets = []) =>
  (row) => {
    targets.map((key) => {
      if (!row[key]) return row;
      return (row[`${key}Sec`] = convertMinToSec(row[key]));
    });
    return row;
  };
