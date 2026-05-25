import { describe, expect, it } from 'vitest';

import { normalizeWorkflow } from './normalize-workflow';

describe('entities/workflow-step/lib/normalize-workflow', () => {
  it('extracts steps from workflow object', () => {
    const steps = [
      { initialIndex: 0, name: 'A', x: 0, y: 0, nextSteps: [] },
    ];
    expect(normalizeWorkflow({ name: 'wf1', steps })).toEqual(steps);
  });

  it('returns array as-is', () => {
    const steps = [
      { initialIndex: 0, name: 'A', x: 0, y: 0, nextSteps: [] },
    ];
    expect(normalizeWorkflow(steps)).toEqual(steps);
  });

  it('returns empty array for invalid payload', () => {
    expect(normalizeWorkflow(null)).toEqual([]);
  });
});
