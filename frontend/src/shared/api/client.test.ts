import { afterEach, describe, expect, it, vi } from 'vitest';

import { apiRequest, ApiError } from './client';

describe('shared/api/client', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns parsed json on success', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
      }),
    );

    const data = await apiRequest<{ ok: boolean }>('/test');
    expect(data).toEqual({ ok: true });
  });

  it('throws ApiError on failure', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ error: 'missing' }),
      }),
    );

    await expect(apiRequest('/missing')).rejects.toBeInstanceOf(ApiError);
  });
});
