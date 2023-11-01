import { describe, expect, test } from 'vitest';
import { convertSecToMin, convertMinToSec } from './datetime';

describe('convertSecToMin', () => {
  test('Convert 60 sec to min string 01:00', () => {
    expect(convertSecToMin(60)).toBe('01:00');
  });

  test('Convert 10 sec to min string 00:10', () => {
    expect(convertSecToMin(10)).toBe('00:10');
  });

  test('Convert 0 sec to min string 00:00', () => {
    expect(convertSecToMin(10)).toBe('00:10');
  });

  test('Convert 150 sec to min string 00:00', () => {
    expect(convertSecToMin(150)).toBe('02:30');
  });

  test('Convert 150 sec to min string 00:00', () => {
    expect(convertSecToMin(4567)).toBe('76:07');
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
