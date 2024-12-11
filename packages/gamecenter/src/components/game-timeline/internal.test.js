import { describe, expect, test } from 'vitest';
import { buildPeriodResultsByTeam } from './internal';

describe('buildPeriodResultsByTeam', () => {
  test('Harmad eredmény generálása ha a periodResults null', () => {
    const periodResults = null;
    const expected = { home: [], away: [] };
    expect(buildPeriodResultsByTeam(periodResults)).toEqual(expected);
  });

  test('Harmad eredmény generálása mérközés kezdés előtt', () => {
    const periodResults = '(-:-, -:-, -:-)';
    const expected = { home: ['-', '-', '-'], away: ['-', '-', '-'] };
    expect(buildPeriodResultsByTeam(periodResults)).toEqual(expected);
  });

  test('Harmad eredmény generálása ha a mérközés elkezdődött', () => {
    const periodResults = '(0:0, -:-, -:-)';
    const expected = { home: ['0', '-', '-'], away: ['0', '-', '-'] };
    expect(buildPeriodResultsByTeam(periodResults)).toEqual(expected);
  });

  test('Harmad eredmény generálása ha a mérközésnek vége', () => {
    const periodResults = '(0:0, 1:1, 2:1)';
    const expected = { home: ['0', '1', '2'], away: ['0', '1', '1'] };
    expect(buildPeriodResultsByTeam(periodResults)).toEqual(expected);
  });

  test('Harmad eredmény generálása, ha a van hosszabbítás', () => {
    const periodResults = '(0:0, 1:1, 2:1, 1:0)';
    const expected = { home: ['0', '1', '2', '1'], away: ['0', '1', '1', '0'] };
    expect(buildPeriodResultsByTeam(periodResults)).toEqual(expected);
  });
});
