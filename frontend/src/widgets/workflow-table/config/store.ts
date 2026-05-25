import { defineStore } from 'pinia';

import { workflowApi } from '@/entities/workflow-step/api/workflow-api';
import { filterSteps } from '@/entities/workflow-step/lib/filter-steps';
import { sortSteps } from '@/entities/workflow-step/lib/sort-steps';
import { buildDefaultStepName } from '@/entities/workflow-step/lib/unique-step-name';
import type { SortField, SortState, WorkflowStepDto } from '@/entities/workflow-step/model/types';
import { workflowTableApi } from '@/widgets/workflow-table/api';
import { readSortState, writeSortState } from '@/widgets/workflow-table/lib/sort-storage';

interface State {
  steps: WorkflowStepDto[];
  loading: boolean;
  error: string | null;
  selectedIndex: number | null;
  searchQuery: string;
  sort: SortState;
}

export const useWorkflowTableStore = defineStore('workflow-table', {
  state: (): State => ({
    steps: [],
    loading: false,
    error: null,
    selectedIndex: null,
    searchQuery: '',
    sort: readSortState(),
  }),

  getters: {
    visibleSteps(state): WorkflowStepDto[] {
      const filtered = filterSteps(state.steps, state.searchQuery);
      return sortSteps(filtered, state.sort.field, state.sort.direction);
    },
  },

  actions: {
    async loadWorkflow(): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        this.steps = await workflowTableApi.fetchWorkflow();
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Ошибка загрузки';
      } finally {
        this.loading = false;
      }
    },

    setSearchQuery(query: string): void {
      this.searchQuery = query;
    },

    setSort(field: SortField): void {
      if (this.sort.field === field) {
        this.sort.direction = this.sort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        this.sort.field = field;
        this.sort.direction = 'asc';
      }
      writeSortState(this.sort);
    },

    selectStep(initialIndex: number | null): void {
      this.selectedIndex = initialIndex;
    },

    applyWorkflow(steps: WorkflowStepDto[]): void {
      this.steps = steps;
    },

    async renameStep(initialIndex: number, name: string): Promise<void> {
      const steps = await workflowApi.changeStepName(initialIndex, name);
      this.applyWorkflow(steps);
    },

    async addStep(): Promise<void> {
      const stepName = buildDefaultStepName(this.steps);
      await workflowApi.createStep(stepName, 0, 0);
      await this.loadWorkflow();
    },

    async removeStep(initialIndex: number): Promise<void> {
      const steps = await workflowApi.deleteStep(initialIndex);
      this.applyWorkflow(steps);
      if (this.selectedIndex === initialIndex) {
        this.selectedIndex = null;
      }
    },

    updateCoordinates(initialIndex: number, x: number, y: number): void {
      const step = this.steps.find((item) => item.initialIndex === initialIndex);
      if (step) {
        step.x = x;
        step.y = y;
      }
    },
  },
});
