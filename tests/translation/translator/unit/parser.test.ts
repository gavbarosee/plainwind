/**
 * Tests for translation parser functions
 * 
 * Tests the parsing of Tailwind class modifiers including variants (hover:, md:),
 * opacity (/50), important (!), and prefix (tw\:) extraction. Validates proper
 * handling of complex bracket nesting and edge cases.
 * 
 * @see src/core/translation/engine/parser.ts
 */

import { describe, it, expect } from 'vitest';
import { parseNonEmptyClasses, extractVariants, extractOpacity, extractImportant, extractPrefix } from '@src/core/translation/engine/parser';
import { 
  PARSE_SPLIT_CASES, 
  EXTRACT_VARIANTS_CASES, 
  EXTRACT_IMPORTANT_CASES, 
  EXTRACT_PREFIX_CASES,
  COMPLEX_VARIANT_EXTRACTION_CASES,
  OPACITY_EXTRACTION_EDGE_CASES,
  IMPORTANT_EXTRACTION_EDGE_CASES,
  PREFIX_EXTRACTION_EDGE_CASES
} from '@tests/_support/cases';

describe('parseNonEmptyClasses', () => {
  it.each(PARSE_SPLIT_CASES)('parses %s', (input, expected) => {
    expect(parseNonEmptyClasses(input)).toEqual(expected);
  });
});

describe('extractVariants', () => {
  it.each(EXTRACT_VARIANTS_CASES)('parses %s', (input, expected) => {
    expect(extractVariants(input)).toEqual(expected);
  });

  describe('complex bracket handling', () => {
    it.each(COMPLEX_VARIANT_EXTRACTION_CASES)('%s extracts variants: %s, baseClass: %s', (input, expectedVariants, expectedBase) => {
      const result = extractVariants(input);
      expect(result.variants).toEqual(expectedVariants);
      expect(result.baseClass).toBe(expectedBase);
    });
  });
});

describe('extractOpacity', () => {
  it.each(OPACITY_EXTRACTION_EDGE_CASES)('%s -> className: %s, opacity: %s', (input, expectedClass, expectedOpacity) => {
    const result = extractOpacity(input);
    expect(result.className).toBe(expectedClass);
    expect(result.opacity).toBe(expectedOpacity);
  });
});

describe('extractImportant', () => {
  it.each(EXTRACT_IMPORTANT_CASES)('parses %s', (input, expected) => {
    expect(extractImportant(input)).toEqual(expected);
  });

  describe('edge cases', () => {
    it.each(IMPORTANT_EXTRACTION_EDGE_CASES)('%s -> className: %s, isImportant: %s', (input, expectedClass, expectedImportant) => {
      const result = extractImportant(input);
      expect(result.className).toBe(expectedClass);
      expect(result.isImportant).toBe(expectedImportant);
    });
  });
});

describe('extractPrefix', () => {
  it.each(EXTRACT_PREFIX_CASES)('parses %s', (input, expected) => {
    expect(extractPrefix(input)).toEqual(expected);
  });

  describe('edge cases', () => {
    it.each(PREFIX_EXTRACTION_EDGE_CASES)('%s -> className: %s, prefix: %s', (input, expectedClass, expectedPrefix) => {
      const result = extractPrefix(input);
      expect(result.className).toBe(expectedClass);
      expect(result.prefix).toBe(expectedPrefix);
    });
  });
});


