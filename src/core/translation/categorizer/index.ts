/**
 * Categorize Tailwind classes for grouped display
 * 
 * This module provides a semantic categorization system for Tailwind CSS classes.
 * It organizes classes into groups like "Layout", "Typography", "Colors", etc.
 * to improve readability and organization in the translation UI.
 * 
 * **Purpose:**
 * When translating multiple classes, grouped display is easier to scan than
 * a flat list. Instead of:
 *   "flexbox, padding 1rem, gap 1rem, medium blue background, white text"
 * 
 * We show:
 *   "Flexbox & Grid: flexbox | Spacing: padding 1rem, gap 1rem | 
 *    Colors: medium blue background, white text"
 * 
 * **Categories:** (17 total)
 * Layout, Flexbox & Grid, Spacing, Sizing, Colors, Backgrounds, Borders,
 * Typography, Tables, Transitions & Animation, Transforms, Interactivity,
 * Effects, Filters, SVG, Accessibility, Other
 * 
 * **Configuration:**
 * Users can toggle grouped display via settings:
 * - `plainwind.groupByCategory`: Enable/disable grouping
 * - `plainwind.showCategoryEmojis`: Show/hide emoji prefixes
 * 
 * **Performance:**
 * - Categorization is O(n*m) where n=classes, m=categories
 * - Caching is not needed as m is small (~17) and lookups are fast
 * - Pattern matching uses optimized regex compiled at module load
 */

import type { ClassCategory } from './types';
import {
  categorizeSingleClass,
  getCategoryEmojiInternal,
  getCategoryOrderInternal,
  groupTranslationsByTheirCategory,
  formatGroupsInOrder,
} from './helpers';

// Re-export types
export type { ClassCategory } from './types';

// ============================================================================
// PUBLIC API
// ============================================================================

/**
 * Figure out which category a Tailwind class belongs to
 * 
 * This is the primary categorization function. It strips variant prefixes
 * (hover:, md:, etc.) and matches the base class against category patterns.
 * 
 * **Use Cases:**
 * - Grouping translations by category in the UI
 * - Filtering classes by type
 * - Organizing class lists for display
 * 
 * **Categorization Rules:**
 * - Variants are ignored: "hover:flex" and "md:flex" both → "Flexbox & Grid"
 * - Arbitrary values are supported: "w-[50vw]" → "Sizing"
 * - First match wins: Patterns are tested in priority order
 * - Fallback: Unknown classes return "Other"
 * 
 * @param className - Tailwind class name (may include variants)
 * @returns Category name
 * 
 * @example
 * ```ts
 * categorizeClass("flex")              // "Flexbox & Grid"
 * categorizeClass("p-4")               // "Spacing"
 * categorizeClass("hover:bg-blue-500") // "Colors"
 * categorizeClass("text-xl")           // "Typography"
 * categorizeClass("unknown-class")     // "Other"
 * ```
 */
export function categorizeClass(className: string): ClassCategory {
  return categorizeSingleClass(className);
}

/**
 * Get the emoji icon for a category
 * 
 * Returns the visual emoji associated with a category. Used when
 * `showCategoryEmojis` setting is enabled.
 * 
 * @param category - Category name
 * @returns Emoji string
 * 
 * @example
 * ```ts
 * getCategoryEmoji("Layout")     // "📐"
 * getCategoryEmoji("Colors")     // "🎨"
 * getCategoryEmoji("Typography") // "📝"
 * ```
 */
export function getCategoryEmoji(category: ClassCategory): string {
  return getCategoryEmojiInternal(category);
}

/**
 * Get all categories in the order they should be displayed
 * 
 * Returns categories in a logical grouping order for UI display.
 * This is NOT the same as pattern matching order.
 * 
 * **Display Grouping:**
 * - Structural: Layout, Flexbox & Grid, Spacing, Sizing
 * - Visual: Colors, Backgrounds, Borders, Typography
 * - Motion: Transitions & Animation, Transforms
 * - Interactive: Interactivity, Effects, Filters
 * - Specialized: Tables, SVG, Accessibility
 * - Fallback: Other
 * 
 * @returns Array of all category names in display order
 */
export function getCategoryOrder(): ClassCategory[] {
  return getCategoryOrderInternal();
}

/**
 * Group translations by category and format them for display
 * 
 * This is the main entry point for the categorization system. It takes
 * parallel arrays of class names and translations, groups them by category,
 * and formats them into a single string for display.
 * 
 * **Process:**
 * 1. Categorize each class name
 * 2. Group translations by category
 * 3. Format in display order
 * 4. Join with " | " separator
 * 
 * **Output Format:**
 * - Each category on one line: "Category: item1, item2"
 * - Categories separated by: " | "
 * - Optional emoji prefix: "📦 Category: item1, item2"
 * 
 * **Configuration:**
 * - showEmojis parameter controls emoji display
 * - Typically set from user's `plainwind.showCategoryEmojis` setting
 * 
 * @param classNames - Array of Tailwind class names
 * @param translations - Array of corresponding translations (same length)
 * @param showEmojis - Whether to include emoji prefixes (default: false)
 * @returns Formatted string with grouped translations
 * 
 * @example
 * ```ts
 * groupTranslationsByCategory(
 *   ['flex', 'p-4', 'text-red-500'],
 *   ['flexbox', 'padding 1rem', 'red text'],
 *   false
 * )
 * // Returns: "Flexbox & Grid: flexbox | Spacing: padding 1rem | Colors: red text"
 * 
 * groupTranslationsByCategory(
 *   ['flex', 'p-4'],
 *   ['flexbox', 'padding 1rem'],
 *   true
 * )
 * // Returns: "📦 Flexbox & Grid: flexbox | ↔️ Spacing: padding 1rem"
 * ```
 */
export function groupTranslationsByCategory(
  classNames: string[],
  translations: string[],
  showEmojis: boolean = false
): string {
  const grouped = groupTranslationsByTheirCategory(classNames, translations);
  const formatted = formatGroupsInOrder(grouped, showEmojis);
  const result = formatted.join(' | ');

  return result;
}
