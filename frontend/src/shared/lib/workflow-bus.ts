export type WorkflowBusEvent =
  | { type: 'step:selected'; initialIndex: number | null }
  | { type: 'workflow:updated' };

type Listener = (event: WorkflowBusEvent) => void;

const listeners = new Set<Listener>();

export const workflowBus = {
  publish(event: WorkflowBusEvent): void {
    listeners.forEach((listener) => listener(event));
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  clear(): void {
    listeners.clear();
  },
};
