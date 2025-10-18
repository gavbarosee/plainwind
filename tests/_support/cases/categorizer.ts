/**
 * Test cases for categorizeClass function
 * These test the categorization of Tailwind classes into semantic groups
 *
 * Imports category names from the actual CATEGORIES array to ensure tests
 * match production behavior.
 *
 * @see src/core/translation/categorizer
 */

import { CATEGORIES } from '@src/core/translation/categorizer/categories';

// Extract category names from the source of truth
const CATEGORY_NAMES_MAP = Object.fromEntries(
  CATEGORIES.map((cat) => [cat.name, cat.name])
);

const {
  Layout: LAYOUT,
  'Flexbox & Grid': FLEXBOX_GRID,
  Spacing: SPACING,
  Sizing: SIZING,
  Colors: COLORS,
  Typography: TYPOGRAPHY,
  Borders: BORDERS,
  Animation: TRANSITIONS_ANIMATION,
  Transforms: TRANSFORMS,
  Effects: EFFECTS,
} = CATEGORY_NAMES_MAP;

// 'Other' is a fallback category, not in CATEGORIES array
const OTHER = 'Other' as const;

export const CATEGORIZE_LAYOUT_CASES: Array<[string, string]> = [
  ['block', LAYOUT],
  ['inline', LAYOUT],
  ['hidden', LAYOUT],
  ['static', LAYOUT],
  ['fixed', LAYOUT],
  ['absolute', LAYOUT],
  ['relative', LAYOUT],
  ['overflow-hidden', LAYOUT],
  ['overflow-auto', LAYOUT],
];

export const CATEGORIZE_FLEX_CASES: Array<[string, string]> = [
  ['flex', FLEXBOX_GRID],
  ['flex-row', FLEXBOX_GRID],
  ['flex-col', FLEXBOX_GRID],
  ['items-center', FLEXBOX_GRID],
  ['justify-between', FLEXBOX_GRID],
];

export const CATEGORIZE_GRID_CASES: Array<[string, string]> = [
  ['grid', FLEXBOX_GRID],
  ['grid-cols-3', FLEXBOX_GRID],
  ['grid-rows-2', FLEXBOX_GRID],
  ['col-span-2', FLEXBOX_GRID],
  ['gap-4', FLEXBOX_GRID],
];

export const CATEGORIZE_COLORS_TEXT_CASES: Array<[string, string]> = [
  ['text-white', COLORS],
  ['text-blue-500', COLORS],
  ['text-red-700', COLORS],
];

export const CATEGORIZE_COLORS_BORDER_CASES: Array<[string, string]> = [
  ['border-gray-300', COLORS],
  ['border-transparent', COLORS],
];

export const CATEGORIZE_COLORS_RING_CASES: Array<[string, string]> = [
  ['ring-blue-500', COLORS],
];

export const CATEGORIZE_BACKGROUNDS_COLOR_CASES: Array<[string, string]> = [
  ['bg-white', COLORS],
  ['bg-blue-500', COLORS],
  ['bg-transparent', COLORS],
];

export const CATEGORIZE_BACKGROUNDS_GRADIENT_CASES: Array<[string, string]> = [
  ['bg-gradient-to-r', COLORS],
  ['from-blue-500', COLORS],
  ['to-purple-600', COLORS],
];

export const CATEGORIZE_BORDERS_WIDTH_CASES: Array<[string, string]> = [
  ['border', BORDERS],
  ['border-2', BORDERS],
  ['border-t', BORDERS],
  ['border-b-4', BORDERS],
];

export const CATEGORIZE_BORDERS_RADIUS_CASES: Array<[string, string]> = [
  ['rounded', BORDERS],
  ['rounded-lg', BORDERS],
  ['rounded-full', BORDERS],
  ['rounded-t-md', BORDERS],
];

export const CATEGORIZE_BORDERS_STYLE_CASES: Array<[string, string]> = [
  ['border-solid', BORDERS],
  ['border-dashed', BORDERS],
];

export const CATEGORIZE_TYPOGRAPHY_SIZE_CASES: Array<[string, string]> = [
  ['text-sm', TYPOGRAPHY],
  ['text-lg', TYPOGRAPHY],
  ['text-xl', TYPOGRAPHY],
];

export const CATEGORIZE_TYPOGRAPHY_WEIGHT_CASES: Array<[string, string]> = [
  ['font-bold', TYPOGRAPHY],
  ['font-normal', TYPOGRAPHY],
  ['font-light', TYPOGRAPHY],
];

export const CATEGORIZE_TYPOGRAPHY_ALIGN_CASES: Array<[string, string]> = [
  ['text-center', TYPOGRAPHY],
  ['text-left', TYPOGRAPHY],
  ['text-right', TYPOGRAPHY],
];

export const CATEGORIZE_TYPOGRAPHY_LINE_CASES: Array<[string, string]> = [
  ['leading-none', TYPOGRAPHY],
  ['leading-tight', TYPOGRAPHY],
];

export const CATEGORIZE_TRANSFORMS_CASES: Array<[string, string]> = [
  ['scale-150', TRANSFORMS],
  ['rotate-45', TRANSFORMS],
  ['translate-x-4', TRANSFORMS],
  ['skew-y-3', TRANSFORMS],
];

export const CATEGORIZE_TRANSITIONS_CASES: Array<[string, string]> = [
  ['transition', TRANSITIONS_ANIMATION],
  ['transition-all', TRANSITIONS_ANIMATION],
  ['duration-300', TRANSITIONS_ANIMATION],
];

export const CATEGORIZE_ANIMATION_CASES: Array<[string, string]> = [
  ['animate-spin', TRANSITIONS_ANIMATION],
  ['animate-bounce', TRANSITIONS_ANIMATION],
];

export const CATEGORIZE_EFFECTS_SHADOW_CASES: Array<[string, string]> = [
  ['shadow', EFFECTS],
  ['shadow-lg', EFFECTS],
  ['shadow-none', EFFECTS],
];

export const CATEGORIZE_EFFECTS_OPACITY_CASES: Array<[string, string]> = [
  ['opacity-50', EFFECTS],
  ['opacity-0', EFFECTS],
];

export const CATEGORIZE_SPACING_PADDING_CASES: Array<[string, string]> = [
  ['p-4', SPACING],
  ['px-2', SPACING],
  ['py-8', SPACING],
  ['pt-6', SPACING],
  ['pl-0', SPACING],
];

export const CATEGORIZE_SPACING_MARGIN_CASES: Array<[string, string]> = [
  ['m-4', SPACING],
  ['mx-auto', LAYOUT],
  ['my-2', SPACING],
  ['mt-8', SPACING],
  ['mb-0', SPACING],
];

export const CATEGORIZE_SPACING_SPACE_BETWEEN_CASES: Array<[string, string]> = [
  ['space-x-4', SPACING],
  ['space-y-2', SPACING],
];

export const CATEGORIZE_SIZING_WIDTH_CASES: Array<[string, string]> = [
  ['w-full', SIZING],
  ['w-screen', SIZING],
  ['w-1/2', SIZING],
  ['max-w-xl', SIZING],
  ['min-w-0', SIZING],
];

export const CATEGORIZE_SIZING_HEIGHT_CASES: Array<[string, string]> = [
  ['h-full', SIZING],
  ['h-screen', SIZING],
  ['max-h-96', SIZING],
  ['min-h-0', SIZING],
];

export const CATEGORIZE_SIZING_SIZE_CASES: Array<[string, string]> = [
  ['size-10', SIZING],
  ['size-full', SIZING],
];

export const CATEGORIZE_VARIANTS_STRIP_CASES: Array<[string, string]> = [
  ['hover:bg-blue-500', COLORS],
  ['md:flex', FLEXBOX_GRID],
  ['dark:text-white', COLORS],
  ['lg:hover:p-4', SPACING],
];

export const CATEGORIZE_VARIANTS_MULTIPLE_CASES: Array<[string, string]> = [
  ['sm:md:lg:grid', FLEXBOX_GRID],
  ['group-hover:peer-focus:opacity-50', EFFECTS],
];

export const CATEGORIZE_UNKNOWN_CASES: Array<[string, string]> = [
  ['unknown-class', OTHER],
  ['custom-utility', OTHER],
];

// Export array of category names for tests that need all categories
export const CATEGORY_NAMES = [
  LAYOUT,
  FLEXBOX_GRID,
  SPACING,
  SIZING,
  COLORS,
  TYPOGRAPHY,
  OTHER,
];

export const GROUP_BY_CATEGORY_BASIC_CASE = {
  classes: ['flex', 'p-4', 'text-blue-500'],
  translations: ['flexbox', 'padding 1rem', 'blue text'],
  expected: [
    `${FLEXBOX_GRID}: flexbox`,
    `${SPACING}: padding 1rem`,
    `${COLORS}: blue text`,
  ],
};

export const GROUP_SAME_CATEGORY_CASE = {
  classes: ['p-4', 'm-2', 'gap-4'],
  translations: ['padding 1rem', 'margin 0.5rem', 'gap 1rem'],
  expected: 'padding 1rem, margin 0.5rem',
  expectedCategory: `${FLEXBOX_GRID}: gap 1rem`,
};

export const GROUP_WITH_VARIANTS_CASE = {
  classes: ['hover:bg-blue-500', 'md:p-4'],
  translations: ['blue background on hover', 'padding 1rem on medium screens'],
  expectedCategories: [`${COLORS}:`, `${SPACING}:`],
};

export const GROUP_EMOJI_CASE = {
  classes: ['flex', 'p-4'],
  translations: ['flexbox', 'padding 1rem'],
};

export const GROUP_NO_EMOJI_CASE = {
  classes: ['flex'],
  translations: ['flexbox'],
  expected: `${FLEXBOX_GRID}: flexbox`,
};

export const GROUP_CATEGORY_ORDER_CASE = {
  classes: ['shadow', 'flex', 'p-4', 'text-lg'],
  translations: ['shadow', 'flexbox', 'padding 1rem', 'large text size'],
  categories: [FLEXBOX_GRID, SPACING, TYPOGRAPHY],
};
