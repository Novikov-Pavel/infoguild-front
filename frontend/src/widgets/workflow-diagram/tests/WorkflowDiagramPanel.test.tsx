import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

import {
  diagramStore,
  setWorkflow,
} from '@/widgets/workflow-diagram/config/store';
import { WorkflowDiagramPanel } from '@/widgets/workflow-diagram/ui/WorkflowDiagramPanel';

describe('widgets/workflow-diagram/ui/WorkflowDiagramPanel', () => {
  it('renders workflow blocks', () => {
    diagramStore.dispatch(
      setWorkflow([
        { initialIndex: 0, name: 'Закупка', x: 10, y: 20, nextSteps: [], color: '#666' },
      ]),
    );

    render(
      <Provider store={diagramStore}>
        <WorkflowDiagramPanel />
      </Provider>,
    );

    expect(screen.getByTestId('workflow-diagram')).toBeInTheDocument();
    expect(screen.getAllByTestId('workflow-block')).toHaveLength(1);
    expect(screen.getByText('Закупка')).toBeInTheDocument();
  });
});
