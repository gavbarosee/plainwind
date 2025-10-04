/**
 * Pattern-based translation for dynamic Tailwind classes
 */

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
 * Try to match color patterns (bg-*, text-*, border-*, etc.)
 */
export function matchColorPattern(className: string): string | null {
  // Color names
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
  };

  // Shade descriptions
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

  return null;
}
