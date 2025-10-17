/**
 * Type definitions for className parsing
 */

/**
 * Represents a class string with optional condition
 * 
 * @example
 * ```ts
 * { classes: 'active' } 
 * // Unconditional class - always applied
 * 
 * { classes: 'bg-blue-500', condition: 'isActive' } 
 * // Conditional class - applied when isActive is true
 * 
 * { classes: 'error', condition: 'hasError || isInvalid' } 
 * // Complex condition - applied when hasError OR isInvalid is true
 * ```
 */
export interface ConditionalClass {
  /** The class string(s) to apply */
  classes: string;
  /** Optional JavaScript condition expression (e.g., "isActive", "size === 'lg'") */
  condition?: string;
}

/**
 * Result of extracting classes from source code
 * 
 * @example
 * ```ts
 * {
 *   classStrings: ['flex', 'items-center', 'active'],
 *   conditionalClasses: [
 *     { classes: 'flex items-center' },
 *     { classes: 'active', condition: 'isActive' }
 *   ],
 *   range: { start: 10, end: 45 },
 *   type: 'helper'
 * }
 * ```
 */
export interface ClassExtraction {
  /** All class strings found (flattened, may contain duplicates) */
  classStrings: string[];
  /** Classes with their conditions (structured data for conditional rendering) */
  conditionalClasses: ConditionalClass[];
  /** Character position range in source text (inclusive) */
  range: { start: number; end: number };
  /** 
   * Detection method used:
   * - 'simple': String literal (className="...")
   * - 'template': Template literal (className={`...`})
   * - 'helper': Helper function (clsx, cn, etc.) or framework directive
   * - 'mixed': Combination of multiple patterns
   */
  type: 'simple' | 'template' | 'helper' | 'mixed';
}
