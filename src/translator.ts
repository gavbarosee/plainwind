import * as vscode from "vscode";
import { tailwindMappings } from "./mappings";
import {
  matchSpacingPattern,
  matchColorPattern,
  matchArbitraryValue,
  matchGradientPattern,
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
 */
function extractVariants(className: string): {
  variants: string[];
  baseClass: string;
} {
  const parts = className.split(":");
  if (parts.length === 1) {
    return { variants: [], baseClass: className };
  }

  const baseClass = parts[parts.length - 1];
  const variants = parts.slice(0, -1);
  return { variants, baseClass };
}

/**
 * Translate a single Tailwind class
 */
function translateSingleClass(cls: string): string {
  const { variants, baseClass } = extractVariants(cls);

  // Translate the base class
  let translation = "";

  // Look up in static mappings first
  if (tailwindMappings[baseClass]) {
    translation = tailwindMappings[baseClass];
  } else {
    // Try pattern matching for spacing
    const spacingMatch = matchSpacingPattern(baseClass);
    if (spacingMatch) {
      translation = spacingMatch;
    } else {
      // Try pattern matching for colors
      const colorMatch = matchColorPattern(baseClass);
      if (colorMatch) {
        translation = colorMatch;
      } else {
        // Try pattern matching for arbitrary values
        const arbitraryMatch = matchArbitraryValue(baseClass);
        if (arbitraryMatch) {
          translation = arbitraryMatch;
        } else {
          // Try pattern matching for gradients
          const gradientMatch = matchGradientPattern(baseClass);
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
  const groupByCategory = config.get<boolean>("groupByCategory", false);
  const showEmojis = config.get<boolean>("showCategoryEmojis", false);

  if (groupByCategory) {
    return groupTranslationsByCategory(classes, translations, showEmojis);
  }

  return translations.join(", ");
}
