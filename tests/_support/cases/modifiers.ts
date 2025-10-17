/**
 * Test cases for modifier chains (important, opacity, prefix)
 * These test the order-of-operations for combined modifiers
 * 
 * @see src/core/translation/translator/parser.ts
 */

// Opacity modifier cases
export const APPLY_OPACITY_CASES: Array<[string, string, string]> = [
  ['white background', '50', 'white background with 50% opacity'],
  ['blue text', '75', 'blue text with 75% opacity'],
  ['red background', '10', 'red background with 10% opacity'],
  ['black background', '0', 'black background with 0% opacity'],
  ['green background', '100', 'green background with 100% opacity'],
];

export const APPLY_OPACITY_COMPLEX_CASES: Array<[string, string, string]> = [
  ['horizontal padding 1rem on hover', '80', 'horizontal padding 1rem on hover with 80% opacity'],
];

export const INVALID_OPACITY_CASES: Array<[string, string | null]> = [
  ['bg-white/abc', null],
  ['bg-white/150', '150'],
  ['bg-white/-10', null],
  ['bg-white/', null],
  ['bg-white/0', '0'],
  ['bg-white/100', '100'],
];

// Complex modifier chain cases (order-of-operations)
export const FULL_MODIFIER_CHAIN_CASES: Array<[string, string[]]> = [
  ['tw\\:bg-white', ['[tw]', 'white background']],
  ['hover:bg-blue-500!', ['on hover', '!important']],
  ['md:bg-white/50', ['on medium screens', '50% opacity']],
  ['tw\\:md:hover:bg-blue-500', ['[tw]', 'on medium screens', 'on hover', 'blue background']],
  ['md:hover:bg-blue-500/75', ['on medium screens', 'on hover', '75% opacity']],
  ['hover:bg-blue-500/50!', ['on hover', '50% opacity', '!important']],
  ['tw\\:md:hover:bg-blue-500/50!', ['[tw]', 'on medium screens', 'on hover', '50% opacity', '!important']],
  ['dark:md:hover:focus:bg-gradient-to-r/75!', ['in dark mode', 'on medium screens', 'on hover', 'on focus', '75% opacity', '!important']],
];

// Real-world complex combinations
export const REAL_WORLD_COMPLEX_CASES: Array<[string, string[]]> = [
  [
    'tw\\:dark:md:hover:focus-visible:bg-gradient-to-br/90!',
    ['[tw]', 'in dark mode', 'on medium screens', 'on hover', 'when focus visible', 'gradient', '90% opacity', '!important']
  ],
  [
    'group-hover:peer-focus:data-[state=open]:block',
    ['when group hovered', 'when peer focused', 'when data-state=open', 'block']
  ],
  [
    'before:content-["→"]:hover:opacity-50',
    ['before pseudo-element', 'on hover', 'opacity']
  ],
];

// Malformed modifier cases
export const MALFORMED_MODIFIER_CASES: Array<[string, string]> = [
  ['hover:', 'on hover'], // empty base class, parsed gracefully
  [':bg-white', 'white background'], // leading colon is treated as variant name
  ['md::flex', 'on medium screens'], // double colon creates empty variant
  [':::test', 'test'], // multiple colons are stripped
];

