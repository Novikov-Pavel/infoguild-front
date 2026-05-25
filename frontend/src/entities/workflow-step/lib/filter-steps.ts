import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

export function filterSteps(steps: WorkflowStepDto[], query: string): WorkflowStepDto[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return steps;
  return steps.filter((step) => {
    const next = step.nextSteps.join(', ');
    return (
      step.name.toLowerCase().includes(normalized) ||
      String(step.initialIndex).includes(normalized) ||
      next.includes(normalized) ||
      `${step.x},${step.y}`.includes(normalized)
    );
  });
}
