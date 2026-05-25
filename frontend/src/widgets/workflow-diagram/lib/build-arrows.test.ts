import { describe, expect, it } from 'vitest';

import { buildArrowPaths } from './build-arrows';

describe('widgets/workflow-diagram/lib/build-arrows', () => {
  it('builds paths for existing links', () => {
    const paths = buildArrowPaths([
      { initialIndex: 0, name: 'A', x: 0, y: 0, nextSteps: [1] },
      { initialIndex: 1, name: 'B', x: 200, y: 100, nextSteps: [] },
    ]);
    expect(paths).toHaveLength(1);
    expect(paths[0]?.id).toBe('0-1');
  });
});
