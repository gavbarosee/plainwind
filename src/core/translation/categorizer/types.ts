/**
 * Type definitions for the categorizer module
 */

/**
 * All possible Tailwind class categories
 *
 * Categories help organize translations for better readability when
 * "Group by Category" is enabled.
 *
 * Categories are listed in display order (see getCategoryOrder() for actual ordering).
 *
 * @example
 * ```ts
 * const category: ClassCategory = 'Typography';
 * const emoji = getCategoryEmoji(category); // "📝"
 * ```
 */
export type ClassCategory =
  | 'Layout' // Display, positioning, overflow, isolation
  | 'Flexbox & Grid' // Flex and grid utilities
  | 'Spacing' // Padding, margin, space-between
  | 'Sizing' // Width, height, min/max
  | 'Colors' // Text color, fill, stroke
  | 'Backgrounds' // Background colors, images, gradients
  | 'Borders' // Border width, color, radius
  | 'Typography' // Font, text, line height, tracking
  | 'Tables' // Table layout, border spacing
  | 'Animation' // Transitions, animations
  | 'Transforms' // Translate, scale, rotate, skew
  | 'Interactivity' // Cursor, user-select, pointer-events
  | 'Effects' // Shadow, opacity, mix-blend
  | 'Filters' // Blur, brightness, contrast, etc.
  | 'SVG' // SVG-specific utilities
  | 'Accessibility' // Screen readers
  | 'Other'; // Uncategorized classes

/**
 * Internal definition of a category with its matching patterns
 *
 * Used in categories.ts to define how classes are categorized.
 * Each category has patterns that match class name prefixes.
 *
 * IMPORTANT: Pattern matching order in CATEGORIES array matters!
 * More specific patterns should come first.
 *
 * @example
 * ```ts
 * const category: Category = {
 *   name: 'Typography',
 *   emoji: '📝',
 *   patterns: [/^text-/, /^font-/, /^leading-/],
 *   description: 'Must come before Colors to catch text-xl, text-center'
 * };
 * ```
 */
export interface Category {
  /** Display name of the category */
  name: ClassCategory;
  /** Emoji icon for visual distinction */
  emoji: string;
  /** RegExp patterns to match class names (checked in order) */
  patterns: RegExp[];
  /** Optional note about ordering or special handling */
  description?: string;
}
