/**
 * Test cases for variant handling
 * These test pseudo-classes, responsive modifiers, and other variants
 *
 * @see src/core/translation/translator/variants.ts
 */

import { VARIANT_DESCRIPTIONS } from '@src/core/translation/engine/variants';

export const VARIANT_CASES: Array<[string, string[]]> = [
  ['hover:bg-blue-500', [VARIANT_DESCRIPTIONS.hover]],
  [
    'md:hover:bg-blue-500',
    [VARIANT_DESCRIPTIONS.md, VARIANT_DESCRIPTIONS.hover],
  ],
  ['sm:text-sm lg:text-lg', [VARIANT_DESCRIPTIONS.sm, VARIANT_DESCRIPTIONS.lg]],
  ['dark:bg-black', [VARIANT_DESCRIPTIONS.dark]],
  ['group-hover:opacity-100', [VARIANT_DESCRIPTIONS['group-hover']]],
  ['peer-focus:ring-2', [VARIANT_DESCRIPTIONS['peer-focus']]],
  ['before:content-["→"]', [VARIANT_DESCRIPTIONS.before]],
];

export const VARIANT_INTERACTION_CASES: Array<[string, string, string]> = [
  ['hover', 'hover', VARIANT_DESCRIPTIONS.hover],
  ['focus', 'focus', VARIANT_DESCRIPTIONS.focus],
  ['active', 'active', VARIANT_DESCRIPTIONS.active],
  ['disabled', 'disabled', VARIANT_DESCRIPTIONS.disabled],
];

export const VARIANT_RESPONSIVE_CASES: Array<[string, string, string]> = [
  ['sm', 'sm', 'small screens'],
  ['md', 'md', 'medium screens'],
  ['lg', 'lg', 'large screens'],
  ['xl', 'xl', 'extra large screens'],
];

export const VARIANT_DARK_MODE_CASES: Array<[string, string, string]> = [
  ['dark', 'dark', VARIANT_DESCRIPTIONS.dark],
  ['not-dark', 'not-dark', VARIANT_DESCRIPTIONS['not-dark']],
];

export const VARIANT_PSEUDO_ELEMENT_CASES: Array<[string, string, string]> = [
  ['before', 'before', VARIANT_DESCRIPTIONS.before],
  ['after', 'after', VARIANT_DESCRIPTIONS.after],
  ['placeholder', 'placeholder', VARIANT_DESCRIPTIONS.placeholder],
];

export const VARIANT_GROUP_CASES: Array<[string, string, string]> = [
  ['group-hover', 'group-hover', VARIANT_DESCRIPTIONS['group-hover']],
  ['group-focus', 'group-focus', VARIANT_DESCRIPTIONS['group-focus']],
];

export const VARIANT_PEER_CASES: Array<[string, string, string]> = [
  ['peer-hover', 'peer-hover', VARIANT_DESCRIPTIONS['peer-hover']],
  ['peer-focus', 'peer-focus', VARIANT_DESCRIPTIONS['peer-focus']],
];

export const APPLY_VARIANTS_CASES: Array<[string, string[], string]> = [
  [
    'white background',
    ['hover'],
    `white background ${VARIANT_DESCRIPTIONS.hover}`,
  ],
  [
    'blue text',
    ['md', 'hover'],
    `blue text ${VARIANT_DESCRIPTIONS.md}, ${VARIANT_DESCRIPTIONS.hover}`,
  ],
  ['flexbox', [], 'flexbox'],
  [
    'black background',
    ['dark'],
    `black background ${VARIANT_DESCRIPTIONS.dark}`,
  ],
  [
    'visible',
    ['group-hover', 'peer-focus'],
    `visible ${VARIANT_DESCRIPTIONS['group-hover']}, ${VARIANT_DESCRIPTIONS['peer-focus']}`,
  ],
  [
    'padding 1rem',
    ['lg', 'hover', 'focus'],
    `padding 1rem ${VARIANT_DESCRIPTIONS.lg}, ${VARIANT_DESCRIPTIONS.hover}, ${VARIANT_DESCRIPTIONS.focus}`,
  ],
  ['content "→"', ['after'], `content "→" ${VARIANT_DESCRIPTIONS.after}`],
  [
    'red border',
    ['invalid', 'required'],
    `red border ${VARIANT_DESCRIPTIONS.invalid}, ${VARIANT_DESCRIPTIONS.required}`,
  ],
  [
    'bold font',
    ['first', 'last'],
    `bold font ${VARIANT_DESCRIPTIONS.first}, ${VARIANT_DESCRIPTIONS.last}`,
  ],
];

export const DESCRIBE_ARBITRARY_VARIANT_CASES: Array<[string, string]> = [
  ['has-[>img]', 'when has >img'],
  ['data-[state=open]', 'when data-state=open'],
  ['aria-[hidden]', 'when aria-hidden'],
  ['nth-[3]', 'nth-child(3)'],
  ['not-[:first-child]', 'when not :first-child'],
  ['supports-[display:grid]', 'when supports display:grid'],
  ['min-[768px]', 'on screens ≥768px'],
  ['@min-[400px]', 'in container ≥400px'],
  ['group/sidebar', 'when group "sidebar"'],
];
