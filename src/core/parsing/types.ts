/**
 * Type definitions for className parsing
 */

export interface ConditionalClass {
  classes: string;
  condition?: string; // e.g., "isActive", "size === 'lg'"
}

export interface ClassExtraction {
  classStrings: string[];
  conditionalClasses: ConditionalClass[];
  range: { start: number; end: number };
  type: 'simple' | 'template' | 'helper' | 'mixed';
}
