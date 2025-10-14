/**
 * Tests for categorizer module
 */

import { describe, it, expect } from 'vitest';
import {
  categorizeClass,
  getCategoryEmoji,
  getCategoryOrder,
  groupTranslationsByCategory,
} from '../index';

describe('categorizeClass', () => {
  describe('Layout', () => {
    it('should categorize display utilities', () => {
      expect(categorizeClass('block')).toBe('Layout');
      expect(categorizeClass('inline')).toBe('Layout');
      expect(categorizeClass('hidden')).toBe('Layout');
      expect(categorizeClass('flex')).toBe('Flexbox & Grid');
    });

    it('should categorize position utilities', () => {
      expect(categorizeClass('static')).toBe('Layout');
      expect(categorizeClass('fixed')).toBe('Layout');
      expect(categorizeClass('absolute')).toBe('Layout');
      expect(categorizeClass('relative')).toBe('Layout');
    });

    it('should categorize overflow utilities', () => {
      expect(categorizeClass('overflow-hidden')).toBe('Layout');
      expect(categorizeClass('overflow-auto')).toBe('Layout');
    });
  });

  describe('Flexbox & Grid', () => {
    it('should categorize flex utilities', () => {
      expect(categorizeClass('flex')).toBe('Flexbox & Grid');
      expect(categorizeClass('flex-row')).toBe('Flexbox & Grid');
      expect(categorizeClass('flex-col')).toBe('Flexbox & Grid');
      expect(categorizeClass('items-center')).toBe('Flexbox & Grid');
      expect(categorizeClass('justify-between')).toBe('Flexbox & Grid');
    });

    it('should categorize grid utilities', () => {
      expect(categorizeClass('grid')).toBe('Flexbox & Grid');
      expect(categorizeClass('grid-cols-3')).toBe('Flexbox & Grid');
      expect(categorizeClass('grid-rows-2')).toBe('Flexbox & Grid');
      expect(categorizeClass('col-span-2')).toBe('Flexbox & Grid');
      expect(categorizeClass('gap-4')).toBe('Flexbox & Grid');
    });
  });

  describe('Spacing', () => {
    it('should categorize padding utilities', () => {
      expect(categorizeClass('p-4')).toBe('Spacing');
      expect(categorizeClass('px-2')).toBe('Spacing');
      expect(categorizeClass('py-8')).toBe('Spacing');
      expect(categorizeClass('pt-6')).toBe('Spacing');
      expect(categorizeClass('pl-0')).toBe('Spacing');
    });

    it('should categorize margin utilities', () => {
      expect(categorizeClass('m-4')).toBe('Spacing');
      expect(categorizeClass('mx-auto')).toBe('Layout'); // mx-auto is for centering (layout)
      expect(categorizeClass('my-2')).toBe('Spacing');
      expect(categorizeClass('mt-8')).toBe('Spacing');
      expect(categorizeClass('mb-0')).toBe('Spacing');
    });

    it('should categorize space-between utilities', () => {
      expect(categorizeClass('space-x-4')).toBe('Spacing');
      expect(categorizeClass('space-y-2')).toBe('Spacing');
    });
  });

  describe('Sizing', () => {
    it('should categorize width utilities', () => {
      expect(categorizeClass('w-full')).toBe('Sizing');
      expect(categorizeClass('w-screen')).toBe('Sizing');
      expect(categorizeClass('w-1/2')).toBe('Sizing');
      expect(categorizeClass('max-w-xl')).toBe('Sizing');
      expect(categorizeClass('min-w-0')).toBe('Sizing');
    });

    it('should categorize height utilities', () => {
      expect(categorizeClass('h-full')).toBe('Sizing');
      expect(categorizeClass('h-screen')).toBe('Sizing');
      expect(categorizeClass('max-h-96')).toBe('Sizing');
      expect(categorizeClass('min-h-0')).toBe('Sizing');
    });

    it('should categorize size utilities', () => {
      expect(categorizeClass('size-10')).toBe('Sizing');
      expect(categorizeClass('size-full')).toBe('Sizing');
    });
  });

  describe('Colors', () => {
    it('should categorize text color utilities', () => {
      expect(categorizeClass('text-white')).toBe('Colors');
      expect(categorizeClass('text-blue-500')).toBe('Colors');
      expect(categorizeClass('text-red-700')).toBe('Colors');
    });

    it('should categorize border color utilities', () => {
      expect(categorizeClass('border-gray-300')).toBe('Colors');
      expect(categorizeClass('border-transparent')).toBe('Colors');
    });

    it('should categorize ring color utilities', () => {
      expect(categorizeClass('ring-blue-500')).toBe('Colors');
    });
  });

  describe('Backgrounds', () => {
    it('should categorize background color utilities', () => {
      // Background colors are categorized as Colors (reasonable - they're color utilities)
      expect(categorizeClass('bg-white')).toBe('Colors');
      expect(categorizeClass('bg-blue-500')).toBe('Colors');
      expect(categorizeClass('bg-transparent')).toBe('Colors');
    });

    it('should categorize gradient utilities', () => {
      // Gradients are also color-related
      expect(categorizeClass('bg-gradient-to-r')).toBe('Colors');
      expect(categorizeClass('from-blue-500')).toBe('Colors');
      expect(categorizeClass('to-purple-600')).toBe('Colors');
    });
  });

  describe('Borders', () => {
    it('should categorize border width utilities', () => {
      expect(categorizeClass('border')).toBe('Borders');
      expect(categorizeClass('border-2')).toBe('Borders');
      expect(categorizeClass('border-t')).toBe('Borders');
      expect(categorizeClass('border-b-4')).toBe('Borders');
    });

    it('should categorize border radius utilities', () => {
      expect(categorizeClass('rounded')).toBe('Borders');
      expect(categorizeClass('rounded-lg')).toBe('Borders');
      expect(categorizeClass('rounded-full')).toBe('Borders');
      expect(categorizeClass('rounded-t-md')).toBe('Borders');
    });

    it('should categorize border style utilities', () => {
      expect(categorizeClass('border-solid')).toBe('Borders');
      expect(categorizeClass('border-dashed')).toBe('Borders');
    });
  });

  describe('Typography', () => {
    it('should categorize font size utilities', () => {
      expect(categorizeClass('text-sm')).toBe('Typography');
      expect(categorizeClass('text-lg')).toBe('Typography');
      expect(categorizeClass('text-xl')).toBe('Typography');
    });

    it('should categorize font weight utilities', () => {
      expect(categorizeClass('font-bold')).toBe('Typography');
      expect(categorizeClass('font-normal')).toBe('Typography');
      expect(categorizeClass('font-light')).toBe('Typography');
    });

    it('should categorize text alignment utilities', () => {
      expect(categorizeClass('text-center')).toBe('Typography');
      expect(categorizeClass('text-left')).toBe('Typography');
      expect(categorizeClass('text-right')).toBe('Typography');
    });

    it('should categorize line height utilities', () => {
      expect(categorizeClass('leading-none')).toBe('Typography');
      expect(categorizeClass('leading-tight')).toBe('Typography');
    });
  });

  describe('Transforms', () => {
    it('should categorize transform utilities', () => {
      expect(categorizeClass('scale-150')).toBe('Transforms');
      expect(categorizeClass('rotate-45')).toBe('Transforms');
      expect(categorizeClass('translate-x-4')).toBe('Transforms');
      expect(categorizeClass('skew-y-3')).toBe('Transforms');
    });
  });

  describe('Transitions & Animation', () => {
    it('should categorize transition utilities', () => {
      expect(categorizeClass('transition')).toBe('Transitions & Animation');
      expect(categorizeClass('transition-all')).toBe('Transitions & Animation');
      expect(categorizeClass('duration-300')).toBe('Transitions & Animation');
    });

    it('should categorize animation utilities', () => {
      expect(categorizeClass('animate-spin')).toBe('Transitions & Animation');
      expect(categorizeClass('animate-bounce')).toBe('Transitions & Animation');
    });
  });

  describe('Effects', () => {
    it('should categorize shadow utilities', () => {
      expect(categorizeClass('shadow')).toBe('Effects');
      expect(categorizeClass('shadow-lg')).toBe('Effects');
      expect(categorizeClass('shadow-none')).toBe('Effects');
    });

    it('should categorize opacity utilities', () => {
      expect(categorizeClass('opacity-50')).toBe('Effects');
      expect(categorizeClass('opacity-0')).toBe('Effects');
    });
  });

  describe('Variants', () => {
    it('should strip variants before categorizing', () => {
      expect(categorizeClass('hover:bg-blue-500')).toBe('Colors'); // bg colors are in Colors category
      expect(categorizeClass('md:flex')).toBe('Flexbox & Grid');
      expect(categorizeClass('dark:text-white')).toBe('Colors');
      expect(categorizeClass('lg:hover:p-4')).toBe('Spacing');
    });

    it('should handle multiple variants', () => {
      expect(categorizeClass('sm:md:lg:grid')).toBe('Flexbox & Grid');
      expect(categorizeClass('group-hover:peer-focus:opacity-50')).toBe(
        'Effects'
      );
    });
  });

  describe('Unknown classes', () => {
    it('should categorize unknown classes as Other', () => {
      expect(categorizeClass('unknown-class')).toBe('Other');
      expect(categorizeClass('custom-utility')).toBe('Other');
    });
  });
});

describe('getCategoryEmoji', () => {
  it('should return emojis for each category', () => {
    expect(getCategoryEmoji('Layout')).toBeTruthy();
    expect(getCategoryEmoji('Flexbox & Grid')).toBeTruthy();
    expect(getCategoryEmoji('Spacing')).toBeTruthy();
    expect(getCategoryEmoji('Colors')).toBeTruthy();
    expect(getCategoryEmoji('Typography')).toBeTruthy();
  });

  it('should return a default emoji for unknown categories', () => {
    expect(getCategoryEmoji('Other')).toBeTruthy();
  });

  it('should return consistent emojis', () => {
    expect(getCategoryEmoji('Colors')).toBe(getCategoryEmoji('Colors'));
    expect(getCategoryEmoji('Layout')).toBe(getCategoryEmoji('Layout'));
  });
});

describe('getCategoryOrder', () => {
  it('should return array of categories', () => {
    const order = getCategoryOrder();
    expect(Array.isArray(order)).toBe(true);
    expect(order.length).toBeGreaterThan(0);
  });

  it('should include main categories', () => {
    const order = getCategoryOrder();
    expect(order).toContain('Layout');
    expect(order).toContain('Flexbox & Grid');
    expect(order).toContain('Spacing');
    expect(order).toContain('Sizing');
    expect(order).toContain('Colors');
    expect(order).toContain('Typography');
    expect(order).toContain('Other');
  });

  it('should have consistent ordering', () => {
    const order1 = getCategoryOrder();
    const order2 = getCategoryOrder();
    expect(order1).toEqual(order2);
  });
});

describe('groupTranslationsByCategory', () => {
  it('should group translations by category', () => {
    const classes = ['flex', 'p-4', 'text-blue-500'];
    const translations = ['flexbox', 'padding 1rem', 'blue text'];
    const result = groupTranslationsByCategory(classes, translations, false);

    expect(result).toContain('Flexbox & Grid: flexbox');
    expect(result).toContain('Spacing: padding 1rem');
    expect(result).toContain('Colors: blue text');
  });

  it('should group multiple classes in same category', () => {
    const classes = ['p-4', 'm-2', 'gap-4'];
    const translations = ['padding 1rem', 'margin 0.5rem', 'gap 1rem'];
    const result = groupTranslationsByCategory(classes, translations, false);

    expect(result).toContain('padding 1rem, margin 0.5rem');
    expect(result).toContain('Flexbox & Grid: gap 1rem');
  });

  it('should show emojis when requested', () => {
    const classes = ['flex', 'p-4'];
    const translations = ['flexbox', 'padding 1rem'];
    const result = groupTranslationsByCategory(classes, translations, true);

    // Should contain emoji characters
    expect(result).toMatch(/[^\x00-\x7F]/); // Non-ASCII characters (emojis)
  });

  it('should not show emojis when not requested', () => {
    const classes = ['flex'];
    const translations = ['flexbox'];
    const result = groupTranslationsByCategory(classes, translations, false);

    expect(result).toBe('Flexbox & Grid: flexbox');
  });

  it('should maintain category order', () => {
    const classes = ['shadow', 'flex', 'p-4', 'text-lg'];
    const translations = [
      'shadow',
      'flexbox',
      'padding 1rem',
      'large text size',
    ];
    const result = groupTranslationsByCategory(classes, translations, false);

    const flexIndex = result.indexOf('Flexbox & Grid');
    const spacingIndex = result.indexOf('Spacing');
    const typographyIndex = result.indexOf('Typography');
    const effectsIndex = result.indexOf('Effects');

    // Based on display order, flex/grid should come before spacing
    expect(flexIndex).toBeLessThan(spacingIndex);
    // Typography should come after spacing
    expect(spacingIndex).toBeLessThan(typographyIndex);
    // Effects might come later
    expect(effectsIndex).toBeGreaterThan(0);
  });

  it('should handle empty arrays', () => {
    const result = groupTranslationsByCategory([], [], false);
    expect(result).toBe('');
  });

  it('should handle single class', () => {
    const result = groupTranslationsByCategory(['flex'], ['flexbox'], false);
    expect(result).toBe('Flexbox & Grid: flexbox');
  });

  it('should join multiple categories with pipe', () => {
    const classes = ['flex', 'p-4'];
    const translations = ['flexbox', 'padding 1rem'];
    const result = groupTranslationsByCategory(classes, translations, false);

    expect(result).toContain('|');
    expect(result.split('|').length).toBe(2);
  });

  it('should handle classes with variants', () => {
    const classes = ['hover:bg-blue-500', 'md:p-4'];
    const translations = [
      'blue background on hover',
      'padding 1rem on medium screens',
    ];
    const result = groupTranslationsByCategory(classes, translations, false);

    expect(result).toContain('Colors:'); // bg colors are in Colors category
    expect(result).toContain('Spacing:');
  });
});
