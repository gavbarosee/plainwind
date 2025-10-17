/**
 * Variant descriptions and variant application logic
 */

/**
 * Variant prefixes and their plain English descriptions
 */
export const VARIANT_DESCRIPTIONS: Record<string, string> = {
  // Interaction pseudo-classes
  hover: 'on hover',
  focus: 'on focus',
  active: 'when active',
  disabled: 'when disabled',
  enabled: 'when enabled',
  visited: 'when visited',
  'focus-within': 'when focused within',
  'focus-visible': 'when focus visible',
  target: 'when target',

  // Structural pseudo-classes
  first: 'on first child',
  last: 'on last child',
  only: 'on only child',
  odd: 'on odd items',
  even: 'on even items',
  'first-of-type': 'on first of type',
  'last-of-type': 'on last of type',
  'only-of-type': 'on only of type',
  empty: 'when empty',

  // Form state pseudo-classes
  checked: 'when checked',
  indeterminate: 'when indeterminate',
  default: 'when default',
  required: 'when required',
  optional: 'when optional',
  valid: 'when valid',
  invalid: 'when invalid',
  'user-valid': 'when user valid',
  'user-invalid': 'when user invalid',
  'in-range': 'when in range',
  'out-of-range': 'when out of range',
  'placeholder-shown': 'when placeholder shown',
  autofill: 'when autofilled',
  'read-only': 'when read-only',
  'read-write': 'when read-write',

  // Special pseudo-classes
  'details-content': 'details content',
  open: 'when open',
  inert: 'when inert',
  starting: 'when starting',

  // Pseudo-elements
  before: 'before pseudo-element',
  after: 'after pseudo-element',
  placeholder: 'placeholder',
  file: 'file input button',
  marker: 'list marker',
  selection: 'selection',
  'first-letter': 'first letter',
  'first-line': 'first line',
  backdrop: 'backdrop',

  // Child selectors
  '*': 'direct children',
  '**': 'all descendants',

  // Dark mode
  dark: 'in dark mode',
  'not-dark': 'in light mode',

  // Responsive breakpoints (min-width)
  sm: 'on small screens (≥640px)',
  md: 'on medium screens (≥768px)',
  lg: 'on large screens (≥1024px)',
  xl: 'on extra large screens (≥1280px)',
  '2xl': 'on 2xl screens (≥1536px)',

  // Responsive breakpoints (max-width)
  'max-sm': 'below small screens (<640px)',
  'max-md': 'below medium screens (<768px)',
  'max-lg': 'below large screens (<1024px)',
  'max-xl': 'below extra large screens (<1280px)',
  'max-2xl': 'below 2xl screens (<1536px)',

  // Container queries (min-width)
  '@3xs': 'in 3xs container (≥256px)',
  '@2xs': 'in 2xs container (≥288px)',
  '@xs': 'in xs container (≥320px)',
  '@sm': 'in small container (≥384px)',
  '@md': 'in medium container (≥448px)',
  '@lg': 'in large container (≥512px)',
  '@xl': 'in xl container (≥576px)',
  '@2xl': 'in 2xl container (≥672px)',
  '@3xl': 'in 3xl container (≥768px)',
  '@4xl': 'in 4xl container (≥896px)',
  '@5xl': 'in 5xl container (≥1024px)',
  '@6xl': 'in 6xl container (≥1152px)',
  '@7xl': 'in 7xl container (≥1280px)',

  // Container queries (max-width)
  '@max-3xs': 'in container <256px',
  '@max-2xs': 'in container <288px',
  '@max-xs': 'in container <320px',
  '@max-sm': 'in container <384px',
  '@max-md': 'in container <448px',
  '@max-lg': 'in container <512px',
  '@max-xl': 'in container <576px',
  '@max-2xl': 'in container <672px',
  '@max-3xl': 'in container <768px',
  '@max-4xl': 'in container <896px',
  '@max-5xl': 'in container <1024px',
  '@max-6xl': 'in container <1152px',
  '@max-7xl': 'in container <1280px',

  // Motion preferences
  'motion-safe': 'when motion is allowed',
  'motion-reduce': 'when motion reduced',

  // Orientation
  portrait: 'in portrait',
  landscape: 'in landscape',

  // Contrast preferences
  'contrast-more': 'when high contrast',
  'contrast-less': 'when low contrast',

  // Forced colors
  'forced-colors': 'when forced colors active',
  'not-forced-colors': 'when forced colors inactive',

  // Color inversion
  'inverted-colors': 'when colors inverted',

  // Pointer capabilities
  'pointer-fine': 'with fine pointer (mouse)',
  'pointer-coarse': 'with coarse pointer (touch)',
  'pointer-none': 'with no pointer',
  'any-pointer-fine': 'with any fine pointer',
  'any-pointer-coarse': 'with any coarse pointer',
  'any-pointer-none': 'with no pointers',

  // Print media
  print: 'when printing',

  // Scripting
  noscript: 'when scripting disabled',

  // Direction
  ltr: 'in left-to-right mode',
  rtl: 'in right-to-left mode',

  // ARIA states
  'aria-busy': 'when aria-busy',
  'aria-checked': 'when aria-checked',
  'aria-disabled': 'when aria-disabled',
  'aria-expanded': 'when aria-expanded',
  'aria-hidden': 'when aria-hidden',
  'aria-pressed': 'when aria-pressed',
  'aria-readonly': 'when aria-readonly',
  'aria-required': 'when aria-required',
  'aria-selected': 'when aria-selected',

  // Group variants (parent state)
  'group-hover': 'when group hovered',
  'group-focus': 'when group focused',
  'group-active': 'when group active',
  'group-visited': 'when group visited',
  'group-focus-within': 'when group focused within',
  'group-focus-visible': 'when group focus visible',
  'group-target': 'when group target',
  'group-first': 'when group first child',
  'group-last': 'when group last child',
  'group-only': 'when group only child',
  'group-odd': 'when group odd child',
  'group-even': 'when group even child',
  'group-first-of-type': 'when group first of type',
  'group-last-of-type': 'when group last of type',
  'group-only-of-type': 'when group only of type',
  'group-empty': 'when group empty',
  'group-disabled': 'when group disabled',
  'group-enabled': 'when group enabled',
  'group-checked': 'when group checked',
  'group-indeterminate': 'when group indeterminate',
  'group-default': 'when group default',
  'group-required': 'when group required',
  'group-valid': 'when group valid',
  'group-invalid': 'when group invalid',
  'group-in-range': 'when group in range',
  'group-out-of-range': 'when group out of range',
  'group-placeholder-shown': 'when group placeholder shown',
  'group-autofill': 'when group autofilled',
  'group-read-only': 'when group read-only',
  'group-open': 'when group open',
  'group-aria-busy': 'when group aria-busy',
  'group-aria-checked': 'when group aria-checked',
  'group-aria-disabled': 'when group aria-disabled',
  'group-aria-expanded': 'when group aria-expanded',
  'group-aria-hidden': 'when group aria-hidden',
  'group-aria-pressed': 'when group aria-pressed',
  'group-aria-readonly': 'when group aria-readonly',
  'group-aria-required': 'when group aria-required',
  'group-aria-selected': 'when group aria-selected',

  // Peer variants (sibling state)
  'peer-hover': 'when peer hovered',
  'peer-focus': 'when peer focused',
  'peer-active': 'when peer active',
  'peer-visited': 'when peer visited',
  'peer-focus-within': 'when peer focused within',
  'peer-focus-visible': 'when peer focus visible',
  'peer-target': 'when peer target',
  'peer-first': 'when peer first child',
  'peer-last': 'when peer last child',
  'peer-only': 'when peer only child',
  'peer-odd': 'when peer odd child',
  'peer-even': 'when peer even child',
  'peer-first-of-type': 'when peer first of type',
  'peer-last-of-type': 'when peer last of type',
  'peer-only-of-type': 'when peer only of type',
  'peer-empty': 'when peer empty',
  'peer-disabled': 'when peer disabled',
  'peer-enabled': 'when peer enabled',
  'peer-checked': 'when peer checked',
  'peer-indeterminate': 'when peer indeterminate',
  'peer-default': 'when peer default',
  'peer-required': 'when peer required',
  'peer-valid': 'when peer valid',
  'peer-invalid': 'when peer invalid',
  'peer-in-range': 'when peer in range',
  'peer-out-of-range': 'when peer out of range',
  'peer-placeholder-shown': 'when peer placeholder shown',
  'peer-autofill': 'when peer autofilled',
  'peer-read-only': 'when peer read-only',
  'peer-open': 'when peer open',
  'peer-aria-busy': 'when peer aria-busy',
  'peer-aria-checked': 'when peer aria-checked',
  'peer-aria-disabled': 'when peer aria-disabled',
  'peer-aria-expanded': 'when peer aria-expanded',
  'peer-aria-hidden': 'when peer aria-hidden',
  'peer-aria-pressed': 'when peer aria-pressed',
  'peer-aria-readonly': 'when peer aria-readonly',
  'peer-aria-required': 'when peer aria-required',
  'peer-aria-selected': 'when peer aria-selected',
};

/**
 * Describe an arbitrary variant that's not in the predefined list
 * 
 * Handles many special variant patterns:
 * - has-[...]: child selector variants
 * - data-[...]: data attribute variants
 * - aria-[...]: aria attribute variants
 * - nth-[...]: nth-child variants
 * - not-[...]: negation variants
 * - supports-[...]: @supports queries
 * - min/max-[...]: custom breakpoints
 * - group/peer/*: named group/peer variants
 * 
 * @param variant - Arbitrary variant string
 * @returns Human-readable description
 * 
 * @example
 * ```ts
 * describeArbitraryVariant("has-[.active]")       // "when has .active"
 * describeArbitraryVariant("data-[open]")         // "when data-open"
 * describeArbitraryVariant("nth-[2n]")            // "nth-child(2n)"
 * describeArbitraryVariant("min-[768px]")         // "on screens ≥768px"
 * describeArbitraryVariant("group/sidebar")       // "when group \"sidebar\""
 * describeArbitraryVariant("@sm/main")            // "in small (≥384px) container \"main\""
 * describeArbitraryVariant("unknown-variant")     // "unknown-variant"
 * ```
 */
export function describeArbitraryVariant(variant: string): string {
  // Handle has-[...] variants
  if (variant.startsWith('has-[') && variant.endsWith(']')) {
    const selector = variant.slice(5, -1);
    return `when has ${selector}`;
  }

  // Handle group-has-[...] variants
  if (variant.startsWith('group-has-[') && variant.endsWith(']')) {
    const selector = variant.slice(11, -1);
    return `when group has ${selector}`;
  }

  // Handle peer-has-[...] variants
  if (variant.startsWith('peer-has-[') && variant.endsWith(']')) {
    const selector = variant.slice(10, -1);
    return `when peer has ${selector}`;
  }

  // Handle data-[...] variants
  if (variant.startsWith('data-[') && variant.endsWith(']')) {
    const selector = variant.slice(6, -1);
    return `when data-${selector}`;
  }

  // Handle group-data-[...] variants
  if (variant.startsWith('group-data-[') && variant.endsWith(']')) {
    const selector = variant.slice(12, -1);
    return `when group data-${selector}`;
  }

  // Handle peer-data-[...] variants
  if (variant.startsWith('peer-data-[') && variant.endsWith(']')) {
    const selector = variant.slice(11, -1);
    return `when peer data-${selector}`;
  }

  // Handle aria-[...] variants
  if (variant.startsWith('aria-[') && variant.endsWith(']')) {
    const selector = variant.slice(6, -1);
    return `when aria-${selector}`;
  }

  // Handle group-aria-[...] variants
  if (variant.startsWith('group-aria-[') && variant.endsWith(']')) {
    const selector = variant.slice(12, -1);
    return `when group aria-${selector}`;
  }

  // Handle peer-aria-[...] variants
  if (variant.startsWith('peer-aria-[') && variant.endsWith(']')) {
    const selector = variant.slice(11, -1);
    return `when peer aria-${selector}`;
  }

  // Handle nth-[...] variants
  if (variant.startsWith('nth-[') && variant.endsWith(']')) {
    const selector = variant.slice(5, -1);
    return `nth-child(${selector})`;
  }

  // Handle nth-last-[...] variants
  if (variant.startsWith('nth-last-[') && variant.endsWith(']')) {
    const selector = variant.slice(10, -1);
    return `nth-last-child(${selector})`;
  }

  // Handle nth-of-type-[...] variants
  if (variant.startsWith('nth-of-type-[') && variant.endsWith(']')) {
    const selector = variant.slice(13, -1);
    return `nth-of-type(${selector})`;
  }

  // Handle nth-last-of-type-[...] variants
  if (variant.startsWith('nth-last-of-type-[') && variant.endsWith(']')) {
    const selector = variant.slice(18, -1);
    return `nth-last-of-type(${selector})`;
  }

  // Handle not-[...] variants
  if (variant.startsWith('not-[') && variant.endsWith(']')) {
    const selector = variant.slice(5, -1);
    return `when not ${selector}`;
  }

  // Handle in-[...] variants
  if (variant.startsWith('in-[') && variant.endsWith(']')) {
    const selector = variant.slice(4, -1);
    return `when in ${selector}`;
  }

  // Handle supports-[...] variants
  if (variant.startsWith('supports-[') && variant.endsWith(']')) {
    const selector = variant.slice(10, -1);
    return `when supports ${selector}`;
  }

  // Handle not-supports-[...] variants
  if (variant.startsWith('not-supports-[') && variant.endsWith(']')) {
    const selector = variant.slice(14, -1);
    return `when not supports ${selector}`;
  }

  // Handle min-[...] and max-[...] responsive variants
  if (variant.startsWith('min-[') && variant.endsWith(']')) {
    const value = variant.slice(5, -1);
    return `on screens ≥${value}`;
  }

  if (variant.startsWith('max-[') && variant.endsWith(']')) {
    const value = variant.slice(5, -1);
    return `on screens <${value}`;
  }

  // Handle @min-[...] and @max-[...] container query variants
  if (variant.startsWith('@min-[') && variant.endsWith(']')) {
    const value = variant.slice(6, -1);
    return `in container ≥${value}`;
  }

  if (variant.startsWith('@max-[') && variant.endsWith(']')) {
    const value = variant.slice(6, -1);
    return `in container <${value}`;
  }

  // Handle group/peer/container with named references: group/name, peer/name, @container/name, @sm/name
  if (variant.includes('/')) {
    const [base, name] = variant.split('/');

    // Named groups
    if (base === 'group') {
      return `when group "${name}"`;
    }

    // Named peers
    if (base === 'peer') {
      return `when peer "${name}"`;
    }

    // Named container marker (e.g., @container/main)
    if (base === '@container') {
      return `container "${name}"`;
    }

    // Named container query variants (e.g., @sm/main, @md/sidebar)
    if (base.startsWith('@')) {
      const size = base.slice(1); // Remove @ prefix
      // Check if it's a standard container size
      const containerSizes: Record<string, string> = {
        '3xs': '3xs (≥256px)',
        '2xs': '2xs (≥288px)',
        xs: 'xs (≥320px)',
        sm: 'small (≥384px)',
        md: 'medium (≥448px)',
        lg: 'large (≥512px)',
        xl: 'xl (≥576px)',
        '2xl': '2xl (≥672px)',
        '3xl': '3xl (≥768px)',
        '4xl': '4xl (≥896px)',
        '5xl': '5xl (≥1024px)',
        '6xl': '6xl (≥1152px)',
        '7xl': '7xl (≥1280px)',
      };

      const sizeDesc = containerSizes[size] || size;
      return `in ${sizeDesc} container "${name}"`;
    }

    // Named container max-width query variants (e.g., @max-sm/main)
    if (base.startsWith('@max-')) {
      const size = base.slice(5); // Remove @max- prefix
      return `in container <${size} "${name}"`;
    }
  }

  // Handle group-* variants not in predefined list
  if (variant.startsWith('group-')) {
    const state = variant.slice(6);
    return `when group ${state}`;
  }

  // Handle peer-* variants not in predefined list
  if (variant.startsWith('peer-')) {
    const state = variant.slice(5);
    return `when peer ${state}`;
  }

  // If nothing matches, return the variant as-is
  return variant;
}

/**
 * Apply variant descriptions to translation
 * 
 * Looks up each variant in VARIANT_DESCRIPTIONS or uses describeArbitraryVariant as fallback.
 * Combines all variants into a comma-separated list and appends to the translation.
 * 
 * @param translation - Base translation without variants
 * @param variants - Array of variant strings (e.g., ["hover", "md", "dark"])
 * @returns Translation with variants applied
 * 
 * @example
 * ```ts
 * applyVariants("blue background", ["hover", "md"])
 * // Returns: "blue background on hover, on medium screens (≥768px)"
 * 
 * applyVariants("padding 1rem", ["dark", "lg"])
 * // Returns: "padding 1rem in dark mode, on large screens (≥1024px)"
 * 
 * applyVariants("flexbox", [])
 * // Returns: "flexbox"
 * ```
 */
export function applyVariants(translation: string, variants: string[]): string {
  if (variants.length === 0) {
    return translation;
  }

  const variantParts = variants
    .map((v) => VARIANT_DESCRIPTIONS[v] || describeArbitraryVariant(v))
    .join(', ');
  return `${translation} ${variantParts}`;
}
