import { apiRequest } from '@/shared/api/client';
import { DEFAULT_WORKFLOW_NAME } from '@/shared/config/env';
import { normalizeWorkflow } from '@/entities/workflow-step/lib/normalize-workflow';
import type { WorkflowDto, WorkflowStepDto } from '@/entities/workflow-step/model/types';

const base = '/workflow';

export const workflowApi = {
  get(wfName = DEFAULT_WORKFLOW_NAME): Promise<WorkflowDto> {
    return apiRequest<unknown>(`${base}/get?wfName=${encodeURIComponent(wfName)}`).then(
      normalizeWorkflow,
    );
  },

  changeStepXY(
    stepInitialIndex: number,
    x: number,
    y: number,
    wfName = DEFAULT_WORKFLOW_NAME,
  ): Promise<WorkflowDto> {
    return apiRequest<unknown>(`${base}/changeStepXY`, {
      method: 'POST',
      body: JSON.stringify({ wfName, stepInitialIndex, x, y }),
    }).then(normalizeWorkflow);
  },

  changeStepName(
    stepInitialIndex: number,
    stepName: string,
    wfName = DEFAULT_WORKFLOW_NAME,
  ): Promise<WorkflowDto> {
    return apiRequest<unknown>(`${base}/changeStepName`, {
      method: 'POST',
      body: JSON.stringify({ wfName, stepInitialIndex, stepName }),
    }).then(normalizeWorkflow);
  },

  createStep(
    stepName: string,
    x: number,
    y: number,
    wfName = DEFAULT_WORKFLOW_NAME,
    color = '#ffffff',
  ): Promise<WorkflowStepDto> {
    return apiRequest<WorkflowStepDto>(`${base}/createStep`, {
      method: 'POST',
      body: JSON.stringify({ wfName, stepName, x, y, color }),
    });
  },

  deleteStep(stepInitialIndex: number, wfName = DEFAULT_WORKFLOW_NAME): Promise<WorkflowDto> {
    return apiRequest<unknown>(`${base}/deleteStep`, {
      method: 'POST',
      body: JSON.stringify({ wfName, stepInitialIndex }),
    }).then(normalizeWorkflow);
  },
};
