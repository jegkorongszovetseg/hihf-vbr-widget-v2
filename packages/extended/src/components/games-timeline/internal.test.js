import { expect, describe, it } from 'vitest';
import { mergeGames } from './internal';

describe('mergeGames', () => {
  it('A merge működik, ha a meglévő tömb(base) üres', () => {
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

  it('A merge működik, ha a bejövő tömb (income) üres', () => {
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

  it('A merge működik, ha a két array egyforma elemeket tartalmaz', () => {
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

  it('A merge működik, ha a bejövő elemek különböznek a meglévő elemktől', () => {
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
