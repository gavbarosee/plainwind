/**
 * Test cases for categorizeClass function
 * These test the categorization of Tailwind classes into semantic groups
 * 
 * @see src/core/translation/categorizer
 */

export const CATEGORIZE_LAYOUT_CASES: Array<[string, string]> = [
  ['block', 'Layout'],
  ['inline', 'Layout'],
  ['hidden', 'Layout'],
  ['static', 'Layout'],
  ['fixed', 'Layout'],
  ['absolute', 'Layout'],
  ['relative', 'Layout'],
  ['overflow-hidden', 'Layout'],
  ['overflow-auto', 'Layout'],
];

export const CATEGORIZE_FLEX_CASES: Array<[string, string]> = [
  ['flex', 'Flexbox & Grid'],
  ['flex-row', 'Flexbox & Grid'],
  ['flex-col', 'Flexbox & Grid'],
  ['items-center', 'Flexbox & Grid'],
  ['justify-between', 'Flexbox & Grid'],
];

export const CATEGORIZE_GRID_CASES: Array<[string, string]> = [
  ['grid', 'Flexbox & Grid'],
  ['grid-cols-3', 'Flexbox & Grid'],
  ['grid-rows-2', 'Flexbox & Grid'],
  ['col-span-2', 'Flexbox & Grid'],
  ['gap-4', 'Flexbox & Grid'],
];

export const CATEGORIZE_COLORS_TEXT_CASES: Array<[string, string]> = [
  ['text-white', 'Colors'],
  ['text-blue-500', 'Colors'],
  ['text-red-700', 'Colors'],
];

export const CATEGORIZE_COLORS_BORDER_CASES: Array<[string, string]> = [
  ['border-gray-300', 'Colors'],
  ['border-transparent', 'Colors'],
];

export const CATEGORIZE_COLORS_RING_CASES: Array<[string, string]> = [
  ['ring-blue-500', 'Colors'],
];

export const CATEGORIZE_BACKGROUNDS_COLOR_CASES: Array<[string, string]> = [
  ['bg-white', 'Colors'],
  ['bg-blue-500', 'Colors'],
  ['bg-transparent', 'Colors'],
];

export const CATEGORIZE_BACKGROUNDS_GRADIENT_CASES: Array<[string, string]> = [
  ['bg-gradient-to-r', 'Colors'],
  ['from-blue-500', 'Colors'],
  ['to-purple-600', 'Colors'],
];

export const CATEGORIZE_BORDERS_WIDTH_CASES: Array<[string, string]> = [
  ['border', 'Borders'],
  ['border-2', 'Borders'],
  ['border-t', 'Borders'],
  ['border-b-4', 'Borders'],
];

export const CATEGORIZE_BORDERS_RADIUS_CASES: Array<[string, string]> = [
  ['rounded', 'Borders'],
  ['rounded-lg', 'Borders'],
  ['rounded-full', 'Borders'],
  ['rounded-t-md', 'Borders'],
];

export const CATEGORIZE_BORDERS_STYLE_CASES: Array<[string, string]> = [
  ['border-solid', 'Borders'],
  ['border-dashed', 'Borders'],
];

export const CATEGORIZE_TYPOGRAPHY_SIZE_CASES: Array<[string, string]> = [
  ['text-sm', 'Typography'],
  ['text-lg', 'Typography'],
  ['text-xl', 'Typography'],
];

export const CATEGORIZE_TYPOGRAPHY_WEIGHT_CASES: Array<[string, string]> = [
  ['font-bold', 'Typography'],
  ['font-normal', 'Typography'],
  ['font-light', 'Typography'],
];

export const CATEGORIZE_TYPOGRAPHY_ALIGN_CASES: Array<[string, string]> = [
  ['text-center', 'Typography'],
  ['text-left', 'Typography'],
  ['text-right', 'Typography'],
];

export const CATEGORIZE_TYPOGRAPHY_LINE_CASES: Array<[string, string]> = [
  ['leading-none', 'Typography'],
  ['leading-tight', 'Typography'],
];

export const CATEGORIZE_TRANSFORMS_CASES: Array<[string, string]> = [
  ['scale-150', 'Transforms'],
  ['rotate-45', 'Transforms'],
  ['translate-x-4', 'Transforms'],
  ['skew-y-3', 'Transforms'],
];

export const CATEGORIZE_TRANSITIONS_CASES: Array<[string, string]> = [
  ['transition', 'Transitions & Animation'],
  ['transition-all', 'Transitions & Animation'],
  ['duration-300', 'Transitions & Animation'],
];

export const CATEGORIZE_ANIMATION_CASES: Array<[string, string]> = [
  ['animate-spin', 'Transitions & Animation'],
  ['animate-bounce', 'Transitions & Animation'],
];

export const CATEGORIZE_EFFECTS_SHADOW_CASES: Array<[string, string]> = [
  ['shadow', 'Effects'],
  ['shadow-lg', 'Effects'],
  ['shadow-none', 'Effects'],
];

export const CATEGORIZE_EFFECTS_OPACITY_CASES: Array<[string, string]> = [
  ['opacity-50', 'Effects'],
  ['opacity-0', 'Effects'],
];

export const CATEGORIZE_SPACING_PADDING_CASES: Array<[string, string]> = [
  ['p-4', 'Spacing'],
  ['px-2', 'Spacing'],
  ['py-8', 'Spacing'],
  ['pt-6', 'Spacing'],
  ['pl-0', 'Spacing'],
];

export const CATEGORIZE_SPACING_MARGIN_CASES: Array<[string, string]> = [
  ['m-4', 'Spacing'],
  ['mx-auto', 'Layout'],
  ['my-2', 'Spacing'],
  ['mt-8', 'Spacing'],
  ['mb-0', 'Spacing'],
];

export const CATEGORIZE_SPACING_SPACE_BETWEEN_CASES: Array<[string, string]> = [
  ['space-x-4', 'Spacing'],
  ['space-y-2', 'Spacing'],
];

export const CATEGORIZE_SIZING_WIDTH_CASES: Array<[string, string]> = [
  ['w-full', 'Sizing'],
  ['w-screen', 'Sizing'],
  ['w-1/2', 'Sizing'],
  ['max-w-xl', 'Sizing'],
  ['min-w-0', 'Sizing'],
];

export const CATEGORIZE_SIZING_HEIGHT_CASES: Array<[string, string]> = [
  ['h-full', 'Sizing'],
  ['h-screen', 'Sizing'],
  ['max-h-96', 'Sizing'],
  ['min-h-0', 'Sizing'],
];

export const CATEGORIZE_SIZING_SIZE_CASES: Array<[string, string]> = [
  ['size-10', 'Sizing'],
  ['size-full', 'Sizing'],
];

export const CATEGORIZE_VARIANTS_STRIP_CASES: Array<[string, string]> = [
  ['hover:bg-blue-500', 'Colors'],
  ['md:flex', 'Flexbox & Grid'],
  ['dark:text-white', 'Colors'],
  ['lg:hover:p-4', 'Spacing'],
];

export const CATEGORIZE_VARIANTS_MULTIPLE_CASES: Array<[string, string]> = [
  ['sm:md:lg:grid', 'Flexbox & Grid'],
  ['group-hover:peer-focus:opacity-50', 'Effects'],
];

export const CATEGORIZE_UNKNOWN_CASES: Array<[string, string]> = [
  ['unknown-class', 'Other'],
  ['custom-utility', 'Other'],
];

export const CATEGORY_NAMES = ['Layout', 'Flexbox & Grid', 'Spacing', 'Sizing', 'Colors', 'Typography', 'Other'];

export const GROUP_BY_CATEGORY_BASIC_CASE = {
  classes: ['flex', 'p-4', 'text-blue-500'],
  translations: ['flexbox', 'padding 1rem', 'blue text'],
  expected: ['Flexbox & Grid: flexbox', 'Spacing: padding 1rem', 'Colors: blue text'],
};

export const GROUP_SAME_CATEGORY_CASE = {
  classes: ['p-4', 'm-2', 'gap-4'],
  translations: ['padding 1rem', 'margin 0.5rem', 'gap 1rem'],
  expected: 'padding 1rem, margin 0.5rem',
  expectedCategory: 'Flexbox & Grid: gap 1rem',
};

export const GROUP_WITH_VARIANTS_CASE = {
  classes: ['hover:bg-blue-500', 'md:p-4'],
  translations: ['blue background on hover', 'padding 1rem on medium screens'],
  expectedCategories: ['Colors:', 'Spacing:'],
};

export const GROUP_EMOJI_CASE = {
  classes: ['flex', 'p-4'],
  translations: ['flexbox', 'padding 1rem'],
};

export const GROUP_NO_EMOJI_CASE = {
  classes: ['flex'],
  translations: ['flexbox'],
  expected: 'Flexbox & Grid: flexbox',
};

export const GROUP_CATEGORY_ORDER_CASE = {
  classes: ['shadow', 'flex', 'p-4', 'text-lg'],
  translations: ['shadow', 'flexbox', 'padding 1rem', 'large text size'],
  categories: ['Flexbox & Grid', 'Spacing', 'Typography'],
};

