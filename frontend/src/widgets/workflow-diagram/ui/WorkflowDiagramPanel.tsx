import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { workflowBus } from '@/shared/lib/workflow-bus';
import {
  DIAGRAM_ZOOM_STEP,
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_WIDTH,
} from '@/widgets/workflow-diagram/config/constants';
import type { DiagramDispatch, DiagramRootState } from '@/widgets/workflow-diagram/config/store';
import {
  setSelectedIndex,
  setZoom,
  updateStepCoordinates,
} from '@/widgets/workflow-diagram/config/store';
import { workflowDiagramApi } from '@/widgets/workflow-diagram/api';
import { buildArrowPaths } from '@/widgets/workflow-diagram/lib/build-arrows';
import { clampZoom } from '@/widgets/workflow-diagram/lib/clamp-zoom';
import styles from '@/widgets/workflow-diagram/ui/WorkflowDiagramPanel.module.scss';

export function WorkflowDiagramPanel() {
  const dispatch = useDispatch<DiagramDispatch>();
  const { steps, selectedIndex, zoom, loading, error } = useSelector(
    (state: DiagramRootState) => state.diagram,
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const arrows = useMemo(() => buildArrowPaths(steps), [steps]);

  const onBlockClick = (initialIndex: number) => {
    dispatch(setSelectedIndex(initialIndex));
    workflowBus.publish({ type: 'step:selected', initialIndex });
  };

  const applyZoomDelta = useCallback(
    (delta: number) => {
      dispatch(setZoom(clampZoom(zoom + delta)));
    },
    [dispatch, zoom],
  );

  const zoomByButton = (delta: number) => {
    applyZoomDelta(delta);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      const delta = event.deltaY < 0 ? DIAGRAM_ZOOM_STEP : -DIAGRAM_ZOOM_STEP;
      applyZoomDelta(delta);
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel);
  }, [applyZoomDelta]);

  const onPointerDown = (
    event: React.PointerEvent<HTMLDivElement>,
    initialIndex: number,
    x: number,
    y: number,
  ) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragIndex(initialIndex);
    dragOffset.current = {
      x: event.clientX / zoom - x,
      y: event.clientY / zoom - y,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragIndex === null) return;
    const nextX = Math.round(event.clientX / zoom - dragOffset.current.x);
    const nextY = Math.round(event.clientY / zoom - dragOffset.current.y);
    dispatch(updateStepCoordinates({ initialIndex: dragIndex, x: nextX, y: nextY }));
  };

  const onPointerUp = async () => {
    if (dragIndex === null) return;
    const step = steps.find((item) => item.initialIndex === dragIndex);
    setDragIndex(null);
    if (!step) return;

    try {
      await workflowDiagramApi.saveCoordinates(step.initialIndex, step.x, step.y);
      workflowBus.publish({ type: 'workflow:updated' });
    } catch {
      /* store error could be added */
    }
  };

  return (
    <section className={styles.panel} data-testid="workflow-diagram">
      <header className={styles.toolbar}>
        <button type="button" data-testid="zoom-out" onClick={() => zoomByButton(-DIAGRAM_ZOOM_STEP)}>
          <i className="fa-solid fa-minus" />
        </button>
        <span>{Math.round(zoom * 100)}%</span>
        <button type="button" data-testid="zoom-in" onClick={() => zoomByButton(DIAGRAM_ZOOM_STEP)}>
          <i className="fa-solid fa-plus" />
        </button>
      </header>

      {loading && <p className={styles.status}>Загрузка…</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerMove={onPointerMove}
        onPointerUp={() => void onPointerUp()}
      >
        <div
          className={styles.canvas}
          style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
        >
          <svg className={styles.arrows} aria-hidden>
            {arrows.map((arrow) => (
              <path key={arrow.id} d={arrow.d} className={styles.arrow} markerEnd="url(#arrowhead)" />
            ))}
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <polygon points="0 0, 8 4, 0 8" className={styles.arrowHead} />
              </marker>
            </defs>
          </svg>

          {steps.map((step) => (
            <div
              key={step.initialIndex}
              role="button"
              tabIndex={0}
              data-testid="workflow-block"
              data-selected={selectedIndex === step.initialIndex ? 'true' : 'false'}
              className={[
                styles.block,
                selectedIndex === step.initialIndex ? styles.blockSelected : '',
              ].join(' ')}
              style={{
                left: step.x,
                top: step.y,
                width: DEFAULT_BLOCK_WIDTH,
                height: DEFAULT_BLOCK_HEIGHT,
                background: step.color ?? '#ffffff',
              }}
              onClick={() => onBlockClick(step.initialIndex)}
              onPointerDown={(event) =>
                onPointerDown(event, step.initialIndex, step.x, step.y)
              }
            >
              {step.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
