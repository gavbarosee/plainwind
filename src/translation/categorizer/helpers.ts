/**
 * Private helper functions for the categorizer module
 */

import type { Category, ClassCategory } from './types';
import { CATEGORIES } from './categories';

/**
 * Remove variant prefixes from a class name
 *
 * Examples:
 *   "hover:bg-blue-500"  → "bg-blue-500"
 *   "md:flex"            → "flex"
 *   "dark:text-white"    → "text-white"
 *   "p-4"                → "p-4" (no change)
 */
export function removeVariantPrefixes(className: string): string {
  const parts = className.split(':');
  const lastPart = parts[parts.length - 1];
  return lastPart || className;
}

/**
 * Check if a class name matches any pattern in a category
 */
export function classMatchesCategory(
  className: string,
  category: Category
): boolean {
  for (const pattern of category.patterns) {
    if (pattern.test(className)) {
      return true;
    }
  }

  return false;
}

/**
 * Core categorization logic
 * Used by both categorizeClass and groupTranslationsByTheirCategory
 */
export function categorizeSingleClass(className: string): ClassCategory {
  const classWithoutVariants = removeVariantPrefixes(className);

  // Try each category until we find a match
  for (const category of CATEGORIES) {
    if (classMatchesCategory(classWithoutVariants, category)) {
      return category.name;
    }
  }

  return 'Other';
}

/**
 * Get the emoji for a category
 * Used internally and exposed via public API
 */
export function getCategoryEmojiInternal(category: ClassCategory): string {
  const categoryInfo = CATEGORIES.find((cat) => cat.name === category);

  if (categoryInfo) {
    return categoryInfo.emoji;
  }

  return '🔧'; // Default fallback
}

/**
 * Get all category names in display order
 * Used internally and exposed via public API
 *
 * Note: This is the DISPLAY order, which is different from the
 * pattern matching order in CATEGORIES array. The display order
 * groups related categories together for better UX.
 */
export function getCategoryOrderInternal(): ClassCategory[] {
  return [
    'Layout',
    'Flexbox & Grid',
    'Spacing',
    'Sizing',
    'Colors',
    'Backgrounds',
    'Borders',
    'Typography',
    'Tables',
    'Transitions & Animation',
    'Transforms',
    'Interactivity',
    'Effects',
    'Filters',
    'SVG',
    'Accessibility',
    'Other',
  ];
}

/**
 * Group translations by their Tailwind class category
 */
export function groupTranslationsByTheirCategory(
  classNames: string[],
  translations: string[]
): Map<ClassCategory, string[]> {
  const grouped = new Map<ClassCategory, string[]>();

  for (let i = 0; i < classNames.length; i++) {
    const className = classNames[i];
    const translation = translations[i];
    const category = categorizeSingleClass(className);

    // Initialize array for this category if needed
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }

    // Add this translation to the category
    const categoryTranslations = grouped.get(category);
    if (categoryTranslations) {
      categoryTranslations.push(translation);
    }
  }

  return grouped;
}

/**
 * Format category groups in their display order
 */
export function formatGroupsInOrder(
  translationsByCategory: Map<ClassCategory, string[]>,
  showEmojis: boolean
): string[] {
  const categoryOrder = getCategoryOrderInternal();
  const formattedGroups: string[] = [];

  for (const category of categoryOrder) {
    if (translationsByCategory.has(category)) {
      const translations = translationsByCategory.get(category);
      if (translations) {
        const formatted = formatSingleCategoryGroup(
          category,
          translations,
          showEmojis
        );
        formattedGroups.push(formatted);
      }
    }
  }

  return formattedGroups;
}

/**
 * Format a single category with its translations
 *
 * Examples:
 *   formatSingleCategoryGroup("Colors", ["red text", "blue bg"], false)
 *   → "Colors: red text, blue bg"
 *
 *   formatSingleCategoryGroup("Colors", ["red text"], true)
 *   → "🎨 Colors: red text"
 */
export function formatSingleCategoryGroup(
  category: ClassCategory,
  translations: string[],
  showEmojis: boolean
): string {
  const translationList = translations.join(', ');

  if (showEmojis) {
    const emoji = getCategoryEmojiInternal(category);
    return `${emoji} ${category}: ${translationList}`;
  }

  return `${category}: ${translationList}`;
}
