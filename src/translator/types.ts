/**
 * Shared types for the translator module
 */

/**
 * Type definition for pattern matcher functions
 */
export type PatternMatcher = (className: string) => string | null;

/**
 * Result of extracting variants from a class name
 */
export interface VariantExtraction {
  variants: string[];
  baseClass: string;
}

/**
 * Result of extracting opacity from a class name
 */
export interface OpacityExtraction {
  className: string;
  opacity: string | null;
}

/**
 * Result of extracting important flag from a class name
 */
export interface ImportantExtraction {
  className: string;
  isImportant: boolean;
}

/**
 * Result of extracting prefix from a class name
 */
export interface PrefixExtraction {
  className: string;
  prefix: string;
}

