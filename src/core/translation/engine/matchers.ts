/**
 * Pattern matching and translation logic
 */

import { tailwindMappings } from '@src/core/translation/rules/mappings';
import {
  matchSpacingPattern,
  matchColorPattern,
  matchArbitraryValue,
  matchGradientPattern,
  matchSizingPattern,
  matchAspectRatioPattern,
  matchColumnsPattern,
  matchObjectPositionPattern,
  matchFlexBasisPattern,
  matchFlexPattern,
  matchFlexGrowPattern,
  matchFlexShrinkPattern,
  matchOrderPattern,
  matchGridColumnsPattern,
  matchGridRowsPattern,
  matchGridColumnPattern,
  matchGridRowPattern,
  matchGridAutoColumnsPattern,
  matchGridAutoRowsPattern,
  matchGapPattern,
  matchWidthPattern,
  matchSizePattern,
  matchMinWidthPattern,
  matchMaxWidthPattern,
  matchHeightPattern,
  matchMinHeightPattern,
  matchMaxHeightPattern,
  matchFontWeightPattern,
  matchFontStretchPattern,
  matchFontFamilyPattern,
  matchBorderWidthPattern,
  matchBorderColorPattern,
  matchBorderRadiusPattern,
  matchBorderSpacingPattern,
  matchOutlineWidthPattern,
  matchOutlineColorPattern,
  matchOutlineOffsetPattern,
  matchTransitionPropertyPattern,
  matchTransitionDurationPattern,
  matchTransitionTimingPattern,
  matchTransitionDelayPattern,
  matchAnimationPattern,
  matchAccentColorPattern,
  matchCaretColorPattern,
  matchScrollMarginPattern,
  matchScrollPaddingPattern,
  matchWillChangePattern,
  matchStrokePattern,
  matchFillPattern,
  matchTranslatePattern,
  matchTransformPattern,
  matchTransformOriginPattern,
  matchSkewPattern,
  matchScalePattern,
  matchRotatePattern,
  matchPerspectivePattern,
  matchPerspectiveOriginPattern,
  matchShadowPattern,
  matchInsetShadowPattern,
  matchRingPattern,
  matchInsetRingPattern,
  matchTextShadowPattern,
  matchOpacityPattern,
  matchMaskImagePattern,
  matchMaskPositionPattern,
  matchMaskSizePattern,
  matchBlurPattern,
  matchBrightnessPattern,
  matchContrastPattern,
  matchDropShadowPattern,
  matchGrayscalePattern,
  matchHueRotatePattern,
  matchInvertPattern,
  matchSaturatePattern,
  matchSepiaPattern,
  matchBackdropBlurPattern,
  matchBackdropBrightnessPattern,
  matchBackdropContrastPattern,
  matchBackdropGrayscalePattern,
  matchBackdropHueRotatePattern,
  matchBackdropInvertPattern,
  matchBackdropOpacityPattern,
  matchBackdropSaturatePattern,
  matchBackdropSepiaPattern,
  matchBackdropFilterPattern,
  matchFilterPattern,
  matchBackgroundSizePattern,
  matchBackgroundPositionPattern,
  matchBackgroundImagePattern,
  matchBackgroundColorPattern,
  matchGradientColorStopPattern,
  matchTextColorPattern,
  matchFontSizePattern,
  matchLetterSpacingPattern,
  matchLineHeightPattern,
  matchContentPattern,
  matchVerticalAlignPattern,
  matchTextIndentPattern,
  matchListImagePattern,
  matchListStyleTypePattern,
  matchDecorationColorPattern,
  matchTypographyPattern,
  matchGridPattern,
  matchPositioningPattern,
} from '@src/core/translation/rules/patterns';
import type { PatternMatcher } from './types';

/**
 * Pattern matchers in priority order
 * 
 * IMPORTANT: Order matters! Matchers are tried sequentially, and the FIRST match wins.
 * More specific patterns should come before more general ones.
 * 
 * Note: Static mappings in tailwindMappings are checked BEFORE these pattern matchers
 * in translateBaseClass(). This array handles dynamic patterns with values.
 * 
 * To extend translation capabilities, add new pattern matchers to this array.
 * Consider where in the order it should go based on specificity.
 */
const TRANSLATION_PATTERN_MATCHERS: PatternMatcher[] = [
  matchSpacingPattern,
  matchSizingPattern,
  matchAspectRatioPattern,
  matchColumnsPattern,
  matchObjectPositionPattern,
  matchFlexBasisPattern,
  matchFlexPattern,
  matchFlexGrowPattern,
  matchFlexShrinkPattern,
  matchOrderPattern,
  matchGridColumnsPattern,
  matchGridRowsPattern,
  matchGridColumnPattern,
  matchGridRowPattern,
  matchGridAutoColumnsPattern,
  matchGridAutoRowsPattern,
  matchGapPattern,
  matchWidthPattern,
  matchSizePattern,
  matchMinWidthPattern,
  matchMaxWidthPattern,
  matchHeightPattern,
  matchMinHeightPattern,
  matchMaxHeightPattern,
  matchFontWeightPattern,
  matchFontStretchPattern,
  matchFontFamilyPattern,
  matchBorderWidthPattern,
  matchBorderColorPattern,
  matchBorderRadiusPattern,
  matchBorderSpacingPattern,
  matchOutlineWidthPattern,
  matchOutlineColorPattern,
  matchOutlineOffsetPattern,
  matchTransitionPropertyPattern,
  matchTransitionDurationPattern,
  matchTransitionTimingPattern,
  matchTransitionDelayPattern,
  matchAnimationPattern,
  matchAccentColorPattern,
  matchCaretColorPattern,
  matchScrollMarginPattern,
  matchScrollPaddingPattern,
  matchWillChangePattern,
  matchStrokePattern,
  matchFillPattern,
  matchTranslatePattern,
  matchTransformPattern,
  matchTransformOriginPattern,
  matchSkewPattern,
  matchScalePattern,
  matchRotatePattern,
  matchPerspectivePattern,
  matchPerspectiveOriginPattern,
  matchShadowPattern,
  matchInsetShadowPattern,
  matchRingPattern,
  matchInsetRingPattern,
  matchTextShadowPattern,
  matchOpacityPattern,
  matchMaskImagePattern,
  matchMaskPositionPattern,
  matchMaskSizePattern,
  matchBlurPattern,
  matchBrightnessPattern,
  matchContrastPattern,
  matchDropShadowPattern,
  matchGrayscalePattern,
  matchHueRotatePattern,
  matchInvertPattern,
  matchSaturatePattern,
  matchSepiaPattern,
  matchBackdropBlurPattern,
  matchBackdropBrightnessPattern,
  matchBackdropContrastPattern,
  matchBackdropGrayscalePattern,
  matchBackdropHueRotatePattern,
  matchBackdropInvertPattern,
  matchBackdropOpacityPattern,
  matchBackdropSaturatePattern,
  matchBackdropSepiaPattern,
  matchBackdropFilterPattern,
  matchFilterPattern,
  matchBackgroundSizePattern,
  matchBackgroundPositionPattern,
  matchBackgroundImagePattern,
  matchBackgroundColorPattern,
  matchTextColorPattern,
  matchFontSizePattern,
  matchLetterSpacingPattern,
  matchLineHeightPattern,
  matchContentPattern,
  matchVerticalAlignPattern,
  matchTextIndentPattern,
  matchListImagePattern,
  matchListStyleTypePattern,
  matchDecorationColorPattern,
  matchTypographyPattern,
  matchGridPattern,
  matchPositioningPattern,
  matchColorPattern,
  matchGradientColorStopPattern,
  matchArbitraryValue,
  matchGradientPattern,
];

/**
 * Check if a class is a custom CSS variable (e.g., "[--my-var:value]")
 * 
 * Custom CSS variables start with "--" inside brackets
 * 
 * @example
 * ```ts
 * isCustomCSSVariable("[--my-color:red]")  // true
 * isCustomCSSVariable("[mask-type:alpha]") // false
 * isCustomCSSVariable("bg-blue-500")       // false
 * ```
 */
export function isCustomCSSVariable(className: string): boolean {
  return /^\[--[\w-]+:/.test(className);
}

/**
 * Check if a class is an arbitrary CSS property (e.g., "[mask-type:luminance]")
 * 
 * Arbitrary properties are [property:value] patterns that are NOT custom variables
 * 
 * @example
 * ```ts
 * isArbitraryProperty("[mask-type:luminance]") // true
 * isArbitraryProperty("[clip-path:circle]")    // true
 * isArbitraryProperty("[--my-var:value]")      // false (custom var, not arbitrary property)
 * isArbitraryProperty("p-4")                   // false
 * ```
 */
export function isArbitraryProperty(className: string): boolean {
  return /^\[[\w-]+:/.test(className) && !isCustomCSSVariable(className);
}

/**
 * Describe an arbitrary CSS property in human-readable form
 * 
 * @example
 * ```ts
 * describeArbitraryProperty("[mask-type:luminance]")
 * // Returns: "mask-type: luminance"
 * 
 * describeArbitraryProperty("[clip-path:circle(50%)]")
 * // Returns: "clip-path: circle(50%)"
 * ```
 */
export function describeArbitraryProperty(className: string): string {
  const match = className.match(/^\[([\w-]+):(.*)\]$/);
  if (match) {
    const property = match[1];
    const value = match[2];
    return `${property}: ${value}`;
  }
  return className;
}

/**
 * Translate the base class (without variants or opacity) to plain English
 * 
 * Translation priority (in order):
 * 1. Arbitrary CSS variables: [--var:value]
 * 2. Arbitrary CSS properties: [property:value]
 * 3. Static mappings: exact matches from tailwindMappings
 * 4. Pattern matchers: dynamic patterns with values
 * 5. Fallback: return original class name
 * 
 * @param className - Base Tailwind class (no variants, no opacity)
 * @returns Plain English translation or original class name
 * 
 * @example
 * ```ts
 * translateBaseClass("flex")              // "flexbox"
 * translateBaseClass("p-4")               // "padding 1rem"
 * translateBaseClass("bg-blue-500")       // "medium blue background"
 * translateBaseClass("[--my-var:10px]")   // "CSS variable --my-var: 10px"
 * translateBaseClass("unknown-class")     // "unknown-class" (fallback)
 * ```
 */
export function translateBaseClass(className: string): string {
  // Check for arbitrary CSS custom properties (e.g., [--scroll-offset:56px])
  if (isCustomCSSVariable(className)) {
    return `CSS variable ${describeArbitraryProperty(className)}`;
  }

  // Check for arbitrary CSS properties (e.g., [mask-type:luminance])
  if (isArbitraryProperty(className)) {
    return `CSS property ${describeArbitraryProperty(className)}`;
  }

  // Look up in static mappings first
  if (tailwindMappings[className]) {
    return tailwindMappings[className];
  }

  // Try pattern matchers in order (first match wins)
  for (const matcher of TRANSLATION_PATTERN_MATCHERS) {
    const result = matcher(className);
    if (result) {
      return result;
    }
  }

  // If nothing matched, return the original class name
  return className;
}

/**
 * Apply opacity modifier to translation
 * 
 * @example
 * ```ts
 * applyOpacity("blue background", "50")
 * // Returns: "blue background with 50% opacity"
 * 
 * applyOpacity("red text", null)
 * // Returns: "red text"
 * ```
 */
export function applyOpacity(
  translation: string,
  opacity: string | null
): string {
  return opacity ? `${translation} with ${opacity}% opacity` : translation;
}
