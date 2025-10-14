import { VARIANT_DESCRIPTIONS } from '@src/translation/translator/variants';

export const VARIANT_CASES: Array<[string, string[]]> = [
  ['hover:bg-blue-500', [VARIANT_DESCRIPTIONS.hover]],
  ['md:hover:bg-blue-500', [VARIANT_DESCRIPTIONS.md, VARIANT_DESCRIPTIONS.hover]],
  ['sm:text-sm lg:text-lg', [VARIANT_DESCRIPTIONS.sm, VARIANT_DESCRIPTIONS.lg]],
  ['dark:bg-black', [VARIANT_DESCRIPTIONS.dark]],
  ['group-hover:opacity-100', [VARIANT_DESCRIPTIONS['group-hover']]],
  ['peer-focus:ring-2', [VARIANT_DESCRIPTIONS['peer-focus']]],
  ['before:content-["→"]', [VARIANT_DESCRIPTIONS.before]],
];

export const CATEGORY_ORDER = ['Flexbox & Grid', 'Spacing', 'Colors'] as const;

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

// Patterns: spacing
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

// Grid/Rows cases
export const GRID_COLS_CASES: Array<[string, string]> = [
  ['grid-cols-1', 'column'],
  ['grid-cols-12', 'columns'],
];

export const GRID_ROWS_CASES: Array<[string, string]> = [
  ['grid-rows-1', 'row'],
  ['grid-rows-6', 'rows'],
];

// Opacity pattern cases
export const OPACITY_CASES: Array<[string, string]> = [
  ['opacity-0', 'opacity'],
  ['opacity-50', 'opacity'],
  ['opacity-100', 'opacity'],
];

// Transform pattern cases
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

// Categorizer: shared mapping cases
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

// Pattern matching cases
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

export const SIZING_SIZE_PATTERN_CASES: Array<[string, string]> = [
  ['size-12', 'width and height'],
];

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

export const ARBITRARY_WIDTH_CASES: Array<[string, string, string]> = [
  ['w-[100px]', 'width', '100px'],
  ['w-[50cqw]', 'width', '50cqw'],
  ['w-[100dvw]', 'width', '100dvw'],
  ['w-[calc(100%-2rem)]', 'width', 'calc(100%-2rem)'],
];

export const ARBITRARY_HEIGHT_CASES: Array<[string, string, string]> = [
  ['h-[50vh]', 'height', '50vh'],
  ['h-[100cqh]', 'height', '100cqh'],
  ['h-[100svh]', 'height', '100svh'],
];

export const ARBITRARY_SPACING_CASES: Array<[string, string, string]> = [
  ['p-[2rem]', 'padding', '2rem'],
  ['m-[10px]', 'margin', '10px'],
];

export const ARBITRARY_COLOR_CASES: Array<[string, string, string]> = [
  ['bg-[#fff]', 'background', '#fff'],
  ['text-[#000]', 'text color', '#000'],
  ['bg-[var(--primary)]', 'background', 'var(--primary)'],
  ['text-[rgb(0,0,0)]', 'text color', 'rgb(0,0,0)'],
  ['bg-[oklch(0.5_0.2_180)]', 'background', 'oklch(0.5_0.2_180)'],
  ['text-[lch(50_25_180)]', 'text color', 'lch(50_25_180)'],
];

export const GAP_NUMERIC_CASES: Array<[string, string]> = [
  ['gap-8', 'gap'],
  ['gap-12', 'gap'],
];

export const GAP_AXIS_CASES: Array<[string, string]> = [
  ['gap-x-4', 'horizontal gap'],
  ['gap-y-6', 'vertical gap'],
];

export const NON_SPACING_CASES = ['flex', 'text-blue'];
export const NON_SIZING_CASES = ['flex', 'p-4'];
export const NON_COLOR_WITH_SCALE_CASES = ['bg-white', 'text-black'];
export const NON_ARBITRARY_CASES = ['p-4', 'bg-blue-500'];
export const NON_GAP_CASES = ['flex'];
export const NON_OPACITY_CASES = ['flex', 'bg-white/50'];

// Edge cases
export const EMPTY_STRING_PATTERNS = ['matchSpacingPattern', 'matchSizingPattern', 'matchColorPattern'];
export const MALFORMED_ARBITRARY_CASES = ['w-[', 'w-]', 'w-[]'];

export const ARBITRARY_BG_COLOR_CASES: Array<[string, string]> = [
  ['bg-[#fff]', 'background'],
  ['bg-[rgb(0,0,0)]', 'background'],
];

export const ARBITRARY_TEXT_COLOR_CASES: Array<[string, string]> = [
  ['text-[#000]', 'text'],
  ['text-[rgb(255,255,255)]', 'text'],
];

export const SHADOW_NAMED_CASES = ['shadow', 'shadow-lg'];
export const FONT_SIZE_NAMED_CASES = ['text-sm', 'text-lg'];
export const BORDER_RADIUS_NAMED_CASES = ['rounded', 'rounded-lg'];

// Variant description cases
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

// Matchers test cases
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

export const IS_CSS_VARIABLE_CASES: Array<[string, boolean]> = [
  ['[--my-var:10px]', true],
  ['[--scroll-offset:56px]', true],
  ['[10px]', false],
  ['[mask-type:luminance]', false],
];

export const TRANSLATE_CSS_VARIABLE_CASES: Array<[string, string]> = [
  ['[--my-var:10px]', 'CSS variable --my-var: 10px'],
  ['[--theme-color:blue]', 'CSS variable --theme-color: blue'],
];

export const IS_ARBITRARY_PROPERTY_CASES: Array<[string, boolean]> = [
  ['[mask-type:luminance]', true],
  ['[clip-path:circle(50%)]', true],
  ['[--my-var:value]', false],
];

export const DESCRIBE_ARBITRARY_PROPERTY_CASES: Array<[string, string]> = [
  ['[mask-type:luminance]', 'mask-type: luminance'],
  ['[clip-path:circle(50%)]', 'clip-path: circle(50%)'],
];

export const TRANSLATE_ARBITRARY_PROPERTY_CASES: Array<[string, string]> = [
  ['[mask-type:luminance]', 'CSS property mask-type: luminance'],
  ['[clip-path:circle(50%)]', 'CSS property clip-path: circle(50%)'],
];

// Categorizer grouping test cases
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

// Parser edge cases - bracket handling
export const BRACKET_EDGE_CASES: Array<[string, string, string]> = [
  ['hover:[clip-path:polygon(0_0,100%_0)]', 'variants', 'hover'],
  ['[mask:url(data:image/svg)]', 'baseClass', '[mask:url(data:image/svg)]'],
  ['dark:[background:rgb(0,0,0)]', 'variants', 'dark'],
  ['[content:"hello"]', 'baseClass', '[content:"hello"]'],
  ['has-[>img]:flex', 'variants', 'has-[>img]'],
  ['group-hover:peer-focus:[&>div]:p-4', 'variants', 'group-hover'],
];

// Error recovery - malformed input 
export const MALFORMED_MODIFIER_CASES: Array<[string, string]> = [
  ['hover:', 'on hover'], // empty base class, parsed gracefully
  [':bg-white', 'white background'], // leading colon is treated as variant name
  ['md::flex', 'on medium screens'], // double colon creates empty variant
  [':::test', 'test'], // multiple colons are stripped
];

export const INVALID_OPACITY_CASES: Array<[string, string | null]> = [
  ['bg-white/abc', null],
  ['bg-white/150', '150'],
  ['bg-white/-10', null],
  ['bg-white/', null],
  ['bg-white/0', '0'],
  ['bg-white/100', '100'],
];

// Unicode and special characters
export const UNICODE_ARBITRARY_CASES: Array<[string, string]> = [
  ['[content:"🎉"]', 'content:"🎉"'],
  ['[content:"中文"]', 'content:"中文"'],
  ['[content:"hello_world"]', 'content:"hello_world"'],
  ['[font-family:"SF_Pro"]', 'font-family:"SF_Pro"'],
];

// Parser edge cases for extractVariants with complex bracket nesting
export const COMPLEX_VARIANT_EXTRACTION_CASES: Array<[string, string[], string]> = [
  ['hover:focus:bg-white', ['hover', 'focus'], 'bg-white'],
  ['md:hover:focus:active:p-4', ['md', 'hover', 'focus', 'active'], 'p-4'],
  ['has-[>img]:flex', ['has-[>img]'], 'flex'],
  ['data-[state=open]:block', ['data-[state=open]'], 'block'],
  ['[&>div]:hover:p-4', ['[&>div]', 'hover'], 'p-4'],
  ['group-[:hover]:flex', ['group-[:hover]'], 'flex'],
  ['dark:[&:nth-child(3)]:block', ['dark', '[&:nth-child(3)]'], 'block'],
];

// Opacity extraction edge cases
export const OPACITY_EXTRACTION_EDGE_CASES: Array<[string, string, string | null]> = [
  ['bg-white/50', 'bg-white', '50'],
  ['bg-white/0', 'bg-white', '0'],
  ['bg-white/100', 'bg-white', '100'],
  ['text-blue-500/75', 'text-blue-500', '75'],
  ['bg-white', 'bg-white', null],
  ['bg-white/', 'bg-white/', null],
  ['bg-white/abc', 'bg-white/abc', null],
  ['bg-white/-10', 'bg-white/-10', null],
  ['bg-white/150', 'bg-white', '150'], // parser accepts 150, validation elsewhere
];

// Important extraction edge cases
export const IMPORTANT_EXTRACTION_EDGE_CASES: Array<[string, string, boolean]> = [
  ['bg-white!', 'bg-white', true],
  ['!bg-white', '!bg-white', false],
  ['bg-white!!', 'bg-white!', true],
  ['bg-white', 'bg-white', false],
  ['!', '', true],
];

// Prefix extraction edge cases
export const PREFIX_EXTRACTION_EDGE_CASES: Array<[string, string, string]> = [
  ['tw\\:bg-white', 'bg-white', 'tw'],
  ['ui\\:hover:p-4', 'hover:p-4', 'ui'],
  ['my-prefix\\:text-lg', 'text-lg', 'my-prefix'],
  ['bg-white', 'bg-white', ''],
  ['tw:bg-white', 'tw:bg-white', ''],
  ['\\:bg-white', '\\:bg-white', ''],
];

// Performance test cases
export const PERFORMANCE_CASES = {
  longClassString: Array(100).fill('p-4 m-2 bg-white text-black').join(' '),
  deeplyNestedVariants: 'sm:md:lg:xl:2xl:hover:focus:active:disabled:group-hover:p-4',
  longArbitraryValue: `w-[calc(100vw-theme(spacing.64)-theme(spacing.48))]`,
  manyClasses: Array(50).fill(['flex', 'items-center', 'justify-between', 'p-4', 'm-2', 'bg-white', 'text-black', 'rounded-lg', 'shadow-md', 'hover:shadow-lg']).flat().join(' '),
};

// Error recovery - graceful degradation cases
export const GRACEFUL_DEGRADATION_CASES: Array<[string, boolean]> = [
  ['', true], // empty string should work
  ['   ', true], // whitespace only
  ['flex  items-center', true], // multiple spaces
  ['flex\titems-center', true], // tabs
  ['flex\nitems-center', true], // newlines
  ['hover:', true], // incomplete modifier
  [':bg-white', true], // leading colon
  ['::::', true], // only colons
  ['//////', true], // only slashes
  ['!!!!!!', true], // only exclamation marks
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

// Parser cases
export const PARSE_SPLIT_CASES: Array<[string, string[]]> = [
  ['flex items-center gap-4', ['flex', 'items-center', 'gap-4']],
  ['flex    items-center   gap-4', ['flex', 'items-center', 'gap-4']],
  ['  flex   ', ['flex']],
  ['', []],
  ['flex\titems-center\n\ngap-4', ['flex', 'items-center', 'gap-4']],
];

export const EXTRACT_VARIANTS_CASES: Array<[string, { variants: string[]; baseClass: string }]> = [
  ['hover:bg-blue-500', { variants: ['hover'], baseClass: 'bg-blue-500' }],
  ['md:hover:focus:text-red-500', { variants: ['md', 'hover', 'focus'], baseClass: 'text-red-500' }],
  ['flex', { variants: [], baseClass: 'flex' }],
  ['dark:[--my-var:value]', { variants: ['dark'], baseClass: '[--my-var:value]' }],
  ['hover:[content:var(--value)]', { variants: ['hover'], baseClass: '[content:var(--value)]' }],
  ['sm:md:lg:[clip-path:circle(50%)]', { variants: ['sm', 'md', 'lg'], baseClass: '[clip-path:circle(50%)]' }],
  ['group-hover:peer-focus:bg-white', { variants: ['group-hover', 'peer-focus'], baseClass: 'bg-white' }],
  ['', { variants: [], baseClass: '' }],
  ['[&:nth-child(3)]:block', { variants: ['[&:nth-child(3)]'], baseClass: 'block' }],
];

export const EXTRACT_IMPORTANT_CASES: Array<[string, { className: string; isImportant: boolean }]> = [
  ['bg-white!', { className: 'bg-white', isImportant: true }],
  ['bg-white', { className: 'bg-white', isImportant: false }],
  ['hover:bg-blue-500/50!', { className: 'hover:bg-blue-500/50', isImportant: true }],
  ['p-[10px]!', { className: 'p-[10px]', isImportant: true }],
  ['', { className: '', isImportant: false }],
  ['!flex', { className: '!flex', isImportant: false }],
];

export const EXTRACT_PREFIX_CASES: Array<[string, { className: string; prefix: string }]> = [
  ['tw\\:bg-white', { className: 'bg-white', prefix: 'tw' }],
  ['bg-white', { className: 'bg-white', prefix: '' }],
  ['v2\\:flex', { className: 'flex', prefix: 'v2' }],
  ['my-app\\:text-lg', { className: 'text-lg', prefix: 'my-app' }],
  ['hover:bg-blue', { className: 'hover:bg-blue', prefix: '' }],
  ['', { className: '', prefix: '' }],
  ['tw\\:hover:bg-blue-500', { className: 'hover:bg-blue-500', prefix: 'tw' }],
];


