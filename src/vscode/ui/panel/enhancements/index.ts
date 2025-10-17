/**
 * Visual enhancements for panel translations
 *
 * Central module that orchestrates all visual enhancement functions
 * for the detail panel, including colors, typography, spacing, and effects.
 */

export { highlightColors } from './colors';
export { enhanceFontWeights, enhanceFontSizes } from './typography';
export { enhanceSpacingValues } from './spacing';
export { enhanceOpacity, enhanceBorderRadius, enhanceShadows } from './effects';

import { highlightColors } from './colors';
import { enhanceFontWeights, enhanceFontSizes } from './typography';
import { enhanceSpacingValues } from './spacing';
import { enhanceOpacity, enhanceBorderRadius, enhanceShadows } from './effects';

/**
 * Apply all enhancements to translation text
 *
 * Orchestrates all enhancement functions in the correct order to avoid conflicts.
 * Applies:
 * 1. Colors - Color names with actual colors
 * 2. Font weights - Visual weight styling
 * 3. Font sizes - Relative sizing
 * 4. Spacing values - Pixel equivalents
 * 5. Opacity - Visual transparency
 * 6. Border radius - Preview boxes
 * 7. Shadows - Shadow preview boxes
 *
 * @param text - Raw translation text
 * @returns Enhanced HTML with all visual improvements
 *
 * @example
 * ```ts
 * enhanceTranslation("bold text, padding 1rem, 50% opacity, large shadow")
 * // Returns: fully enhanced HTML with all visual effects applied
 * ```
 */
export function enhanceTranslation(text: string): string {
  let result = text;

  // Apply enhancements in order
  result = highlightColors(result);
  result = enhanceFontWeights(result);
  result = enhanceFontSizes(result);
  result = enhanceSpacingValues(result);
  result = enhanceOpacity(result);
  result = enhanceBorderRadius(result);
  result = enhanceShadows(result);

  return result;
}
