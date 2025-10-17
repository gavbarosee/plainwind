/**
 * Private helper functions for the categorizer module
 *
 * These functions implement the core logic for categorizing Tailwind classes
 * and grouping translations by their semantic category.
 *
 * **Key Concepts:**
 * - Variant removal: Strip hover:, md:, etc. to get base class
 * - Pattern matching: Test base class against category regex patterns
 * - First-match wins: Categories are checked in priority order
 * - Display ordering: Group output by semantic categories, not match order
 */

import type { Category, ClassCategory } from './types';
import { CATEGORIES } from './categories';

/**
 * Remove variant prefixes from a class name
 *
 * Tailwind variants (hover:, md:, dark:, etc.) modify behavior but don't
 * change the category. We strip them to categorize the base utility.
 *
 * **Algorithm:**
 * - Split by colon
 * - Take last part (the base class)
 * - Handles multiple variants: "hover:md:dark:flex" → "flex"
 *
 * **Edge Cases:**
 * - No variants: Returns original class unchanged
 * - Empty string: Returns empty string
 * - Arbitrary values with colons: Last part is still correct
 *   (e.g., "[color:red]" → "[color:red]" - handled by pattern matching)
 *
 * @param className - Full Tailwind class name (may include variants)
 * @returns Base class without variant prefixes
 *
 * @example
 * ```ts
 * removeVariantPrefixes("hover:bg-blue-500")  // "bg-blue-500"
 * removeVariantPrefixes("md:flex")            // "flex"
 * removeVariantPrefixes("hover:md:dark:p-4")  // "p-4"
 * removeVariantPrefixes("p-4")                // "p-4"
 * ```
 */
export function removeVariantPrefixes(className: string): string {
  const parts = className.split(':');
  const lastPart = parts[parts.length - 1];
  return lastPart || className;
}

/**
 * Check if a class name matches any pattern in a category
 *
 * Tests the class against all regex patterns for a category.
 * Returns true on first match (short-circuits for performance).
 *
 * @param className - Class name to test (should have variants removed)
 * @param category - Category definition with patterns to test
 * @returns True if class matches any pattern in the category
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
 *
 * Categorizes a single Tailwind class by testing it against each category's
 * patterns in priority order. First match wins.
 *
 * **Process:**
 * 1. Remove variant prefixes (hover:, md:, etc.)
 * 2. Test against each category in CATEGORIES array order
 * 3. Return first matching category name
 * 4. Return "Other" if no patterns match
 *
 * **Why Order Matters:**
 * CATEGORIES are ordered by specificity. For example:
 * - "Tables" comes before "Layout" (table-auto vs table display)
 * - "Typography" comes before "Colors" (text-xl vs text-blue)
 * - "Borders" comes before "Effects" (border vs shadow)
 *
 * This ensures the most specific category is always selected.
 *
 * @param className - Tailwind class name (may include variants)
 * @returns Category name
 *
 * @example
 * ```ts
 * categorizeSingleClass("flex")              // "Flexbox & Grid"
 * categorizeSingleClass("hover:bg-blue-500") // "Colors"
 * categorizeSingleClass("p-4")               // "Spacing"
 * categorizeSingleClass("unknown-class")     // "Other"
 * ```
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
 *
 * Returns the visual icon associated with a category for use in
 * the UI when showEmojis setting is enabled.
 *
 * @param category - Category name
 * @returns Emoji string (defaults to 🔧 if category not found)
 */
export function getCategoryEmojiInternal(category: ClassCategory): string {
  const categoryInfo = CATEGORIES.find((cat) => cat.name === category);

  if (categoryInfo) {
    return categoryInfo.emoji;
  }

  return '🔧'; // Default fallback for "Other" or unknown categories
}

/**
 * Get all category names in display order
 *
 * **Important:** This is the DISPLAY order, NOT the pattern matching order.
 *
 * **Why Two Different Orders?**
 * - Pattern matching order (in CATEGORIES): Prioritizes specificity
 *   to ensure correct categorization (e.g., Tables before Layout)
 * - Display order (this function): Groups related categories for UX
 *   (e.g., Layout, Flexbox & Grid, Spacing together)
 *
 * **Display Grouping Logic:**
 * - Layout-related: Layout, Flexbox & Grid, Spacing, Sizing
 * - Visual: Colors, Backgrounds, Borders, Typography
 * - Effects: Transitions, Transforms, Interactivity, Effects, Filters
 * - Specialized: Tables, SVG, Accessibility
 * - Fallback: Other
 *
 * @returns Array of category names in display order
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
 *
 * Takes parallel arrays of class names and translations, categorizes each
 * class, and groups translations by category.
 *
 * **Algorithm:**
 * 1. Iterate through class names and translations in parallel
 * 2. Categorize each class name
 * 3. Add translation to appropriate category bucket
 * 4. Return Map for efficient category lookup
 *
 * **Performance:**
 * - O(n) where n = number of classes
 * - Each categorization is O(m) where m = number of categories (typically small)
 * - Map operations are O(1) for insertion and lookup
 *
 * @param classNames - Array of Tailwind class names
 * @param translations - Array of corresponding translations (must be same length)
 * @returns Map from category to array of translations
 *
 * @example
 * ```ts
 * groupTranslationsByTheirCategory(
 *   ['flex', 'p-4', 'bg-blue-500'],
 *   ['flexbox', 'padding 1rem', 'medium blue background']
 * )
 * // Returns: Map {
 * //   'Flexbox & Grid' => ['flexbox'],
 * //   'Spacing' => ['padding 1rem'],
 * //   'Colors' => ['medium blue background']
 * // }
 * ```
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
 *
 * Takes a Map of categorized translations and formats them into an array
 * of strings in display order, with optional emoji prefixes.
 *
 * **Process:**
 * 1. Iterate through categories in display order
 * 2. Skip categories with no translations
 * 3. Format each category with its translations
 * 4. Add emoji prefix if showEmojis is true
 *
 * **Output Format:**
 * - With emojis: "📦 Flexbox & Grid: flexbox, flex-wrap"
 * - Without emojis: "Flexbox & Grid: flexbox, flex-wrap"
 *
 * @param translationsByCategory - Map from category to translations
 * @param showEmojis - Whether to include emoji prefixes
 * @returns Array of formatted category strings in display order
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
 * Creates a formatted string for a category and its translations,
 * with optional emoji prefix.
 *
 * **Format:**
 * - Without emoji: "Category: translation1, translation2"
 * - With emoji: "📦 Category: translation1, translation2"
 *
 * **Translation Joining:**
 * - Multiple translations are joined with ", " (comma + space)
 * - Order is preserved from input array
 *
 * @param category - Category name
 * @param translations - Array of translations in this category
 * @param showEmojis - Whether to include emoji prefix
 * @returns Formatted category string
 *
 * @example
 * ```ts
 * formatSingleCategoryGroup("Colors", ["red text", "blue bg"], false)
 * // "Colors: red text, blue bg"
 *
 * formatSingleCategoryGroup("Colors", ["red text"], true)
 * // "🎨 Colors: red text"
 * ```
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
