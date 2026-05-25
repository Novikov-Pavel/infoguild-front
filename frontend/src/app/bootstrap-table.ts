import { createApp, h } from 'vue';
import { createPinia } from 'pinia';
import singleSpaVue from 'single-spa-vue';

import WorkflowTableRoot from '@/widgets/workflow-table/ui/WorkflowTableRoot.vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(WorkflowTableRoot);
    },
  },
  handleInstance(app) {
    app.use(createPinia());
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
