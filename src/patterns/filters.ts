/**
 * Filters pattern matchers
 */

export function matchFilterPattern(className: string): string | null {
  // filter-(<custom-property>) - custom CSS property for filter
  const customPropMatch = className.match(/^filter-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `filter ${customPropMatch[1]}`;
  }

  // filter-[value] - arbitrary filter value
  const arbitraryMatch = className.match(/^filter-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `filter ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match transition-property patterns (transition-*)
 */

export function matchBlurPattern(className: string): string | null {
  // blur-(<custom-property>) - custom CSS property for blur
  const customPropMatch = className.match(/^blur-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `blur ${customPropMatch[1]}`;
  }

  // blur-[value] - arbitrary blur value
  const arbitraryMatch = className.match(/^blur-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `blur ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match brightness patterns (brightness-*)
 */

export function matchBrightnessPattern(className: string): string | null {
  // brightness-(<custom-property>) - custom CSS property for brightness
  const customPropMatch = className.match(/^brightness-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `brightness ${customPropMatch[1]}`;
  }

  // brightness-[value] - arbitrary brightness value
  const arbitraryMatch = className.match(/^brightness-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `brightness ${arbitraryMatch[1]}`;
  }

  // brightness-<number> - percentage brightness (0-200)
  const numberMatch = className.match(/^brightness-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% brightness`;
  }

  return null;
}

/**
 * Try to match contrast patterns (contrast-*)
 */

export function matchContrastPattern(className: string): string | null {
  // contrast-(<custom-property>) - custom CSS property for contrast
  const customPropMatch = className.match(/^contrast-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `contrast ${customPropMatch[1]}`;
  }

  // contrast-[value] - arbitrary contrast value
  const arbitraryMatch = className.match(/^contrast-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `contrast ${arbitraryMatch[1]}`;
  }

  // contrast-<number> - percentage contrast (0-200)
  const numberMatch = className.match(/^contrast-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% contrast`;
  }

  return null;
}

/**
 * Try to match drop-shadow patterns (drop-shadow-*)
 */

export function matchDropShadowPattern(className: string): string | null {
  // drop-shadow-(color:<custom-property>) - color-specific custom CSS property
  const colorPropMatch = className.match(/^drop-shadow-\(color:(--[\w-]+)\)$/);
  if (colorPropMatch) {
    return `drop shadow color ${colorPropMatch[1]}`;
  }

  // drop-shadow-(<custom-property>) - custom CSS property for drop shadow
  const customPropMatch = className.match(/^drop-shadow-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `drop shadow ${customPropMatch[1]}`;
  }

  // drop-shadow-[value] - arbitrary drop shadow value
  const arbitraryMatch = className.match(/^drop-shadow-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `drop shadow ${arbitraryMatch[1]}`;
  }

  // drop-shadow-<color>-<shade> - color and shade (e.g., drop-shadow-blue-500)
  const colorMatch = className.match(/^drop-shadow-(\w+)-(\d+)$/);
  if (colorMatch) {
    const [, color, shade] = colorMatch;
    return `drop shadow ${color}-${shade}`;
  }

  return null;
}

/**
 * Try to match grayscale patterns (grayscale-*)
 */

export function matchGrayscalePattern(className: string): string | null {
  // grayscale-(<custom-property>) - custom CSS property for grayscale
  const customPropMatch = className.match(/^grayscale-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grayscale ${customPropMatch[1]}`;
  }

  // grayscale-[value] - arbitrary grayscale value
  const arbitraryMatch = className.match(/^grayscale-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grayscale ${arbitraryMatch[1]}`;
  }

  // grayscale-<number> - percentage grayscale (0-100)
  const numberMatch = className.match(/^grayscale-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% grayscale`;
  }

  return null;
}

/**
 * Try to match hue-rotate patterns (hue-rotate-*)
 */

export function matchHueRotatePattern(className: string): string | null {
  // hue-rotate-(<custom-property>) - custom CSS property for hue-rotate
  const customPropMatch = className.match(/^hue-rotate-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `hue rotation ${customPropMatch[1]}`;
  }

  // hue-rotate-[value] - arbitrary hue-rotate value
  const arbitraryMatch = className.match(/^hue-rotate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `hue rotation ${arbitraryMatch[1]}`;
  }

  // -hue-rotate-<number> - negative hue rotation in degrees
  const negativeMatch = className.match(/^-hue-rotate-(\d+)$/);
  if (negativeMatch) {
    return `-${negativeMatch[1]}° hue rotation`;
  }

  // hue-rotate-<number> - hue rotation in degrees
  const numberMatch = className.match(/^hue-rotate-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}° hue rotation`;
  }

  return null;
}

/**
 * Try to match invert patterns (invert-*)
 */

export function matchInvertPattern(className: string): string | null {
  // invert-(<custom-property>) - custom CSS property for invert
  const customPropMatch = className.match(/^invert-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `invert ${customPropMatch[1]}`;
  }

  // invert-[value] - arbitrary invert value
  const arbitraryMatch = className.match(/^invert-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `invert ${arbitraryMatch[1]}`;
  }

  // invert-<number> - percentage invert (0-100)
  const numberMatch = className.match(/^invert-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% invert`;
  }

  return null;
}

/**
 * Try to match saturate patterns (saturate-*)
 */

export function matchSaturatePattern(className: string): string | null {
  // saturate-(<custom-property>) - custom CSS property for saturate
  const customPropMatch = className.match(/^saturate-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `saturation ${customPropMatch[1]}`;
  }

  // saturate-[value] - arbitrary saturate value
  const arbitraryMatch = className.match(/^saturate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `saturation ${arbitraryMatch[1]}`;
  }

  // saturate-<number> - percentage saturation (0-200)
  const numberMatch = className.match(/^saturate-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% saturation`;
  }

  return null;
}

/**
 * Try to match sepia patterns (sepia-*)
 */

export function matchSepiaPattern(className: string): string | null {
  // sepia-(<custom-property>) - custom CSS property for sepia
  const customPropMatch = className.match(/^sepia-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `sepia ${customPropMatch[1]}`;
  }

  // sepia-[value] - arbitrary sepia value
  const arbitraryMatch = className.match(/^sepia-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `sepia ${arbitraryMatch[1]}`;
  }

  // sepia-<number> - percentage sepia (0-100)
  const numberMatch = className.match(/^sepia-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% sepia`;
  }

  return null;
}

/**
 * Try to match backdrop-blur patterns (backdrop-blur-*)
 */

export function matchBackdropFilterPattern(className: string): string | null {
  // backdrop-filter-(<custom-property>) - custom CSS property for backdrop filter
  const customPropMatch = className.match(/^backdrop-filter-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop filter ${customPropMatch[1]}`;
  }

  // backdrop-filter-[value] - arbitrary backdrop filter value
  const arbitraryMatch = className.match(/^backdrop-filter-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop filter ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match filter patterns (filter-*)
 */

export function matchBackdropBlurPattern(className: string): string | null {
  // backdrop-blur-(<custom-property>) - custom CSS property for backdrop blur
  const customPropMatch = className.match(/^backdrop-blur-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop blur ${customPropMatch[1]}`;
  }

  // backdrop-blur-[value] - arbitrary backdrop blur value
  const arbitraryMatch = className.match(/^backdrop-blur-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop blur ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match backdrop-brightness patterns (backdrop-brightness-*)
 */

export function matchBackdropBrightnessPattern(
  className: string
): string | null {
  // backdrop-brightness-(<custom-property>) - custom CSS property for backdrop brightness
  const customPropMatch = className.match(
    /^backdrop-brightness-\((--[\w-]+)\)$/
  );
  if (customPropMatch) {
    return `backdrop brightness ${customPropMatch[1]}`;
  }

  // backdrop-brightness-[value] - arbitrary backdrop brightness value
  const arbitraryMatch = className.match(/^backdrop-brightness-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop brightness ${arbitraryMatch[1]}`;
  }

  // backdrop-brightness-<number> - percentage backdrop brightness (0-200)
  const numberMatch = className.match(/^backdrop-brightness-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop brightness`;
  }

  return null;
}

/**
 * Try to match backdrop-contrast patterns (backdrop-contrast-*)
 */

export function matchBackdropContrastPattern(className: string): string | null {
  // backdrop-contrast-(<custom-property>) - custom CSS property for backdrop contrast
  const customPropMatch = className.match(/^backdrop-contrast-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop contrast ${customPropMatch[1]}`;
  }

  // backdrop-contrast-[value] - arbitrary backdrop contrast value
  const arbitraryMatch = className.match(/^backdrop-contrast-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop contrast ${arbitraryMatch[1]}`;
  }

  // backdrop-contrast-<number> - percentage backdrop contrast (0-200)
  const numberMatch = className.match(/^backdrop-contrast-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop contrast`;
  }

  return null;
}

/**
 * Try to match backdrop-grayscale patterns (backdrop-grayscale-*)
 */

export function matchBackdropGrayscalePattern(
  className: string
): string | null {
  // backdrop-grayscale-(<custom-property>) - custom CSS property for backdrop grayscale
  const customPropMatch = className.match(
    /^backdrop-grayscale-\((--[\w-]+)\)$/
  );
  if (customPropMatch) {
    return `backdrop grayscale ${customPropMatch[1]}`;
  }

  // backdrop-grayscale-[value] - arbitrary backdrop grayscale value
  const arbitraryMatch = className.match(/^backdrop-grayscale-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop grayscale ${arbitraryMatch[1]}`;
  }

  // backdrop-grayscale-<number> - percentage backdrop grayscale (0-100)
  const numberMatch = className.match(/^backdrop-grayscale-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop grayscale`;
  }

  return null;
}

/**
 * Try to match backdrop-hue-rotate patterns (backdrop-hue-rotate-*)
 */

export function matchBackdropHueRotatePattern(
  className: string
): string | null {
  // backdrop-hue-rotate-(<custom-property>) - custom CSS property for backdrop hue-rotate
  const customPropMatch = className.match(
    /^backdrop-hue-rotate-\((--[\w-]+)\)$/
  );
  if (customPropMatch) {
    return `backdrop hue rotation ${customPropMatch[1]}`;
  }

  // backdrop-hue-rotate-[value] - arbitrary backdrop hue-rotate value
  const arbitraryMatch = className.match(/^backdrop-hue-rotate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop hue rotation ${arbitraryMatch[1]}`;
  }

  // -backdrop-hue-rotate-<number> - negative backdrop hue rotation in degrees
  const negativeMatch = className.match(/^-backdrop-hue-rotate-(\d+)$/);
  if (negativeMatch) {
    return `-${negativeMatch[1]}° backdrop hue rotation`;
  }

  // backdrop-hue-rotate-<number> - backdrop hue rotation in degrees
  const numberMatch = className.match(/^backdrop-hue-rotate-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}° backdrop hue rotation`;
  }

  return null;
}

/**
 * Try to match backdrop-invert patterns (backdrop-invert-*)
 */

export function matchBackdropInvertPattern(className: string): string | null {
  // backdrop-invert-(<custom-property>) - custom CSS property for backdrop invert
  const customPropMatch = className.match(/^backdrop-invert-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop invert ${customPropMatch[1]}`;
  }

  // backdrop-invert-[value] - arbitrary backdrop invert value
  const arbitraryMatch = className.match(/^backdrop-invert-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop invert ${arbitraryMatch[1]}`;
  }

  // backdrop-invert-<number> - percentage backdrop invert (0-100)
  const numberMatch = className.match(/^backdrop-invert-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop invert`;
  }

  return null;
}

/**
 * Try to match backdrop-opacity patterns (backdrop-opacity-*)
 */

export function matchBackdropOpacityPattern(className: string): string | null {
  // backdrop-opacity-(<custom-property>) - custom CSS property for backdrop opacity
  const customPropMatch = className.match(/^backdrop-opacity-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop opacity ${customPropMatch[1]}`;
  }

  // backdrop-opacity-[value] - arbitrary backdrop opacity value
  const arbitraryMatch = className.match(/^backdrop-opacity-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop opacity ${arbitraryMatch[1]}`;
  }

  // backdrop-opacity-<number> - percentage backdrop opacity (0-100)
  const numberMatch = className.match(/^backdrop-opacity-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop opacity`;
  }

  return null;
}

/**
 * Try to match backdrop-saturate patterns (backdrop-saturate-*)
 */

export function matchBackdropSaturatePattern(className: string): string | null {
  // backdrop-saturate-(<custom-property>) - custom CSS property for backdrop saturate
  const customPropMatch = className.match(/^backdrop-saturate-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop saturation ${customPropMatch[1]}`;
  }

  // backdrop-saturate-[value] - arbitrary backdrop saturate value
  const arbitraryMatch = className.match(/^backdrop-saturate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop saturation ${arbitraryMatch[1]}`;
  }

  // backdrop-saturate-<number> - percentage backdrop saturation (0-200)
  const numberMatch = className.match(/^backdrop-saturate-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop saturation`;
  }

  return null;
}

/**
 * Try to match backdrop-sepia patterns (backdrop-sepia-*)
 */

export function matchBackdropSepiaPattern(className: string): string | null {
  // backdrop-sepia-(<custom-property>) - custom CSS property for backdrop sepia
  const customPropMatch = className.match(/^backdrop-sepia-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `backdrop sepia ${customPropMatch[1]}`;
  }

  // backdrop-sepia-[value] - arbitrary backdrop sepia value
  const arbitraryMatch = className.match(/^backdrop-sepia-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `backdrop sepia ${arbitraryMatch[1]}`;
  }

  // backdrop-sepia-<number> - percentage backdrop sepia (0-100)
  const numberMatch = className.match(/^backdrop-sepia-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% backdrop sepia`;
  }

  return null;
}

/**
 * Try to match backdrop-filter patterns (backdrop-filter-*)
 */
