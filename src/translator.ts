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
  // Interaction pseudo-classes
  hover: "on hover",
  focus: "on focus",
  active: "when active",
  disabled: "when disabled",
  enabled: "when enabled",
  visited: "when visited",
  "focus-within": "when focused within",
  "focus-visible": "when focus visible",
  target: "when target",
  
  // Structural pseudo-classes
  first: "on first child",
  last: "on last child",
  only: "on only child",
  odd: "on odd items",
  even: "on even items",
  "first-of-type": "on first of type",
  "last-of-type": "on last of type",
  "only-of-type": "on only of type",
  empty: "when empty",
  
  // Form state pseudo-classes
  checked: "when checked",
  indeterminate: "when indeterminate",
  default: "when default",
  required: "when required",
  optional: "when optional",
  valid: "when valid",
  invalid: "when invalid",
  "user-valid": "when user valid",
  "user-invalid": "when user invalid",
  "in-range": "when in range",
  "out-of-range": "when out of range",
  "placeholder-shown": "when placeholder shown",
  autofill: "when autofilled",
  "read-only": "when read-only",
  "read-write": "when read-write",
  
  // Special pseudo-classes
  "details-content": "details content",
  open: "when open",
  inert: "when inert",
  starting: "when starting",
  
  // Pseudo-elements
  before: "before pseudo-element",
  after: "after pseudo-element",
  placeholder: "placeholder",
  file: "file input button",
  marker: "list marker",
  selection: "selection",
  "first-letter": "first letter",
  "first-line": "first line",
  backdrop: "backdrop",
  
  // Child selectors
  "*": "direct children",
  "**": "all descendants",
  
  // Dark mode
  dark: "in dark mode",
  "not-dark": "in light mode",
  
  // Responsive breakpoints (min-width)
  sm: "on small screens (≥640px)",
  md: "on medium screens (≥768px)",
  lg: "on large screens (≥1024px)",
  xl: "on extra large screens (≥1280px)",
  "2xl": "on 2xl screens (≥1536px)",
  
  // Responsive breakpoints (max-width)
  "max-sm": "below small screens (<640px)",
  "max-md": "below medium screens (<768px)",
  "max-lg": "below large screens (<1024px)",
  "max-xl": "below extra large screens (<1280px)",
  "max-2xl": "below 2xl screens (<1536px)",
  
  // Container queries (min-width)
  "@3xs": "in 3xs container (≥256px)",
  "@2xs": "in 2xs container (≥288px)",
  "@xs": "in xs container (≥320px)",
  "@sm": "in small container (≥384px)",
  "@md": "in medium container (≥448px)",
  "@lg": "in large container (≥512px)",
  "@xl": "in xl container (≥576px)",
  "@2xl": "in 2xl container (≥672px)",
  "@3xl": "in 3xl container (≥768px)",
  "@4xl": "in 4xl container (≥896px)",
  "@5xl": "in 5xl container (≥1024px)",
  "@6xl": "in 6xl container (≥1152px)",
  "@7xl": "in 7xl container (≥1280px)",
  
  // Container queries (max-width)
  "@max-3xs": "in container <256px",
  "@max-2xs": "in container <288px",
  "@max-xs": "in container <320px",
  "@max-sm": "in container <384px",
  "@max-md": "in container <448px",
  "@max-lg": "in container <512px",
  "@max-xl": "in container <576px",
  "@max-2xl": "in container <672px",
  "@max-3xl": "in container <768px",
  "@max-4xl": "in container <896px",
  "@max-5xl": "in container <1024px",
  "@max-6xl": "in container <1152px",
  "@max-7xl": "in container <1280px",
  
  // Motion preferences
  "motion-safe": "when motion is allowed",
  "motion-reduce": "when motion reduced",
  
  // Orientation
  portrait: "in portrait",
  landscape: "in landscape",
  
  // Contrast preferences
  "contrast-more": "when high contrast",
  "contrast-less": "when low contrast",
  
  // Forced colors
  "forced-colors": "when forced colors active",
  "not-forced-colors": "when forced colors inactive",
  
  // Color inversion
  "inverted-colors": "when colors inverted",
  
  // Pointer capabilities
  "pointer-fine": "with fine pointer (mouse)",
  "pointer-coarse": "with coarse pointer (touch)",
  "pointer-none": "with no pointer",
  "any-pointer-fine": "with any fine pointer",
  "any-pointer-coarse": "with any coarse pointer",
  "any-pointer-none": "with no pointers",
  
  // Print media
  print: "when printing",
  
  // Scripting
  noscript: "when scripting disabled",
  
  // Direction
  ltr: "in left-to-right mode",
  rtl: "in right-to-left mode",
  
  // ARIA states
  "aria-busy": "when aria-busy",
  "aria-checked": "when aria-checked",
  "aria-disabled": "when aria-disabled",
  "aria-expanded": "when aria-expanded",
  "aria-hidden": "when aria-hidden",
  "aria-pressed": "when aria-pressed",
  "aria-readonly": "when aria-readonly",
  "aria-required": "when aria-required",
  "aria-selected": "when aria-selected",
  
  // Group variants (parent state)
  "group-hover": "when group hovered",
  "group-focus": "when group focused",
  "group-active": "when group active",
  "group-visited": "when group visited",
  "group-focus-within": "when group focused within",
  "group-focus-visible": "when group focus visible",
  "group-target": "when group target",
  "group-first": "when group first child",
  "group-last": "when group last child",
  "group-only": "when group only child",
  "group-odd": "when group odd child",
  "group-even": "when group even child",
  "group-first-of-type": "when group first of type",
  "group-last-of-type": "when group last of type",
  "group-only-of-type": "when group only of type",
  "group-empty": "when group empty",
  "group-disabled": "when group disabled",
  "group-enabled": "when group enabled",
  "group-checked": "when group checked",
  "group-indeterminate": "when group indeterminate",
  "group-default": "when group default",
  "group-required": "when group required",
  "group-valid": "when group valid",
  "group-invalid": "when group invalid",
  "group-in-range": "when group in range",
  "group-out-of-range": "when group out of range",
  "group-placeholder-shown": "when group placeholder shown",
  "group-autofill": "when group autofilled",
  "group-read-only": "when group read-only",
  "group-open": "when group open",
  "group-aria-busy": "when group aria-busy",
  "group-aria-checked": "when group aria-checked",
  "group-aria-disabled": "when group aria-disabled",
  "group-aria-expanded": "when group aria-expanded",
  "group-aria-hidden": "when group aria-hidden",
  "group-aria-pressed": "when group aria-pressed",
  "group-aria-readonly": "when group aria-readonly",
  "group-aria-required": "when group aria-required",
  "group-aria-selected": "when group aria-selected",
  
  // Peer variants (sibling state)
  "peer-hover": "when peer hovered",
  "peer-focus": "when peer focused",
  "peer-active": "when peer active",
  "peer-visited": "when peer visited",
  "peer-focus-within": "when peer focused within",
  "peer-focus-visible": "when peer focus visible",
  "peer-target": "when peer target",
  "peer-first": "when peer first child",
  "peer-last": "when peer last child",
  "peer-only": "when peer only child",
  "peer-odd": "when peer odd child",
  "peer-even": "when peer even child",
  "peer-first-of-type": "when peer first of type",
  "peer-last-of-type": "when peer last of type",
  "peer-only-of-type": "when peer only of type",
  "peer-empty": "when peer empty",
  "peer-disabled": "when peer disabled",
  "peer-enabled": "when peer enabled",
  "peer-checked": "when peer checked",
  "peer-indeterminate": "when peer indeterminate",
  "peer-default": "when peer default",
  "peer-required": "when peer required",
  "peer-valid": "when peer valid",
  "peer-invalid": "when peer invalid",
  "peer-in-range": "when peer in range",
  "peer-out-of-range": "when peer out of range",
  "peer-placeholder-shown": "when peer placeholder shown",
  "peer-autofill": "when peer autofilled",
  "peer-read-only": "when peer read-only",
  "peer-open": "when peer open",
  "peer-aria-busy": "when peer aria-busy",
  "peer-aria-checked": "when peer aria-checked",
  "peer-aria-disabled": "when peer aria-disabled",
  "peer-aria-expanded": "when peer aria-expanded",
  "peer-aria-hidden": "when peer aria-hidden",
  "peer-aria-pressed": "when peer aria-pressed",
  "peer-aria-readonly": "when peer aria-readonly",
  "peer-aria-required": "when peer aria-required",
  "peer-aria-selected": "when peer aria-selected",
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
 * Describe an arbitrary variant that's not in the predefined list
 */
function describeArbitraryVariant(variant: string): string {
  // Handle has-[...] variants
  if (variant.startsWith("has-[") && variant.endsWith("]")) {
    const selector = variant.slice(5, -1);
    return `when has ${selector}`;
  }
  
  // Handle group-has-[...] variants
  if (variant.startsWith("group-has-[") && variant.endsWith("]")) {
    const selector = variant.slice(11, -1);
    return `when group has ${selector}`;
  }
  
  // Handle peer-has-[...] variants
  if (variant.startsWith("peer-has-[") && variant.endsWith("]")) {
    const selector = variant.slice(10, -1);
    return `when peer has ${selector}`;
  }
  
  // Handle data-[...] variants
  if (variant.startsWith("data-[") && variant.endsWith("]")) {
    const selector = variant.slice(6, -1);
    return `when data-${selector}`;
  }
  
  // Handle group-data-[...] variants
  if (variant.startsWith("group-data-[") && variant.endsWith("]")) {
    const selector = variant.slice(12, -1);
    return `when group data-${selector}`;
  }
  
  // Handle peer-data-[...] variants
  if (variant.startsWith("peer-data-[") && variant.endsWith("]")) {
    const selector = variant.slice(11, -1);
    return `when peer data-${selector}`;
  }
  
  // Handle aria-[...] variants
  if (variant.startsWith("aria-[") && variant.endsWith("]")) {
    const selector = variant.slice(6, -1);
    return `when aria-${selector}`;
  }
  
  // Handle group-aria-[...] variants
  if (variant.startsWith("group-aria-[") && variant.endsWith("]")) {
    const selector = variant.slice(12, -1);
    return `when group aria-${selector}`;
  }
  
  // Handle peer-aria-[...] variants
  if (variant.startsWith("peer-aria-[") && variant.endsWith("]")) {
    const selector = variant.slice(11, -1);
    return `when peer aria-${selector}`;
  }
  
  // Handle nth-[...] variants
  if (variant.startsWith("nth-[") && variant.endsWith("]")) {
    const selector = variant.slice(5, -1);
    return `nth-child(${selector})`;
  }
  
  // Handle nth-last-[...] variants
  if (variant.startsWith("nth-last-[") && variant.endsWith("]")) {
    const selector = variant.slice(10, -1);
    return `nth-last-child(${selector})`;
  }
  
  // Handle nth-of-type-[...] variants
  if (variant.startsWith("nth-of-type-[") && variant.endsWith("]")) {
    const selector = variant.slice(13, -1);
    return `nth-of-type(${selector})`;
  }
  
  // Handle nth-last-of-type-[...] variants
  if (variant.startsWith("nth-last-of-type-[") && variant.endsWith("]")) {
    const selector = variant.slice(18, -1);
    return `nth-last-of-type(${selector})`;
  }
  
  // Handle not-[...] variants
  if (variant.startsWith("not-[") && variant.endsWith("]")) {
    const selector = variant.slice(5, -1);
    return `when not ${selector}`;
  }
  
  // Handle in-[...] variants
  if (variant.startsWith("in-[") && variant.endsWith("]")) {
    const selector = variant.slice(4, -1);
    return `when in ${selector}`;
  }
  
  // Handle supports-[...] variants
  if (variant.startsWith("supports-[") && variant.endsWith("]")) {
    const selector = variant.slice(10, -1);
    return `when supports ${selector}`;
  }
  
  // Handle not-supports-[...] variants
  if (variant.startsWith("not-supports-[") && variant.endsWith("]")) {
    const selector = variant.slice(14, -1);
    return `when not supports ${selector}`;
  }
  
  // Handle min-[...] and max-[...] responsive variants
  if (variant.startsWith("min-[") && variant.endsWith("]")) {
    const value = variant.slice(5, -1);
    return `on screens ≥${value}`;
  }
  
  if (variant.startsWith("max-[") && variant.endsWith("]")) {
    const value = variant.slice(5, -1);
    return `on screens <${value}`;
  }
  
  // Handle @min-[...] and @max-[...] container query variants
  if (variant.startsWith("@min-[") && variant.endsWith("]")) {
    const value = variant.slice(6, -1);
    return `in container ≥${value}`;
  }
  
  if (variant.startsWith("@max-[") && variant.endsWith("]")) {
    const value = variant.slice(6, -1);
    return `in container <${value}`;
  }
  
  // Handle group/peer with named groups: group/name or peer/name
  if (variant.includes("/")) {
    const [base, name] = variant.split("/");
    if (base === "group") {
      return `when group "${name}"`;
    }
    if (base === "peer") {
      return `when peer "${name}"`;
    }
  }
  
  // Handle group-* variants not in predefined list
  if (variant.startsWith("group-")) {
    const state = variant.slice(6);
    return `when group ${state}`;
  }
  
  // Handle peer-* variants not in predefined list
  if (variant.startsWith("peer-")) {
    const state = variant.slice(5);
    return `when peer ${state}`;
  }
  
  // If nothing matches, return the variant as-is
  return variant;
}

/**
 * Apply variant descriptions to translation (e.g., "hover:", "md:", "dark:")
 */
function applyVariants(translation: string, variants: string[]): string {
  if (variants.length === 0) {
    return translation;
  }

  const variantParts = variants
    .map((v) => VARIANT_DESCRIPTIONS[v] || describeArbitraryVariant(v))
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
