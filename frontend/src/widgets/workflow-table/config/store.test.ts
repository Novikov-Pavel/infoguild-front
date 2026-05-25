import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useWorkflowTableStore } from './store';

describe('widgets/workflow-table/config/store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    localStorage.clear();
  });

  it('toggles sort direction', () => {
    const store = useWorkflowTableStore();
    store.setSort('name');
    expect(store.sort).toEqual({ field: 'name', direction: 'asc' });
    store.setSort('name');
    expect(store.sort.direction).toBe('desc');
  });

  it('loads workflow', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({
          name: 'wf1',
          steps: [{ initialIndex: 0, name: 'A', x: 0, y: 0, nextSteps: [] }],
        }),
      }),
    );

    const store = useWorkflowTableStore();
    await store.loadWorkflow();
    expect(store.steps).toHaveLength(1);
  });
});
