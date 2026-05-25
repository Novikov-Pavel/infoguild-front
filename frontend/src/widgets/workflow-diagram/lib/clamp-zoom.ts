import {
  DIAGRAM_MAX_ZOOM,
  DIAGRAM_MIN_ZOOM,
} from '@/widgets/workflow-diagram/config/constants';

export function clampZoom(value: number): number {
  return Math.min(DIAGRAM_MAX_ZOOM, Math.max(DIAGRAM_MIN_ZOOM, value));
}
