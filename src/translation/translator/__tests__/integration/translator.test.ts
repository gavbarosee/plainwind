/**
 * Integration tests for the full translation pipeline
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { translateClasses } from '../../index';

// Mock vscode configuration
const mockConfig = {
  groupByCategory: true,
  showCategoryEmojis: false,
};

vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: () => ({
      get: (key: string, defaultValue: any) => {
        if (key === 'groupByCategory')
          return mockConfig.groupByCategory ?? defaultValue;
        if (key === 'showCategoryEmojis')
          return mockConfig.showCategoryEmojis ?? defaultValue;
        return defaultValue;
      },
    }),
  },
}));

describe('translateClasses - Full Integration', () => {
  beforeEach(() => {
    mockConfig.groupByCategory = true;
    mockConfig.showCategoryEmojis = false;
  });

  describe('basic translations', () => {
    it('should translate simple class string', () => {
      const result = translateClasses('flex items-center gap-4');
      expect(result).toContain('flex');
      expect(result).toContain('center'); // items-center contains "center"
      expect(result).toContain('gap');
    });

    it('should translate spacing utilities', () => {
      const result = translateClasses('p-4 m-2 px-6');
      expect(result).toContain('padding');
      expect(result).toContain('margin');
      expect(result).toContain('horizontal padding');
    });

    it('should translate color utilities', () => {
      const result = translateClasses('bg-white text-blue-500');
      expect(result).toContain('white background');
      expect(result).toContain('blue text');
    });

    it('should translate layout utilities', () => {
      const result = translateClasses('block hidden overflow-auto');
      expect(result).toContain('block');
      expect(result).toContain('visible'); // "hidden" -> "not visible"
      expect(result).toContain('scroll'); // "overflow-auto" -> "scrolls when needed"
    });
  });

  describe('variants', () => {
    it('should translate single variant', () => {
      const result = translateClasses('hover:bg-blue-500');
      expect(result).toContain('on hover');
    });

    it('should translate multiple variants', () => {
      const result = translateClasses('md:hover:bg-blue-500');
      expect(result).toContain('on medium screens');
      expect(result).toContain('on hover');
    });

    it('should translate responsive variants', () => {
      const result = translateClasses('sm:text-sm lg:text-lg');
      expect(result).toContain('small screens');
      expect(result).toContain('large screens');
    });

    it('should translate dark mode variant', () => {
      const result = translateClasses('dark:bg-black');
      expect(result).toContain('in dark mode');
    });

    it('should translate group variants', () => {
      const result = translateClasses('group-hover:opacity-100');
      expect(result).toContain('when group hovered');
    });

    it('should translate peer variants', () => {
      const result = translateClasses('peer-focus:ring-2');
      expect(result).toContain('when peer focused');
    });

    it('should translate pseudo-element variants', () => {
      const result = translateClasses('before:content-["→"]');
      expect(result).toContain('before pseudo-element');
    });
  });

  describe('opacity modifiers', () => {
    it('should translate opacity with color', () => {
      const result = translateClasses('bg-white/50');
      expect(result).toContain('50% opacity');
    });

    it('should translate opacity with different values', () => {
      const result = translateClasses('text-blue-500/75');
      expect(result).toContain('75% opacity');
    });

    it('should combine opacity with variants', () => {
      const result = translateClasses('hover:bg-blue-500/80');
      expect(result).toContain('on hover');
      expect(result).toContain('80% opacity');
    });
  });

  describe('important modifier', () => {
    it('should translate important modifier', () => {
      const result = translateClasses('p-4!');
      expect(result).toContain('!important');
    });

    it('should combine important with variants', () => {
      const result = translateClasses('hover:bg-white!');
      expect(result).toContain('on hover');
      expect(result).toContain('!important');
    });

    it('should combine important with opacity', () => {
      const result = translateClasses('bg-blue-500/50!');
      expect(result).toContain('50% opacity');
      expect(result).toContain('!important');
    });
  });

  describe('prefix modifier', () => {
    it('should translate prefix', () => {
      const result = translateClasses('tw\\:bg-white');
      expect(result).toContain('[tw]');
    });

    it('should combine prefix with variants', () => {
      const result = translateClasses('tw\\:hover:bg-blue-500');
      expect(result).toContain('[tw]');
      expect(result).toContain('on hover');
    });
  });

  describe('complex combinations', () => {
    it('should handle all modifiers together', () => {
      const result = translateClasses('tw\\:md:hover:bg-blue-500/50!');
      expect(result).toContain('[tw]');
      expect(result).toContain('on medium screens');
      expect(result).toContain('on hover');
      expect(result).toContain('50% opacity');
      expect(result).toContain('!important');
    });

    it('should translate complex UI component classes', () => {
      const result = translateClasses(
        'flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all'
      );
      expect(result).toContain('flex');
      expect(result).toContain('center'); // items-center
      expect(result).toContain('apart'); // justify-between -> "spreads items apart"
      expect(result).toContain('padding');
      expect(result).toContain('white');
      expect(result).toContain('corner');
      expect(result).toContain('shadow');
      expect(result).toContain('hover');
      expect(result).toContain('animates'); // transition-all -> "animates all properties"
    });

    it('should translate button with responsive states', () => {
      const result = translateClasses(
        'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 md:px-6 md:py-3'
      );
      expect(result).toContain('horizontal padding');
      expect(result).toContain('vertical padding');
      expect(result).toContain('blue background');
      expect(result).toContain('white text');
      expect(result).toContain('on hover');
      expect(result).toContain('when active');
      expect(result).toContain('on medium screens');
    });
  });

  describe('arbitrary values', () => {
    it('should translate arbitrary width', () => {
      const result = translateClasses('w-[100px]');
      expect(result).toContain('width');
      expect(result).toContain('100px');
    });

    it('should translate arbitrary padding', () => {
      const result = translateClasses('p-[2rem]');
      expect(result).toContain('padding');
      expect(result).toContain('2rem');
    });

    it('should translate arbitrary colors', () => {
      const result = translateClasses('bg-[#fff]');
      expect(result).toContain('background');
      expect(result).toContain('#fff');
    });

    it('should translate CSS variables', () => {
      const result = translateClasses('[--my-var:10px]');
      expect(result).toContain('CSS variable');
      expect(result).toContain('--my-var');
      expect(result).toContain('10px');
    });

    it('should translate arbitrary CSS properties', () => {
      const result = translateClasses('[mask-type:luminance]');
      expect(result).toContain('CSS property');
      expect(result).toContain('mask-type');
      expect(result).toContain('luminance');
    });

    it('should combine arbitrary values with variants', () => {
      const result = translateClasses('hover:w-[200px]');
      expect(result).toContain('width');
      expect(result).toContain('200px');
      expect(result).toContain('on hover');
    });
  });

  describe('grouping by category', () => {
    beforeEach(() => {
      mockConfig.groupByCategory = true;
      mockConfig.showCategoryEmojis = false;
    });

    it('should group translations by category', () => {
      const result = translateClasses('flex p-4 text-blue-500');
      expect(result).toContain('Flexbox & Grid:');
      expect(result).toContain('Spacing:');
      expect(result).toContain('Colors:');
    });

    it('should separate groups with pipe', () => {
      const result = translateClasses('flex p-4 text-blue-500');
      expect(result).toContain('|');
      const groups = result.split('|');
      expect(groups.length).toBeGreaterThan(1);
    });

    it('should combine multiple classes in same category', () => {
      const result = translateClasses('p-4 m-2 px-6');
      expect(result).toMatch(/Spacing:.*padding.*margin.*padding/);
    });

    it('should maintain category order', () => {
      const result = translateClasses(
        'shadow-lg flex p-4 bg-white text-blue-500'
      );
      const flexIndex = result.indexOf('Flexbox & Grid');
      const spacingIndex = result.indexOf('Spacing');
      const colorsIndex = result.indexOf('Colors');

      expect(flexIndex).toBeLessThan(spacingIndex);
      expect(spacingIndex).toBeLessThan(colorsIndex);
      // Just check the order is maintained
      expect(flexIndex).toBeGreaterThan(-1);
    });
  });

  describe('grouping with emojis', () => {
    beforeEach(() => {
      mockConfig.groupByCategory = true;
      mockConfig.showCategoryEmojis = true;
    });

    it('should show emojis when enabled', () => {
      const result = translateClasses('flex p-4');
      // Should contain emoji characters (non-ASCII)
      expect(result).toMatch(/[^\x00-\x7F]/);
    });

    it('should still group properly with emojis', () => {
      const result = translateClasses('flex p-4 text-blue-500');
      expect(result).toContain('Flexbox & Grid:');
      expect(result).toContain('Spacing:');
      expect(result).toContain('Colors:');
    });
  });

  describe('no grouping', () => {
    beforeEach(() => {
      mockConfig.groupByCategory = false;
    });

    it('should not group when disabled', () => {
      const result = translateClasses('flex p-4 text-blue-500');
      expect(result).not.toContain('Flexbox & Grid:');
      expect(result).not.toContain('Spacing:');
      expect(result).not.toContain('Colors:');
    });

    it('should join translations with commas', () => {
      const result = translateClasses('flex items-center gap-4');
      expect(result).toContain(',');
      const parts = result.split(',');
      expect(parts.length).toBeGreaterThan(1);
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = translateClasses('');
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const result = translateClasses('flex');
      expect(result).toContain('flexbox');
    });

    it('should handle multiple spaces', () => {
      const result = translateClasses('flex    items-center    gap-4');
      expect(result).toContain('flex');
      expect(result).toContain('center');
      expect(result).toContain('gap');
    });

    it('should handle unknown classes', () => {
      const result = translateClasses('unknown-class');
      expect(result).toContain('unknown-class');
    });

    it('should handle mix of known and unknown classes', () => {
      const result = translateClasses('flex unknown-class p-4');
      expect(result).toContain('flexbox');
      expect(result).toContain('unknown-class');
      expect(result).toContain('padding');
    });

    it('should handle very long class strings', () => {
      const longString = Array(50).fill('p-4').join(' ');
      const result = translateClasses(longString);
      expect(result).toContain('padding');
    });
  });
});
