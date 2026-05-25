<script setup lang="ts">
import { computed } from 'vue';

import { workflowBus } from '@/shared/lib/workflow-bus';
import type { SortField } from '@/entities/workflow-step/model/types';
import { TABLE_COLUMNS } from '@/widgets/workflow-table/config/constants';
import { useWorkflowTableStore } from '@/widgets/workflow-table/config/store';
import { formatNextSteps } from '@/widgets/workflow-table/lib/format-next-steps';
import styles from '@/widgets/workflow-table/ui/WorkflowTablePanel.module.scss';

const store = useWorkflowTableStore();

const columns = TABLE_COLUMNS;

const sortIcon = computed(() =>
  store.sort.direction === 'asc' ? 'fa-sort-up' : 'fa-sort-down',
);

function onRowClick(initialIndex: number): void {
  store.selectStep(initialIndex);
  workflowBus.publish({ type: 'step:selected', initialIndex });
}

function onSort(field: SortField): void {
  if (field === 'nextSteps' || field === 'color') return;
  store.setSort(field);
}

async function onNameBlur(initialIndex: number, value: string, original: string): Promise<void> {
  const trimmed = value.trim();
  if (!trimmed || trimmed === original) return;
  await store.renameStep(initialIndex, trimmed);
  workflowBus.publish({ type: 'workflow:updated' });
}

async function onAdd(): Promise<void> {
  await store.addStep();
  workflowBus.publish({ type: 'workflow:updated' });
}

async function onDelete(initialIndex: number): Promise<void> {
  await store.removeStep(initialIndex);
  workflowBus.publish({ type: 'workflow:updated' });
}
</script>

<template>
  <section :class="styles.panel" data-testid="workflow-table">
    <header :class="styles.toolbar">
      <input
        :class="styles.search"
        type="search"
        placeholder="Поиск шагов..."
        data-testid="workflow-search"
        :value="store.searchQuery"
        @input="store.setSearchQuery(($event.target as HTMLInputElement).value)"
      />
      <button type="button" :class="styles.button" data-testid="add-step" @click="onAdd">
        <i class="fa-solid fa-plus" />
        Добавить шаг
      </button>
    </header>

    <p v-if="store.loading" :class="styles.status">Загрузка…</p>
    <p v-else-if="store.error" :class="styles.error">{{ store.error }}</p>

    <div v-else :class="styles.tableWrap">
      <table :class="styles.table">
        <thead :class="styles.thead">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="styles.th"
              @click="onSort(column.key as SortField)"
            >
              {{ column.label }}
              <i
                v-if="store.sort.field === column.key"
                :class="['fa-solid', sortIcon, styles.sortIcon]"
              />
            </th>
            <th :class="styles.th">Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="step in store.visibleSteps"
            :key="step.initialIndex"
            :class="[
              styles.row,
              store.selectedIndex === step.initialIndex && styles.rowSelected,
            ]"
            data-testid="workflow-row"
            @click="onRowClick(step.initialIndex)"
          >
            <td :class="styles.td">
              <input
                :class="styles.nameInput"
                :value="step.name"
                @click.stop
                @blur="
                  onNameBlur(
                    step.initialIndex,
                    ($event.target as HTMLInputElement).value,
                    step.name,
                  )
                "
              />
            </td>
            <td :class="styles.td">{{ formatNextSteps(step.nextSteps) }}</td>
            <td :class="styles.td">
              <span :class="styles.colorSwatch" :style="{ background: step.color ?? '#fff' }" />
              {{ step.color ?? '#ffffff' }}
            </td>
            <td :class="styles.td">{{ step.x }}</td>
            <td :class="styles.td">{{ step.y }}</td>
            <td :class="styles.td">
              <button
                type="button"
                :class="styles.iconButton"
                data-testid="delete-step"
                @click.stop="onDelete(step.initialIndex)"
              >
                <i class="fa-solid fa-trash" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>
