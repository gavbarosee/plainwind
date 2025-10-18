/**
 * Test cases for pattern matching in translations
 * These test the extraction and translation of pattern-based utilities
 *
 * @see src/core/translation/rules/patterns/
 */

// Spacing patterns
export const SPACING_DIRECTIONAL_CASES: Array<[string, string]> = [
  ['pt-12', 'top padding'],
  ['pr-12', 'right padding'],
  ['pb-12', 'bottom padding'],
  ['pl-12', 'left padding'],
];

export const MARGIN_DIRECTIONAL_CASES: Array<[string, string]> = [
  ['mt-12', 'top margin'],
  ['mr-12', 'right margin'],
  ['mb-12', 'bottom margin'],
  ['ml-12', 'left margin'],
];

export const SPACING_AXIS_CASES: Array<[string, string]> = [
  ['px-12', 'horizontal padding'],
  ['py-12', 'vertical padding'],
  ['mx-12', 'horizontal margin'],
  ['my-12', 'vertical margin'],
];

export const SPACING_NEGATIVE_CASES: Array<[string, string]> = [
  ['-m-4', 'negative'],
  ['-mt-4', 'negative'],
];

export const SPACING_NUMERIC_PADDING_CASES: Array<[string, string]> = [
  ['p-12', 'padding'],
  ['p-24', 'padding'],
];

export const SPACING_NUMERIC_MARGIN_CASES: Array<[string, string]> = [
  ['m-12', 'margin'],
  ['m-24', 'margin'],
];

export const SPACING_AUTO_CASES: Array<[string, string]> = [
  ['m-auto', 'centered'],
  ['mx-auto', 'centered'],
];

// Grid/Rows patterns
export const GRID_COLS_CASES: Array<[string, string]> = [
  ['grid-cols-1', 'column'],
  ['grid-cols-12', 'columns'],
];

export const GRID_ROWS_CASES: Array<[string, string]> = [
  ['grid-rows-1', 'row'],
  ['grid-rows-6', 'rows'],
];

// Sizing patterns
export const SIZING_SIZE_PATTERN_CASES: Array<[string, string]> = [
  ['size-12', 'width and height'],
];

// Color patterns
export const COLOR_TEXT_NUMERIC_CASES: Array<[string, string]> = [
  ['text-blue-100', 'blue'],
  ['text-red-500', 'red'],
  ['text-gray-900', 'gray'],
];

export const COLOR_BG_NUMERIC_CASES: Array<[string, string]> = [
  ['bg-blue-100', 'blue'],
  ['bg-green-500', 'green'],
];

export const COLOR_BORDER_NUMERIC_CASES: Array<[string, string]> = [
  ['border-blue-500', 'blue'],
  ['border-gray-300', 'gray'],
];

// Opacity patterns
export const OPACITY_CASES: Array<[string, string]> = [
  ['opacity-0', 'opacity'],
  ['opacity-50', 'opacity'],
  ['opacity-100', 'opacity'],
];

// Transform patterns
export const TRANSFORM_SCALE_CASES: Array<[string, string]> = [
  ['scale-125', 'scale'],
  ['scale-x-150', 'scale'],
];

export const TRANSFORM_ROTATE_CASES: Array<[string, string]> = [
  ['rotate-45', 'rotate'],
  ['rotate-90', 'rotate'],
];

export const TRANSFORM_TRANSLATE_CASES: Array<[string, string]> = [
  ['translate-x-12', 'translate'],
  ['translate-y-24', 'translate'],
  ['-translate-x-4', 'translate'],
  ['-rotate-45', 'rotate'],
];

// Gap patterns
export const GAP_NUMERIC_CASES: Array<[string, string]> = [
  ['gap-8', 'gap'],
  ['gap-12', 'gap'],
];

export const GAP_AXIS_CASES: Array<[string, string]> = [
  ['gap-x-4', 'horizontal gap'],
  ['gap-y-6', 'vertical gap'],
];

// Named value patterns
export const SHADOW_NAMED_CASES = ['shadow', 'shadow-lg'];
export const FONT_SIZE_NAMED_CASES = ['text-sm', 'text-lg'];
export const BORDER_RADIUS_NAMED_CASES = ['rounded', 'rounded-lg'];

// Non-matching cases
export const NON_SPACING_CASES = ['flex', 'text-blue'];
export const NON_SIZING_CASES = ['flex', 'p-4'];
export const NON_COLOR_WITH_SCALE_CASES = ['bg-white', 'text-black'];
export const NON_ARBITRARY_CASES = ['p-4', 'bg-blue-500'];
export const NON_GAP_CASES = ['flex'];
export const NON_OPACITY_CASES = ['flex', 'bg-white/50'];
