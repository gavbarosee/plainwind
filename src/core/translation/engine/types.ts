/**
 * Shared types for the translator module
 */

/**
 * Type definition for pattern matcher functions
 * 
 * Pattern matchers attempt to translate a Tailwind class that follows
 * a dynamic pattern (e.g., p-{number}, bg-{color}-{shade}).
 * 
 * @param className - Tailwind class to match
 * @returns Translated string if matched, null otherwise
 * 
 * @example
 * ```ts
 * const matcher: PatternMatcher = (className) => {
 *   if (className.startsWith('p-') && /^\d+$/.test(className.slice(2))) {
 *     return `padding ${className.slice(2)}`;
 *   }
 *   return null;
 * };
 * 
 * matcher('p-4')  // Returns: "padding 4"
 * matcher('flex') // Returns: null
 * ```
 */
export type PatternMatcher = (className: string) => string | null;

/**
 * Result of extracting variants from a class name
 * 
 * @example
 * ```ts
 * { variants: ["md", "hover"], baseClass: "bg-blue-500" }
 * { variants: ["dark"], baseClass: "[--var:value]" }
 * { variants: [], baseClass: "p-4" }
 * ```
 */
export interface VariantExtraction {
  /** Array of variant prefixes (e.g., ["md", "hover", "dark"]) */
  variants: string[];
  /** Base class without variants (e.g., "bg-blue-500") */
  baseClass: string;
}

/**
 * Result of extracting opacity from a class name
 * 
 * @example
 * ```ts
 * { className: "bg-white", opacity: "50" }  // From "bg-white/50"
 * { className: "p-4", opacity: null }       // No opacity modifier
 * ```
 */
export interface OpacityExtraction {
  /** Class name without opacity modifier */
  className: string;
  /** Opacity percentage (0-100) or null if not present */
  opacity: string | null;
}

/**
 * Result of extracting important flag from a class name
 * 
 * @example
 * ```ts
 * { className: "bg-white", isImportant: true }  // From "bg-white!"
 * { className: "p-4", isImportant: false }      // No important flag
 * ```
 */
export interface ImportantExtraction {
  /** Class name without important flag */
  className: string;
  /** Whether the class has the ! suffix */
  isImportant: boolean;
}

/**
 * Result of extracting prefix from a class name
 * 
 * Prefixes use escaped colons to distinguish from variants
 * 
 * @example
 * ```ts
 * { className: "bg-white", prefix: "tw" }      // From "tw\:bg-white"
 * { className: "hover:p-4", prefix: "" }       // No prefix
 * ```
 */
export interface PrefixExtraction {
  /** Class name without prefix */
  className: string;
  /** Prefix identifier (e.g., "tw", "custom") or empty string */
  prefix: string;
}
