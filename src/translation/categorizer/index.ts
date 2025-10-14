/**
 * Categorize Tailwind classes for grouped display
 *
 * This module helps organize Tailwind CSS classes into semantic groups
 * like Layout, Typography, Colors, etc. for better organization.
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
 * Examples:
 *   categorizeClass("flex")              → "Flexbox & Grid"
 *   categorizeClass("p-4")               → "Spacing"
 *   categorizeClass("hover:bg-blue-500") → "Colors"
 *   categorizeClass("text-xl")           → "Typography"
 */
export function categorizeClass(className: string): ClassCategory {
  return categorizeSingleClass(className);
}

/**
 * Get the emoji icon for a category
 *
 * Examples:
 *   getCategoryEmoji("Layout")     → "📐"
 *   getCategoryEmoji("Colors")     → "🎨"
 *   getCategoryEmoji("Typography") → "📝"
 */
export function getCategoryEmoji(category: ClassCategory): string {
  return getCategoryEmojiInternal(category);
}

/**
 * Get all categories in the order they should be displayed
 */
export function getCategoryOrder(): ClassCategory[] {
  return getCategoryOrderInternal();
}

/**
 * Group translations by category and format them for display
 *
 * Takes a list of Tailwind classes and their translations, then groups them
 * by category and formats them nicely.
 *
 * Example:
 *   Input:  ["flex", "p-4", "text-red-500"]
 *           ["flexbox", "padding-4", "red text"]
 *
 *   Output: "Flexbox & Grid: flexbox | Spacing: padding-4 | Colors: red text"
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
