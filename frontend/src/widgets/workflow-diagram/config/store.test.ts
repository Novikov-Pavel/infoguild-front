import { describe, expect, it } from 'vitest';

import {
  diagramStore,
  setSelectedIndex,
  setWorkflow,
  setZoom,
  updateStepCoordinates,
} from './store';

describe('widgets/workflow-diagram/config/store', () => {
  it('updates selection', () => {
    diagramStore.dispatch(setSelectedIndex(3));
    expect(diagramStore.getState().diagram.selectedIndex).toBe(3);
  });

  it('updates coordinates', () => {
    diagramStore.dispatch(
      setWorkflow([{ initialIndex: 0, name: 'A', x: 0, y: 0, nextSteps: [] }]),
    );
    diagramStore.dispatch(
      updateStepCoordinates({ initialIndex: 0, x: 10, y: 20 }),
    );
    const step = diagramStore.getState().diagram.steps.find((s) => s.initialIndex === 0);
    expect(step?.x).toBe(10);
    expect(step?.y).toBe(20);
  });

  it('sets zoom', () => {
    diagramStore.dispatch(setZoom(1.5));
    expect(diagramStore.getState().diagram.zoom).toBe(1.5);
  });
});
