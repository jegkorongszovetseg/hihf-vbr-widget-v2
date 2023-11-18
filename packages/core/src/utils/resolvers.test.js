import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { externalGameLinkResolver, externalTeamLinkResolver, externalPlayerLinkResolver } from './resolvers';

vi.mock('../constants.js', () => ({
  DEFAULT_EXTERNAL_TEAM_URL: 'http://example.com/team/{id}',
  DEFAULT_EXTERNAL_PLAYER_URL: 'http://example.com/player/{id}',
}));

// describe('externalGameLinkResolver', () => {
//   beforeEach(() => {
//     vi.stubGlobal('__MJSZ_VBR_WIDGET__', { gameResolver: undefined });
//   });

//   afterEach(() => {
//     vi.unstubAllGlobals;
//   });

//   test('Vissza adja az url-t gameId-val ha az url külső string', () => {
//     const resolver = externalGameLinkResolver('/site-path/', 123);
//     expect(resolver).toBe('/site-path/123');
//   });

//   test('Vissza adja az url-t gameId-val ha az url külső function', () => {
//     const resolver = externalGameLinkResolver((id) => `/site-path/${id}`, 123);
//     expect(resolver).toBe('/site-path/123');
//   });

//   test('Vissza adja az url-t gameId-val ha az url global window változó', () => {
//     window.__MJSZ_VBR_WIDGET__.gameResolver = '/site-path/';
//     const resolver = externalGameLinkResolver(null, 123);
//     expect(resolver).toBe('/site-path/123');
//   });

//   test('Vissza adja a default url-t A gameId-val, ha nincs url beállítva', () => {
//     const resolver = externalGameLinkResolver(null, 123);
//     expect(resolver).toBe(`${DEFAULT_EXTERNAL_BASE_URL}123`);
//   });
// });

describe('externalTeamLinkResolver', () => {
  beforeEach(() => {
    vi.stubGlobal('__MJSZ_VBR_WIDGET__', { gameResolver: undefined });
  });

  afterEach(() => {
    vi.unstubAllGlobals;
  });

  test('Vissza adja az url-t teamId-val ha az url külső string', () => {
    const resolver = externalTeamLinkResolver('/site-path/{step}/{id}', { step: 123, id: 456 });
    expect(resolver).toBe('/site-path/123/456');
  });

  test('Vissza adja az url-t teamId-val ha az url külső function', () => {
    const resolver = externalTeamLinkResolver(({ id }) => `/site-path/${id}`, { step: 123, id: 456 });
    expect(resolver).toBe('/site-path/456');
  });

  test('Vissza adja az url-t teamId-val ha az url global window változó', () => {
    window.__MJSZ_VBR_WIDGET__.teamResolver = '/site-path/{step}';
    const resolver = externalTeamLinkResolver(null, { step: 123, id: 456 });
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url global window funkció', () => {
    window.__MJSZ_VBR_WIDGET__.teamResolver = ({ step }) => `/site-path/${step}`;
    const resolver = externalTeamLinkResolver(null, { step: 123, id: 456 });
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja a default url-t A teamId-val, ha nincs url beállítva', () => {
    const resolver = externalTeamLinkResolver(undefined, { playerId: 123, id: 456 });
    expect(resolver).toBe(`http://example.com/team/456`);
  });

  test('Vissza adja az url-t teamId-val ha az url külső üres function', () => {
    const resolver = externalTeamLinkResolver(() => undefined, { step: 123, id: 456 });
    expect(resolver).toBe(undefined);
  });
});

describe('externalPlayerLinkResolver', () => {
  beforeEach(() => {
    vi.stubGlobal('__MJSZ_VBR_WIDGET__', { gameResolver: undefined });
  });

  afterEach(() => {
    vi.unstubAllGlobals;
  });

  test('Vissza adja az url-t teamId-val ha az url külső string', () => {
    const resolver = externalPlayerLinkResolver('/site-path/player/{id}', { id: 123 });
    expect(resolver).toBe('/site-path/player/123');
  });

  test('Vissza adja az url-t teamId-val ha az url külső function', () => {
    const resolver = externalPlayerLinkResolver(({ id }) => `/site-path/${id}`, { id: 123 });
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url global window változó', () => {
    window.__MJSZ_VBR_WIDGET__.playerResolver = '/site-path/{id}';
    const resolver = externalPlayerLinkResolver(null, { id: 123 });
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url global window funkció', () => {
    window.__MJSZ_VBR_WIDGET__.playerResolver = ({ id }) => `/site-path/${id}`;
    const resolver = externalPlayerLinkResolver(null, { id: 123 });
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja a default url-t A teamId-val, ha nincs url beállítva', () => {
    const resolver = externalPlayerLinkResolver(null, { id: 123 });
    expect(resolver).toBe('http://example.com/player/123');
  });
});
