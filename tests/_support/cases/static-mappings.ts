/**
 * Test cases for static mappings (non-pattern-based translations)
 * These test utilities with fixed translations
 *
 * Imports from the actual combined tailwindMappings to ensure tests
 * match the production behavior (where later mappings override earlier ones).
 *
 * @see src/core/translation/rules/mappings/
 */

import { tailwindMappings } from '@src/core/translation/rules/mappings';

export const TRANSLATE_STATIC_CASES: Array<[string, string]> = [
  ['flex', tailwindMappings.flex],
  ['flex-row', tailwindMappings['flex-row']],
  ['flex-col', tailwindMappings['flex-col']],
  ['p-4', tailwindMappings['p-4']],
  ['m-2', tailwindMappings['m-2']],
  ['px-4', tailwindMappings['px-4']],
  ['my-2', tailwindMappings['my-2']],
  ['bg-white', tailwindMappings['bg-white']],
  ['text-blue-500', tailwindMappings['text-blue-500']],
  ['bg-transparent', tailwindMappings['bg-transparent']],
  ['block', tailwindMappings.block],
  ['inline', tailwindMappings.inline],
  ['hidden', tailwindMappings.hidden],
];

export const CATEGORY_ORDER = ['Flexbox & Grid', 'Spacing', 'Colors'] as const;
