import { describe, expect, it } from 'vitest';
import { convertPhaseName } from './convert';

describe('convertPhaseName', () => {
  it('a phases üres []', () => {
    const phases = [];
    const phaseName = convertPhaseName(phases);
    expect(phaseName).toStrictEqual([]);
  });

  it('a phaseName és a phaseTypeName megegyezik és van phaseSubTypeName', () => {
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

  it('csak phaseName és phaseTypeName van de nincs phaseSubTypeName', () => {
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

  it('a phaseName és a phaseTypeName nem egyezik meg és van phaseSubTypeName', () => {
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

  it('csak phaseName van', () => {
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

  it('a phaseName és a phaseTypeName nem egyezik meg és nincs phaseSubTypeName', () => {
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
