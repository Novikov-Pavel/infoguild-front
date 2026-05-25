import { workflowApi } from '@/entities/workflow-step/api/workflow-api';
import type { WorkflowDto } from '@/entities/workflow-step/model/types';

export const workflowDiagramApi = {
  fetchWorkflow(): Promise<WorkflowDto> {
    return workflowApi.get();
  },

  saveCoordinates(stepInitialIndex: number, x: number, y: number): Promise<WorkflowDto> {
    return workflowApi.changeStepXY(stepInitialIndex, x, y);
  },
};
