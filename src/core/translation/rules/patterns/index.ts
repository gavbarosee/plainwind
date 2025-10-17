/**
 * Pattern matchers for Tailwind CSS classes
 * 
 * This module provides dynamic pattern matching for Tailwind classes with
 * variable values. Unlike static mappings, these matchers handle classes
 * with numeric scales, arbitrary values, and custom properties.
 * 
 * **Pattern Matching vs Static Mapping:**
 * - Patterns: Handle dynamic values (e.g., `p-4`, `p-[20px]`, `w-(--custom)`)
 * - Mappings: Handle fixed classes (e.g., `flex`, `hidden`, `block`)
 * 
 * **Translation Priority:**
 * Pattern matchers are tried BEFORE static mappings in the translation engine.
 * This allows patterns to catch `w-full` before the static mapping does, but
 * static mappings serve as the fallback.
 * 
 * **Supported Value Types:**
 * 1. Scale values: `p-4`, `w-64` (mapped to rem/pixels)
 * 2. Arbitrary values: `w-[50vw]`, `p-[calc(100%-2rem)]`
 * 3. Custom properties: `w-(--container)`, `p-(--spacing)`
 * 4. Negative values: `-m-4`, `-translate-x-1/2`
 * 5. Fractions: `w-1/2`, `translate-x-1/3`
 * 
 * **Organization:**
 * Functions are exported by category (spacing, sizing, colors, etc.) matching
 * the Tailwind utility categories. Each category module contains related
 * pattern matchers.
 */

// Shared utilities
export * from './helpers';

// Spacing patterns
export {
  matchSpacingPattern,
  matchScrollMarginPattern,
  matchScrollPaddingPattern,
  matchGapPattern,
} from './spacing';

// Sizing patterns
export {
  matchSizingPattern,
  matchWidthPattern,
  matchHeightPattern,
  matchMinWidthPattern,
  matchMaxWidthPattern,
  matchMinHeightPattern,
  matchMaxHeightPattern,
  matchSizePattern,
} from './sizing';

// Layout patterns
export {
  matchAspectRatioPattern,
  matchColumnsPattern,
  matchObjectPositionPattern,
} from './layout';

// Flexbox patterns
export {
  matchFlexPattern,
  matchFlexBasisPattern,
  matchFlexGrowPattern,
  matchFlexShrinkPattern,
  matchOrderPattern,
} from './flexbox';

// Grid patterns
export {
  matchGridPattern,
  matchGridColumnsPattern,
  matchGridRowsPattern,
  matchGridColumnPattern,
  matchGridRowPattern,
  matchGridAutoColumnsPattern,
  matchGridAutoRowsPattern,
} from './grid';

// Typography patterns
export {
  matchFontFamilyPattern,
  matchFontWeightPattern,
  matchFontStretchPattern,
  matchFontSizePattern,
  matchLetterSpacingPattern,
  matchLineHeightPattern,
  matchTextIndentPattern,
  matchVerticalAlignPattern,
  matchListImagePattern,
  matchListStyleTypePattern,
  matchContentPattern,
  matchTypographyPattern,
} from './typography';

// Borders patterns
export {
  matchBorderWidthPattern,
  matchBorderColorPattern,
  matchBorderRadiusPattern,
  matchBorderSpacingPattern,
  matchOutlineWidthPattern,
  matchOutlineOffsetPattern,
  matchOutlineColorPattern,
} from './borders';

// Backgrounds patterns
export {
  matchBackgroundImagePattern,
  matchBackgroundPositionPattern,
  matchBackgroundSizePattern,
  matchBackgroundColorPattern,
} from './backgrounds';

// Colors patterns
export {
  matchColorPattern,
  matchTextColorPattern,
  matchDecorationColorPattern,
  matchCaretColorPattern,
  matchAccentColorPattern,
  matchFillPattern,
  matchStrokePattern,
  matchGradientColorStopPattern,
  matchGradientPattern,
} from './colors';

// Effects patterns
export {
  matchShadowPattern,
  matchInsetShadowPattern,
  matchTextShadowPattern,
  matchOpacityPattern,
  matchRingPattern,
  matchInsetRingPattern,
} from './effects';

// Filters patterns
export {
  matchFilterPattern,
  matchBlurPattern,
  matchBrightnessPattern,
  matchContrastPattern,
  matchDropShadowPattern,
  matchGrayscalePattern,
  matchHueRotatePattern,
  matchInvertPattern,
  matchSaturatePattern,
  matchSepiaPattern,
  matchBackdropFilterPattern,
  matchBackdropBlurPattern,
  matchBackdropBrightnessPattern,
  matchBackdropContrastPattern,
  matchBackdropGrayscalePattern,
  matchBackdropHueRotatePattern,
  matchBackdropInvertPattern,
  matchBackdropOpacityPattern,
  matchBackdropSaturatePattern,
  matchBackdropSepiaPattern,
} from './filters';

// Transforms patterns
export {
  matchTransformPattern,
  matchRotatePattern,
  matchScalePattern,
  matchSkewPattern,
  matchTranslatePattern,
  matchTransformOriginPattern,
  matchPerspectivePattern,
  matchPerspectiveOriginPattern,
} from './transforms';

// Transitions patterns
export {
  matchTransitionPropertyPattern,
  matchTransitionDurationPattern,
  matchTransitionDelayPattern,
  matchTransitionTimingPattern,
  matchAnimationPattern,
  matchWillChangePattern,
} from './transitions';

// Positioning patterns
export { matchPositioningPattern } from './positioning';

// Masks patterns
export {
  matchMaskImagePattern,
  matchMaskPositionPattern,
  matchMaskSizePattern,
} from './masks';

// Arbitrary patterns
export { matchArbitraryValue } from './arbitrary';
