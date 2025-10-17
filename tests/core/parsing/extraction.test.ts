/**
 * Tests for extractAllClassNames - React/JSX patterns
 * 
 * Tests extraction of className attributes from React/JSX code including:
 * - Simple string literals (className="...")
 * - Template literals (className={`...`})
 * - Helper functions (clsx, classnames, cn, twMerge, cva)
 * - Mixed quote styles and edge cases
 * 
 * @see src/core/parsing/index.ts
 */

import { describe, it, expect } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('extractAllClassNames - React/JSX', () => {
  describe('simple string literals', () => {
    it('should extract from className with double quotes', () => {
      const text = '<div className="flex items-center gap-4">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'flex items-center gap-4' }
      ]);
      expect(extractions[0].type).toBe('simple');
    });

    it('should extract from className with single quotes', () => {
      const text = "<div className='flex items-center gap-4'>";
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].type).toBe('simple');
    });

    it('should extract from class attribute', () => {
      const text = '<div class="flex items-center">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center']);
    });

    it('should handle multiple className attributes', () => {
      const text = `
        <div className="flex gap-4">
          <span className="text-sm font-bold">
        </div>
      `;
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(2);
      expect(extractions[0].classStrings).toEqual(['flex gap-4']);
      expect(extractions[1].classStrings).toEqual(['text-sm font-bold']);
    });
  });

  describe('template literals', () => {
    it('should extract from simple template literal', () => {
      const text = '<div className={`flex items-center gap-4`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].type).toBe('template');
    });
  });

  describe('helper functions', () => {
    it('should extract from clsx', () => {
      const text = '<div className={clsx("flex items-center", "p-4 bg-white")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
      expect(extractions[0].classStrings).toContain('flex items-center');
      expect(extractions[0].classStrings).toContain('p-4 bg-white');
    });

    it('should extract from classnames', () => {
      const text = '<div className={classnames("flex", "gap-4")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should extract from cn', () => {
      const text = '<div className={cn("flex items-center", "hover:bg-gray-100")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should extract from twMerge', () => {
      const text = '<div className={twMerge("p-4 bg-blue-500", "hover:bg-blue-600")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should extract from cva', () => {
      const text = '<div className={cva("base-class", "variant-class")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should handle mixed quote styles in helpers', () => {
      const text = `<div className={clsx('flex items-center', "p-4 gap-4")}>`;
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle template literals inside helpers', () => {
      const text = '<div className={clsx(`flex items-center`, "p-4")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });
  });

  describe('edge cases', () => {
    it('should skip empty className', () => {
      const text = '<div className="">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(0);
    });

    it('should handle className with only whitespace', () => {
      const text = '<div className="   ">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(0);
    });

    it('should not duplicate overlapping patterns', () => {
      const text = '<div className="flex items-center">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
    });

    it('should maintain document order', () => {
      const text = `
        <div className="first">
          <span className={clsx("second")}>
            <p className={\`third\`}>
      `;
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(3);
      expect(extractions[0].classStrings[0]).toBe('first');
      expect(extractions[1].classStrings[0]).toBe('second');
      expect(extractions[2].classStrings[0]).toBe('third');
    });
  });
});

