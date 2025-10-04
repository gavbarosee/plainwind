import { tailwindMappings } from "./mappings";

function parseNonEmptyClasses(classString: string): string[] {
  return classString.split(" ").filter((c) => c.trim());
}

/**
 * Translates Tailwind classes to plain English
 */
export function translateClasses(classString: string): string {
  const classes = parseNonEmptyClasses(classString);

  const translations = classes.map((cls) => {
    // Look up in mappings
    if (tailwindMappings[cls]) {
      return tailwindMappings[cls];
    }

    // If not found, return original class
    return cls;
  });

  return translations.join(", ");
}
