import { tailwindMappings } from "./mappings";
import { matchSpacingPattern } from "./patterns";

function parseNonEmptyClasses(classString: string): string[] {
  return classString.split(" ").filter((c) => c.trim());
}

/**
 * Translates Tailwind classes to plain English
 */
export function translateClasses(classString: string): string {
  const classes = parseNonEmptyClasses(classString);

  const translations = classes.map((cls) => {
    // Look up in static mappings first
    if (tailwindMappings[cls]) {
      return tailwindMappings[cls];
    }

    // Try pattern matching for spacing
    const spacingMatch = matchSpacingPattern(cls);
    if (spacingMatch) {
      return spacingMatch;
    }

    // If not found, return original class
    return cls;
  });

  return translations.join(", ");
}
