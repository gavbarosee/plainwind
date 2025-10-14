/**
 * Masks pattern matchers
 */

export function matchMaskImagePattern(className: string): string | null {
  // mask-(<custom-property>) - custom CSS property for mask image
  const customPropMatch = className.match(/^mask-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `mask image ${customPropMatch[1]}`;
  }

  // mask-[value] - arbitrary mask image value
  const arbitraryMatch = className.match(/^mask-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `mask image ${arbitraryMatch[1]}`;
  }

  // mask-linear-<number> - linear gradient with angle
  const linearAngleMatch = className.match(/^mask-linear-(\d+)$/);
  if (linearAngleMatch) {
    return `linear gradient mask ${linearAngleMatch[1]}deg`;
  }

  // -mask-linear-<number> - negative angle linear gradient
  const negativeLinearAngleMatch = className.match(/^-mask-linear-(\d+)$/);
  if (negativeLinearAngleMatch) {
    return `linear gradient mask -${negativeLinearAngleMatch[1]}deg`;
  }

  // mask-linear-from-<number> - linear gradient from position (spacing)
  const linearFromNumberMatch = className.match(/^mask-linear-from-(\d+)$/);
  if (linearFromNumberMatch) {
    return `linear mask from ${linearFromNumberMatch[1]} spacing`;
  }

  // mask-linear-from-<percentage> - linear gradient from position (percentage)
  const linearFromPercentMatch = className.match(/^mask-linear-from-(\d+)%$/);
  if (linearFromPercentMatch) {
    return `linear mask from ${linearFromPercentMatch[1]}%`;
  }

  // mask-linear-from-(<custom-property>)
  const linearFromCustomMatch = className.match(
    /^mask-linear-from-\((--[\w-]+)\)$/
  );
  if (linearFromCustomMatch) {
    return `linear mask from ${linearFromCustomMatch[1]}`;
  }

  // mask-linear-from-[value]
  const linearFromArbitraryMatch = className.match(
    /^mask-linear-from-\[(.+?)\]$/
  );
  if (linearFromArbitraryMatch) {
    return `linear mask from ${linearFromArbitraryMatch[1]}`;
  }

  // mask-linear-to-<number> - linear gradient to position (spacing)
  const linearToNumberMatch = className.match(/^mask-linear-to-(\d+)$/);
  if (linearToNumberMatch) {
    return `linear mask to ${linearToNumberMatch[1]} spacing`;
  }

  // mask-linear-to-<percentage>
  const linearToPercentMatch = className.match(/^mask-linear-to-(\d+)%$/);
  if (linearToPercentMatch) {
    return `linear mask to ${linearToPercentMatch[1]}%`;
  }

  // mask-linear-to-(<custom-property>)
  const linearToCustomMatch = className.match(
    /^mask-linear-to-\((--[\w-]+)\)$/
  );
  if (linearToCustomMatch) {
    return `linear mask to ${linearToCustomMatch[1]}`;
  }

  // mask-linear-to-[value]
  const linearToArbitraryMatch = className.match(/^mask-linear-to-\[(.+?)\]$/);
  if (linearToArbitraryMatch) {
    return `linear mask to ${linearToArbitraryMatch[1]}`;
  }

  // mask-<side>-from/to patterns (t, r, b, l, x, y)
  const sideMatch = className.match(/^mask-([trblxy])-(from|to)-(.+)$/);
  if (sideMatch) {
    const side = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      x: 'horizontal',
      y: 'vertical',
    }[sideMatch[1]];
    const direction = sideMatch[2];
    const value = sideMatch[3];

    // Check for different value types
    if (/^\d+$/.test(value)) {
      return `${side} mask ${direction} ${value} spacing`;
    } else if (/^\d+%$/.test(value)) {
      return `${side} mask ${direction} ${value}`;
    } else if (/^\((--[\w-]+)\)$/.test(value)) {
      return `${side} mask ${direction} ${value.slice(1, -1)}`;
    } else if (/^\[.+\]$/.test(value)) {
      return `${side} mask ${direction} ${value.slice(1, -1)}`;
    }
  }

  // mask-radial-[value] - arbitrary radial gradient
  const radialArbitraryMatch = className.match(/^mask-radial-\[(.+?)\]$/);
  if (radialArbitraryMatch) {
    return `radial mask ${radialArbitraryMatch[1]}`;
  }

  // mask-radial-from-<number>
  const radialFromNumberMatch = className.match(/^mask-radial-from-(\d+)$/);
  if (radialFromNumberMatch) {
    return `radial mask from ${radialFromNumberMatch[1]} spacing`;
  }

  // mask-radial-from-<percentage>
  const radialFromPercentMatch = className.match(/^mask-radial-from-(\d+)%$/);
  if (radialFromPercentMatch) {
    return `radial mask from ${radialFromPercentMatch[1]}%`;
  }

  // mask-radial-from-(<custom-property>)
  const radialFromCustomMatch = className.match(
    /^mask-radial-from-\((--[\w-]+)\)$/
  );
  if (radialFromCustomMatch) {
    return `radial mask from ${radialFromCustomMatch[1]}`;
  }

  // mask-radial-from-[value]
  const radialFromArbitraryMatch = className.match(
    /^mask-radial-from-\[(.+?)\]$/
  );
  if (radialFromArbitraryMatch) {
    return `radial mask from ${radialFromArbitraryMatch[1]}`;
  }

  // mask-radial-to-<number>
  const radialToNumberMatch = className.match(/^mask-radial-to-(\d+)$/);
  if (radialToNumberMatch) {
    return `radial mask to ${radialToNumberMatch[1]} spacing`;
  }

  // mask-radial-to-<percentage>
  const radialToPercentMatch = className.match(/^mask-radial-to-(\d+)%$/);
  if (radialToPercentMatch) {
    return `radial mask to ${radialToPercentMatch[1]}%`;
  }

  // mask-radial-to-(<custom-property>)
  const radialToCustomMatch = className.match(
    /^mask-radial-to-\((--[\w-]+)\)$/
  );
  if (radialToCustomMatch) {
    return `radial mask to ${radialToCustomMatch[1]}`;
  }

  // mask-radial-to-[value]
  const radialToArbitraryMatch = className.match(/^mask-radial-to-\[(.+?)\]$/);
  if (radialToArbitraryMatch) {
    return `radial mask to ${radialToArbitraryMatch[1]}`;
  }

  // mask-radial-at-[value] - arbitrary radial position
  const radialAtArbitraryMatch = className.match(/^mask-radial-at-\[(.+?)\]$/);
  if (radialAtArbitraryMatch) {
    return `radial mask at ${radialAtArbitraryMatch[1]}`;
  }

  // mask-conic-<number> - conic gradient with angle
  const conicAngleMatch = className.match(/^mask-conic-(\d+)$/);
  if (conicAngleMatch) {
    return `conic gradient mask ${conicAngleMatch[1]}deg`;
  }

  // -mask-conic-<number> - negative angle conic gradient
  const negativeConicAngleMatch = className.match(/^-mask-conic-(\d+)$/);
  if (negativeConicAngleMatch) {
    return `conic gradient mask -${negativeConicAngleMatch[1]}deg`;
  }

  // mask-conic-from-<number>
  const conicFromNumberMatch = className.match(/^mask-conic-from-(\d+)$/);
  if (conicFromNumberMatch) {
    return `conic mask from ${conicFromNumberMatch[1]} spacing`;
  }

  // mask-conic-from-<percentage>
  const conicFromPercentMatch = className.match(/^mask-conic-from-(\d+)%$/);
  if (conicFromPercentMatch) {
    return `conic mask from ${conicFromPercentMatch[1]}%`;
  }

  // mask-conic-from-(<custom-property>)
  const conicFromCustomMatch = className.match(
    /^mask-conic-from-\((--[\w-]+)\)$/
  );
  if (conicFromCustomMatch) {
    return `conic mask from ${conicFromCustomMatch[1]}`;
  }

  // mask-conic-from-[value]
  const conicFromArbitraryMatch = className.match(
    /^mask-conic-from-\[(.+?)\]$/
  );
  if (conicFromArbitraryMatch) {
    return `conic mask from ${conicFromArbitraryMatch[1]}`;
  }

  // mask-conic-to-<number>
  const conicToNumberMatch = className.match(/^mask-conic-to-(\d+)$/);
  if (conicToNumberMatch) {
    return `conic mask to ${conicToNumberMatch[1]} spacing`;
  }

  // mask-conic-to-<percentage>
  const conicToPercentMatch = className.match(/^mask-conic-to-(\d+)%$/);
  if (conicToPercentMatch) {
    return `conic mask to ${conicToPercentMatch[1]}%`;
  }

  // mask-conic-to-(<custom-property>)
  const conicToCustomMatch = className.match(/^mask-conic-to-\((--[\w-]+)\)$/);
  if (conicToCustomMatch) {
    return `conic mask to ${conicToCustomMatch[1]}`;
  }

  // mask-conic-to-[value]
  const conicToArbitraryMatch = className.match(/^mask-conic-to-\[(.+?)\]$/);
  if (conicToArbitraryMatch) {
    return `conic mask to ${conicToArbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match mask-position patterns (mask-position-*)
 */

export function matchMaskPositionPattern(className: string): string | null {
  // mask-position-(<custom-property>) - custom CSS property for mask position
  const customPropMatch = className.match(/^mask-position-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `mask position ${customPropMatch[1]}`;
  }

  // mask-position-[value] - arbitrary mask position value
  const arbitraryMatch = className.match(/^mask-position-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `mask position ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match mask-size patterns (mask-size-*)
 */

export function matchMaskSizePattern(className: string): string | null {
  // mask-size-(<custom-property>) - custom CSS property for mask size
  const customPropMatch = className.match(/^mask-size-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `mask size ${customPropMatch[1]}`;
  }

  // mask-size-[value] - arbitrary mask size value
  const arbitraryMatch = className.match(/^mask-size-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `mask size ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match blur patterns (blur-*)
 */
