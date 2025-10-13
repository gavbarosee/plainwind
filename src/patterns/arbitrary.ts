/**
 * Arbitrary pattern matchers
 */

export function matchArbitraryValue(className: string): string | null {
  // Match arbitrary values: property-[value]
  const arbitraryMatch = className.match(/^([\w-]+)-\[(.+?)\]$/);
  if (!arbitraryMatch) {
    return null;
  }

  const property = arbitraryMatch[1];
  const value = arbitraryMatch[2];

  // Map common property prefixes to plain English
  const propertyMap: Record<string, string> = {
    // Sizing
    w: "width",
    h: "height",
    "min-w": "min width",
    "min-h": "min height",
    "max-w": "max width",
    "max-h": "max height",
    size: "width and height",
    // Spacing
    p: "padding",
    m: "margin",
    ps: "start padding",
    pe: "end padding",
    ms: "start margin",
    me: "end margin",
    gap: "gap",
    // Colors
    bg: "background",
    text: "text color",
    border: "border color",
    // Other
    top: "top",
    right: "right",
    bottom: "bottom",
    left: "left",
    z: "z-index",
    ring: "ring width",
    "ring-offset": "ring offset",
    rounded: "corner radius",
    outline: "outline width",
    flex: "flex",
    "grid-cols": "grid columns",
    "grid-rows": "grid rows",
    "auto-cols": "auto columns",
    "auto-rows": "auto rows",
    content: "content",
  };

  const propertyName = propertyMap[property] || property;

  // If value is a CSS function or variable, keep as-is for clarity
  if (/^(oklch|lch|lab|rgb|rgba|hsl|hsla|color|calc|var|theme)\(/.test(value)) {
    return `${propertyName} ${value}`;
  }

  // Support container query units and viewport units transparently
  if (/(cqw|cqh|cqi|cqb|cqmin|cqmax|svw|lvw|dvw|svh|lvh|dvh)\b/.test(value)) {
    return `${propertyName} ${value}`;
  }

  return `${propertyName} ${value}`;
}

/**
 * Try to match gradient patterns
 */

