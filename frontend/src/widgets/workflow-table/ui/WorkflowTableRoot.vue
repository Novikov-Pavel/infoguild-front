<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

import { workflowBus } from '@/shared/lib/workflow-bus';
import { useWorkflowTableStore } from '@/widgets/workflow-table/config/store';
import WorkflowTablePanel from '@/widgets/workflow-table/ui/WorkflowTablePanel.vue';

const store = useWorkflowTableStore();

let unsubscribe = () => {};

onMounted(() => {
  void store.loadWorkflow();
  unsubscribe = workflowBus.subscribe((event) => {
    if (event.type === 'step:selected') {
      store.selectStep(event.initialIndex);
    }
    if (event.type === 'workflow:updated') {
      void store.loadWorkflow();
    }
  });
});

onUnmounted(() => {
  unsubscribe();
});
</script>

<template>
  <WorkflowTablePanel />
</template>
