/**
 * Borders pattern matchers
 */

import { COLOR_NAMES, SHADE_DESCRIPTIONS } from './helpers';

export function matchBorderWidthPattern(className: string): string | null {
  // border-<number> - all sides
  const allSidesNumber = className.match(/^border-(\d+)$/);
  if (allSidesNumber) {
    return `${allSidesNumber[1]}px border on all sides`;
  }

  // border-(length:--custom-property) - all sides
  const allSidesCustom = className.match(/^border-\(length:(--[\w-]+)\)$/);
  if (allSidesCustom) {
    return `border width ${allSidesCustom[1]} on all sides`;
  }

  // border-[value] - all sides arbitrary
  const allSidesArbitrary = className.match(/^border-\[(.+?)\]$/);
  if (allSidesArbitrary) {
    return `border width ${allSidesArbitrary[1]} on all sides`;
  }

  // border-{side}-<number> - individual sides
  const sideNumber = className.match(/^border-([trblxyse])-(\d+)$/);
  if (sideNumber) {
    const sideMap: Record<string, string> = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      x: 'horizontal',
      y: 'vertical',
      s: 'start',
      e: 'end',
    };
    return `${sideNumber[2]}px ${sideMap[sideNumber[1]]} border`;
  }

  // border-{side}-(length:--custom-property)
  const sideCustom = className.match(
    /^border-([trblxyse])-\(length:(--[\w-]+)\)$/
  );
  if (sideCustom) {
    const sideMap: Record<string, string> = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      x: 'horizontal',
      y: 'vertical',
      s: 'start',
      e: 'end',
    };
    return `${sideMap[sideCustom[1]]} border width ${sideCustom[2]}`;
  }

  // border-{side}-[value]
  const sideArbitrary = className.match(/^border-([trblxyse])-\[(.+?)\]$/);
  if (sideArbitrary) {
    const sideMap: Record<string, string> = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      x: 'horizontal',
      y: 'vertical',
      s: 'start',
      e: 'end',
    };
    return `${sideMap[sideArbitrary[1]]} border width ${sideArbitrary[2]}`;
  }

  // divide-x-<number>, divide-y-<number>
  const divideNumber = className.match(/^divide-([xy])-(\d+)$/);
  if (divideNumber) {
    const direction = divideNumber[1] === 'x' ? 'vertical' : 'horizontal';
    return `${divideNumber[2]}px ${direction} dividers between children`;
  }

  // divide-x-(length:--custom-property), divide-y-(length:--custom-property)
  const divideCustom = className.match(/^divide-([xy])-\(length:(--[\w-]+)\)$/);
  if (divideCustom) {
    const direction = divideCustom[1] === 'x' ? 'vertical' : 'horizontal';
    return `${direction} dividers ${divideCustom[2]} between children`;
  }

  // divide-x-[value], divide-y-[value]
  const divideArbitrary = className.match(/^divide-([xy])-\[(.+?)\]$/);
  if (divideArbitrary) {
    const direction = divideArbitrary[1] === 'x' ? 'vertical' : 'horizontal';
    return `${direction} dividers ${divideArbitrary[2]} between children`;
  }

  return null;
}

/**
 * Try to match border-color patterns (border-*, with custom properties and arbitrary values)
 */

export function matchBorderColorPattern(className: string): string | null {
  // border-(--custom-property) - all sides (untyped custom property = color)
  const allSidesCustom = className.match(/^border-\((--[\w-]+)\)$/);
  if (allSidesCustom) {
    return `border color ${allSidesCustom[1]}`;
  }

  // border-[value] - all sides arbitrary (only if it looks like a color)
  const allSidesArbitrary = className.match(/^border-\[(.+?)\]$/);
  if (allSidesArbitrary) {
    const value = allSidesArbitrary[1];
    // Check if it looks like a color value
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      return `border color ${value}`;
    }
    // Otherwise, let matchBorderWidthPattern handle it (width)
  }

  // border-{side}-(--custom-property) - individual sides (t, r, b, l, x, y, s, e)
  const sideCustom = className.match(/^border-([trblxyse])-\((--[\w-]+)\)$/);
  if (sideCustom) {
    const sideMap: Record<string, string> = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      x: 'horizontal',
      y: 'vertical',
      s: 'start',
      e: 'end',
    };
    return `${sideMap[sideCustom[1]]} border color ${sideCustom[2]}`;
  }

  // border-{side}-[value] - individual sides arbitrary (only if it looks like a color)
  const sideArbitrary = className.match(/^border-([trblxyse])-\[(.+?)\]$/);
  if (sideArbitrary) {
    const value = sideArbitrary[2];
    // Check if it looks like a color value
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      const sideMap: Record<string, string> = {
        t: 'top',
        r: 'right',
        b: 'bottom',
        l: 'left',
        x: 'horizontal',
        y: 'vertical',
        s: 'start',
        e: 'end',
      };
      return `${sideMap[sideArbitrary[1]]} border color ${value}`;
    }
    // Otherwise, let matchBorderWidthPattern handle it (width)
  }

  // border-x-<color>-<shade>, border-y-<color>-<shade>, border-s-<color>-<shade>, border-e-<color>-<shade>
  const sideDirColorMatch = className.match(/^border-([xyse])-(\w+)-(\d+)$/);
  if (sideDirColorMatch) {
    const side = sideDirColorMatch[1];
    const color = COLOR_NAMES[sideDirColorMatch[2]];
    const shade = SHADE_DESCRIPTIONS[sideDirColorMatch[3]];

    const sideMap: Record<string, string> = {
      x: 'horizontal',
      y: 'vertical',
      s: 'start',
      e: 'end',
    };

    if (color && shade) {
      return `${shade} ${color} ${sideMap[side]} border`;
    }
    if (color) {
      return `${color} ${sideMap[side]} border`;
    }
  }

  return null;
}

/**
 * Try to match border-radius patterns (rounded-*)
 */

export function matchBorderRadiusPattern(className: string): string | null {
  // rounded-(--custom-property) - all sides
  const allSidesCustom = className.match(/^rounded-\((--[\w-]+)\)$/);
  if (allSidesCustom) {
    return `rounded corners ${allSidesCustom[1]}`;
  }

  // rounded-[value] - all sides arbitrary
  const allSidesArbitrary = className.match(/^rounded-\[(.+?)\]$/);
  if (allSidesArbitrary) {
    return `rounded corners ${allSidesArbitrary[1]}`;
  }

  // rounded-{side}-(--custom-property) - sides (t, r, b, l, s, e)
  const sideCustom = className.match(/^rounded-([trblse])-\((--[\w-]+)\)$/);
  if (sideCustom) {
    const sideMap: Record<string, string> = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      s: 'start',
      e: 'end',
    };
    return `rounded ${sideMap[sideCustom[1]]} corners ${sideCustom[2]}`;
  }

  // rounded-{side}-[value] - sides arbitrary
  const sideArbitrary = className.match(/^rounded-([trblse])-\[(.+?)\]$/);
  if (sideArbitrary) {
    const sideMap: Record<string, string> = {
      t: 'top',
      r: 'right',
      b: 'bottom',
      l: 'left',
      s: 'start',
      e: 'end',
    };
    return `rounded ${sideMap[sideArbitrary[1]]} corners ${sideArbitrary[2]}`;
  }

  // rounded-{corner}-(--custom-property) - corners (tl, tr, br, bl, ss, se, ee, es)
  const cornerCustom = className.match(
    /^rounded-(tl|tr|br|bl|ss|se|ee|es)-\((--[\w-]+)\)$/
  );
  if (cornerCustom) {
    const cornerMap: Record<string, string> = {
      tl: 'top-left',
      tr: 'top-right',
      br: 'bottom-right',
      bl: 'bottom-left',
      ss: 'start-start',
      se: 'start-end',
      ee: 'end-end',
      es: 'end-start',
    };
    return `rounded ${cornerMap[cornerCustom[1]]} corner ${cornerCustom[2]}`;
  }

  // rounded-{corner}-[value] - corners arbitrary
  const cornerArbitrary = className.match(
    /^rounded-(tl|tr|br|bl|ss|se|ee|es)-\[(.+?)\]$/
  );
  if (cornerArbitrary) {
    const cornerMap: Record<string, string> = {
      tl: 'top-left',
      tr: 'top-right',
      br: 'bottom-right',
      bl: 'bottom-left',
      ss: 'start-start',
      se: 'start-end',
      ee: 'end-end',
      es: 'end-start',
    };
    return `rounded ${cornerMap[cornerArbitrary[1]]} corner ${cornerArbitrary[2]}`;
  }

  return null;
}

/**
 * Try to match outline-width patterns (outline-*, outline-<number>)
 */

export function matchBorderSpacingPattern(className: string): string | null {
  // border-spacing-x-(<custom-property>) - custom CSS property for horizontal border spacing
  const xCustomPropMatch = className.match(/^border-spacing-x-\((--[\w-]+)\)$/);
  if (xCustomPropMatch) {
    return `horizontal border spacing ${xCustomPropMatch[1]}`;
  }

  // border-spacing-y-(<custom-property>) - custom CSS property for vertical border spacing
  const yCustomPropMatch = className.match(/^border-spacing-y-\((--[\w-]+)\)$/);
  if (yCustomPropMatch) {
    return `vertical border spacing ${yCustomPropMatch[1]}`;
  }

  // border-spacing-(<custom-property>) - custom CSS property for border spacing
  const customPropMatch = className.match(/^border-spacing-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `border spacing ${customPropMatch[1]}`;
  }

  // border-spacing-x-[value] - arbitrary horizontal border spacing value
  const xArbitraryMatch = className.match(/^border-spacing-x-\[(.+?)\]$/);
  if (xArbitraryMatch) {
    return `horizontal border spacing ${xArbitraryMatch[1]}`;
  }

  // border-spacing-y-[value] - arbitrary vertical border spacing value
  const yArbitraryMatch = className.match(/^border-spacing-y-\[(.+?)\]$/);
  if (yArbitraryMatch) {
    return `vertical border spacing ${yArbitraryMatch[1]}`;
  }

  // border-spacing-[value] - arbitrary border spacing value
  const arbitraryMatch = className.match(/^border-spacing-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `border spacing ${arbitraryMatch[1]}`;
  }

  // border-spacing-x-<number> - horizontal border spacing scale
  const xNumberMatch = className.match(/^border-spacing-x-(\d+(?:\.\d+)?)$/);
  if (xNumberMatch) {
    return `horizontal border spacing ${xNumberMatch[1]}`;
  }

  // border-spacing-y-<number> - vertical border spacing scale
  const yNumberMatch = className.match(/^border-spacing-y-(\d+(?:\.\d+)?)$/);
  if (yNumberMatch) {
    return `vertical border spacing ${yNumberMatch[1]}`;
  }

  // border-spacing-<number> - border spacing scale
  const numberMatch = className.match(/^border-spacing-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    return `border spacing ${numberMatch[1]}`;
  }

  return null;
}

/**
 * Try to match background size patterns (bg-size-*)
 */

export function matchOutlineWidthPattern(className: string): string | null {
  // outline-<number> - dynamic numbers
  const numberMatch = className.match(/^outline-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}px outline`;
  }

  // outline-(length:--custom-property)
  const customPropMatch = className.match(/^outline-\(length:(--[\w-]+)\)$/);
  if (customPropMatch) {
    return `outline width ${customPropMatch[1]}`;
  }

  // outline-[value] - arbitrary values
  const arbitraryMatch = className.match(/^outline-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `outline width ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match outline-color patterns (outline-*, with custom properties and arbitrary values)
 */

export function matchOutlineOffsetPattern(className: string): string | null {
  // outline-offset-<number> - dynamic numbers
  const numberMatch = className.match(/^outline-offset-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}px outline offset`;
  }

  // -outline-offset-<number> - negative outline offset
  const negativeNumberMatch = className.match(/^-outline-offset-(\d+)$/);
  if (negativeNumberMatch) {
    return `-${negativeNumberMatch[1]}px outline offset`;
  }

  // outline-offset-(<custom-property>)
  const customPropMatch = className.match(/^outline-offset-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `outline offset ${customPropMatch[1]}`;
  }

  // outline-offset-[value] - arbitrary values
  const arbitraryMatch = className.match(/^outline-offset-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `outline offset ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match box-shadow patterns (shadow-*)
 */

export function matchOutlineColorPattern(className: string): string | null {
  // outline-(--custom-property) - untyped custom property = color
  const customPropMatch = className.match(/^outline-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `outline color ${customPropMatch[1]}`;
  }

  // outline-[value] - arbitrary values (only if it looks like a color)
  const arbitraryMatch = className.match(/^outline-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Check if it looks like a color value
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      return `outline color ${value}`;
    }
    // Otherwise, let matchOutlineWidthPattern handle it (could be a width)
  }

  return null;
}

/**
 * Try to match outline-offset patterns (outline-offset-*, -outline-offset-*)
 */
