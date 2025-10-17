/**
 * Test cases for variant handling
 * These test pseudo-classes, responsive modifiers, and other variants
 * 
 * @see src/core/translation/translator/variants.ts
 */

import { VARIANT_DESCRIPTIONS } from '@src/core/translation/engine/variants';

export const VARIANT_CASES: Array<[string, string[]]> = [
  ['hover:bg-blue-500', [VARIANT_DESCRIPTIONS.hover]],
  ['md:hover:bg-blue-500', [VARIANT_DESCRIPTIONS.md, VARIANT_DESCRIPTIONS.hover]],
  ['sm:text-sm lg:text-lg', [VARIANT_DESCRIPTIONS.sm, VARIANT_DESCRIPTIONS.lg]],
  ['dark:bg-black', [VARIANT_DESCRIPTIONS.dark]],
  ['group-hover:opacity-100', [VARIANT_DESCRIPTIONS['group-hover']]],
  ['peer-focus:ring-2', [VARIANT_DESCRIPTIONS['peer-focus']]],
  ['before:content-["→"]', [VARIANT_DESCRIPTIONS.before]],
];

export const VARIANT_INTERACTION_CASES: Array<[string, string, string]> = [
  ['hover', 'hover', 'on hover'],
  ['focus', 'focus', 'on focus'],
  ['active', 'active', 'when active'],
  ['disabled', 'disabled', 'when disabled'],
];

export const VARIANT_RESPONSIVE_CASES: Array<[string, string, string]> = [
  ['sm', 'sm', 'small screens'],
  ['md', 'md', 'medium screens'],
  ['lg', 'lg', 'large screens'],
  ['xl', 'xl', 'extra large screens'],
];

export const VARIANT_DARK_MODE_CASES: Array<[string, string, string]> = [
  ['dark', 'dark', 'in dark mode'],
  ['not-dark', 'not-dark', 'in light mode'],
];

export const VARIANT_PSEUDO_ELEMENT_CASES: Array<[string, string, string]> = [
  ['before', 'before', 'before pseudo-element'],
  ['after', 'after', 'after pseudo-element'],
  ['placeholder', 'placeholder', 'placeholder'],
];

export const VARIANT_GROUP_CASES: Array<[string, string, string]> = [
  ['group-hover', 'group-hover', 'when group hovered'],
  ['group-focus', 'group-focus', 'when group focused'],
];

export const VARIANT_PEER_CASES: Array<[string, string, string]> = [
  ['peer-hover', 'peer-hover', 'when peer hovered'],
  ['peer-focus', 'peer-focus', 'when peer focused'],
];

export const APPLY_VARIANTS_CASES: Array<[string, string[], string]> = [
  ['white background', ['hover'], 'white background on hover'],
  ['blue text', ['md', 'hover'], 'blue text on medium screens (≥768px), on hover'],
  ['flexbox', [], 'flexbox'],
  ['black background', ['dark'], 'black background in dark mode'],
  ['visible', ['group-hover', 'peer-focus'], 'visible when group hovered, when peer focused'],
  ['padding 1rem', ['lg', 'hover', 'focus'], 'padding 1rem on large screens (≥1024px), on hover, on focus'],
  ['content "→"', ['after'], 'content "→" after pseudo-element'],
  ['red border', ['invalid', 'required'], 'red border when invalid, when required'],
  ['bold font', ['first', 'last'], 'bold font on first child, on last child'],
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

