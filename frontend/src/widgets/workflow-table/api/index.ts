import { workflowApi } from '@/entities/workflow-step/api/workflow-api';
import type { WorkflowDto } from '@/entities/workflow-step/model/types';

export const workflowTableApi = {
  fetchWorkflow(): Promise<WorkflowDto> {
    return workflowApi.get();
  },
};
