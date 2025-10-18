/**
 * Performance benchmarks for translation functions
 *
 * Measures performance of core translation operations to catch regressions.
 * Run with: `npx vitest bench`
 *
 * @module tests/performance/translation.bench
 */

import { bench, describe } from 'vitest';
import { translateClasses } from '@src/core/translation/engine';
import { translateBaseClass } from '@src/core/translation/engine/matchers';

describe('Translation Performance', () => {
  describe('translateClasses - simple strings', () => {
    bench('basic flex layout (5 classes)', () => {
      translateClasses('flex items-center gap-4 px-4 py-2');
    });

    bench('button with colors (8 classes)', () => {
      translateClasses(
        'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition-colors'
      );
    });

    bench('complex card (15 classes)', () => {
      translateClasses(
        'flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer'
      );
    });
  });

  describe('translateClasses - with variants', () => {
    bench('responsive grid (10 classes)', () => {
      translateClasses(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4'
      );
    });

    bench('dark mode theme (12 classes)', () => {
      translateClasses(
        'bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 p-4'
      );
    });

    bench('hover/focus states (15 classes)', () => {
      translateClasses(
        'px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
      );
    });
  });

  describe('translateClasses - with arbitrary values', () => {
    bench('arbitrary colors (5 classes)', () => {
      translateClasses(
        'bg-[#1a1a1a] text-[#ffffff] border-[#333333] p-4 rounded'
      );
    });

    bench('arbitrary sizes (8 classes)', () => {
      translateClasses(
        'w-[500px] h-[300px] max-w-[1200px] min-h-[400px] p-[2.5rem] gap-[1.5rem]'
      );
    });

    bench('mixed arbitrary (10 classes)', () => {
      translateClasses(
        'w-[calc(100%-2rem)] bg-[linear-gradient(to_right,red,blue)] shadow-[0_10px_50px_rgba(0,0,0,0.3)] grid-cols-[repeat(auto-fit,minmax(200px,1fr))]'
      );
    });
  });

  describe('translateClasses - edge cases', () => {
    bench('important modifiers (8 classes)', () => {
      translateClasses(
        '!flex !items-center !gap-4 !px-4 !py-2 !bg-blue-500 !text-white !rounded'
      );
    });

    bench('opacity modifiers (6 classes)', () => {
      translateClasses(
        'bg-blue-500/50 text-white/75 border-gray-200/25 shadow-lg/30'
      );
    });

    bench('group/peer variants (8 classes)', () => {
      translateClasses(
        'group-hover:bg-blue-500 peer-checked:text-green-500 group-focus:ring-2 peer-disabled:opacity-50'
      );
    });
  });

  describe('translateBaseClass - individual classes', () => {
    bench('simple utility', () => {
      translateBaseClass('flex');
    });

    bench('spacing utility', () => {
      translateBaseClass('px-4');
    });

    bench('color utility', () => {
      translateBaseClass('bg-blue-500');
    });

    bench('pattern matching - grid', () => {
      translateBaseClass('grid-cols-3');
    });

    bench('pattern matching - arbitrary', () => {
      translateBaseClass('w-[500px]');
    });

    bench('complex variant', () => {
      translateBaseClass('hover:group-focus:lg:dark:bg-blue-500');
    });
  });

  describe('translateClasses - large strings (stress test)', () => {
    const large50Classes =
      'flex items-center justify-between gap-4 px-4 py-2 mx-auto my-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 cursor-pointer w-full max-w-4xl min-h-[200px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-4 p-6 md:p-8 lg:p-10 font-sans text-base md:text-lg lg:text-xl font-normal md:font-medium lg:font-semibold';

    bench('50 classes (realistic complex component)', () => {
      translateClasses(large50Classes);
    });

    const large100Classes = large50Classes + ' ' + large50Classes;

    bench('100 classes (stress test)', () => {
      translateClasses(large100Classes);
    });
  });
});
