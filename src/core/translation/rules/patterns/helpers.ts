/**
 * Pattern-based translation for dynamic Tailwind classes
 *
 * This module provides shared utilities and lookup tables used by
 * pattern matcher functions across different Tailwind utility categories.
 *
 * Key exports:
 * - Color and shade mappings
 * - Spacing scale conversions
 * - Number word mappings (1-12)
 * - Flexible value extraction (custom properties, arbitrary values, numbers)
 */

/**
 * Color names used across Tailwind
 *
 * Maps color keywords to their display names.
 * Used by color, background, border, and text pattern matchers.
 */
export const COLOR_NAMES: Record<string, string> = {
  slate: 'slate',
  gray: 'gray',
  zinc: 'zinc',
  neutral: 'neutral',
  stone: 'stone',
  red: 'red',
  orange: 'orange',
  amber: 'amber',
  yellow: 'yellow',
  lime: 'lime',
  green: 'green',
  emerald: 'emerald',
  teal: 'teal',
  cyan: 'cyan',
  sky: 'sky',
  blue: 'blue',
  indigo: 'indigo',
  violet: 'violet',
  purple: 'purple',
  fuchsia: 'fuchsia',
  pink: 'pink',
  rose: 'rose',
  white: 'white',
  black: 'black',
};

/**
 * Shade descriptions for color variants
 *
 * Tailwind uses numeric shades (50-950) to indicate lightness.
 * This maps numbers to human-readable descriptions.
 *
 * @example
 * ```ts
 * SHADE_DESCRIPTIONS['500'] // "medium"
 * SHADE_DESCRIPTIONS['900'] // "darkest"
 * ```
 */
export const SHADE_DESCRIPTIONS: Record<string, string> = {
  '50': 'lightest',
  '100': 'very light',
  '200': 'light',
  '300': 'lightish',
  '400': 'medium light',
  '500': 'medium',
  '600': 'medium dark',
  '700': 'dark',
  '800': 'very dark',
  '900': 'darkest',
  '950': 'extremely dark',
};

/**
 * Spacing scale (Tailwind default)
 *
 * Maps Tailwind spacing numbers to their rem values.
 * Used by padding, margin, gap, and other spacing utilities.
 *
 * Tailwind's spacing scale:
 * - 1 unit = 0.25rem (4px at default font size)
 * - Scale includes fractional values (0.5, 1.5, etc.)
 *
 * @example
 * ```ts
 * SPACING_SCALE['4']   // "1rem"
 * SPACING_SCALE['0.5'] // "0.125rem"
 * SPACING_SCALE['96']  // "24rem"
 * ```
 */
export const SPACING_SCALE: Record<string, string> = {
  '0': '0',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
};

/**
 * Number word mappings for better readability (1-12)
 *
 * Used for grid columns, flex order, and other numeric utilities
 * where word form is more readable than digits.
 *
 * @example
 * ```ts
 * NUMBER_WORDS['3']  // "three"
 * NUMBER_WORDS['12'] // "twelve"
 * ```
 */
export const NUMBER_WORDS: Record<string, string> = {
  '1': 'one',
  '2': 'two',
  '3': 'three',
  '4': 'four',
  '5': 'five',
  '6': 'six',
  '7': 'seven',
  '8': 'eight',
  '9': 'nine',
  '10': 'ten',
  '11': 'eleven',
  '12': 'twelve',
};

/**
 * Extract custom property from parentheses
 *
 * Tailwind v4+ supports CSS custom properties with parentheses syntax.
 *
 * @param value - Value to check (e.g., "(--my-var)")
 * @returns Custom property name (e.g., "--my-var") or null
 *
 * @example
 * ```ts
 * extractCustomProperty("(--spacing)")  // "--spacing"
 * extractCustomProperty("[10px]")        // null
 * ```
 */
export function extractCustomProperty(value: string): string | null {
  const match = value.match(/^\((--[\w-]+)\)$/);
  return match ? match[1] : null;
}

/**
 * Extract arbitrary value from brackets
 *
 * Tailwind supports arbitrary values in brackets for custom CSS values.
 *
 * @param value - Value to check (e.g., "[10px]", "[calc(100%-2rem)]")
 * @returns Arbitrary value without brackets or null
 *
 * @example
 * ```ts
 * extractArbitraryValue("[10px]")              // "10px"
 * extractArbitraryValue("[calc(100%-2rem)]")   // "calc(100%-2rem)"
 * extractArbitraryValue("(--var)")             // null
 * ```
 */
export function extractArbitraryValue(value: string): string | null {
  const match = value.match(/^\[(.+?)\]$/);
  return match ? match[1] : null;
}

/**
 * Try to match a pattern with custom property, arbitrary value, or number
 *
 * This is a flexible matcher used across many pattern functions to handle:
 * - Custom properties: w-(--my-width)
 * - Arbitrary values: w-[calc(100%-2rem)]
 * - Numeric values: w-64
 *
 * @param className - Full class name to check
 * @param prefix - Expected prefix (e.g., "w-", "p-", "gap-")
 * @returns Object with type and value, or null if no match
 *
 * @example
 * ```ts
 * matchFlexibleValue("w-(--container)", "w-")
 * // Returns: { type: 'custom', value: '--container' }
 *
 * matchFlexibleValue("w-[50vw]", "w-")
 * // Returns: { type: 'arbitrary', value: '50vw' }
 *
 * matchFlexibleValue("w-64", "w-")
 * // Returns: { type: 'number', value: '64' }
 *
 * matchFlexibleValue("h-full", "w-")
 * // Returns: null (wrong prefix)
 * ```
 */
export function matchFlexibleValue(
  className: string,
  prefix: string
): { type: 'custom' | 'arbitrary' | 'number'; value: string } | null {
  if (!className.startsWith(prefix)) {
    return null;
  }

  const suffix = className.slice(prefix.length);

  // Check for custom property: prefix-(--var)
  const customProp = extractCustomProperty(suffix);
  if (customProp) {
    return { type: 'custom', value: customProp };
  }

  // Check for arbitrary value: prefix-[value]
  const arbitrary = extractArbitraryValue(suffix);
  if (arbitrary) {
    return { type: 'arbitrary', value: arbitrary };
  }

  // Check for number: prefix-123 (including negative numbers)
  if (/^-?\d+$/.test(suffix)) {
    return { type: 'number', value: suffix };
  }

  return null;
}
