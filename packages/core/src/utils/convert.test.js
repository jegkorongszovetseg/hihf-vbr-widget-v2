import { describe, expect, it } from 'vitest';
import { convertPhaseName, jsonToCsv, jsonToHtml } from './convert';

describe('jsonToCsv', () => {
  it('a megadott fejléc-fordításokat jeleníti meg', () => {
    expect(jsonToCsv([
      { name: 'Ákos', score: 12 },
    ], { name: 'Name', score: 'Points; total' })).toBe('Name;"Points; total"\nÁkos;12');
  });
});

describe('jsonToHtml', () => {
  it('hTML táblává alakítja az objektumok kulcsait és értékeit', () => {
    expect(jsonToHtml([
      { name: 'Ákos', score: 12 },
      { name: 'Béla', score: 8 },
    ])).toBe('<table><thead><tr><th>name</th><th>score</th></tr></thead><tbody><tr><td>Ákos</td><td>12</td></tr><tr><td>Béla</td><td>8</td></tr></tbody></table>');
  });

  it('félkövérrel jelöli a sortTarget kulcsához tartozó értékeket', () => {
    expect(jsonToHtml([
      { name: 'Ákos', score: '<12>' },
    ], 'score')).toBe('<table><thead><tr><th>name</th><th>score</th></tr></thead><tbody><tr><td>Ákos</td><td><b>&lt;12&gt;</b></td></tr></tbody></table>');
  });

  it('a megadott fejléc-fordításokat jeleníti meg', () => {
    expect(jsonToHtml([
      { name: 'Ákos', score: 12 },
    ], undefined, { name: 'Name', score: 'Points' })).toBe('<table><thead><tr><th>Name</th><th>Points</th></tr></thead><tbody><tr><td>Ákos</td><td>12</td></tr></tbody></table>');
  });

  it('üres sztringet ad üres adatnál és escape-eli a HTML-tartalmat', () => {
    expect(jsonToHtml([])).toBe('');
    expect(jsonToHtml([{ '<name>': '<script>&"\' </script>', 'empty': null }]))
      .toBe('<table><thead><tr><th>&lt;name&gt;</th><th>empty</th></tr></thead><tbody><tr><td>&lt;script&gt;&amp;&quot;&#39; &lt;/script&gt;</td><td></td></tr></tbody></table>');
  });
});

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
