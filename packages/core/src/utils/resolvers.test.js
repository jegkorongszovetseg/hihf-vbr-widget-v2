import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { externalGameLinkResolver, externalTeamLinkResolver, externalPlayerLinkResolver } from './resolvers';
import { DEFAULT_EXTERNAL_BASE_URL, DEFAULT_EXTERNAL_TEAM_URL, DEFAULT_EXTERNAL_PLAYER_URL } from '../constants';

describe('externalGameLinkResolver', () => {
  beforeEach(() => {
    vi.stubGlobal('__MJSZ_VBR_WIDGET__', { gameResolver: undefined });
  });

  afterEach(() => {
    vi.unstubAllGlobals;
  });

  test('Vissza adja az url-t gameId-val ha az url külső string', () => {
    const resolver = externalGameLinkResolver('/site-path/', 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t gameId-val ha az url külső function', () => {
    const resolver = externalGameLinkResolver((id) => `/site-path/${id}`, 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t gameId-val ha az url global window változó', () => {
    window.__MJSZ_VBR_WIDGET__.gameResolver = '/site-path/';
    const resolver = externalGameLinkResolver(null, 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja a default url-t A gameId-val, ha nincs url beállítva', () => {
    const resolver = externalGameLinkResolver(null, 123);
    expect(resolver).toBe(`${DEFAULT_EXTERNAL_BASE_URL}123`);
  });
});

describe('externalTeamLinkResolver', () => {
  beforeEach(() => {
    vi.stubGlobal('__MJSZ_VBR_WIDGET__', { gameResolver: undefined });
  });

  afterEach(() => {
    vi.unstubAllGlobals;
  });

  test('Vissza adja az url-t teamId-val ha az url külső string', () => {
    const resolver = externalTeamLinkResolver('/site-path/', 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url külső function', () => {
    const resolver = externalTeamLinkResolver((id) => `/site-path/${id}`, 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url global window változó', () => {
    window.__MJSZ_VBR_WIDGET__.teamResolver = '/site-path/';
    const resolver = externalTeamLinkResolver(null, 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja a default url-t A teamId-val, ha nincs url beállítva', () => {
    const resolver = externalTeamLinkResolver(null, 123);
    expect(resolver).toBe(`${DEFAULT_EXTERNAL_TEAM_URL}123`);
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
    const resolver = externalPlayerLinkResolver('/site-path/', 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url külső function', () => {
    const resolver = externalPlayerLinkResolver((id) => `/site-path/${id}`, 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja az url-t teamId-val ha az url global window változó', () => {
    window.__MJSZ_VBR_WIDGET__.playerResolver = '/site-path/';
    const resolver = externalPlayerLinkResolver(null, 123);
    expect(resolver).toBe('/site-path/123');
  });

  test('Vissza adja a default url-t A teamId-val, ha nincs url beállítva', () => {
    const resolver = externalPlayerLinkResolver(null, 123);
    expect(resolver).toBe(`${DEFAULT_EXTERNAL_PLAYER_URL}123`);
  });
});
