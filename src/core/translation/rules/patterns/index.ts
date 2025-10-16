/**
 * Pattern matchers for Tailwind CSS classes
 *
 * This module exports all pattern matching functions organized by category.
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
