import { describe, expect, it, vi } from 'vitest';

vi.mock('single-spa', () => ({
  registerApplication: vi.fn(),
  start: vi.fn(),
}));

import { registerApplication, start } from 'single-spa';
import { registerWorkflowApps } from './root-config';

describe('app/root-config', () => {
  it('registers two applications', () => {
    document.body.innerHTML =
      '<div id="workflow-table"></div><div id="workflow-diagram"></div>';
    registerWorkflowApps();
    expect(registerApplication).toHaveBeenCalledTimes(2);
    expect(start).toHaveBeenCalledTimes(1);
  });
});
