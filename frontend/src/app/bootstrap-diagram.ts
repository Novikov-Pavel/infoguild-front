import React from 'react';
import ReactDOMClient from 'react-dom/client';
import singleSpaReact from 'single-spa-react';

import { WorkflowDiagramRoot } from '@/widgets/workflow-diagram/ui/WorkflowDiagramRoot';

const reactLifecycles = singleSpaReact({
  React,
  ReactDOMClient,
  rootComponent: WorkflowDiagramRoot,
  errorBoundary() {
    return React.createElement('div', null, 'Ошибка диаграммы');
  },
});

export const bootstrap = reactLifecycles.bootstrap;
export const mount = reactLifecycles.mount;
export const unmount = reactLifecycles.unmount;
