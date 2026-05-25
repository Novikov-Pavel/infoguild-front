import { beforeEach, describe, expect, it } from 'vitest';

import { readSortState, writeSortState } from './sort-storage';

describe('widgets/workflow-table/lib/sort-storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists sort state', () => {
    writeSortState({ field: 'name', direction: 'desc' });
    expect(readSortState()).toEqual({ field: 'name', direction: 'desc' });
  });
});
