import { expect } from 'vitest';
import { translateClasses } from '@src/translation/translator';
import { setPlainwindConfig } from '@tests/_support/setup';

export function expectIncludesAll(text: string, parts: string[]): void {
  parts.forEach((part) => {
    expect(text).toContain(part);
  });
}

export function expectIncludesInOrder(text: string, parts: string[]): void {
  let lastIndex = -1;
  parts.forEach((part) => {
    const nextIndex = text.indexOf(part);
    expect(nextIndex).toBeGreaterThan(lastIndex);
    lastIndex = nextIndex;
  });
}

export function expectTranslation(input: string, expectedParts: string[], cfg?: Partial<{ groupByCategory: boolean; showCategoryEmojis: boolean }>): void {
  if (cfg) setPlainwindConfig(cfg);
  const result = translateClasses(input);
  expectIncludesAll(result, expectedParts);
}


