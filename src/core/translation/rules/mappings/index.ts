/**
 * Static mappings for fixed Tailwind CSS classes
 *
 * This module provides a lookup table for Tailwind classes with fixed,
 * predetermined values. These are classes that don't have variable parts
 * like numbers or arbitrary values.
 *
 * **Static Mapping vs Pattern Matching:**
 * - Static: Fixed classes like `flex`, `hidden`, `block` → O(1) lookup
 * - Patterns: Dynamic classes like `p-4`, `w-[50vw]` → Regex matching
 *
 * **Translation Priority:**
 * Static mappings are checked AFTER pattern matchers in the translation engine.
 * If a pattern matches, it takes precedence. If no pattern matches, the static
 * mapping is used as a fallback.
 *
 * **Organization:**
 * Mappings are organized by Tailwind utility category (layout, typography, etc.)
 * and merged into a single lookup table for efficient O(1) access.
 *
 * **Coverage:**
 * This table includes all fixed Tailwind utilities across all categories:
 * - Display utilities (flex, block, inline, etc.)
 * - Position utilities (static, fixed, absolute, etc.)
 * - Typography (font-sans, italic, underline, etc.)
 * - Interactivity (cursor-pointer, select-none, etc.)
 * - And many more...
 *
 * **Performance:**
 * - ~2000+ entries in the combined mapping
 * - O(1) lookup time using JavaScript object
 * - All mappings loaded at module initialization
 *
 * @example
 * ```ts
 * tailwindMappings['flex']      // "flexbox"
 * tailwindMappings['hidden']    // "hidden"
 * tailwindMappings['italic']    // "italic text"
 * tailwindMappings['p-4']       // undefined (dynamic, use pattern matcher)
 * ```
 */

import { layoutMappings } from './layout';
import { flexboxGridMappings } from './flexbox-grid';
import { spacingMappings } from './spacing';
import { sizingMappings } from './sizing';
import { colorsMappings } from './colors';
import { backgroundsMappings } from './backgrounds';
import { bordersMappings } from './borders';
import { typographyMappings } from './typography';
import { tablesMappings } from './tables';
import { transitionsMappings } from './transitions-animations';
import { transformsMappings } from './transforms';
import { interactivityMappings } from './interactivity';
import { effectsMappings } from './effects';
import { filtersMappings } from './filters';
import { positioningMappings } from './positioning';
import { svgMappings } from './svg';
import { accessibilityMappings } from './accessibility';

/**
 * Combined Tailwind class mappings
 *
 * Merges all category-specific mappings into a single lookup table.
 * Used by the translation engine as a fallback after pattern matching.
 */
export const tailwindMappings: Record<string, string> = {
  ...layoutMappings,
  ...flexboxGridMappings,
  ...spacingMappings,
  ...sizingMappings,
  ...colorsMappings,
  ...backgroundsMappings,
  ...bordersMappings,
  ...typographyMappings,
  ...tablesMappings,
  ...transitionsMappings,
  ...transformsMappings,
  ...interactivityMappings,
  ...effectsMappings,
  ...filtersMappings,
  ...positioningMappings,
  ...svgMappings,
  ...accessibilityMappings,
};

// Optional: Export individual mappings for testing or selective use
export {
  layoutMappings,
  flexboxGridMappings,
  spacingMappings,
  sizingMappings,
  colorsMappings,
  backgroundsMappings,
  bordersMappings,
  typographyMappings,
  tablesMappings,
  transitionsMappings,
  transformsMappings,
  interactivityMappings,
  effectsMappings,
  filtersMappings,
  positioningMappings,
  svgMappings,
  accessibilityMappings,
};
