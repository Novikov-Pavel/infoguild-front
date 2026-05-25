import { useEffect } from 'react';
import { Provider } from 'react-redux';

import { workflowBus } from '@/shared/lib/workflow-bus';
import {
  diagramStore,
  setError,
  setLoading,
  setSelectedIndex,
  setWorkflow,
} from '@/widgets/workflow-diagram/config/store';
import { workflowDiagramApi } from '@/widgets/workflow-diagram/api';
import { WorkflowDiagramPanel } from '@/widgets/workflow-diagram/ui/WorkflowDiagramPanel';

function DiagramConnected() {
  useEffect(() => {
    const load = async () => {
      diagramStore.dispatch(setLoading(true));
      diagramStore.dispatch(setError(null));
      try {
        const steps = await workflowDiagramApi.fetchWorkflow();
        diagramStore.dispatch(setWorkflow(steps));
      } catch (error) {
        diagramStore.dispatch(
          setError(error instanceof Error ? error.message : 'Ошибка загрузки'),
        );
      } finally {
        diagramStore.dispatch(setLoading(false));
      }
    };

    void load();

    const unsubscribe = workflowBus.subscribe((event) => {
      if (event.type === 'step:selected') {
        diagramStore.dispatch(setSelectedIndex(event.initialIndex));
      }
      if (event.type === 'workflow:updated') {
        void load();
      }
    });

    return unsubscribe;
  }, []);

  return <WorkflowDiagramPanel />;
}

export function WorkflowDiagramRoot() {
  return (
    <Provider store={diagramStore}>
      <DiagramConnected />
    </Provider>
  );
}
