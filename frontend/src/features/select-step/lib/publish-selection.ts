import { workflowBus } from '@/shared/lib/workflow-bus';

export function publishStepSelection(initialIndex: number | null): void {
  workflowBus.publish({ type: 'step:selected', initialIndex });
}
