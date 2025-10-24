import {
  always,
  anyPass,
  ascend,
  compose,
  curry,
  descend,
  equals,
  filter,
  groupBy,
  head,
  ifElse,
  includes,
  isEmpty,
  lensProp,
  map,
  over,
  path,
  pick,
  pipe,
  prop,
  reject,
  replace,
  sort,
  sortBy,
  sortWith,
  toLower,
} from 'ramda';
import { SORT_STATE_ASCEND, SORT_STATE_ORIGINAL } from '../constants.js';
import { convertMinToMinSec, convertMinToSec, convertSecToMin, format } from './datetime.js';

export function convert(data = []) {
  return {
    result: [...data],
    filteredRowsLength: 0,
    isFiltered: false,

    value() {
      return {
        rows: this.result,
        totalItems: this.isFiltered ? this.filteredRowsLength : data.length,
        currentItems: this.currentItems,
      };
    },

    filter(name, condition = [], exact = false) {
      if (name) {
        const predicate = condition.map(key =>
          exact ? pipe(path(key), equals(name)) : pipe(prop(key), toLower, includes(toLower(name))),
        );
        const replaceComma = curry(row => (row.name ? over(lensProp('name'), replace(',', ''), row) : row));
        const filteredRows = filter(pipe(replaceComma, anyPass([...predicate])), this.result);
        this.isFiltered = true;
        this.filteredRowsLength = filteredRows.length;
        this.result = filteredRows;
      }
      return this;
    },

    sorted(sort) {
      if (!sort.sortTarget)
        return this;
      if (sort.orders[0].direction === SORT_STATE_ORIGINAL)
        return this;
      const sortDirection = ifElse(equals(SORT_STATE_ASCEND), always(ascend), always(descend));
      this.result = sortWith(sort.orders.map(s => compose(sortDirection(s.direction), prop)(s.target)))(this.result);
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
      if (!limit)
        return this;
      page = Number(page);
      limit = Number(limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      this.result = this.result.slice(startIndex, endIndex);
      return this;
    },

    more(min, max) {
      this.result = this.result.slice(Number(min), Number(max));
      return this;
    },

    playerName() {
      this.result = this.result.map(row => ({
        ...row,
        name: buildPlayerName(row),
      }));
      return this;
    },

    teamName() {
      this.result = this.result.map(row => ({
        ...row,
        teamName: row.team.longName,
      }));
      return this;
    },

    schedule(timezone = '', locale = 'hu') {
      this.result = this.result.map(row => ({
        ...row,
        gameResult: `${row.homeTeamScore}-${row.awayTeamScore}`,
        gameDateDate: format(row.gameDate, 'L dddd', timezone, locale),
        gameDateTime: format(row.gameDate, 'HH:mm', timezone, locale),
      }));
      return this;
    },

    gameDateFilter(month) {
      if (month === null)
        return this;
      this.result = this.result.filter((game) => {
        return new Date(game.gameDate).getMonth() === month;
      });
      return this;
    },

    convertTimes(targets = []) {
      this.result = this.result.map((row) => {
        targets.map((key) => {
          if (!row[key])
            return row;
          return (row[`${key}Sec`] = convertMinToSec(row[key]));
        });
        return row;
      });
      return this;
    },

    groupByDays() {
      this.currentItems = this.result.length;
      this.result = groupBy((row) => {
        return format(row.gameDate, 'YYYY-MM-DD');
      })(this.result);
      return this;
    },

    slice(limit = 3) {
      this.result = this.result.slice(0, limit);
      return this;
    },
  };
}

export const rawConvert = (data, ...fn) => map(compose(...fn))(data);

export function playerName(row) {
  return {
    ...row,
    ...(row.lastName && row.firstName && { name: `${row.lastName} ${row.firstName}` }),
    ...(row.player?.playerId && { name: `${row.player.lastName} ${row.player.firstName}` }),
    ...(row.player?.id && { name: `${row.player.lastName} ${row.player.firstName}` }),
    ...(row.player?.nationality && {
      name: row.player?.nationality.includes('hu')
        ? `${row.player.lastName} ${row.player.firstName}`
        : `${row.player.lastName}, ${row.player.firstName}`,
    }),
    ...(row.nationality && {
      name: row.nationality.includes('hu') ? `${row.lastName} ${row.firstName}` : `${row.lastName}, ${row.firstName}`,
    }),
  };
}

export function teamName(row) {
  return {
    ...row,
    ...(row?.team?.id && { teamName: row.team.longName }),
  };
}

export function gameDateTime(timezone = '', locale = 'hu') {
  return row => ({
    ...row,
    gameDateDate: format(row.gameDate, 'L dddd', timezone, locale),
    gameDateTime: format(row.gameDate, 'HH:mm', timezone, locale),
  });
}

// Mindig a kiválasztott csapat (teamId) szerint konvertálja az eredményt
export function gameResult(teamId) {
  return row => ({
    ...row,
    gameResult: createGameResult(row, teamId),
  });
}

export function teamOpponent(row) {
  return {
    ...row,
    opponent: createOpponent(row),
  };
}

export function teamResultType(row) {
  return {
    ...row,
    resultType: createGameResultType(row),
  };
}

export function scheduleOptionalRowClass(row) {
  return {
    ...row,
    rowClasses: row.optional ? 'is-optional' : '',
  };
}

export function upperCase(prop = []) {
  return row => ({
    ...row,
    [prop]: row[prop]?.toUpperCase(),
  });
}

export function convertTimes(targets = []) {
  return (row) => {
    targets.map((key) => {
      if (!row[key])
        return row;
      return (row[`${key}Sec`] = convertMinToSec(row[key]));
    });
    return row;
  };
}

export function convertTimesMinToMinSec(targets = []) {
  return (row) => {
    targets.map((key) => {
      if (!row[key])
        return row;
      return (row[`${key}Min`] = convertMinToMinSec(row[key]));
    });
    return row;
  };
}

export function convertTimesSecToMin(targets = []) {
  return (row) => {
    targets.map((key) => {
      return (row[`${key}Min`] = convertSecToMin(row[key]));
    });
    return row;
  };
}

export function convertGamePeriodResults(row) {
  return {
    ...row,
    periodResults: row.result?.match(/\(.*?\)/)?.[0] ?? '',
  };
}

const dateDiff = (a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime();

export const sortGames = sortWith([dateDiff, ascend(prop('id')), ascend(prop('gameId'))]);

const localeCompare = key => (a, b) => a[key].localeCompare(b[key], 'hu');
export const localeSort = sort(localeCompare('name'));

function createOpponent(row) {
  return [!row.isHomeGame ? '@' : null, row.opponent?.shortName].join(' ');
}

function createGameResult(row) {
  let firstScore = row?.homeTeamScore;
  let secondScore = row?.awayTeamScore;
  if (!row.isHomeGame) {
    firstScore = row?.awayTeamScore;
    secondScore = row?.homeTeamScore;
  }
  return [firstScore, secondScore].join(':');
}

function createGameResultType(row) {
  const result = row.gameResult.split(':');
  const isWonGame = result[0] > result[1];
  const isLostGame = result[0] < result[1];
  if (isWonGame && row.isOvertime)
    return 'OTW';
  if (isWonGame && row.isShootout)
    return 'SOW';
  if (isWonGame)
    return 'W';
  if (isLostGame && row.isOvertime)
    return 'OTL';
  if (isLostGame && row.isShootout)
    return 'SOL';
  if (isLostGame)
    return 'L';
  return 'D';
}

export function convertPhaseName(phases) {
  return phases.map(phase => ({
    phaseId: phase.phaseId,
    phaseName: Object.values({
      phaseName: phase.phaseName,
      ...(phase.phaseType?.phaseTypeName
        && phase.phaseType.phaseTypeName !== phase.phaseName && {
        phaseTypeName: phase.phaseType.phaseTypeName,
      }),
      ...(phase.phaseSubType?.phaseSubTypeName && { phaseSubTypeName: phase.phaseSubType.phaseSubTypeName }),
    }).join('-'),
  }));
}

function buildPlayerName(row) {
  if (!row.player)
    return `${row.lastName} ${row.firstName}`;

  if (row.player.nationality.includes('hu'))
    return `${row.player.lastName} ${row.player.firstName}`;
  return `${row.player.lastName}, ${row.player.firstName}`;
}

export const convertSeasons = compose(
  sort(descend(prop('seasonName'))),
  map(pick(['championshipId', 'seasonName'])),
);

export const convertTeams = teams => sort(ascend(prop('teamName')), teams);

export const filterAndSortSections = compose(sortBy(prop('sectionId')), reject(compose(isEmpty, prop('phases'))));

export const selectFirstSectionId = compose(prop('sectionId'), head);

export const selectFirstPhaseName = compose(prop('phaseName'), head);

export const sortByPhaseId = sortBy(prop('phaseId'));
