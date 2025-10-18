/**
 * Variant descriptions and variant application logic
 */

/**
 * Variant prefixes and their plain English descriptions
 */
export const VARIANT_DESCRIPTIONS: Record<string, string> = {
  // Interaction pseudo-classes
  hover: 'when mouse hovers over',
  focus: 'when keyboard focused',
  active: 'when being clicked/pressed',
  disabled: 'when disabled (grayed out)',
  enabled: 'when enabled (interactive)',
  visited: 'when link has been visited',
  'focus-within': 'when child element is focused',
  'focus-visible': 'when focused via keyboard (visible focus ring)',
  target: 'when URL hash matches element ID',

  // Structural pseudo-classes
  first: 'when first child of parent',
  last: 'when last child of parent',
  only: 'when only child (no siblings)',
  odd: 'on odd-numbered items (1st, 3rd, 5th...)',
  even: 'on even-numbered items (2nd, 4th, 6th...)',
  'first-of-type': 'when first of its element type',
  'last-of-type': 'when last of its element type',
  'only-of-type': 'when only one of its element type',
  empty: 'when element has no children or text',

  // Form state pseudo-classes
  checked: 'when checkbox/radio is checked',
  indeterminate: 'when checkbox is partially checked (dash)',
  default: 'when default form element (initial choice)',
  required: 'when field is required (must fill)',
  optional: 'when field is optional (can skip)',
  valid: 'when form input is valid',
  invalid: 'when form input is invalid',
  'user-valid': 'when user-modified input is valid',
  'user-invalid': 'when user-modified input is invalid',
  'in-range': 'when number is within min/max range',
  'out-of-range': 'when number is outside min/max range',
  'placeholder-shown': 'when placeholder text is visible',
  autofill: 'when browser autofills field',
  'read-only': 'when field cannot be edited',
  'read-write': 'when field can be edited',

  // Special pseudo-classes
  'details-content': 'content inside <details> element',
  open: 'when <details> or <dialog> is open',
  inert: 'when element is inert (non-interactive)',
  starting: 'when starting (initial animation state)',

  // Pseudo-elements
  before: 'pseudo-element before content',
  after: 'pseudo-element after content',
  placeholder: 'input placeholder text',
  file: 'file input "Choose file" button',
  marker: 'list bullet or number',
  selection: 'highlighted/selected text',
  'first-letter': 'first letter of text',
  'first-line': 'first line of text',
  backdrop: 'backdrop behind modal/dialog',

  // Child selectors
  '*': 'all direct children (one level deep)',
  '**': 'all descendants (nested at any depth)',

  // Dark mode
  dark: 'in dark mode (dark color scheme)',
  'not-dark': 'in light mode (light color scheme)',

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
  'motion-safe': 'when user allows animations (default)',
  'motion-reduce': 'when user prefers reduced motion (accessibility)',

  // Orientation
  portrait: 'in portrait orientation (vertical)',
  landscape: 'in landscape orientation (horizontal)',

  // Contrast preferences
  'contrast-more': 'when user requests high contrast mode',
  'contrast-less': 'when user requests low contrast mode',

  // Forced colors
  'forced-colors': 'when forced colors mode active (Windows high contrast)',
  'not-forced-colors': 'when forced colors mode inactive (normal)',

  // Color inversion
  'inverted-colors': 'when system colors are inverted',

  // Pointer capabilities
  'pointer-fine': 'with precise pointer (mouse, stylus)',
  'pointer-coarse': 'with imprecise pointer (finger touch)',
  'pointer-none': 'with no pointing device',
  'any-pointer-fine': 'when any input is precise (mouse available)',
  'any-pointer-coarse': 'when any input is imprecise (touch available)',
  'any-pointer-none': 'when no pointing devices available',

  // Print media
  print: 'when printing (print stylesheet)',

  // Scripting
  noscript: 'when JavaScript is disabled',

  // Direction
  ltr: 'in left-to-right text direction (English, etc.)',
  rtl: 'in right-to-left text direction (Arabic, Hebrew)',

  // ARIA states
  'aria-busy': 'when element is loading/updating (aria-busy="true")',
  'aria-checked': 'when element is checked (aria-checked="true")',
  'aria-disabled': 'when element is disabled (aria-disabled="true")',
  'aria-expanded': 'when element is expanded (aria-expanded="true")',
  'aria-hidden':
    'when element is hidden from screen readers (aria-hidden="true")',
  'aria-pressed': 'when toggle button is pressed (aria-pressed="true")',
  'aria-readonly': 'when element is read-only (aria-readonly="true")',
  'aria-required': 'when field is required (aria-required="true")',
  'aria-selected': 'when element is selected (aria-selected="true")',

  // Group variants (parent state)
  'group-hover': 'when parent with .group class is hovered',
  'group-focus': 'when parent with .group class is focused',
  'group-active': 'when parent with .group class is active',
  'group-visited': 'when parent with .group class is visited',
  'group-focus-within': 'when parent with .group class has focused child',
  'group-focus-visible': 'when parent with .group class has keyboard focus',
  'group-target': 'when parent with .group class matches URL hash',
  'group-first': 'when parent with .group class is first child',
  'group-last': 'when parent with .group class is last child',
  'group-only': 'when parent with .group class is only child',
  'group-odd': 'when parent with .group class is odd-numbered',
  'group-even': 'when parent with .group class is even-numbered',
  'group-first-of-type': 'when parent with .group class is first of type',
  'group-last-of-type': 'when parent with .group class is last of type',
  'group-only-of-type': 'when parent with .group class is only of type',
  'group-empty': 'when parent with .group class is empty',
  'group-disabled': 'when parent with .group class is disabled',
  'group-enabled': 'when parent with .group class is enabled',
  'group-checked': 'when parent with .group class is checked',
  'group-indeterminate': 'when parent with .group class is indeterminate',
  'group-default': 'when parent with .group class is default',
  'group-required': 'when parent with .group class is required',
  'group-valid': 'when parent with .group class is valid',
  'group-invalid': 'when parent with .group class is invalid',
  'group-in-range': 'when parent with .group class is in range',
  'group-out-of-range': 'when parent with .group class is out of range',
  'group-placeholder-shown': 'when parent with .group class has placeholder',
  'group-autofill': 'when parent with .group class is autofilled',
  'group-read-only': 'when parent with .group class is read-only',
  'group-open': 'when parent with .group class is open',
  'group-aria-busy': 'when parent with .group class has aria-busy',
  'group-aria-checked': 'when parent with .group class has aria-checked',
  'group-aria-disabled': 'when parent with .group class has aria-disabled',
  'group-aria-expanded': 'when parent with .group class has aria-expanded',
  'group-aria-hidden': 'when parent with .group class has aria-hidden',
  'group-aria-pressed': 'when parent with .group class has aria-pressed',
  'group-aria-readonly': 'when parent with .group class has aria-readonly',
  'group-aria-required': 'when parent with .group class has aria-required',
  'group-aria-selected': 'when parent with .group class has aria-selected',

  // Peer variants (sibling state)
  'peer-hover': 'when sibling with .peer class is hovered',
  'peer-focus': 'when sibling with .peer class is focused',
  'peer-active': 'when sibling with .peer class is active',
  'peer-visited': 'when sibling with .peer class is visited',
  'peer-focus-within': 'when sibling with .peer class has focused child',
  'peer-focus-visible': 'when sibling with .peer class has keyboard focus',
  'peer-target': 'when sibling with .peer class matches URL hash',
  'peer-first': 'when sibling with .peer class is first child',
  'peer-last': 'when sibling with .peer class is last child',
  'peer-only': 'when sibling with .peer class is only child',
  'peer-odd': 'when sibling with .peer class is odd-numbered',
  'peer-even': 'when sibling with .peer class is even-numbered',
  'peer-first-of-type': 'when sibling with .peer class is first of type',
  'peer-last-of-type': 'when sibling with .peer class is last of type',
  'peer-only-of-type': 'when sibling with .peer class is only of type',
  'peer-empty': 'when sibling with .peer class is empty',
  'peer-disabled': 'when sibling with .peer class is disabled',
  'peer-enabled': 'when sibling with .peer class is enabled',
  'peer-checked': 'when sibling with .peer class is checked',
  'peer-indeterminate': 'when sibling with .peer class is indeterminate',
  'peer-default': 'when sibling with .peer class is default',
  'peer-required': 'when sibling with .peer class is required',
  'peer-valid': 'when sibling with .peer class is valid',
  'peer-invalid': 'when sibling with .peer class is invalid',
  'peer-in-range': 'when sibling with .peer class is in range',
  'peer-out-of-range': 'when sibling with .peer class is out of range',
  'peer-placeholder-shown': 'when sibling with .peer class has placeholder',
  'peer-autofill': 'when sibling with .peer class is autofilled',
  'peer-read-only': 'when sibling with .peer class is read-only',
  'peer-open': 'when sibling with .peer class is open',
  'peer-aria-busy': 'when sibling with .peer class has aria-busy',
  'peer-aria-checked': 'when sibling with .peer class has aria-checked',
  'peer-aria-disabled': 'when sibling with .peer class has aria-disabled',
  'peer-aria-expanded': 'when sibling with .peer class has aria-expanded',
  'peer-aria-hidden': 'when sibling with .peer class has aria-hidden',
  'peer-aria-pressed': 'when sibling with .peer class has aria-pressed',
  'peer-aria-readonly': 'when sibling with .peer class has aria-readonly',
  'peer-aria-required': 'when sibling with .peer class has aria-required',
  'peer-aria-selected': 'when sibling with .peer class has aria-selected',
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
