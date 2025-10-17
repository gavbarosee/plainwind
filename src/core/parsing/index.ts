/**
 * Parse className attributes from JSX/TSX and extract Tailwind classes
 *
 * This module provides the core parsing engine for extracting Tailwind classes
 * from various framework syntaxes. It's framework-agnostic and can handle:
 *
 * **Supported Frameworks:**
 * - React/JSX: className with strings, templates, and helpers
 * - Vue: :class and v-bind:class with strings, objects, and arrays
 * - Svelte: class: directives
 * - Angular: [ngClass] and [class.x] bindings
 * - Solid.js: classList prop
 * - HTML: standard class attribute
 *
 * **Supported Patterns:**
 * - Simple strings: `className="flex gap-4"`
 * - Template literals: `className={\`flex ${active ? 'bg-blue' : 'bg-gray'}\`}`
 * - Helper functions: `className={clsx('flex', isActive && 'bg-blue')}`
 * - Framework directives: Vue's `:class`, Svelte's `class:`, etc.
 *
 * **Key Features:**
 * - Conditional class extraction with original conditions preserved
 * - Duplicate removal and position-based lookup
 * - Deep parsing of nested expressions (ternaries, logical operators, etc.)
 */

import {
  extractSimpleStrings,
  extractTemplateLiterals,
  extractHelperFunctions,
  extractVueClassBindings,
  extractSvelteClassDirectives,
  extractAngularNgClass,
  extractAngularClassBindings,
  extractSolidClassList,
  removeDuplicateExtractions,
} from './patterns';
import { ClassExtraction } from './types';

// ============================================================================
// Types
// ============================================================================

export type { ConditionalClass, ClassExtraction } from './types';

// ============================================================================
// Main API
// ============================================================================

/**
 * Find all className occurrences in text and extract their class strings
 *
 * This is the primary entry point for class extraction. It runs multiple
 * specialized extractors in sequence to handle different syntax patterns.
 *
 * **Extraction Strategy:**
 * 1. Simple strings - fastest, catches most basic cases
 * 2. Template literals - handles dynamic string interpolation
 * 3. Helper functions - parses clsx/classnames/cn/etc arguments
 * 4. Framework-specific - Vue, Svelte, Angular, Solid.js
 * 5. Deduplication - removes overlapping/duplicate extractions
 *
 * **Performance:**
 * - Each extractor is optimized for its pattern type
 * - Extractors run independently and results are merged
 * - Deduplication is O(n log n) where n = number of extractions
 *
 * **Conditional Classes:**
 * - Preserves original JavaScript conditions (e.g., "isActive")
 * - Tracks ternary expressions, logical operators, object syntax
 * - Enables "if X then Y" translations in the UI
 *
 * @param text - Full document text to search
 * @returns Array of extractions, sorted by position with duplicates removed
 *
 * @example
 * ```ts
 * const code = `<div className="flex gap-4" />`;
 * const extractions = extractAllClassNames(code);
 * // Returns: [{
 * //   type: 'simple',
 * //   classString: 'flex gap-4',
 * //   range: { start: 16, end: 27 },
 * //   conditionalClasses: [{ classes: 'flex gap-4' }]
 * // }]
 * ```
 */
export function extractAllClassNames(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];

  // Pattern 1: Simple string literals - class="..." or className="..."
  extractions.push(...extractSimpleStrings(text));

  // Pattern 2: Template literals - className={`...`}
  extractions.push(...extractTemplateLiterals(text));

  // Pattern 3: Helper functions - className={clsx(...)}
  extractions.push(...extractHelperFunctions(text));

  // Pattern 4: Vue :class bindings - :class="..." or v-bind:class="..."
  extractions.push(...extractVueClassBindings(text));

  // Pattern 5: Svelte class: directives - class:name={condition}
  extractions.push(...extractSvelteClassDirectives(text));

  // Pattern 6: Angular [ngClass] - [ngClass]="{'class': condition}"
  extractions.push(...extractAngularNgClass(text));

  // Pattern 7: Angular [class.x] - [class.active]="isActive"
  extractions.push(...extractAngularClassBindings(text));

  // Pattern 8: Solid.js classList - classList={{ active: isActive }}
  extractions.push(...extractSolidClassList(text));

  // Sort by position and remove duplicates
  // This ensures consistent ordering and removes overlapping extractions
  return removeDuplicateExtractions(extractions);
}

/**
 * Find extraction at a specific position in the text
 *
 * Used by hover and CodeLens providers to determine which className
 * attribute the user is interacting with.
 *
 * **Position Matching:**
 * - Checks if position is within extraction's range (inclusive)
 * - Returns first match (extractions are sorted, so no conflicts)
 * - Returns undefined if position is not in any extraction
 *
 * **Use Cases:**
 * - Hover provider: Show translation when hovering over className
 * - CodeLens provider: Position CodeLens above className
 * - Command handler: Toggle panel for className at cursor
 *
 * @param extractions - Sorted array of extractions from extractAllClassNames
 * @param position - Character offset in document (0-based)
 * @returns Matching extraction or undefined
 *
 * @example
 * ```ts
 * const extractions = extractAllClassNames(text);
 * const cursorPos = 25;
 * const extraction = findExtractionAtPosition(extractions, cursorPos);
 *
 * if (extraction) {
 *   // User is hovering over a className attribute
 *   showTranslation(extraction.classString);
 * }
 * ```
 */
export function findExtractionAtPosition(
  extractions: ClassExtraction[],
  position: number
): ClassExtraction | undefined {
  return extractions.find(
    (ext) => position >= ext.range.start && position <= ext.range.end
  );
}

/**
 * Combine multiple class strings into one, removing duplicates
 *
 * Useful when you have multiple className extractions and want to get
 * all unique classes across them (e.g., for document-wide translation).
 *
 * **Algorithm:**
 * 1. Split each string by whitespace
 * 2. Filter out empty strings
 * 3. Add to Set (automatic deduplication)
 * 4. Join back with spaces
 *
 * **Whitespace Handling:**
 * - Splits on any whitespace (spaces, tabs, newlines)
 * - Normalizes output to single spaces
 * - Trims empty entries
 *
 * @param classStrings - Array of class strings (may contain duplicates)
 * @returns Single space-separated string with unique classes
 *
 * @example
 * ```ts
 * combineClassStrings(['flex gap-4', 'flex p-2', 'gap-4'])
 * // Returns: "flex gap-4 p-2"
 * ```
 */
export function combineClassStrings(classStrings: string[]): string {
  const allClasses = new Set<string>();

  for (const str of classStrings) {
    const classes = str.split(/\s+/).filter((c) => c.trim());
    classes.forEach((c) => allClasses.add(c));
  }

  return Array.from(allClasses).join(' ');
}
