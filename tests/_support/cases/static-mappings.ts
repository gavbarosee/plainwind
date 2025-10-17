/**
 * Test cases for static mappings (non-pattern-based translations)
 * These test utilities with fixed translations
 * 
 * @see src/core/translation/rules/mappings/
 */

export const TRANSLATE_STATIC_CASES: Array<[string, string]> = [
  ['flex', 'flexbox container'],
  ['flex-row', 'horizontal layout'],
  ['flex-col', 'vertical layout'],
  ['p-4', 'padding 1rem'],
  ['m-2', 'margin 0.5rem'],
  ['px-4', 'horizontal padding 1rem'],
  ['my-2', 'vertical margin 0.5rem'],
  ['bg-white', 'white background'],
  ['text-blue-500', 'blue text'],
  ['bg-transparent', 'transparent background'],
  ['block', 'display as block'],
  ['inline', 'display inline'],
  ['hidden', 'not visible'],
];

export const CATEGORY_ORDER = ['Flexbox & Grid', 'Spacing', 'Colors'] as const;

