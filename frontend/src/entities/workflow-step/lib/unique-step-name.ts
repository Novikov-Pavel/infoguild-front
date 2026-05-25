import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

export function buildDefaultStepName(steps: WorkflowStepDto[]): string {
  const base = `Шаг ${steps.length}`;
  const names = new Set(steps.map((step) => step.name.toLowerCase()));
  if (!names.has(base.toLowerCase())) return base;

  let index = 1;
  while (names.has(`${base} (${index})`.toLowerCase())) {
    index += 1;
  }
  return `${base} (${index})`;
}
