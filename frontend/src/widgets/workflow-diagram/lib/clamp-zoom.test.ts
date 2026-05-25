import { describe, expect, it } from 'vitest';

import { clampZoom } from './clamp-zoom';

describe('widgets/workflow-diagram/lib/clamp-zoom', () => {
  it('clamps to min', () => {
    expect(clampZoom(0.1)).toBe(0.4);
  });

  it('clamps to max', () => {
    expect(clampZoom(10)).toBe(2.5);
  });
});
