import { describe, expect, it, vi } from 'vitest';
import { getInitialIndex, mergeGames } from './internal';

describe('mergeGames', () => {
  it('a merge működik, ha a meglévő tömb(base) üres', () => {
    const base = [];

    const income = [
      {
        id: 0,
        result: '2:2',
      },
      {
        id: 1,
        result: '3:0',
      },
    ];
    const result = mergeGames(income, base, 'id');
    const expected = [
      {
        id: 0,
        result: '2:2',
      },
      {
        id: 1,
        result: '3:0',
      },
    ];
    expect(result).toEqual(expected);
  });

  it('a merge működik, ha a bejövő tömb (income) üres', () => {
    const base = [
      {
        id: 0,
        result: '0:0',
        period: 'wu',
      },
      {
        id: 1,
        result: '2:0',
        period: 'pre',
      },
    ];

    const income = [];
    const result = mergeGames(income, base, 'id');
    const expected = [];
    expect(result).toEqual(expected);
  });

  it('a merge működik, ha a két array egyforma elemeket tartalmaz', () => {
    const base = [
      {
        id: 0,
        result: '0:0',
        period: 'wu',
      },
      {
        id: 1,
        result: '2:0',
        period: 'pre',
      },
    ];

    const income = [
      {
        id: 0,
        result: '2:2',
      },
      {
        id: 1,
        result: '3:0',
      },
    ];
    const result = mergeGames(income, base, 'id');
    const expected = [
      {
        id: 0,
        result: '2:2',
        period: 'wu',
      },
      {
        id: 1,
        result: '3:0',
        period: 'pre',
      },
    ];
    expect(result).toEqual(expected);
  });

  it('a merge működik, ha a bejövő elemek különböznek a meglévő elemktől', () => {
    const base = [
      {
        id: 0,
        result: '0:0',
        period: 'wu',
      },
      {
        id: 1,
        result: '2:0',
        period: 'pre',
      },
    ];

    const income = [
      {
        id: 0,
        result: '2:2',
      },
      {
        id: 3,
        result: '2:1',
      },
    ];
    const result = mergeGames(income, base, 'id');
    const expected = [
      {
        id: 0,
        result: '2:2',
        period: 'wu',
      },
      {
        id: 3,
        result: '2:1',
      },
    ];
    expect(result).toEqual(expected);
  });
});

describe('getInitialIndex', () => {
  it('a lista hosszát adja vissza, ha a mai nap az első meccs előtt van', () => {
    vi.setSystemTime(new Date('2026-09-11T12:00:00Z'));
    const games = gamesWithDates('2026-09-14', '2026-09-13', '2026-09-12');

    expect(getInitialIndex(games)).toBe(games.length);
  });

  it('az első találat utáni indexet adja vissza, ha a mai nap az első meccs napja', () => {
    vi.setSystemTime(new Date('2026-09-11T12:00:00Z'));
    const games = gamesWithDates('2026-09-11', '2026-09-10', '2026-09-09');

    expect(getInitialIndex(games)).toBe(1);
  });

  it('az első mai vagy korábbi meccs utáni indexet adja vissza két meccsnap között', () => {
    vi.setSystemTime(new Date('2026-09-11T12:00:00Z'));
    const games = gamesWithDates('2026-09-14', '2026-09-12', '2026-09-10', '2026-09-08');

    expect(getInitialIndex(games)).toBe(3);
  });

  it('nullát ad vissza, ha a mai nap az utolsó meccs után van', () => {
    vi.setSystemTime(new Date('2026-09-11T12:00:00Z'));
    const games = gamesWithDates('2026-09-08', '2026-09-06', '2026-09-04');

    expect(getInitialIndex(games)).toBe(0);
  });
});

function gamesWithDates(...gameDates) {
  return gameDates.map(gameDate => ({ gameDate }));
}
