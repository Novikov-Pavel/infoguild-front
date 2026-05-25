export interface WorkflowStepDto {
  initialIndex: number;
  name: string;
  x: number;
  y: number;
  nextSteps: number[];
  color?: string;
}

/** Ответ API: агрегат процесса (Express сериализует класс Workflow). */
export interface WorkflowResponseDto {
  name: string;
  steps: WorkflowStepDto[];
}

export type WorkflowDto = WorkflowStepDto[];

export type SortField = 'name' | 'initialIndex' | 'x' | 'y';
export type SortDirection = 'asc' | 'desc';

export interface SortState {
  field: SortField;
  direction: SortDirection;
}
