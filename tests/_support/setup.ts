import { vi } from 'vitest';

// Global mutable config used by tests
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.__PLAINWIND_CONFIG__ = {
  groupByCategory: true,
  showCategoryEmojis: false,
};

// Helpers to mutate config from tests
export function setPlainwindConfig(partial: Partial<{ groupByCategory: boolean; showCategoryEmojis: boolean }>) {
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
        if (key === 'groupByCategory') return cfg.groupByCategory ?? defaultValue;
        if (key === 'showCategoryEmojis') return cfg.showCategoryEmojis ?? defaultValue;
        return defaultValue;
      },
    }),
  },
}));


