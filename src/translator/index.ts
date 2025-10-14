/**
 * Main translator module - converts Tailwind classes to plain English
 */

import * as vscode from 'vscode';
import { groupTranslationsByCategory } from '../categorizer';
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
 * Handles:
 * - Variants (e.g., "hover:", "md:")
 * - Opacity modifiers (e.g., "/50")
 * - Important modifier (e.g., "!")
 * - Prefixes (e.g., "tw:")
 * - Base classes
 */
function translateSingleClass(cls: string): string {
  // Extract prefix first (e.g., tw\:bg-white)
  const { className: withoutPrefix, prefix } = extractPrefix(cls);

  // Extract variants (e.g., hover:, md:)
  const { variants, baseClass } = extractVariants(withoutPrefix);

  // Extract important modifier (e.g., bg-white!)
  const { className: withoutImportant, isImportant } =
    extractImportant(baseClass);

  // Extract opacity (e.g., bg-white/50)
  const { className, opacity } = extractOpacity(withoutImportant);

  // Translate the base class
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
