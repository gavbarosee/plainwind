/**
 * Test cases for matcher functions
 * These test the matching and translation of specific Tailwind patterns
 * 
 * @see src/core/translation/translator/matchers.ts
 */

export const MATCHER_SPACING_CASES: Array<[string, string]> = [
  ['p-12', 'padding'],
  ['m-0', 'margin'],
  ['pt-6', 'top padding'],
  ['ml-auto', 'left margin'],
];

export const MATCHER_SIZING_CASES: Array<[string, string]> = [
  ['w-full', 'width'],
  ['h-screen', 'height'],
  ['max-w-xl', 'max width'],
];

export const MATCHER_COLOR_SCALE_CASES: Array<[string, string]> = [
  ['bg-gray-100', 'gray'],
  ['text-red-500', 'red'],
  ['border-blue-700', 'blue'],
];

export const MATCHER_BORDER_CASES: Array<[string, string, string]> = [
  ['border', 'has border', 'exact'],
  ['border-2', 'border', 'contains'],
  ['rounded-lg', 'corner', 'contains'],
];

export const MATCHER_TYPOGRAPHY_CASES: Array<[string, string]> = [
  ['text-xl', 'text'],
  ['leading-tight', 'line'],
];

export const MATCHER_GRID_CASES: Array<[string, string, string]> = [
  ['grid-cols-3', 'three columns', 'exact'],
  ['grid-rows-2', 'two rows', 'exact'],
  ['col-span-2', 'span', 'contains'],
];

export const MATCHER_TRANSFORM_CASES: Array<[string, string]> = [
  ['rotate-45', 'rotate'],
  ['scale-150', 'scale'],
  ['translate-x-4', 'translate'],
];

export const MATCHER_OPACITY_CASES: Array<[string, string, string]> = [
  ['opacity-50', 'opacity', 'contains'],
  ['opacity-0', 'invisible', 'exact'],
];

export const MATCHER_SHADOW_CASES: Array<[string, string]> = [
  ['shadow', 'shadow'],
  ['shadow-lg', 'shadow'],
  ['shadow-none', 'shadow'],
];

export const MATCHER_ARBITRARY_WIDTH_CASES: Array<[string, string, string]> = [
  ['w-[100px]', 'width 100px', 'exact'],
  ['w-[50%]', 'width 50%', 'exact'],
  ['w-[calc(100%-2rem)]', 'width calc(100%-2rem)', 'exact'],
];

export const MATCHER_ARBITRARY_SPACING_CASES: Array<[string, string]> = [
  ['p-[10px]', 'padding 10px'],
  ['m-[2rem]', 'margin 2rem'],
  ['mt-[5px]', 'top'],
];

export const MATCHER_ARBITRARY_COLOR_CASES: Array<[string, string, string]> = [
  ['bg-[#fff]', 'background color #fff', 'exact'],
  ['text-[rgb(0,0,0)]', 'text color rgb(0,0,0)', 'exact'],
  ['text-[oklch(0.5_0.2_180)]', 'text color oklch(0.5_0.2_180)', 'exact'],
];

export const MATCHER_CSS_VAR_CASES: Array<[string, string, string]> = [
  ['bg-[var(--primary)]', 'background var(--primary)', 'exact'],
  ['text-[color(--custom)]', 'text color color(--custom)', 'exact'],
];

export const MATCHER_CQ_UNITS_CASES: Array<[string, string, string]> = [
  ['w-[50cqw]', 'width 50cqw', 'exact'],
  ['h-[100cqh]', 'height 100cqh', 'exact'],
];

export const MATCHER_VIEWPORT_UNITS_CASES: Array<[string, string, string]> = [
  ['h-[100svh]', 'height 100svh', 'exact'],
  ['w-[100dvw]', 'width 100dvw', 'exact'],
];

export const MATCHER_UNKNOWN_CASES: Array<[string, string]> = [
  ['unknown-class', 'unknown-class'],
  ['custom-utility', 'custom-utility'],
  ['my-123-class', 'margin'],
];

