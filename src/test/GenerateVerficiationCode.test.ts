import { it, expect, vi } from 'vitest';
import { generateVerificationToken } from '@utils';

it('Generates a 6-digit numerical code', async () => {
  let code = vi.fn(generateVerificationToken);
  expect((await code()).length).toBe(6);
})
