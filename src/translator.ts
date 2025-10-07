import * as vscode from "vscode";
import { tailwindMappings } from "./mappings";
import {
  matchSpacingPattern,
  matchColorPattern,
  matchArbitraryValue,
  matchGradientPattern,
  matchSizingPattern,
} from "./patterns";
import { groupTranslationsByCategory } from "./categorizer";

function parseNonEmptyClasses(classString: string): string[] {
  return classString.split(" ").filter((c) => c.trim());
}

/**
 * Variant prefixes and their plain English descriptions
 */
const variantDescriptions: Record<string, string> = {
  hover: "on hover",
  focus: "on focus",
  active: "when active",
  disabled: "when disabled",
  dark: "in dark mode",
  "not-dark": "in light mode",
  sm: "on small screens",
  md: "on medium screens",
  lg: "on large screens",
  xl: "on extra large screens",
  "2xl": "on 2xl screens",
  "group-hover": "when group hovered",
  "focus-within": "when focused within",
  "focus-visible": "when focus visible",
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
 * Translate a single Tailwind class
 */
function translateSingleClass(cls: string): string {
  const { variants, baseClass } = extractVariants(cls);

  // Extract opacity modifier if present (e.g., bg-white/10)
  let opacity = "";
  let classWithoutOpacity = baseClass;
  const opacityMatch = baseClass.match(/^(.+)\/(\d+)$/);
  if (opacityMatch) {
    classWithoutOpacity = opacityMatch[1];
    opacity = opacityMatch[2];
  }

  // Check for arbitrary CSS custom properties (after extracting opacity)
  if (classWithoutOpacity.match(/^\[--[\w-]+:/)) {
    let translation = "custom CSS variable";
    if (opacity) {
      translation = `${translation} with ${opacity}% opacity`;
    }
    // Add variant descriptions
    if (variants.length > 0) {
      const variantParts = variants
        .map((v) => variantDescriptions[v] || v)
        .join(", ");
      return `${translation} ${variantParts}`;
    }
    return translation;
  }

  // Translate the base class (without opacity)
  let translation = "";

  // Look up in static mappings first
  if (tailwindMappings[classWithoutOpacity]) {
    translation = tailwindMappings[classWithoutOpacity];
  } else {
    // Try pattern matching for spacing
    const spacingMatch = matchSpacingPattern(classWithoutOpacity);
    if (spacingMatch) {
      translation = spacingMatch;
    } else {
      // Try pattern matching for sizing
      const sizingMatch = matchSizingPattern(classWithoutOpacity);
      if (sizingMatch) {
        translation = sizingMatch;
      } else {
        // Try pattern matching for colors
        const colorMatch = matchColorPattern(classWithoutOpacity);
        if (colorMatch) {
          translation = colorMatch;
        } else {
          // Try pattern matching for arbitrary values
          const arbitraryMatch = matchArbitraryValue(classWithoutOpacity);
          if (arbitraryMatch) {
            translation = arbitraryMatch;
          } else {
            // Try pattern matching for gradients
            const gradientMatch = matchGradientPattern(classWithoutOpacity);
            if (gradientMatch) {
              translation = gradientMatch;
            } else {
              // If not found, use original class
              translation = baseClass;
            }
          }
        }
      }
    }
  }

  // Add opacity if present
  if (opacity) {
    translation = `${translation} with ${opacity}% opacity`;
  }

  // Add variant descriptions
  if (variants.length > 0) {
    const variantParts = variants
      .map((v) => variantDescriptions[v] || v)
      .join(", ");
    return `${translation} ${variantParts}`;
  }

  return translation;
}

/**
 * Translates Tailwind classes to plain English
 */
export function translateClasses(classString: string): string {
  const classes = parseNonEmptyClasses(classString);
  const translations = classes.map((cls) => translateSingleClass(cls));

  // Check if grouping is enabled
  const config = vscode.workspace.getConfiguration("plainwind");
  const groupByCategory = config.get<boolean>("groupByCategory", true);
  const showEmojis = config.get<boolean>("showCategoryEmojis", false);

  if (groupByCategory) {
    return groupTranslationsByCategory(classes, translations, showEmojis);
  }

  return translations.join(", ");
}
