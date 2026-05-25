import { afterEach, describe, expect, it, vi } from 'vitest';

import { workflowDiagramApi } from './index';

describe('widgets/workflow-diagram/api', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches workflow', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [],
      }),
    );

    await workflowDiagramApi.fetchWorkflow();
    expect(fetch).toHaveBeenCalled();
  });
});
