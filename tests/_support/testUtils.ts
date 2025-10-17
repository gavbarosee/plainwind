import { expect } from 'vitest';
import { translateClasses } from '@src/core/translation/engine';
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

/**
 * Helper for testing categorization with it.each() pattern
 * Reduces boilerplate in categorizer tests
 */
export function testCategorization<T extends (...args: any[]) => string>(
  fn: T,
  cases: Array<[string, string]>,
  testName: (cls: string, expected: string) => string = (cls, exp) => `categorizes ${cls} as ${exp}`
) {
  return (cls: string, expected: string) => {
    expect(fn(cls)).toBe(expected);
  };
}

/**
 * Helper for testing pattern matching with it.each() pattern
 * Tests that a pattern matcher contains expected substring
 */
export function testPatternMatch<T extends (...args: any[]) => string | null>(
  fn: T,
  testName: (cls: string, expected: string) => string = (cls, exp) => `${cls} contains ${exp}`
) {
  return (cls: string, expected: string) => {
    expect(fn(cls)).toContain(expected);
  };
}

/**
 * Helper for testing pattern non-matches with it.each() pattern
 * Tests that a pattern matcher returns null
 */
export function testPatternNoMatch<T extends (...args: any[]) => string | null>(
  fn: T
) {
  return (cls: string) => {
    expect(fn(cls)).toBeNull();
  };
}

/**
 * Helper for testing exact matches with it.each() pattern
 */
export function testExactMatch<T extends (...args: any[]) => string>(
  fn: T
) {
  return (cls: string, expected: string) => {
    expect(fn(cls)).toBe(expected);
  };
}

/**
 * Helper for testing flexible matches (exact or contains) with it.each() pattern
 * Used when test data specifies match type (e.g., [[cls, expected, 'exact'], ...])
 */
export function testFlexibleMatch<T extends (...args: any[]) => string>(
  fn: T
) {
  return (cls: string, expected: string, matchType: string) => {
    const result = fn(cls);
    if (matchType === 'exact') {
      expect(result).toBe(expected);
    } else {
      expect(result).toContain(expected);
    }
  };
}


