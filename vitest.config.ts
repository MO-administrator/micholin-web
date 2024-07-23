/// <reference types="vitest" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    globals: true,
    mockReset: true,
    logHeapUsage: true,
    environment: 'node',
  },
});
