/**
 * Typography pattern matchers
 */

import { SPACING_SCALE } from './helpers';

export function matchFontFamilyPattern(className: string): string | null {
  // font-(family-name:--custom-property) - special syntax for font-family custom properties
  const familyNameCustomMatch = className.match(
    /^font-\(family-name:(--[\w-]+)\)$/
  );
  if (familyNameCustomMatch) {
    return `font family ${familyNameCustomMatch[1]}`;
  }

  // font-[value] - arbitrary font family value
  const arbitraryMatch = className.match(/^font-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Handle font-family specific arbitrary values
    return `font family ${value}`;
  }

  // font-(--custom-property) - simple custom property (less common, but possible)
  const customPropMatch = className.match(/^font-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `font family ${customPropMatch[1]}`;
  }

  return null;
}

/**
 * Try to match font-weight patterns (font-*)
 */

export function matchFontWeightPattern(className: string): string | null {
  // font-(weight:--custom-property) - special syntax for font-weight custom properties
  const weightCustomMatch = className.match(/^font-\(weight:(--[\w-]+)\)$/);
  if (weightCustomMatch) {
    return `font weight ${weightCustomMatch[1]}`;
  }

  // font-[value] - arbitrary font weight value (numeric)
  const arbitraryMatch = className.match(/^font-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Check if it looks like a font-weight (is a number, possibly with calc())
    if (/^\d+$/.test(value) || /^calc\(/.test(value)) {
      return `font weight ${value}`;
    }
    // Otherwise, it might be a font-family value, let matchFontFamilyPattern handle it
  }

  return null;
}

/**
 * Try to match font-stretch patterns (font-stretch-*)
 */

export function matchFontStretchPattern(className: string): string | null {
  // font-stretch-<percentage> - percentage values like font-stretch-75%, font-stretch-125%
  const percentageMatch = className.match(/^font-stretch-([\d.]+%)$/);
  if (percentageMatch) {
    return `font stretch ${percentageMatch[1]}`;
  }

  // font-stretch-(<custom-property>) - custom CSS properties
  const customPropMatch = className.match(/^font-stretch-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `font stretch ${customPropMatch[1]}`;
  }

  // font-stretch-[<value>] - arbitrary values
  const arbitraryMatch = className.match(/^font-stretch-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `font stretch ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match border-width patterns (border-*, divide-*)
 */

export function matchFontSizePattern(className: string): string | null {
  // text-<size>/(<custom-property>) - font size with custom property line height
  const sizeWithCustomLineHeightMatch = className.match(
    /^text-(xs|sm|base|lg|xl|\dxl)\/\((--[\w-]+)\)$/
  );
  if (sizeWithCustomLineHeightMatch) {
    const size = sizeWithCustomLineHeightMatch[1];
    const customProp = sizeWithCustomLineHeightMatch[2];
    const sizeMap: Record<string, string> = {
      xs: 'extra small',
      sm: 'small',
      base: 'base',
      lg: 'large',
      xl: 'extra large',
      '2xl': '2x large',
      '3xl': '3x large',
      '4xl': '4x large',
      '5xl': '5x large',
      '6xl': '6x large',
      '7xl': '7x large',
      '8xl': '8x large',
      '9xl': '9x large',
    };
    const sizeDesc = sizeMap[size] || size;
    return `${sizeDesc} text with line height ${customProp}`;
  }

  // text-<size>/[<value>] - font size with arbitrary line height
  const sizeWithArbitraryLineHeightMatch = className.match(
    /^text-(xs|sm|base|lg|xl|\dxl)\/\[(.+?)\]$/
  );
  if (sizeWithArbitraryLineHeightMatch) {
    const size = sizeWithArbitraryLineHeightMatch[1];
    const lineHeight = sizeWithArbitraryLineHeightMatch[2];
    const sizeMap: Record<string, string> = {
      xs: 'extra small',
      sm: 'small',
      base: 'base',
      lg: 'large',
      xl: 'extra large',
      '2xl': '2x large',
      '3xl': '3x large',
      '4xl': '4x large',
      '5xl': '5x large',
      '6xl': '6x large',
      '7xl': '7x large',
      '8xl': '8x large',
      '9xl': '9x large',
    };
    const sizeDesc = sizeMap[size] || size;
    return `${sizeDesc} text with line height ${lineHeight}`;
  }

  // text-<size>/<line-height> - font size with line height (e.g., text-sm/6, text-lg/7)
  const sizeWithLineHeightMatch = className.match(
    /^text-(xs|sm|base|lg|xl|\dxl)\/(.+)$/
  );
  if (sizeWithLineHeightMatch) {
    const size = sizeWithLineHeightMatch[1];
    const lineHeight = sizeWithLineHeightMatch[2];
    const sizeMap: Record<string, string> = {
      xs: 'extra small',
      sm: 'small',
      base: 'base',
      lg: 'large',
      xl: 'extra large',
      '2xl': '2x large',
      '3xl': '3x large',
      '4xl': '4x large',
      '5xl': '5x large',
      '6xl': '6x large',
      '7xl': '7x large',
      '8xl': '8x large',
      '9xl': '9x large',
    };
    const sizeDesc = sizeMap[size] || size;
    return `${sizeDesc} text with line height ${lineHeight}`;
  }

  // text-(length:--custom-property) - special syntax for font-size custom properties
  const lengthCustomMatch = className.match(/^text-\(length:(--[\w-]+)\)$/);
  if (lengthCustomMatch) {
    return `font size ${lengthCustomMatch[1]}`;
  }

  // text-[value] - arbitrary font size value
  // Note: text-(--custom) and text-[color] are now handled by matchTextColorPattern
  // Font size values typically have units: px, rem, em, %, etc.
  const arbitraryMatch = className.match(/^text-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Check if it looks like a font size (has units like px, rem, em, %, vh, vw, etc.)
    if (/\d+(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|lh)/.test(value)) {
      return `font size ${value}`;
    }
  }

  return null;
}

/**
 * Try to match letter-spacing/tracking patterns (tracking-*)
 */

export function matchLetterSpacingPattern(className: string): string | null {
  // tracking-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^(-)?tracking-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    const negative = customPropMatch[1] ? 'negative ' : '';
    return `${negative}letter spacing ${customPropMatch[2]}`;
  }

  // tracking-[value] - arbitrary values
  const arbitraryMatch = className.match(/^(-)?tracking-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const negative = arbitraryMatch[1] ? 'negative ' : '';
    return `${negative}letter spacing ${arbitraryMatch[2]}`;
  }

  // -tracking-<value> - negative tracking values (for custom numeric scales)
  const negativeMatch = className.match(/^-tracking-([\w-]+)$/);
  if (negativeMatch) {
    return `negative tracking ${negativeMatch[1]}`;
  }

  return null;
}

/**
 * Try to match line-height/leading patterns (leading-*)
 */

export function matchLineHeightPattern(className: string): string | null {
  // leading-<number> - numeric line heights (e.g., leading-11, leading-12)
  const numberMatch = className.match(/^leading-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const spacing = SPACING_SCALE[value];
    if (spacing) {
      return `line height ${spacing}`;
    }
    return `line height ${value}`;
  }

  // leading-(<custom-property>) - custom CSS properties
  const customPropMatch = className.match(/^leading-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `line height ${customPropMatch[1]}`;
  }

  // leading-[value] - arbitrary values
  const arbitraryMatch = className.match(/^leading-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `line height ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match list-style-image patterns (list-image-*)
 */

export function matchTextIndentPattern(className: string): string | null {
  // indent-<number> or -indent-<number> - numeric indent values
  const numberMatch = className.match(/^(-)?indent-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const negative = numberMatch[1] ? 'negative ' : '';
    const value = numberMatch[2];
    const spacing = SPACING_SCALE[value];
    if (spacing) {
      return `${negative}text indent ${spacing}`;
    }
    return `${negative}text indent ${value}`;
  }

  // indent-px or -indent-px
  const pxMatch = className.match(/^(-)?indent-px$/);
  if (pxMatch) {
    const negative = pxMatch[1] ? 'negative ' : '';
    return `${negative}1px text indent`;
  }

  // indent-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^(-)?indent-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    const negative = customPropMatch[1] ? 'negative ' : '';
    return `${negative}text indent ${customPropMatch[2]}`;
  }

  // indent-[value] - arbitrary values
  const arbitraryMatch = className.match(/^(-)?indent-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const negative = arbitraryMatch[1] ? 'negative ' : '';
    return `${negative}text indent ${arbitraryMatch[2]}`;
  }

  return null;
}

/**
 * Try to match list-style-type patterns (list-*)
 */

export function matchVerticalAlignPattern(className: string): string | null {
  // align-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^align-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `vertical align ${customPropMatch[1]}`;
  }

  // align-[value] - arbitrary values
  const arbitraryMatch = className.match(/^align-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `vertical align ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match text-indent patterns (indent-*)
 */

export function matchListImagePattern(className: string): string | null {
  // list-image-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^list-image-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `list marker image ${customPropMatch[1]}`;
  }

  // list-image-[value] - arbitrary values (typically url(...))
  const arbitraryMatch = className.match(/^list-image-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `list marker image ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match content patterns for pseudo-elements (content-*)
 */

export function matchListStyleTypePattern(className: string): string | null {
  // list-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^list-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `list marker ${customPropMatch[1]}`;
  }

  // list-[value] - arbitrary values (e.g., list-[upper-roman], list-[square])
  const arbitraryMatch = className.match(/^list-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `list marker ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match decoration color custom properties and arbitrary values (decoration-*)
 */

export function matchContentPattern(className: string): string | null {
  // content-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^content-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `pseudo-element content ${customPropMatch[1]}`;
  }

  // content-[value] - arbitrary values
  const arbitraryMatch = className.match(/^content-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `pseudo-element content ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match vertical-align patterns (align-*)
 */

export function matchTypographyPattern(className: string): string | null {
  // Underline offset: underline-offset-3, underline-offset-12, -underline-offset-2
  const underlineOffsetMatch = className.match(/^(-)?underline-offset-(\d+)$/);
  if (underlineOffsetMatch) {
    const negative = underlineOffsetMatch[1] ? 'negative ' : '';
    const value = underlineOffsetMatch[2];
    const size = SPACING_SCALE[value] || `${value}px`;
    return `${negative}underline offset ${size}`;
  }

  // underline-offset-(--custom-property) - custom CSS properties
  const underlineOffsetCustomMatch = className.match(
    /^(-)?underline-offset-\((--[\w-]+)\)$/
  );
  if (underlineOffsetCustomMatch) {
    const negative = underlineOffsetCustomMatch[1] ? 'negative ' : '';
    return `${negative}underline offset ${underlineOffsetCustomMatch[2]}`;
  }

  // underline-offset-[value] - arbitrary values
  const underlineOffsetArbitraryMatch = className.match(
    /^(-)?underline-offset-\[(.+?)\]$/
  );
  if (underlineOffsetArbitraryMatch) {
    const negative = underlineOffsetArbitraryMatch[1] ? 'negative ' : '';
    return `${negative}underline offset ${underlineOffsetArbitraryMatch[2]}`;
  }

  // Decoration thickness: decoration-3, decoration-5
  const decorationThicknessMatch = className.match(/^decoration-(\d+)$/);
  if (decorationThicknessMatch) {
    const value = decorationThicknessMatch[1];
    return `${value}px decoration`;
  }

  // decoration-(length:--custom-property) - special syntax for decoration thickness
  const decorationLengthCustomMatch = className.match(
    /^decoration-\(length:(--[\w-]+)\)$/
  );
  if (decorationLengthCustomMatch) {
    return `decoration thickness ${decorationLengthCustomMatch[1]}`;
  }

  // decoration-[value] - arbitrary decoration thickness values (with length units)
  const decorationArbitraryMatch = className.match(/^decoration-\[(.+?)\]$/);
  if (decorationArbitraryMatch) {
    const value = decorationArbitraryMatch[1];
    // Check if it looks like a thickness value (has length units like px, rem, em, etc.)
    if (/\d+(px|rem|em|%|vh|vw|vmin|vmax|ch|ex|lh)/.test(value)) {
      return `decoration thickness ${value}`;
    }
    // Otherwise, let matchDecorationColorPattern handle it (colors)
  }

  // Line clamp: line-clamp-3, line-clamp-[7], line-clamp-(--custom)
  const lineClampNumberMatch = className.match(/^line-clamp-(\d+)$/);
  if (lineClampNumberMatch) {
    return `line clamp ${lineClampNumberMatch[1]}`;
  }
  const lineClampCustomMatch = className.match(/^line-clamp-\((--[\w-]+)\)$/);
  if (lineClampCustomMatch) {
    return `line clamp ${lineClampCustomMatch[1]}`;
  }
  const lineClampArbitraryMatch = className.match(/^line-clamp-\[(.+?)\]$/);
  if (lineClampArbitraryMatch) {
    return `line clamp ${lineClampArbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match grid layout patterns (col-span-*, row-start-*, etc.)
 */
