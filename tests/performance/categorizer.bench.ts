/**
 * Performance benchmarks for categorization functions
 * 
 * Measures performance of class categorization and grouping operations.
 * Run with: `npx vitest bench`
 * 
 * @module tests/performance/categorizer.bench
 */

import { bench, describe } from 'vitest';
import { categorizeClass, groupTranslationsByCategory } from '@src/core/translation/categorizer';

describe('Categorization Performance', () => {
  describe('categorizeClass - individual classes', () => {
    bench('layout class', () => {
      categorizeClass('flex');
    });

    bench('spacing class', () => {
      categorizeClass('px-4');
    });

    bench('color class', () => {
      categorizeClass('bg-blue-500');
    });

    bench('typography class', () => {
      categorizeClass('text-lg');
    });

    bench('effect class', () => {
      categorizeClass('shadow-md');
    });

    bench('border class', () => {
      categorizeClass('border-2');
    });

    bench('class with variant', () => {
      categorizeClass('hover:bg-blue-500');
    });

    bench('class with multiple variants', () => {
      categorizeClass('lg:dark:hover:bg-blue-500');
    });
  });

  describe('groupTranslationsByCategory - small sets', () => {
    const small5Classes = ['flex', 'items-center', 'gap-4', 'px-4', 'py-2'];
    const small5Translations = ['flexbox', 'centers items', 'gap 1rem', 'horizontal padding 1rem', 'vertical padding 0.5rem'];

    bench('5 classes', () => {
      groupTranslationsByCategory(small5Classes, small5Translations);
    });

    const medium15Classes = ['flex', 'items-center', 'justify-between', 'gap-4', 'px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded-lg', 'shadow-md', 'border', 'border-gray-200', 'hover:bg-blue-600', 'transition-colors', 'cursor-pointer'];
    const medium15Translations = ['flexbox', 'centers items', 'space between', 'gap 1rem', 'horizontal padding 1rem', 'vertical padding 0.5rem', 'blue background', 'white text', 'rounded corners large', 'medium shadow', 'has border', 'light gray border', 'on hover: darker blue background', 'transition colors', 'pointer cursor'];

    bench('15 classes (typical component)', () => {
      groupTranslationsByCategory(medium15Classes, medium15Translations);
    });
  });

  describe('groupTranslationsByCategory - large sets', () => {
    const large50Classes = Array(50).fill(null).map((_, i) => `class-${i}`);
    const large50Translations = Array(50).fill(null).map((_, i) => `translation ${i}`);

    bench('50 classes', () => {
      groupTranslationsByCategory(large50Classes, large50Translations);
    });

    const large100Classes = Array(100).fill(null).map((_, i) => `class-${i}`);
    const large100Translations = Array(100).fill(null).map((_, i) => `translation ${i}`);

    bench('100 classes (stress test)', () => {
      groupTranslationsByCategory(large100Classes, large100Translations);
    });
  });

  describe('groupTranslationsByCategory - mixed categories', () => {
    const mixedClasses = ['flex', 'px-4', 'text-lg', 'bg-blue-500', 'items-center', 'py-2', 'font-bold', 'text-white', 'rounded-lg', 'shadow-md'];
    const mixedTranslations = ['flexbox', 'horizontal padding 1rem', 'large text', 'blue background', 'centers items', 'vertical padding 0.5rem', 'bold font weight', 'white text', 'rounded corners large', 'medium shadow'];

    bench('10 classes across all categories', () => {
      groupTranslationsByCategory(mixedClasses, mixedTranslations);
    });
  });

  describe('Real-world scenarios', () => {
    const buttonClasses = ['px-4', 'py-2', 'bg-blue-500', 'text-white', 'rounded', 'hover:bg-blue-600', 'active:bg-blue-700', 'transition-colors'];
    const buttonTranslations = ['horizontal padding 1rem', 'vertical padding 0.5rem', 'blue background', 'white text', 'rounded corners', 'on hover: darker blue background', 'when active: even darker blue background', 'transition colors'];

    bench('button component (8 classes)', () => {
      groupTranslationsByCategory(buttonClasses, buttonTranslations);
    });

    const cardClasses = ['flex', 'flex-col', 'gap-4', 'p-6', 'bg-white', 'rounded-lg', 'shadow-md', 'border', 'border-gray-200', 'hover:shadow-lg', 'transition-all', 'duration-300', 'cursor-pointer'];
    const cardTranslations = ['flexbox', 'vertical direction', 'gap 1rem', 'padding 1.5rem', 'white background', 'rounded corners large', 'medium shadow', 'has border', 'light gray border', 'on hover: large shadow', 'transition all properties', '300ms duration', 'pointer cursor'];

    bench('card component (13 classes)', () => {
      groupTranslationsByCategory(cardClasses, cardTranslations);
    });
  });
});

