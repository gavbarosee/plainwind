/**
 * Global test setup and mocks
 *
 * This file runs before all tests (configured in vitest.config.ts).
 * It sets up global configuration and mocks the VS Code API.
 *
 * Key responsibilities:
 * - Initializes global Plainwind config for tests
 * - Mocks vscode.workspace.getConfiguration() API
 * - Provides helper to mutate config during tests
 *
 * @module tests/_support/setup
 * @see {@link setPlainwindConfig} - Helper to change config in tests
 */

import { vi } from 'vitest';

/**
 * Global mutable config used by tests
 * Default values: groupByCategory=true, showCategoryEmojis=false
 */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.__PLAINWIND_CONFIG__ = {
  groupByCategory: true,
  showCategoryEmojis: false,
};

/**
 * Helper to mutate Plainwind config from tests
 *
 * Use this in beforeEach/it blocks to test different config states:
 * @example
 * ```ts
 * beforeEach(() => {
 *   setPlainwindConfig({ groupByCategory: false });
 * });
 * ```
 *
 * @param partial - Config values to override
 */
export function setPlainwindConfig(
  partial: Partial<{ groupByCategory: boolean; showCategoryEmojis: boolean }>
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  Object.assign(globalThis.__PLAINWIND_CONFIG__, partial);
}

vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: () => ({
      get: (key: string, defaultValue: any) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const cfg = globalThis.__PLAINWIND_CONFIG__ || {};
        if (key === 'groupByCategory')
          return cfg.groupByCategory ?? defaultValue;
        if (key === 'showCategoryEmojis')
          return cfg.showCategoryEmojis ?? defaultValue;
        return defaultValue;
      },
    }),
  },
}));
