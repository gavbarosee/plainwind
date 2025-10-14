import { describe, it, expect } from 'vitest';
import { parseNonEmptyClasses, extractVariants, extractOpacity, extractImportant, extractPrefix } from '@src/translation/translator/parser';
import { PARSE_SPLIT_CASES, EXTRACT_VARIANTS_CASES, EXTRACT_IMPORTANT_CASES, EXTRACT_PREFIX_CASES } from '@tests/_support/cases';

describe('parseNonEmptyClasses', () => {
  it.each(PARSE_SPLIT_CASES)('parses %s', (input, expected) => {
    expect(parseNonEmptyClasses(input)).toEqual(expected);
  });
});

describe('extractVariants', () => {
  it.each(EXTRACT_VARIANTS_CASES)('parses %s', (input, expected) => {
    expect(extractVariants(input)).toEqual(expected);
  });
});

describe('extractOpacity', () => {
  it('should extract opacity from color class', () => {
    expect(extractOpacity('bg-white/50')).toEqual({ className: 'bg-white', opacity: '50' });
  });

  it('should extract opacity with different percentages', () => {
    expect(extractOpacity('text-blue-500/75')).toEqual({ className: 'text-blue-500', opacity: '75' });
  });

  it('should handle 0% opacity', () => {
    expect(extractOpacity('bg-black/0')).toEqual({ className: 'bg-black', opacity: '0' });
  });

  it('should handle 100% opacity', () => {
    expect(extractOpacity('bg-red-500/100')).toEqual({ className: 'bg-red-500', opacity: '100' });
  });

  it('should return null opacity when no slash present', () => {
    expect(extractOpacity('bg-blue-500')).toEqual({ className: 'bg-blue-500', opacity: null });
  });

  it('should not match non-numeric opacity values', () => {
    expect(extractOpacity('bg-blue/abc')).toEqual({ className: 'bg-blue/abc', opacity: null });
  });

  it('should handle arbitrary color with opacity', () => {
    expect(extractOpacity('bg-[#fff]/90')).toEqual({ className: 'bg-[#fff]', opacity: '90' });
  });
});

describe('extractImportant', () => {
  it.each(EXTRACT_IMPORTANT_CASES)('parses %s', (input, expected) => {
    expect(extractImportant(input)).toEqual(expected);
  });
});

describe('extractPrefix', () => {
  it.each(EXTRACT_PREFIX_CASES)('parses %s', (input, expected) => {
    expect(extractPrefix(input)).toEqual(expected);
  });
});


