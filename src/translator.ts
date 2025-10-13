import * as vscode from "vscode";
import { tailwindMappings } from "./mappings";
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
  matchOutlineWidthPattern,
  matchOutlineColorPattern,
  matchOutlineOffsetPattern,
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
} from "./patterns";
import { groupTranslationsByCategory } from "./categorizer";

/**
 * Type definition for pattern matcher functions
 */
type PatternMatcher = (className: string) => string | null;

/**
 * Parse a class string into individual non-empty class names
 */
function parseNonEmptyClasses(classString: string): string[] {
  return classString.split(" ").filter((c) => c.trim());
}

/**
 * Variant prefixes and their plain English descriptions
 */
const VARIANT_DESCRIPTIONS: Record<string, string> = {
  // Interaction
  hover: "on hover",
  focus: "on focus",
  active: "when active",
  disabled: "when disabled",
  enabled: "when enabled",
  visited: "when visited",
  "focus-within": "when focused within",
  "focus-visible": "when focus visible",
  // Structure/pseudo
  before: "before pseudo-element",
  after: "after pseudo-element",
  first: "on first child",
  last: "on last child",
  only: "on only child",
  odd: "on odd items",
  even: "on even items",
  empty: "when empty",
  // Forms/state
  checked: "when checked",
  indeterminate: "when indeterminate",
  required: "when required",
  optional: "when optional",
  'read-only': "when read-only",
  'read-write': "when read-write",
  valid: "when valid",
  invalid: "when invalid",
  open: "when open",
  target: "when target",
  // Color scheme / dark
  dark: "in dark mode",
  'not-dark': "in light mode",
  // Responsive
  sm: "on small screens",
  md: "on medium screens",
  lg: "on large screens",
  xl: "on extra large screens",
  '2xl': "on 2xl screens",
  // Motion/media
  'motion-safe': "when motion is allowed",
  'motion-reduce': "when motion reduced",
  portrait: "in portrait",
  landscape: "in landscape",
  print: "when printing",
  'forced-colors': "when forced colors",
  // Direction
  ltr: "in LTR",
  rtl: "in RTL",
  // Group/peer
  'group-hover': "when group hovered",
  'group-focus': "when group focused",
  'peer-hover': "when peer hovered",
  'peer-focus': "when peer focused",
  'peer-checked': "when peer checked",
  'peer-disabled': "when peer disabled",
  // Misc element variants
  placeholder: "placeholder",
  file: "file input button",
  marker: "list marker",
  selection: "selection",
};

/**
 * Extract variants and base class from a Tailwind class
 * e.g., "md:hover:bg-blue-500" -> { variants: ["md", "hover"], baseClass: "bg-blue-500" }
 * Handles arbitrary values with brackets: "dark:[--var:value]" -> { variants: ["dark"], baseClass: "[--var:value]" }
 */
function extractVariants(className: string): {
  variants: string[];
  baseClass: string;
} {
  // If no colons, no variants
  if (!className.includes(":")) {
    return { variants: [], baseClass: className };
  }

  // Split carefully, respecting brackets
  const variants: string[] = [];
  let currentVariant = "";
  let bracketDepth = 0;

  for (let i = 0; i < className.length; i++) {
    const char = className[i];

    if (char === "[") {
      bracketDepth++;
      currentVariant += char;
    } else if (char === "]") {
      bracketDepth--;
      currentVariant += char;
    } else if (char === ":" && bracketDepth === 0) {
      // This is a variant separator, not part of arbitrary value
      if (currentVariant) {
        variants.push(currentVariant);
        currentVariant = "";
      }
    } else {
      currentVariant += char;
    }
  }

  // Whatever is left is the base class
  const baseClass = currentVariant;
  return { variants, baseClass };
}

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
  matchOutlineWidthPattern,
  matchOutlineColorPattern,
  matchOutlineOffsetPattern,
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
 * Opacity extraction result
 */
interface OpacityExtraction {
  className: string;
  opacity: string;
}

/**
 * Extract opacity modifier from a class (e.g., "bg-white/10" -> { className: "bg-white", opacity: "10" })
 */
function extractOpacity(classNameWithOpacity: string): OpacityExtraction {
  const opacityMatch = classNameWithOpacity.match(/^(.+)\/(\d+)$/);
  if (opacityMatch) {
    return {
      className: opacityMatch[1],
      opacity: opacityMatch[2],
    };
  }
  return { className: classNameWithOpacity, opacity: "" };
}

/**
 * Check if a class is a custom CSS variable (e.g., "[--my-var:value]")
 */
function isCustomCSSVariable(className: string): boolean {
  return /^\[--[\w-]+:/.test(className);
}

/**
 * Translate the base class (without variants or opacity) to plain English
 * Returns the original className if no translation is found
 */
function translateBaseClass(className: string): string {
  // Check for arbitrary CSS custom properties
  if (isCustomCSSVariable(className)) {
    return "custom CSS variable";
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
function applyOpacity(translation: string, opacity: string): string {
  return opacity ? `${translation} with ${opacity}% opacity` : translation;
}

/**
 * Apply variant descriptions to translation (e.g., "hover:", "md:", "dark:")
 */
function applyVariants(translation: string, variants: string[]): string {
  if (variants.length === 0) {
    return translation;
  }

  const variantParts = variants
    .map((v) => VARIANT_DESCRIPTIONS[v] || v)
    .join(", ");
  return `${translation} ${variantParts}`;
}

/**
 * Translate a single Tailwind class to plain English
 * Handles variants (e.g., "hover:", "md:"), opacity modifiers (e.g., "/50"), and base classes
 */
function translateSingleClass(cls: string): string {
  const { variants, baseClass } = extractVariants(cls);
  const { className, opacity } = extractOpacity(baseClass);

  let translation = translateBaseClass(className);
  translation = applyOpacity(translation, opacity);
  translation = applyVariants(translation, variants);

  return translation;
}

/**
 * Translates a string of Tailwind classes to plain English
 * @param classString - Space-separated Tailwind class names (e.g., "flex items-center gap-4")
 * @returns Plain English description, optionally grouped by category based on user settings
 */
export function translateClasses(classString: string): string {
  const classes = parseNonEmptyClasses(classString);
  const translations = classes.map((cls) => translateSingleClass(cls));

  const config = vscode.workspace.getConfiguration("plainwind");
  const groupByCategory = config.get<boolean>("groupByCategory", true);
  const showEmojis = config.get<boolean>("showCategoryEmojis", false);

  if (groupByCategory) {
    return groupTranslationsByCategory(classes, translations, showEmojis);
  }

  return translations.join(", ");
}
