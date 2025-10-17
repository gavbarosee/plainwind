/**
 * Test cases for parser functions
 * These test the extraction and parsing of class strings
 * 
 * @see src/core/parsing/
 */

// Parser edge cases - bracket handling
export const BRACKET_EDGE_CASES: Array<[string, string, string]> = [
  ['hover:[clip-path:polygon(0_0,100%_0)]', 'variants', 'hover'],
  ['[mask:url(data:image/svg)]', 'baseClass', '[mask:url(data:image/svg)]'],
  ['dark:[background:rgb(0,0,0)]', 'variants', 'dark'],
  ['[content:"hello"]', 'baseClass', '[content:"hello"]'],
  ['has-[>img]:flex', 'variants', 'has-[>img]'],
  ['group-hover:peer-focus:[&>div]:p-4', 'variants', 'group-hover'],
];

// Parser cases for string splitting
export const PARSE_SPLIT_CASES: Array<[string, string[]]> = [
  ['flex items-center gap-4', ['flex', 'items-center', 'gap-4']],
  ['flex    items-center   gap-4', ['flex', 'items-center', 'gap-4']],
  ['  flex   ', ['flex']],
  ['', []],
  ['flex\titems-center\n\ngap-4', ['flex', 'items-center', 'gap-4']],
];

// Variant extraction cases
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

// Complex variant extraction with bracket nesting
export const COMPLEX_VARIANT_EXTRACTION_CASES: Array<[string, string[], string]> = [
  ['hover:focus:bg-white', ['hover', 'focus'], 'bg-white'],
  ['md:hover:focus:active:p-4', ['md', 'hover', 'focus', 'active'], 'p-4'],
  ['has-[>img]:flex', ['has-[>img]'], 'flex'],
  ['data-[state=open]:block', ['data-[state=open]'], 'block'],
  ['[&>div]:hover:p-4', ['[&>div]', 'hover'], 'p-4'],
  ['group-[:hover]:flex', ['group-[:hover]'], 'flex'],
  ['dark:[&:nth-child(3)]:block', ['dark', '[&:nth-child(3)]'], 'block'],
];

// Important extraction
export const EXTRACT_IMPORTANT_CASES: Array<[string, { className: string; isImportant: boolean }]> = [
  ['bg-white!', { className: 'bg-white', isImportant: true }],
  ['bg-white', { className: 'bg-white', isImportant: false }],
  ['hover:bg-blue-500/50!', { className: 'hover:bg-blue-500/50', isImportant: true }],
  ['p-[10px]!', { className: 'p-[10px]', isImportant: true }],
  ['', { className: '', isImportant: false }],
  ['!flex', { className: '!flex', isImportant: false }],
];

export const IMPORTANT_EXTRACTION_EDGE_CASES: Array<[string, string, boolean]> = [
  ['bg-white!', 'bg-white', true],
  ['!bg-white', '!bg-white', false],
  ['bg-white!!', 'bg-white!', true],
  ['bg-white', 'bg-white', false],
  ['!', '', true],
];

// Prefix extraction
export const EXTRACT_PREFIX_CASES: Array<[string, { className: string; prefix: string }]> = [
  ['tw\\:bg-white', { className: 'bg-white', prefix: 'tw' }],
  ['bg-white', { className: 'bg-white', prefix: '' }],
  ['v2\\:flex', { className: 'flex', prefix: 'v2' }],
  ['my-app\\:text-lg', { className: 'text-lg', prefix: 'my-app' }],
  ['hover:bg-blue', { className: 'hover:bg-blue', prefix: '' }],
  ['', { className: '', prefix: '' }],
  ['tw\\:hover:bg-blue-500', { className: 'hover:bg-blue-500', prefix: 'tw' }],
];

export const PREFIX_EXTRACTION_EDGE_CASES: Array<[string, string, string]> = [
  ['tw\\:bg-white', 'bg-white', 'tw'],
  ['ui\\:hover:p-4', 'hover:p-4', 'ui'],
  ['my-prefix\\:text-lg', 'text-lg', 'my-prefix'],
  ['bg-white', 'bg-white', ''],
  ['tw:bg-white', 'tw:bg-white', ''],
  ['\\:bg-white', '\\:bg-white', ''],
];

// Opacity extraction
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

