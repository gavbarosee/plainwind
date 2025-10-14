/**
 * Sizing pattern matchers
 */

import { SPACING_SCALE } from './helpers';

export function matchSizingPattern(className: string): string | null {
  // Width patterns: w-12, w-64, w-96
  const widthMatch = className.match(/^w-(\d+(?:\.\d+)?)$/);
  if (widthMatch) {
    const value = widthMatch[1];
    const size = SPACING_SCALE[value] || `${value}`;
    return `width ${size}`;
  }

  // Height patterns: h-12, h-64, h-96
  const heightMatch = className.match(/^h-(\d+(?:\.\d+)?)$/);
  if (heightMatch) {
    const value = heightMatch[1];
    const size = SPACING_SCALE[value] || `${value}`;
    return `height ${size}`;
  }

  // Min-width: min-w-0, min-w-full
  if (className === 'min-w-0') return 'min width 0';
  if (className === 'min-w-full') return 'min width full';

  // Min-height: min-h-0, min-h-full, min-h-screen
  if (className === 'min-h-0') return 'min height 0';
  if (className === 'min-h-full') return 'min height full';

  // Size shorthand: size-10, size-px, size-[72px]
  const sizeNumberMatch = className.match(/^size-(\d+(?:\.\d+)?)$/);
  if (sizeNumberMatch) {
    const value = sizeNumberMatch[1];
    const size = SPACING_SCALE[value] || `${value}`;
    return `width and height ${size}`;
  }

  if (className === 'size-px') {
    return 'width and height 1px';
  }

  const sizeKeywordMatch = className.match(/^size-(full|min|max|fit|auto)$/);
  if (sizeKeywordMatch) {
    const kw = sizeKeywordMatch[1];
    return `width and height ${kw}`;
  }

  const sizeArbitraryMatch = className.match(/^size-\[(.+?)\]$/);
  if (sizeArbitraryMatch) {
    const value = sizeArbitraryMatch[1];
    return `width and height ${value}`;
  }

  // Max-width and max-height are already in static mappings

  return null;
}

/**
 * Try to match aspect ratio patterns (aspect-*, aspect-X/Y)
 */

export function matchWidthPattern(className: string): string | null {
  // w-(--custom-property)
  const customPropMatch = className.match(/^w-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `width ${customPropMatch[1]}`;
  }

  // w-[value]
  const arbitraryMatch = className.match(/^w-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `width ${arbitraryMatch[1]}`;
  }

  // w-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^w-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `width ${value}`;
  }

  // w-<fraction> (fractions like w-3/7, w-8/12, etc.)
  const fractionMatch = className.match(/^w-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `width ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match size patterns (size-* for both width and height)
 */

export function matchHeightPattern(className: string): string | null {
  // h-(--custom-property)
  const customPropMatch = className.match(/^h-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `height ${customPropMatch[1]}`;
  }

  // h-[value]
  const arbitraryMatch = className.match(/^h-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `height ${arbitraryMatch[1]}`;
  }

  // h-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^h-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `height ${value}`;
  }

  // h-<fraction> (fractions like h-3/7, h-8/12, h-9/10, etc.)
  const fractionMatch = className.match(/^h-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `height ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match min-height patterns (min-h-*)
 */

export function matchMinWidthPattern(className: string): string | null {
  // min-w-(--custom-property)
  const customPropMatch = className.match(/^min-w-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `minimum width ${customPropMatch[1]}`;
  }

  // min-w-[value]
  const arbitraryMatch = className.match(/^min-w-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `minimum width ${arbitraryMatch[1]}`;
  }

  // min-w-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^min-w-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `minimum width ${value}`;
  }

  // min-w-<fraction> (fractions like min-w-3/7, min-w-8/12, etc.)
  const fractionMatch = className.match(/^min-w-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `minimum width ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match max-width patterns (max-w-*)
 */

export function matchMaxWidthPattern(className: string): string | null {
  // max-w-(--custom-property)
  const customPropMatch = className.match(/^max-w-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `max width ${customPropMatch[1]}`;
  }

  // max-w-[value]
  const arbitraryMatch = className.match(/^max-w-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `max width ${arbitraryMatch[1]}`;
  }

  // max-w-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^max-w-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `max width ${value}`;
  }

  // max-w-<fraction> (fractions like max-w-3/7, max-w-8/12, max-w-9/10, etc.)
  const fractionMatch = className.match(/^max-w-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `max width ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match height patterns (h-*)
 */

export function matchMinHeightPattern(className: string): string | null {
  // min-h-(--custom-property)
  const customPropMatch = className.match(/^min-h-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `minimum height ${customPropMatch[1]}`;
  }

  // min-h-[value]
  const arbitraryMatch = className.match(/^min-h-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `minimum height ${arbitraryMatch[1]}`;
  }

  // min-h-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^min-h-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `minimum height ${value}`;
  }

  // min-h-<fraction> (fractions like min-h-3/7, min-h-8/12, min-h-9/10, etc.)
  const fractionMatch = className.match(/^min-h-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `minimum height ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match max-height patterns (max-h-*)
 */

export function matchMaxHeightPattern(className: string): string | null {
  // max-h-(--custom-property)
  const customPropMatch = className.match(/^max-h-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `max height ${customPropMatch[1]}`;
  }

  // max-h-[value]
  const arbitraryMatch = className.match(/^max-h-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `max height ${arbitraryMatch[1]}`;
  }

  // max-h-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^max-h-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `max height ${value}`;
  }

  // max-h-<fraction> (fractions like max-h-3/7, max-h-8/12, max-h-9/10, etc.)
  const fractionMatch = className.match(/^max-h-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `max height ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match font-family patterns (font-*)
 */

export function matchSizePattern(className: string): string | null {
  // size-(--custom-property)
  const customPropMatch = className.match(/^size-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `width and height ${customPropMatch[1]}`;
  }

  // size-[value]
  const arbitraryMatch = className.match(/^size-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `width and height ${arbitraryMatch[1]}`;
  }

  // size-<number> (dynamic numbers beyond standard scale)
  const numberMatch = className.match(/^size-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `width and height ${value}`;
  }

  // size-<fraction> (fractions like size-3/7, size-8/12, etc.)
  const fractionMatch = className.match(/^size-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = fractionMatch[1];
    const denominator = fractionMatch[2];
    return `width and height ${numerator}/${denominator}`;
  }

  return null;
}

/**
 * Try to match min-width patterns (min-w-*)
 */
