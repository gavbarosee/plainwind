/**
 * Tests for parsing utility functions
 */

import { describe, it, expect } from 'vitest';
import {
  extractAllClassNames,
  combineClassStrings,
  findExtractionAtPosition,
} from '@src/core/parsing';

describe('combineClassStrings', () => {
  it('should combine multiple strings', () => {
    const result = combineClassStrings(['flex gap-4', 'p-4 bg-white']);
    expect(result).toBe('flex gap-4 p-4 bg-white');
  });

  it('should remove duplicate classes', () => {
    const result = combineClassStrings(['flex gap-4', 'flex p-4']);
    expect(result).toContain('flex');
    // Should only contain one instance of 'flex'
    expect(result.split(' ').filter((c) => c === 'flex')).toHaveLength(1);
  });

  it('should handle single string', () => {
    const result = combineClassStrings(['flex items-center']);
    expect(result).toBe('flex items-center');
  });

  it('should handle empty array', () => {
    const result = combineClassStrings([]);
    expect(result).toBe('');
  });

  it('should trim and filter empty strings', () => {
    const result = combineClassStrings(['flex', '  ', 'gap-4', '']);
    expect(result).toBe('flex gap-4');
  });
});

describe('findExtractionAtPosition', () => {
  it('should find extraction at position', () => {
    const text = '<div className="flex items-center">';
    const extractions = extractAllClassNames(text);
    const found = findExtractionAtPosition(extractions, 10);

    expect(found).toBeDefined();
    expect(found?.classStrings).toEqual(['flex items-center']);
  });

  it('should return undefined for position outside any extraction', () => {
    const text = '<div className="flex">text</div>';
    const extractions = extractAllClassNames(text);
    const found = findExtractionAtPosition(extractions, 100);

    expect(found).toBeUndefined();
  });

  it('should find correct extraction when multiple exist', () => {
    const text = '<div className="first"><span className="second">';
    const extractions = extractAllClassNames(text);

    const firstFound = findExtractionAtPosition(extractions, 10);
    const secondFound = findExtractionAtPosition(extractions, 35);

    expect(firstFound?.classStrings).toEqual(['first']);
    expect(secondFound?.classStrings).toEqual(['second']);
  });

  it('should handle boundary positions', () => {
    const text = '<div className="flex">';
    const extractions = extractAllClassNames(text);

    expect(findExtractionAtPosition(extractions, extractions[0].range.start)).toBeDefined();
    expect(findExtractionAtPosition(extractions, extractions[0].range.end)).toBeDefined();
  });
});

