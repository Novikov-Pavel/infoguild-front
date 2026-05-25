import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';

import type { WorkflowStepDto } from '@/entities/workflow-step/model/types';

interface DiagramState {
  steps: WorkflowStepDto[];
  selectedIndex: number | null;
  zoom: number;
  loading: boolean;
  error: string | null;
}

const initialState: DiagramState = {
  steps: [],
  selectedIndex: null,
  zoom: 1,
  loading: false,
  error: null,
};

const diagramSlice = createSlice({
  name: 'workflow-diagram',
  initialState,
  reducers: {
    setWorkflow(state, action: PayloadAction<WorkflowStepDto[]>) {
      state.steps = action.payload;
    },
    setSelectedIndex(state, action: PayloadAction<number | null>) {
      state.selectedIndex = action.payload;
    },
    setZoom(state, action: PayloadAction<number>) {
      state.zoom = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    updateStepCoordinates(
      state,
      action: PayloadAction<{ initialIndex: number; x: number; y: number }>,
    ) {
      const step = state.steps.find(
        (item) => item.initialIndex === action.payload.initialIndex,
      );
      if (step) {
        step.x = action.payload.x;
        step.y = action.payload.y;
      }
    },
  },
});

export const {
  setWorkflow,
  setSelectedIndex,
  setZoom,
  setLoading,
  setError,
  updateStepCoordinates,
} = diagramSlice.actions;

export const diagramStore = configureStore({
  reducer: {
    diagram: diagramSlice.reducer,
  },
});

export type DiagramRootState = ReturnType<typeof diagramStore.getState>;
export type DiagramDispatch = typeof diagramStore.dispatch;
