import { describe, expect, test } from 'vitest';
import { convertPhaseName } from './championship.internal';

describe('convertPhaseName', () => {
  test('A phases üres []', () => {
    const phases = [];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([]);
  });

  test('A phaseName és a phaseTypeName megegyezik és van phaseSubTypeName', () => {
    const phases = [
      {
        phaseId: 45307,
        phaseName: 'Alapszakasz',
        phaseType: {
          phaseTypeId: 371,
          phaseTypeName: 'Alapszakasz',
        },
        phaseSubType: {
          phaseSubTypeId: 3,
          phaseSubTypeName: 'Észak',
        },
      },
    ];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([{ phaseId: 45307, phaseName: 'Alapszakasz-Észak' }]);
  });

  test('Csak phaseName és phaseTypeName van de nincs phaseSubTypeName', () => {
    const phases = [
      {
        phaseId: 45307,
        phaseName: 'Alapszakasz',
        phaseType: {
          phaseTypeId: 371,
          phaseTypeName: 'Alapszakasz',
        },
        phaseSubType: null,
      },
    ];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([{ phaseId: 45307, phaseName: 'Alapszakasz' }]);
  });

  test('A phaseName és a phaseTypeName nem egyezik meg és van phaseSubTypeName', () => {
    const phases = [
      {
        phaseId: 45307,
        phaseName: 'Alapszakasz',
        phaseType: {
          phaseTypeId: 371,
          phaseTypeName: '1. forduló',
        },
        phaseSubType: {
          phaseSubTypeId: 3,
          phaseSubTypeName: 'Észak',
        },
      },
    ];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([{ phaseId: 45307, phaseName: 'Alapszakasz-1. forduló-Észak' }]);
  });

  test('Csak phaseName van', () => {
    const phases = [
      {
        phaseId: 45307,
        phaseName: 'Alapszakasz',
        phaseType: null,
        phaseSubType: null,
      },
    ];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([{ phaseId: 45307, phaseName: 'Alapszakasz' }]);
  });

  test('A phaseName és a phaseTypeName nem egyezik meg és nincs phaseSubTypeName', () => {
    const phases = [
      {
        phaseId: 45307,
        phaseName: 'Alapszakasz',
        phaseType: {
          phaseTypeId: 371,
          phaseTypeName: '1. forduló',
        },
        phaseSubType: null,
      },
    ];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([{ phaseId: 45307, phaseName: 'Alapszakasz-1. forduló' }]);
  });
});
