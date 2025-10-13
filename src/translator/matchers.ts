/**
 * Pattern matching and translation logic
 */

import { tailwindMappings } from "../mappings";
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
} from "../patterns";
import type { PatternMatcher } from "./types";

/**
 * Pattern matchers in priority order (static mappings are checked first in translateBaseClass)
 * Add new pattern matchers to this array to extend translation capabilities
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
 */
export function isCustomCSSVariable(className: string): boolean {
  return /^\[--[\w-]+:/.test(className);
}

/**
 * Check if a class is an arbitrary CSS property (e.g., "[mask-type:luminance]")
 */
export function isArbitraryProperty(className: string): boolean {
  return /^\[[\w-]+:/.test(className) && !isCustomCSSVariable(className);
}

/**
 * Describe an arbitrary CSS property
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
 * Returns the original className if no translation is found
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

  // Try pattern matchers in order
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
 */
export function applyOpacity(translation: string, opacity: string | null): string {
  return opacity ? `${translation} with ${opacity}% opacity` : translation;
}

