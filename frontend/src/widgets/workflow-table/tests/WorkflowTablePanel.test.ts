import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import WorkflowTablePanel from '@/widgets/workflow-table/ui/WorkflowTablePanel.vue';
import { useWorkflowTableStore } from '@/widgets/workflow-table/config/store';

describe('widgets/workflow-table/ui/WorkflowTablePanel', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('renders rows from store', () => {
    const store = useWorkflowTableStore();
    store.steps = [
      { initialIndex: 0, name: 'Закупка', x: 1, y: 2, nextSteps: [1], color: '#666' },
    ];

    const wrapper = mount(WorkflowTablePanel);
    expect(wrapper.find('[data-testid="workflow-table"]').exists()).toBe(true);
    expect(wrapper.findAll('[data-testid="workflow-row"]')).toHaveLength(1);
  });

  it('filters by search query', async () => {
    const store = useWorkflowTableStore();
    store.steps = [
      { initialIndex: 0, name: 'Закупка', x: 0, y: 0, nextSteps: [] },
      { initialIndex: 1, name: 'Доставка', x: 0, y: 0, nextSteps: [] },
    ];

    const wrapper = mount(WorkflowTablePanel);
    await wrapper.get('[data-testid="workflow-search"]').setValue('закуп');
    expect(wrapper.findAll('[data-testid="workflow-row"]')).toHaveLength(1);
  });
});
