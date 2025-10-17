/**
 * Main translator module - converts Tailwind classes to plain English
 */

import * as vscode from 'vscode';
import { groupTranslationsByCategory } from '@src/core/translation/categorizer';
import {
  parseNonEmptyClasses,
  extractImportant,
  extractPrefix,
  extractVariants,
  extractOpacity,
} from './parser';
import { translateBaseClass, applyOpacity } from './matchers';
import { applyVariants } from './variants';

/**
 * Translate a single Tailwind class to plain English
 *
 * Processing pipeline (order matters!):
 * 1. Extract prefix (tw\:) - must come first as it uses escaped colon
 * 2. Extract variants (hover:, md:) - uses regular colons
 * 3. Extract important (!) - comes at the end of class
 * 4. Extract opacity (/50) - comes before base class
 * 5. Translate base class - the core utility
 * 6. Apply opacity modifier to translation
 * 7. Apply variants to translation
 * 8. Add important flag if present
 * 9. Add prefix note if present
 *
 * @param cls - Single Tailwind class to translate
 * @returns Plain English translation
 *
 * @example
 * ```ts
 * translateSingleClass("hover:bg-blue-500/50!")
 * // Process: hover: (variant) + bg-blue-500 (base) + /50 (opacity) + ! (important)
 * // Returns: "medium blue background with 50% opacity on hover !important"
 *
 * translateSingleClass("tw\\:md:flex")
 * // Process: tw\ (prefix) + md: (variant) + flex (base)
 * // Returns: "[tw] flexbox on medium screens (≥768px)"
 * ```
 */
function translateSingleClass(cls: string): string {
  // Extract prefix first (e.g., tw\:bg-white)
  // Must be first because it uses escaped colon (\:) to distinguish from variant colon (:)
  const { className: withoutPrefix, prefix } = extractPrefix(cls);

  // Extract variants (e.g., hover:, md:)
  const { variants, baseClass } = extractVariants(withoutPrefix);

  // Extract important modifier (e.g., bg-white!)
  // Comes at the end of the class name
  const { className: withoutImportant, isImportant } =
    extractImportant(baseClass);

  // Extract opacity (e.g., bg-white/50)
  const { className, opacity } = extractOpacity(withoutImportant);

  // Translate the base class (the core utility like "bg-white", "flex", "p-4")
  let translation = translateBaseClass(className);

  // Apply modifiers in order
  translation = applyOpacity(translation, opacity);
  translation = applyVariants(translation, variants);

  // Add important modifier if present
  if (isImportant) {
    translation = `${translation} !important`;
  }

  // Add prefix note if present
  if (prefix) {
    translation = `[${prefix}] ${translation}`;
  }

  return translation;
}

/**
 * Translates a string of Tailwind classes to plain English
 * @param classString - Space-separated Tailwind class names (e.g., "flex items-center gap-4")
 * @returns Plain English description, optionally grouped by category based on user settings
 */
export function translateClasses(classString: string): string {
  const classes = parseNonEmptyClasses(classString);
  const translations = classes.map((cls) => translateSingleClass(cls));

  const config = vscode.workspace.getConfiguration('plainwind');
  const groupByCategory = config.get<boolean>('groupByCategory', true);
  const showEmojis = config.get<boolean>('showCategoryEmojis', false);

  if (groupByCategory) {
    return groupTranslationsByCategory(classes, translations, showEmojis);
  }

  return translations.join(', ');
}

/**
 * Translate classes with conditional information
 *
 * Handles conditional classes from template literals, helper functions,
 * and framework directives (clsx, Vue :class, etc.)
 *
 * Grouping algorithm:
 * 1. Group classes by their condition (undefined = always applied)
 * 2. Translate each class individually
 * 3. Apply category grouping if enabled
 * 4. Annotate with conditions
 * 5. Join groups with pipes
 *
 * @param conditionalClasses - Array of classes with optional conditions
 * @returns Plain English with conditions annotated
 *
 * @example
 * ```ts
 * translateConditionalClasses([
 *   { classes: 'flex gap-4' },                    // Always applied
 *   { classes: 'bg-blue-500', condition: 'isActive' },
 *   { classes: 'bg-gray-200', condition: '!isActive' }
 * ])
 * // Returns: "Layout: flexbox | Spacing: gap 1rem |
 * //           Colors: medium blue background (if isActive) |
 * //           Colors: light gray background (if !isActive)"
 * ```
 */
export function translateConditionalClasses(
  conditionalClasses: Array<{ classes: string; condition?: string }>
): string {
  const config = vscode.workspace.getConfiguration('plainwind');
  const groupByCategory = config.get<boolean>('groupByCategory', true);
  const showEmojis = config.get<boolean>('showCategoryEmojis', false);

  /**
   * Group by condition, keeping track of classes and translations
   *
   * This allows us to show all unconditional classes together,
   * followed by conditional groups.
   *
   * Map key: condition string (or undefined for unconditional)
   * Map value: { classNames[], translations[] }
   */
  const groups = new Map<
    string | undefined,
    { classNames: string[]; translations: string[] }
  >();

  for (const { classes, condition } of conditionalClasses) {
    const classList = parseNonEmptyClasses(classes);
    const translations = classList.map((cls) => translateSingleClass(cls));

    if (!groups.has(condition)) {
      groups.set(condition, { classNames: [], translations: [] });
    }
    const group = groups.get(condition)!;
    group.classNames.push(...classList);
    group.translations.push(...translations);
  }

  // Build output, applying category grouping if enabled
  const parts: string[] = [];

  for (const [condition, { classNames, translations }] of groups) {
    if (translations.length === 0) continue;

    // Apply category grouping if enabled
    const formatted = groupByCategory
      ? groupTranslationsByCategory(classNames, translations, showEmojis)
      : translations.join(', ');

    // Append condition annotation if present
    if (condition) {
      parts.push(`${formatted} (if ${condition})`);
    } else {
      parts.push(formatted);
    }
  }

  return parts.join(' | ');
}
