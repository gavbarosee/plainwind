/**
 * Transitions pattern matchers
 */

export function matchTransitionPropertyPattern(className: string): string | null {
  // transition-(<custom-property>) - custom CSS property for transition property
  const customPropMatch = className.match(/^transition-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `transition property ${customPropMatch[1]}`;
  }

  // transition-[value] - arbitrary transition property value
  const arbitraryMatch = className.match(/^transition-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `transition property ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match transition-duration patterns (duration-*)
 */

export function matchTransitionDurationPattern(className: string): string | null {
  // duration-(<custom-property>) - custom CSS property for transition duration
  const customPropMatch = className.match(/^duration-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `transition duration ${customPropMatch[1]}`;
  }

  // duration-[value] - arbitrary transition duration value
  const arbitraryMatch = className.match(/^duration-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `transition duration ${arbitraryMatch[1]}`;
  }

  // duration-<number> - millisecond duration
  const numberMatch = className.match(/^duration-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}ms transition duration`;
  }

  return null;
}

/**
 * Try to match transition-timing-function patterns (ease-*)
 */

export function matchTransitionDelayPattern(className: string): string | null {
  // delay-(<custom-property>) - custom CSS property for transition delay
  const customPropMatch = className.match(/^delay-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `transition delay ${customPropMatch[1]}`;
  }

  // delay-[value] - arbitrary transition delay value
  const arbitraryMatch = className.match(/^delay-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `transition delay ${arbitraryMatch[1]}`;
  }

  // delay-<number> - millisecond delay
  const numberMatch = className.match(/^delay-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}ms transition delay`;
  }

  return null;
}

/**
 * Try to match animation patterns (animate-*)
 */

export function matchTransitionTimingPattern(className: string): string | null {
  // ease-(<custom-property>) - custom CSS property for transition timing
  const customPropMatch = className.match(/^ease-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `transition timing ${customPropMatch[1]}`;
  }

  // ease-[value] - arbitrary transition timing value
  const arbitraryMatch = className.match(/^ease-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `transition timing ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match transition-delay patterns (delay-*)
 */

export function matchAnimationPattern(className: string): string | null {
  // animate-(<custom-property>) - custom CSS property for animation
  const customPropMatch = className.match(/^animate-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `animation ${customPropMatch[1]}`;
  }

  // animate-[value] - arbitrary animation value
  const arbitraryMatch = className.match(/^animate-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `animation ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match accent-color patterns (accent-*)
 */

export function matchWillChangePattern(className: string): string | null {
  // will-change-(<custom-property>) - custom CSS property for will-change
  const customPropMatch = className.match(/^will-change-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `will change ${customPropMatch[1]}`;
  }

  // will-change-[value] - arbitrary will-change value
  const arbitraryMatch = className.match(/^will-change-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `will change ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match translate patterns (translate-*, translate-x-*, translate-y-*, translate-z-*)
 */

