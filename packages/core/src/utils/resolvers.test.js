import { describe, expect, test } from 'vitest';
import { externalGameLinkResolver } from './resolvers';

describe('externalGameLinkResolver', () => {
  test('Első', () => {
    const resolver = externalGameLinkResolver('/site-path/', 123);
    console.log('resolver:', resolver);
    expect(resolver).toBe('/site-path/123');
  });
});
