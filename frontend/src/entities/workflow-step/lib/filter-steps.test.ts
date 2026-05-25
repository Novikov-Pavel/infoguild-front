import { describe, expect, it } from 'vitest';

import { filterSteps } from './filter-steps';
import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

const steps: WorkflowStepDto[] = [
  { initialIndex: 0, name: 'Закупка', x: 1, y: 2, nextSteps: [1] },
  { initialIndex: 1, name: 'Доставка', x: 3, y: 4, nextSteps: [] },
];

describe('entities/workflow-step/lib/filter-steps', () => {
  it('returns all when query empty', () => {
    expect(filterSteps(steps, '')).toHaveLength(2);
  });

  it('filters by name', () => {
    expect(filterSteps(steps, 'закуп')).toHaveLength(1);
  });
});
