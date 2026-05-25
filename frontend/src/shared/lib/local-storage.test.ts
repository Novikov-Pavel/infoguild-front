import { beforeEach, describe, expect, it } from 'vitest';

import { readJson, writeJson } from './local-storage';

describe('shared/lib/local-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('reads and writes json', () => {
    writeJson('sort', { field: 'name', direction: 'asc' });
    expect(readJson('sort', null)).toEqual({ field: 'name', direction: 'asc' });
  });

  it('returns fallback on invalid json', () => {
    localStorage.setItem('broken', '{');
    expect(readJson('broken', 'default')).toBe('default');
  });
});
