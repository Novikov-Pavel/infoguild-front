import { afterEach, describe, expect, it, vi } from 'vitest';

import { workflowTableApi } from './index';

describe('widgets/workflow-table/api', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('delegates to workflowApi.get', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => [],
      }),
    );

    await workflowTableApi.fetchWorkflow();
    expect(fetch).toHaveBeenCalled();
  });
});
