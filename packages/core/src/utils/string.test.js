import { describe, expect, it } from 'vitest';
import { templateReplacer } from './string';

describe('templateReplacer', () => {
  it('visszaadja az eredeti stringet, ha nincs paraméter a template-ben', () => {
    const template = 'template';
    const resolver = templateReplacer(template, { step: 123, id: 456 });
    expect(resolver).toBe('template');
  });

  it('visszaadja az eredeti stringet, ha nincs paraméter', () => {
    const template = 'template';
    const resolver = templateReplacer(template);
    expect(resolver).toBe('template');
  });

  it('visszaadja a kicserélt stringet', () => {
    const template = 'template-{id}';
    const resolver = templateReplacer(template, { id: 123 });
    expect(resolver).toBe('template-123');
  });

  it('visszaadja a kicserélt stringet és undfined lesz ha nincs az objektumban az adott kulcs', () => {
    const template = 'template-{id}';
    const resolver = templateReplacer(template);
    expect(resolver).toBe('template-undefined');
  });

  it('visszaadja a megfelelő értéket, ha a paraméter több szintű objektum', () => {
    const template = 'template-{team.id}';
    const resolver = templateReplacer(template, { team: { id: 123 } });
    expect(resolver).toBe('template-123');
  });
});
