import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import WorkflowPage from '@/pages/workflow/ui/WorkflowPage.vue';
import {
  WORKFLOW_DIAGRAM_MOUNT_ID,
  WORKFLOW_TABLE_MOUNT_ID,
} from '@/pages/workflow/config/layout';

describe('pages/workflow/ui/WorkflowPage', () => {
  it('renders mount points', () => {
    const wrapper = mount(WorkflowPage);
    expect(wrapper.find('[data-testid="workflow-page"]').exists()).toBe(true);
    expect(wrapper.find(`#${WORKFLOW_TABLE_MOUNT_ID}`).exists()).toBe(true);
    expect(wrapper.find(`#${WORKFLOW_DIAGRAM_MOUNT_ID}`).exists()).toBe(true);
  });
});
