import { afterEach, describe, expect, it, vi } from 'vitest';

import { workflowApi } from './workflow-api';

describe('entities/workflow-step/api/workflow-api', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calls get endpoint', async () => {
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

    const steps = await workflowApi.get('wf1');
    expect(steps).toHaveLength(1);
    expect(fetch).toHaveBeenCalledWith(
      '/workflow/get?wfName=wf1',
      expect.objectContaining({ headers: expect.any(Object) }),
    );
  });
});
