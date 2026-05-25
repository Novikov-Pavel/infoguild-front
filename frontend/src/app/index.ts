import { createApp } from 'vue';

import '@/app/styles/global.scss';
import { registerWorkflowApps } from '@/app/root-config';
import WorkflowPage from '@/pages/workflow/ui/WorkflowPage.vue';

const shell = createApp(WorkflowPage);
shell.mount('#root');

registerWorkflowApps();
