/**
 * Parsing utilities for class names
 */

import type {
  VariantExtraction,
  OpacityExtraction,
  ImportantExtraction,
  PrefixExtraction,
} from './types';

/**
 * Parse a class string into individual non-empty class names
 */
export function parseNonEmptyClasses(classString: string): string[] {
  return classString.split(/\s+/).filter((c) => c.trim());
}

/**
 * Extract variants and base class from a Tailwind class
 * 
 * Handles arbitrary values with brackets by tracking bracket depth to avoid
 * splitting on colons that are inside bracket expressions.
 * 
 * @param className - Full Tailwind class with possible variants
 * 
 * @example
 * ```ts
 * extractVariants("md:hover:bg-blue-500")
 * // Returns: { variants: ["md", "hover"], baseClass: "bg-blue-500" }
 * 
 * extractVariants("dark:[--var:value]")
 * // Returns: { variants: ["dark"], baseClass: "[--var:value]" }
 * // Note: Colon inside brackets is NOT treated as a separator
 * 
 * extractVariants("bg-blue-500")
 * // Returns: { variants: [], baseClass: "bg-blue-500" }
 * ```
 */
export function extractVariants(className: string): VariantExtraction {
  // If no colons, no variants
  if (!className.includes(':')) {
    return { variants: [], baseClass: className };
  }

  /**
   * Split carefully, respecting brackets
   * 
   * We track bracket depth to avoid splitting on colons inside arbitrary values.
   * Only colons at bracketDepth=0 are treated as variant separators.
   * 
   * State machine:
   * - '[' increases depth
   * - ']' decreases depth
   * - ':' at depth 0 is a separator
   * - ':' at depth > 0 is part of the value
   */
  const variants: string[] = [];
  let currentVariant = '';
  let bracketDepth = 0;

  for (let i = 0; i < className.length; i++) {
    const char = className[i];

    if (char === '[') {
      bracketDepth++;
      currentVariant += char;
    } else if (char === ']') {
      bracketDepth--;
      currentVariant += char;
    } else if (char === ':' && bracketDepth === 0) {
      // This is a variant separator, not part of arbitrary value
      if (currentVariant) {
        variants.push(currentVariant);
        currentVariant = '';
      }
    } else {
      currentVariant += char;
    }
  }

  // Whatever is left is the base class
  const baseClass = currentVariant;
  return { variants, baseClass };
}

/**
 * Extract opacity modifier from a class
 * 
 * @example
 * ```ts
 * extractOpacity("bg-white/10")
 * // Returns: { className: "bg-white", opacity: "10" }
 * 
 * extractOpacity("text-red-500/50")
 * // Returns: { className: "text-red-500", opacity: "50" }
 * 
 * extractOpacity("p-4")
 * // Returns: { className: "p-4", opacity: null }
 * ```
 */
export function extractOpacity(
  classNameWithOpacity: string
): OpacityExtraction {
  const opacityMatch = classNameWithOpacity.match(/^(.+)\/(\d+)$/);
  if (opacityMatch) {
    return {
      className: opacityMatch[1],
      opacity: opacityMatch[2],
    };
  }
  return { className: classNameWithOpacity, opacity: null };
}

/**
 * Extract important modifier from a class
 * 
 * @example
 * ```ts
 * extractImportant("bg-white!")
 * // Returns: { className: "bg-white", isImportant: true }
 * 
 * extractImportant("p-4")
 * // Returns: { className: "p-4", isImportant: false }
 * ```
 */
export function extractImportant(className: string): ImportantExtraction {
  if (className.endsWith('!')) {
    return {
      className: className.slice(0, -1),
      isImportant: true,
    };
  }
  return {
    className,
    isImportant: false,
  };
}

/**
 * Extract prefix from a class
 * Prefixes use escaped colons (e.g., "tw\:") to distinguish from variant colons
 * 
 * @example
 * ```ts
 * extractPrefix("tw\\:bg-white")
 * // Returns: { className: "bg-white", prefix: "tw" }
 * 
 * extractPrefix("custom\\:p-4")
 * // Returns: { className: "p-4", prefix: "custom" }
 * 
 * extractPrefix("hover:bg-white")
 * // Returns: { className: "hover:bg-white", prefix: "" }
 * // Note: Regular colon is NOT a prefix
 * ```
 */
export function extractPrefix(className: string): PrefixExtraction {
  // Match something like "tw\:" at the start (where backslash escapes the colon)
  const prefixMatch = className.match(/^([a-z0-9-]+)\\:(.+)$/i);
  if (prefixMatch) {
    return {
      className: prefixMatch[2],
      prefix: prefixMatch[1],
    };
  }
  return {
    className,
    prefix: '',
  };
}
