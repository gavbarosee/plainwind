/**
 * Backgrounds pattern matchers
 */

export function matchBackgroundImagePattern(className: string): string | null {
  // bg-(image:--custom-property) - custom CSS property for background image
  const imagePropMatch = className.match(/^bg-\(image:(--[\w-]+)\)$/);
  if (imagePropMatch) {
    return `background image ${imagePropMatch[1]}`;
  }

  // Linear gradients with angle: bg-linear-45, bg-linear-180, etc.
  const linearAngleMatch = className.match(/^bg-linear-(\d+)$/);
  if (linearAngleMatch) {
    return `linear gradient at ${linearAngleMatch[1]} degrees`;
  }

  // Negative linear gradients: -bg-linear-45
  const negLinearAngleMatch = className.match(/^-bg-linear-(\d+)$/);
  if (negLinearAngleMatch) {
    return `linear gradient at -${negLinearAngleMatch[1]} degrees`;
  }

  // Linear gradient with custom property: bg-linear-(--custom-property)
  const linearCustomMatch = className.match(/^bg-linear-\((--[\w-]+)\)$/);
  if (linearCustomMatch) {
    return `linear gradient ${linearCustomMatch[1]}`;
  }

  // Linear gradient with arbitrary value: bg-linear-[value]
  const linearArbitraryMatch = className.match(/^bg-linear-\[(.+?)\]$/);
  if (linearArbitraryMatch) {
    return `linear gradient ${linearArbitraryMatch[1]}`;
  }

  // Radial gradient with custom property: bg-radial-(--custom-property)
  const radialCustomMatch = className.match(/^bg-radial-\((--[\w-]+)\)$/);
  if (radialCustomMatch) {
    return `radial gradient ${radialCustomMatch[1]}`;
  }

  // Radial gradient with arbitrary value: bg-radial-[value]
  const radialArbitraryMatch = className.match(/^bg-radial-\[(.+?)\]$/);
  if (radialArbitraryMatch) {
    return `radial gradient ${radialArbitraryMatch[1]}`;
  }

  // Conic gradients with angle: bg-conic-45, bg-conic-180, etc.
  const conicAngleMatch = className.match(/^bg-conic-(\d+)$/);
  if (conicAngleMatch) {
    return `conic gradient from ${conicAngleMatch[1]} degrees`;
  }

  // Negative conic gradients: -bg-conic-45
  const negConicAngleMatch = className.match(/^-bg-conic-(\d+)$/);
  if (negConicAngleMatch) {
    return `conic gradient from -${negConicAngleMatch[1]} degrees`;
  }

  // Conic gradient with custom property: bg-conic-(--custom-property)
  const conicCustomMatch = className.match(/^bg-conic-\((--[\w-]+)\)$/);
  if (conicCustomMatch) {
    return `conic gradient ${conicCustomMatch[1]}`;
  }

  // Conic gradient with arbitrary value: bg-conic-[value]
  const conicArbitraryMatch = className.match(/^bg-conic-\[(.+?)\]$/);
  if (conicArbitraryMatch) {
    return `conic gradient ${conicArbitraryMatch[1]}`;
  }

  // bg-[url(...)] or other arbitrary background image values
  const bgArbitraryMatch = className.match(/^bg-\[(.+?)\]$/);
  if (bgArbitraryMatch) {
    const value = bgArbitraryMatch[1];
    // If it looks like a URL, describe it as an image
    if (/^url\(/i.test(value)) {
      return `background image ${value}`;
    }
    // If it looks like a color (handled by matchBackgroundColorPattern)
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      return null; // Let matchBackgroundColorPattern handle it
    }
    // Otherwise, it's a generic background value
    return `background ${value}`;
  }

  return null;
}

/**
 * Try to match gradient color stop patterns (from-*, via-*, to-*)
 */

export function matchBackgroundPositionPattern(
  className: string
): string | null {
  // bg-position-(--custom-property) - custom CSS property for background position
  const customPropMatch = className.match(/^bg-position-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `background position ${customPropMatch[1]}`;
  }

  // bg-position-[value] - arbitrary values
  const arbitraryMatch = className.match(/^bg-position-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `background position ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match background image patterns (bg-[url(...)], bg-(image:--var), gradients)
 */

export function matchBackgroundSizePattern(className: string): string | null {
  // bg-size-(--custom-property) - custom CSS property for background size
  const customPropMatch = className.match(/^bg-size-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `background size ${customPropMatch[1]}`;
  }

  // bg-size-[value] - arbitrary values
  const arbitraryMatch = className.match(/^bg-size-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `background size ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match background position patterns (bg-position-*)
 */

export function matchBackgroundColorPattern(className: string): string | null {
  // bg-(--custom-property) - custom CSS property for background color
  const customPropMatch = className.match(/^bg-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `background color ${customPropMatch[1]}`;
  }

  // bg-[value] - arbitrary values that look like colors (hex, rgb, oklch, etc.)
  const arbitraryMatch = className.match(/^bg-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Check if it looks like a color value (hex, rgb, oklch, hsl, etc.)
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      return `background color ${value}`;
    }
    // Otherwise, let matchBackgroundImagePattern handle it (could be an image URL, etc.)
  }

  return null;
}

/**
 * Try to match text color custom properties and arbitrary values (text-*)
 * This must run before matchFontSizePattern to avoid conflicts
 */
