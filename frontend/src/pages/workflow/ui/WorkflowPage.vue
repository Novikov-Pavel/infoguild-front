<script setup lang="ts">
import {
  WORKFLOW_DIAGRAM_MOUNT_ID,
  WORKFLOW_TABLE_MOUNT_ID,
} from '@/pages/workflow/config/layout';
import styles from '@/pages/workflow/ui/WorkflowPage.module.scss';
</script>

<template>
  <div :class="styles.page" data-testid="workflow-page">
    <header :class="styles.header">
      <h1 :class="styles.title">Схема рабочего процесса</h1>
    </header>
    <div :class="styles.content">
      <div :id="WORKFLOW_TABLE_MOUNT_ID" :class="styles.tableHost" />
      <div :id="WORKFLOW_DIAGRAM_MOUNT_ID" :class="styles.diagramHost" />
    </div>
  </div>
</template>
