/**
 * Parse className attributes from JSX/TSX and extract Tailwind classes
 * Supports:
 * - React/JSX: className with string literals, template literals, helper functions
 * - Vue: :class and v-bind:class with strings, objects, and arrays
 * - Svelte: class: directives
 * - HTML: standard class attribute
 * - Helper functions: clsx, classnames, cn, twMerge, cva, tw
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

  // Sort and remove duplicates
  return removeDuplicateExtractions(extractions);
}

/**
 * Find extraction at a specific position in the text
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
 */
export function combineClassStrings(classStrings: string[]): string {
  const allClasses = new Set<string>();

  for (const str of classStrings) {
    const classes = str.split(/\s+/).filter((c) => c.trim());
    classes.forEach((c) => allClasses.add(c));
  }

  return Array.from(allClasses).join(' ');
}
