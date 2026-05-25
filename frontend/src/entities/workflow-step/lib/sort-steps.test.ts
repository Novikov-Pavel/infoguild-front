import { describe, expect, it } from 'vitest';

import { sortSteps } from './sort-steps';
import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

const steps: WorkflowStepDto[] = [
  { initialIndex: 1, name: 'Б', x: 10, y: 0, nextSteps: [] },
  { initialIndex: 0, name: 'А', x: 5, y: 0, nextSteps: [] },
];

describe('entities/workflow-step/lib/sort-steps', () => {
  it('sorts by name asc', () => {
    const result = sortSteps(steps, 'name', 'asc');
    expect(result.map((s) => s.name)).toEqual(['А', 'Б']);
  });

  it('sorts by initialIndex desc', () => {
    const result = sortSteps(steps, 'initialIndex', 'desc');
    expect(result.map((s) => s.initialIndex)).toEqual([1, 0]);
  });
});
