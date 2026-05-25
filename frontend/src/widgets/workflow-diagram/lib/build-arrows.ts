import {
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_WIDTH,
} from '@/widgets/workflow-diagram/config/constants';
import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

export interface ArrowPath {
  id: string;
  d: string;
}

export function buildArrowPaths(steps: WorkflowStepDto[]): ArrowPath[] {
  const byIndex = new Map(steps.map((step) => [step.initialIndex, step]));
  const paths: ArrowPath[] = [];

  steps.forEach((step) => {
    step.nextSteps.forEach((targetIndex) => {
      const target = byIndex.get(targetIndex);
      if (!target) return;

      const x1 = step.x + DEFAULT_BLOCK_WIDTH / 2;
      const y1 = step.y + DEFAULT_BLOCK_HEIGHT;
      const x2 = target.x + DEFAULT_BLOCK_WIDTH / 2;
      const y2 = target.y;
      const midY = (y1 + y2) / 2;

      paths.push({
        id: `${step.initialIndex}-${targetIndex}`,
        d: `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`,
      });
    });
  });

  return paths;
}
