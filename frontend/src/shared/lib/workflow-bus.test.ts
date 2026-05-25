import { beforeEach, describe, expect, it, vi } from 'vitest';

import { workflowBus } from './workflow-bus';

describe('shared/lib/workflow-bus', () => {
  beforeEach(() => {
    workflowBus.clear();
  });

  it('notifies subscribers', () => {
    const handler = vi.fn();
    workflowBus.subscribe(handler);
    workflowBus.publish({ type: 'step:selected', initialIndex: 2 });
    expect(handler).toHaveBeenCalledWith({
      type: 'step:selected',
      initialIndex: 2,
    });
  });

  it('unsubscribes', () => {
    const handler = vi.fn();
    const unsubscribe = workflowBus.subscribe(handler);
    unsubscribe();
    workflowBus.publish({ type: 'workflow:updated' });
    expect(handler).not.toHaveBeenCalled();
  });
});
