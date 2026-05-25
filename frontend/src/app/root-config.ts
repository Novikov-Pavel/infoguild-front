import { registerApplication, start } from 'single-spa';

import {
  WORKFLOW_DIAGRAM_MOUNT_ID,
  WORKFLOW_TABLE_MOUNT_ID,
} from '@/pages/workflow/config/layout';

export function registerWorkflowApps(): void {
  registerApplication({
    name: '@infoguild/workflow-table',
    app: () => import('@/app/bootstrap-table'),
    activeWhen: () => true,
    customProps: {
      domElement: document.getElementById(WORKFLOW_TABLE_MOUNT_ID),
    },
  });

  registerApplication({
    name: '@infoguild/workflow-diagram',
    app: () => import('@/app/bootstrap-diagram'),
    activeWhen: () => true,
    customProps: {
      domElement: document.getElementById(WORKFLOW_DIAGRAM_MOUNT_ID),
    },
  });

  start();
}
