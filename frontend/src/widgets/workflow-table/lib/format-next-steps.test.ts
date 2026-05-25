import { describe, expect, it } from 'vitest';

import { formatNextSteps } from './format-next-steps';

describe('widgets/workflow-table/lib/format-next-steps', () => {
  it('formats list', () => {
    expect(formatNextSteps([1, 2])).toBe('1, 2');
  });

  it('returns dash when empty', () => {
    expect(formatNextSteps([])).toBe('—');
  });
});
