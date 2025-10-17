/**
 * Test cases for arbitrary value patterns
 * These test Tailwind's arbitrary value syntax [...]
 * 
 * @see src/core/translation/rules/patterns/arbitrary.ts
 */

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

export const ARBITRARY_BG_COLOR_CASES: Array<[string, string]> = [
  ['bg-[#fff]', 'background'],
  ['bg-[rgb(0,0,0)]', 'background'],
];

export const ARBITRARY_TEXT_COLOR_CASES: Array<[string, string]> = [
  ['text-[#000]', 'text'],
  ['text-[rgb(255,255,255)]', 'text'],
];

// CSS Variable cases
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

// Arbitrary property cases
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

// Edge cases
export const EMPTY_STRING_PATTERNS = ['matchSpacingPattern', 'matchSizingPattern', 'matchColorPattern'];
export const MALFORMED_ARBITRARY_CASES = ['w-[', 'w-]', 'w-[]'];

// Unicode in arbitrary values
export const UNICODE_ARBITRARY_CASES: Array<[string, string]> = [
  ['[content:"🎉"]', 'content:"🎉"'],
  ['[content:"中文"]', 'content:"中文"'],
  ['[content:"hello_world"]', 'content:"hello_world"'],
  ['[font-family:"SF_Pro"]', 'font-family:"SF_Pro"'],
];

