import { describe, expect, it } from 'vitest';

import { buildDefaultStepName } from './unique-step-name';
import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

describe('entities/workflow-step/lib/unique-step-name', () => {
  it('builds default name', () => {
    const steps: WorkflowStepDto[] = [];
    expect(buildDefaultStepName(steps)).toBe('Шаг 0');
  });

  it('adds suffix when duplicate', () => {
    const steps: WorkflowStepDto[] = [
      { initialIndex: 0, name: 'Шаг 1', x: 0, y: 0, nextSteps: [] },
    ];
    expect(buildDefaultStepName(steps)).toBe('Шаг 1 (1)');
  });
});
