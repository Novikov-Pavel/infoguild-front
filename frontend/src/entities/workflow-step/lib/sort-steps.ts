import type { SortDirection, SortField, WorkflowStepDto } from '@/entities/workflow-step/model/types';

export function sortSteps(
  steps: WorkflowStepDto[],
  field: SortField,
  direction: SortDirection,
): WorkflowStepDto[] {
  const sorted = [...steps].sort((a, b) => {
    const left = a[field];
    const right = b[field];
    if (typeof left === 'string' && typeof right === 'string') {
      return left.localeCompare(right, 'ru');
    }
    return Number(left) - Number(right);
  });
  return direction === 'asc' ? sorted : sorted.reverse();
}
