/**
 * Pattern-based translation for dynamic Tailwind classes
 */

/**
 * Color names used across Tailwind
 */
export const COLOR_NAMES: Record<string, string> = {
  slate: "slate",
  gray: "gray",
  zinc: "zinc",
  neutral: "neutral",
  stone: "stone",
  red: "red",
  orange: "orange",
  amber: "amber",
  yellow: "yellow",
  lime: "lime",
  green: "green",
  emerald: "emerald",
  teal: "teal",
  cyan: "cyan",
  sky: "sky",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
  purple: "purple",
  fuchsia: "fuchsia",
  pink: "pink",
  rose: "rose",
  white: "white",
  black: "black",
};

/**
 * Shade descriptions for color variants
 */
export const SHADE_DESCRIPTIONS: Record<string, string> = {
  "50": "lightest",
  "100": "very light",
  "200": "light",
  "300": "lightish",
  "400": "medium light",
  "500": "medium",
  "600": "medium dark",
  "700": "dark",
  "800": "very dark",
  "900": "darkest",
  "950": "extremely dark",
};

/**
 * Spacing scale (Tailwind default)
 */
export const SPACING_SCALE: Record<string, string> = {
  "0": "0",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

/**
 * Number word mappings for better readability (1-12)
 */
export const NUMBER_WORDS: Record<string, string> = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
};

/**
 * Helper: Extract custom property from parentheses, e.g., "(--my-var)" -> "--my-var"
 */
export function extractCustomProperty(value: string): string | null {
  const match = value.match(/^\((--[\w-]+)\)$/);
  return match ? match[1] : null;
}

/**
 * Helper: Extract arbitrary value from brackets, e.g., "[10px]" -> "10px"
 */
export function extractArbitraryValue(value: string): string | null {
  const match = value.match(/^\[(.+?)\]$/);
  return match ? match[1] : null;
}

/**
 * Helper: Try to match a pattern with custom property, arbitrary value, or number
 * Returns the matched value or null
 */
export function matchFlexibleValue(
  className: string,
  prefix: string
): { type: "custom" | "arbitrary" | "number"; value: string } | null {
  if (!className.startsWith(prefix)) {
    return null;
  }

  const suffix = className.slice(prefix.length);

  // Check for custom property: prefix-(--var)
  const customProp = extractCustomProperty(suffix);
  if (customProp) {
    return { type: "custom", value: customProp };
  }

  // Check for arbitrary value: prefix-[value]
  const arbitrary = extractArbitraryValue(suffix);
  if (arbitrary) {
    return { type: "arbitrary", value: arbitrary };
  }

  // Check for number: prefix-123
  if (/^-?\d+$/.test(suffix)) {
    return { type: "number", value: suffix };
  }

  return null;
}

