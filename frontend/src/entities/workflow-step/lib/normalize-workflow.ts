import type {
  WorkflowDto,
  WorkflowResponseDto,
  WorkflowStepDto,
} from '@/entities/workflow-step/model/types';

/** API может вернуть массив шагов (legacy) или объект `{ name, steps }`. */
export function normalizeWorkflow(payload: unknown): WorkflowDto {
  if (Array.isArray(payload)) {
    return payload as WorkflowStepDto[];
  }

  if (
    payload &&
    typeof payload === 'object' &&
    'steps' in payload &&
    Array.isArray((payload as WorkflowResponseDto).steps)
  ) {
    return (payload as WorkflowResponseDto).steps;
  }

  return [];
}
