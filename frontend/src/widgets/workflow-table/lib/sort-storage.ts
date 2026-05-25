import type { SortState } from '@/entities/workflow-step/model/types';
import { readJson, writeJson } from '@/shared/lib/local-storage';
import { SORT_STORAGE_KEY } from '@/widgets/workflow-table/config/constants';

const defaultSort: SortState = { field: 'initialIndex', direction: 'asc' };

export function readSortState(): SortState {
  return readJson(SORT_STORAGE_KEY, defaultSort);
}

export function writeSortState(sort: SortState): void {
  writeJson(SORT_STORAGE_KEY, sort);
}
