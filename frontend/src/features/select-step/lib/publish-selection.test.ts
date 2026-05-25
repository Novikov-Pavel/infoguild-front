import { beforeEach, describe, expect, it, vi } from 'vitest';

import { workflowBus } from '@/shared/lib/workflow-bus';
import { publishStepSelection } from './publish-selection';

describe('features/select-step/lib/publish-selection', () => {
  beforeEach(() => {
    workflowBus.clear();
  });

  it('publishes selection event', () => {
    const handler = vi.fn();
    workflowBus.subscribe(handler);
    publishStepSelection(5);
    expect(handler).toHaveBeenCalledWith({ type: 'step:selected', initialIndex: 5 });
  });
});
