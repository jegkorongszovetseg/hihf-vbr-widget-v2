import { describe, expect, test } from 'vitest';
import { convertSecToMin, convertMinToSec, convertMinToMinSec } from './datetime';

describe('convertSecToMin', () => {
  test('Convert 0 sec to min string 00:00', () => {
    expect(convertSecToMin(0)).toBe('00:00');
  });

  test('Convert 60 sec to min string 01:00', () => {
    expect(convertSecToMin(60)).toBe('01:00');
  });

  test('Convert 10 sec to min string 00:10', () => {
    expect(convertSecToMin(10)).toBe('00:10');
  });

  test('Convert 150 sec to min string 02:30', () => {
    expect(convertSecToMin(150)).toBe('02:30');
  });

  test('Convert 4567 sec to min string 76:07', () => {
    expect(convertSecToMin(4567)).toBe('76:07');
  });

  test('Convert 6789 sec to min string 113:09', () => {
    expect(convertSecToMin(6789)).toBe('113:09');
  });
});

describe('convertMinToSec', () => {
  test('Convert 00:00 min string to sec 0', () => {
    expect(convertMinToSec('00:00')).toBe(0);
  });

  test('Convert 01:00 min string to sec 60', () => {
    expect(convertMinToSec('01:00')).toBe(60);
  });

  test('Convert 70:20 min string to sec 4220', () => {
    expect(convertMinToSec('70:20')).toBe(4220);
  });
});

describe('convertMinToMinSec', () => {
  test('Convert 0 minutes to string 00:00', () => {
    expect(convertMinToMinSec(0)).toBe('00:00');
  });

  test('Convert 60 minutes to string 60:12', () => {
    expect(convertMinToMinSec(60.2)).toBe('60:12');
  });

  test('Convert 10.5 minutes to string 00:10', () => {
    expect(convertMinToMinSec(10.5)).toBe('10:30');
  });

  test('Convert 150.7 minutes to string 150:42', () => {
    expect(convertMinToMinSec(150.7)).toBe('150:42');
  });

  test('Convert 1234.9 minutes to string 1234:00', () => {
    expect(convertMinToMinSec(1234.9)).toBe('1234:54');
  });

  test('Convert 4567 minutes to string 1234:00', () => {
    expect(convertMinToMinSec(4567)).toBe('4567:00');
  });
});
