export function formatNextSteps(nextSteps: number[]): string {
  return nextSteps.length ? nextSteps.join(', ') : '—';
}
