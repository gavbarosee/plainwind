/**
 * Type definitions for the categorizer module
 */

/**
 * All possible Tailwind class categories
 */
export type ClassCategory =
  | 'Layout'
  | 'Flexbox & Grid'
  | 'Spacing'
  | 'Sizing'
  | 'Colors'
  | 'Backgrounds'
  | 'Borders'
  | 'Typography'
  | 'Tables'
  | 'Transitions & Animation'
  | 'Transforms'
  | 'Interactivity'
  | 'Effects'
  | 'Filters'
  | 'SVG'
  | 'Accessibility'
  | 'Other';

/**
 * Internal definition of a category with its matching patterns
 */
export interface Category {
  name: ClassCategory;
  emoji: string;
  patterns: RegExp[];
  description?: string;
}
