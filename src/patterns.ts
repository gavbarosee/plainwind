/**
 * Pattern-based translation for dynamic Tailwind classes
 */

// Color names used across Tailwind
const colorNames: Record<string, string> = {
  slate: "slate",
  gray: "gray",
  zinc: "zinc",
  neutral: "neutral",
  stone: "stone",
  red: "red",
  orange: "orange",
  amber: "amber",
  yellow: "yellow",
  lime: "lime",
  green: "green",
  emerald: "emerald",
  teal: "teal",
  cyan: "cyan",
  sky: "sky",
  blue: "blue",
  indigo: "indigo",
  violet: "violet",
  purple: "purple",
  fuchsia: "fuchsia",
  pink: "pink",
  rose: "rose",
  white: "white",
  black: "black",
};

// Shade descriptions for color variants
const shadeDescriptions: Record<string, string> = {
  "50": "very light",
  "100": "light",
  "200": "lighter",
  "300": "light",
  "400": "medium light",
  "500": "medium",
  "600": "medium dark",
  "700": "dark",
  "800": "darker",
  "900": "very dark",
  "950": "extremely dark",
};

// Spacing scale (Tailwind default)
const spacingScale: Record<string, string> = {
  "0": "0",
  "0.5": "0.125rem",
  "1": "0.25rem",
  "1.5": "0.375rem",
  "2": "0.5rem",
  "2.5": "0.625rem",
  "3": "0.75rem",
  "3.5": "0.875rem",
  "4": "1rem",
  "5": "1.25rem",
  "6": "1.5rem",
  "7": "1.75rem",
  "8": "2rem",
  "9": "2.25rem",
  "10": "2.5rem",
  "11": "2.75rem",
  "12": "3rem",
  "14": "3.5rem",
  "16": "4rem",
  "20": "5rem",
  "24": "6rem",
  "28": "7rem",
  "32": "8rem",
  "36": "9rem",
  "40": "10rem",
  "44": "11rem",
  "48": "12rem",
  "52": "13rem",
  "56": "14rem",
  "60": "15rem",
  "64": "16rem",
  "72": "18rem",
  "80": "20rem",
  "96": "24rem",
};

/**
 * Try to match spacing patterns (p-*, m-*, gap-*, space-*, etc.)
 */
export function matchSpacingPattern(className: string): string | null {
  // Padding patterns: p-4, px-2, py-6, pt-4, pr-4, pb-4, pl-4
  const paddingMatch = className.match(/^p([xytrbl]?)-(.+)$/);
  if (paddingMatch) {
    const direction = paddingMatch[1];
    const value = paddingMatch[2];
    const spacing = spacingScale[value] || value;

    const directionMap: Record<string, string> = {
      "": "padding",
      x: "horizontal padding",
      y: "vertical padding",
      t: "top padding",
      r: "right padding",
      b: "bottom padding",
      l: "left padding",
    };

    return `${directionMap[direction] || "padding"} ${spacing}`;
  }

  // Margin patterns: m-4, mx-auto, my-2, mt-4, mr-4, mb-4, ml-4
  const marginMatch = className.match(/^m([xytrbl]?)-(.+)$/);
  if (marginMatch) {
    const direction = marginMatch[1];
    const value = marginMatch[2];

    if (value === "auto") {
      if (direction === "x") return "horizontally centered";
      if (direction === "y") return "vertically centered";
      return "centered with auto margin";
    }

    const spacing = spacingScale[value] || value;

    const directionMap: Record<string, string> = {
      "": "margin",
      x: "horizontal margin",
      y: "vertical margin",
      t: "top margin",
      r: "right margin",
      b: "bottom margin",
      l: "left margin",
    };

    return `${directionMap[direction] || "margin"} ${spacing}`;
  }

  // Gap patterns: gap-4, gap-x-2, gap-y-4
  const gapMatch = className.match(/^gap-([xy]-)?([\d.]+)$/);
  if (gapMatch) {
    const direction = gapMatch[1];
    const value = gapMatch[2];
    const spacing = spacingScale[value] || value;

    if (direction === "x-") return `horizontal gap ${spacing}`;
    if (direction === "y-") return `vertical gap ${spacing}`;
    return `gap ${spacing}`;
  }

  // Space between patterns: space-x-4, space-y-2
  const spaceMatch = className.match(/^space-([xy])-(.+)$/);
  if (spaceMatch) {
    const direction = spaceMatch[1];
    const value = spaceMatch[2];
    const spacing = spacingScale[value] || value;

    return direction === "x"
      ? `horizontal space ${spacing}`
      : `vertical space ${spacing}`;
  }

  return null;
}

/**
 * Try to match sizing patterns (w-*, h-*, min-*, max-*)
 */
export function matchSizingPattern(className: string): string | null {
  // Width patterns: w-12, w-64, w-96
  const widthMatch = className.match(/^w-(\d+(?:\.\d+)?)$/);
  if (widthMatch) {
    const value = widthMatch[1];
    const size = spacingScale[value] || `${value}`;
    return `width ${size}`;
  }

  // Height patterns: h-12, h-64, h-96
  const heightMatch = className.match(/^h-(\d+(?:\.\d+)?)$/);
  if (heightMatch) {
    const value = heightMatch[1];
    const size = spacingScale[value] || `${value}`;
    return `height ${size}`;
  }

  // Min-width: min-w-0, min-w-full
  if (className === "min-w-0") return "min width 0";
  if (className === "min-w-full") return "min width full";

  // Min-height: min-h-0, min-h-full, min-h-screen
  if (className === "min-h-0") return "min height 0";
  if (className === "min-h-full") return "min height full";

  // Max-width and max-height are already in static mappings

  return null;
}

/**
 * Try to match typography patterns (underline-offset-*, decoration-*)
 */
export function matchTypographyPattern(className: string): string | null {
  // Underline offset: underline-offset-3, underline-offset-12
  const underlineOffsetMatch = className.match(/^underline-offset-(\d+)$/);
  if (underlineOffsetMatch) {
    const value = underlineOffsetMatch[1];
    const size = spacingScale[value] || `${value}px`;
    return `underline offset ${size}`;
  }

  // Decoration thickness: decoration-3, decoration-5
  const decorationThicknessMatch = className.match(/^decoration-(\d+)$/);
  if (decorationThicknessMatch) {
    const value = decorationThicknessMatch[1];
    return `${value}px decoration`;
  }

  return null;
}

/**
 * Try to match grid layout patterns (col-span-*, row-start-*, etc.)
 */
export function matchGridPattern(className: string): string | null {
  // Column span: col-span-5, col-span-8
  const colSpanMatch = className.match(/^col-span-(\d+)$/);
  if (colSpanMatch) {
    const value = colSpanMatch[1];
    return `spans ${value} columns`;
  }

  // Row span: row-span-4, row-span-6
  const rowSpanMatch = className.match(/^row-span-(\d+)$/);
  if (rowSpanMatch) {
    const value = rowSpanMatch[1];
    return `spans ${value} rows`;
  }

  // Column start: col-start-4, col-start-7
  const colStartMatch = className.match(/^col-start-(\d+)$/);
  if (colStartMatch) {
    const value = colStartMatch[1];
    return `starts at column ${value}`;
  }

  // Column end: col-end-5, col-end-13
  const colEndMatch = className.match(/^col-end-(\d+)$/);
  if (colEndMatch) {
    const value = colEndMatch[1];
    return `ends at column ${value}`;
  }

  // Row start: row-start-4, row-start-7
  const rowStartMatch = className.match(/^row-start-(\d+)$/);
  if (rowStartMatch) {
    const value = rowStartMatch[1];
    return `starts at row ${value}`;
  }

  // Row end: row-end-5, row-end-8
  const rowEndMatch = className.match(/^row-end-(\d+)$/);
  if (rowEndMatch) {
    const value = rowEndMatch[1];
    return `ends at row ${value}`;
  }

  return null;
}

/**
 * Try to match positioning patterns (top-*, -bottom-*, inset-*, etc.)
 */
export function matchPositioningPattern(className: string): string | null {
  // Negative positioning: -top-4, -bottom-px, -left-8
  const negativeMatch = className.match(
    /^-(top|right|bottom|left|inset)-(.+)$/
  );
  if (negativeMatch) {
    const direction = negativeMatch[1];
    const value = negativeMatch[2];
    const size = value === "px" ? "1px" : spacingScale[value] || `${value}`;
    return `-${size} from ${direction}`;
  }

  // Positive positioning: top-4, bottom-0, left-8
  const positiveMatch = className.match(/^(top|right|bottom|left|inset)-(.+)$/);
  if (positiveMatch) {
    const direction = positiveMatch[1];
    const value = positiveMatch[2];
    const size = value === "px" ? "1px" : spacingScale[value] || `${value}`;
    return `${size} from ${direction}`;
  }

  return null;
}

/**
 * Try to match color patterns (bg-*, text-*, border-*, etc.)
 */
export function matchColorPattern(className: string): string | null {
  // Background colors: bg-blue-500, bg-slate-800
  const bgMatch = className.match(/^bg-(\w+)-(\d+)$/);
  if (bgMatch) {
    const color = colorNames[bgMatch[1]];
    const shade = shadeDescriptions[bgMatch[2]];
    if (color && shade) {
      return `${shade} ${color} background`;
    }
    if (color) {
      return `${color} ${bgMatch[2]} background`;
    }
  }

  // Text colors: text-blue-500, text-slate-900
  const textMatch = className.match(/^text-(\w+)-(\d+)$/);
  if (textMatch) {
    const color = colorNames[textMatch[1]];
    const shade = shadeDescriptions[textMatch[2]];
    if (color && shade) {
      return `${shade} ${color} text`;
    }
    if (color) {
      return `${color} ${textMatch[2]} text`;
    }
  }

  // Border colors: border-slate-200, border-blue-500
  const borderColorMatch = className.match(/^border-(\w+)-(\d+)$/);
  if (borderColorMatch) {
    const color = colorNames[borderColorMatch[1]];
    const shade = shadeDescriptions[borderColorMatch[2]];
    if (color && shade) {
      return `${shade} ${color} border`;
    }
    if (color) {
      return `${color} ${borderColorMatch[2]} border`;
    }
  }

  // Ring colors: ring-blue-500
  const ringMatch = className.match(/^ring-(\w+)-(\d+)$/);
  if (ringMatch) {
    const color = colorNames[ringMatch[1]];
    const shade = shadeDescriptions[ringMatch[2]];
    if (color && shade) {
      return `${shade} ${color} ring`;
    }
    if (color) {
      return `${color} ${ringMatch[2]} ring`;
    }
  }

  // Divide colors: divide-slate-200
  const divideMatch = className.match(/^divide-(\w+)-(\d+)$/);
  if (divideMatch) {
    const color = colorNames[divideMatch[1]];
    const shade = shadeDescriptions[divideMatch[2]];
    if (color && shade) {
      return `${shade} ${color} divider`;
    }
    if (color) {
      return `${color} ${divideMatch[2]} divider`;
    }
  }

  // SVG fill colors: fill-blue-500, fill-slate-400
  const fillMatch = className.match(/^fill-(\w+)-(\d+)$/);
  if (fillMatch) {
    const color = colorNames[fillMatch[1]];
    const shade = shadeDescriptions[fillMatch[2]];
    if (color && shade) {
      return `${shade} ${color} fill`;
    }
    if (color) {
      return `${color} ${fillMatch[2]} fill`;
    }
  }

  // SVG stroke colors: stroke-blue-500, stroke-slate-400
  const strokeMatch = className.match(/^stroke-(\w+)-(\d+)$/);
  if (strokeMatch) {
    const color = colorNames[strokeMatch[1]];
    const shade = shadeDescriptions[strokeMatch[2]];
    if (color && shade) {
      return `${shade} ${color} stroke`;
    }
    if (color) {
      return `${color} ${strokeMatch[2]} stroke`;
    }
  }

  // Text decoration colors: decoration-blue-500, decoration-sky-400
  const decorationMatch = className.match(/^decoration-(\w+)-(\d+)$/);
  if (decorationMatch) {
    const color = colorNames[decorationMatch[1]];
    const shade = shadeDescriptions[decorationMatch[2]];
    if (color && shade) {
      return `${shade} ${color} decoration`;
    }
    if (color) {
      return `${color} ${decorationMatch[2]} decoration`;
    }
  }

  // Outline colors: outline-blue-500, outline-slate-400
  const outlineMatch = className.match(/^outline-(\w+)-(\d+)$/);
  if (outlineMatch) {
    const color = colorNames[outlineMatch[1]];
    const shade = shadeDescriptions[outlineMatch[2]];
    if (color && shade) {
      return `${shade} ${color} outline`;
    }
    if (color) {
      return `${color} ${outlineMatch[2]} outline`;
    }
  }

  return null;
}

/**
 * Try to match arbitrary value patterns like min-h-[300px], w-[200px], bg-[#ff0000]
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
    // Spacing
    p: "padding",
    m: "margin",
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
  };

  const propertyName = propertyMap[property] || property;
  return `${propertyName} ${value}`;
}

/**
 * Try to match gradient patterns
 */
export function matchGradientPattern(className: string): string | null {
  // Gradient directions: bg-gradient-to-r, bg-gradient-to-br, etc.
  const gradientDirMatch = className.match(/^bg-gradient-to-([a-z]+)$/);
  if (gradientDirMatch) {
    const dirMap: Record<string, string> = {
      t: "top",
      tr: "top right",
      r: "right",
      br: "bottom right",
      b: "bottom",
      bl: "bottom left",
      l: "left",
      tl: "top left",
    };
    const direction = dirMap[gradientDirMatch[1]] || gradientDirMatch[1];
    return `gradient to ${direction}`;
  }

  // Gradient from: from-blue-500, from-slate-50
  const fromMatch = className.match(/^from-(\w+)-(\d+)$/);
  if (fromMatch) {
    const color = colorNames[fromMatch[1]];
    const shade = shadeDescriptions[fromMatch[2]];
    if (color && shade) {
      return `gradient from ${shade} ${color}`;
    }
    if (color) {
      return `gradient from ${color}`;
    }
  }

  // Gradient via: via-blue-500, via-slate-100
  const viaMatch = className.match(/^via-(\w+)-(\d+)$/);
  if (viaMatch) {
    const color = colorNames[viaMatch[1]];
    const shade = shadeDescriptions[viaMatch[2]];
    if (color && shade) {
      return `gradient via ${shade} ${color}`;
    }
    if (color) {
      return `gradient via ${color}`;
    }
  }

  // Gradient to: to-blue-500, to-indigo-950
  const toMatch = className.match(/^to-(\w+)-(\d+)$/);
  if (toMatch) {
    const color = colorNames[toMatch[1]];
    const shade = shadeDescriptions[toMatch[2]];
    if (color && shade) {
      return `gradient to ${shade} ${color}`;
    }
    if (color) {
      return `gradient to ${color}`;
    }
  }

  return null;
}
