/**
 * Parsing utilities for class names
 */

import type { VariantExtraction, OpacityExtraction, ImportantExtraction, PrefixExtraction } from "./types";

/**
 * Parse a class string into individual non-empty class names
 */
export function parseNonEmptyClasses(classString: string): string[] {
  return classString.split(" ").filter((c) => c.trim());
}

/**
 * Extract variants and base class from a Tailwind class
 * e.g., "md:hover:bg-blue-500" -> { variants: ["md", "hover"], baseClass: "bg-blue-500" }
 * Handles arbitrary values with brackets: "dark:[--var:value]" -> { variants: ["dark"], baseClass: "[--var:value]" }
 */
export function extractVariants(className: string): VariantExtraction {
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
 * Extract opacity modifier from a class (e.g., "bg-white/10" -> { className: "bg-white", opacity: "10" })
 */
export function extractOpacity(classNameWithOpacity: string): OpacityExtraction {
  const opacityMatch = classNameWithOpacity.match(/^(.+)\/(\d+)$/);
  if (opacityMatch) {
    return {
      className: opacityMatch[1],
      opacity: opacityMatch[2],
    };
  }
  return { className: classNameWithOpacity, opacity: null };
}

/**
 * Extract important modifier from a class (e.g., "bg-white!" -> { className: "bg-white", isImportant: true })
 */
export function extractImportant(className: string): ImportantExtraction {
  if (className.endsWith("!")) {
    return {
      className: className.slice(0, -1),
      isImportant: true,
    };
  }
  return {
    className,
    isImportant: false,
  };
}

/**
 * Extract prefix from a class (e.g., "tw\\:bg-white" -> { className: "bg-white", prefix: "tw" })
 */
export function extractPrefix(className: string): PrefixExtraction {
  // Match something like "tw\:" at the start (where backslash escapes the colon)
  const prefixMatch = className.match(/^([a-z0-9-]+)\\:(.+)$/i);
  if (prefixMatch) {
    return {
      className: prefixMatch[2],
      prefix: prefixMatch[1],
    };
  }
  return {
    className,
    prefix: "",
  };
}

