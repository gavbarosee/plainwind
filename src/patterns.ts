/**
 * Pattern-based translation for dynamic Tailwind classes
 */

/**
 * Color names used across Tailwind
 */
const COLOR_NAMES: Record<string, string> = {
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

/**
 * Shade descriptions for color variants
 */
const SHADE_DESCRIPTIONS: Record<string, string> = {
  "50": "lightest",
  "100": "very light",
  "200": "light",
  "300": "lightish",
  "400": "medium light",
  "500": "medium",
  "600": "medium dark",
  "700": "dark",
  "800": "very dark",
  "900": "darkest",
  "950": "extremely dark",
};

/**
 * Spacing scale (Tailwind default)
 */
const SPACING_SCALE: Record<string, string> = {
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
 * Number word mappings for better readability (1-12)
 */
const NUMBER_WORDS: Record<string, string> = {
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
};

/**
 * Helper: Extract custom property from parentheses, e.g., "(--my-var)" -> "--my-var"
 */
function extractCustomProperty(value: string): string | null {
  const match = value.match(/^\((--[\w-]+)\)$/);
  return match ? match[1] : null;
}

/**
 * Helper: Extract arbitrary value from brackets, e.g., "[10px]" -> "10px"
 */
function extractArbitraryValue(value: string): string | null {
  const match = value.match(/^\[(.+?)\]$/);
  return match ? match[1] : null;
}

/**
 * Helper: Try to match a pattern with custom property, arbitrary value, or number
 * Returns the matched value or null
 */
function matchFlexibleValue(
  className: string,
  prefix: string
): { type: "custom" | "arbitrary" | "number"; value: string } | null {
  if (!className.startsWith(prefix)) {
    return null;
  }

  const suffix = className.slice(prefix.length);

  // Check for custom property: prefix-(--var)
  const customProp = extractCustomProperty(suffix);
  if (customProp) {
    return { type: "custom", value: customProp };
  }

  // Check for arbitrary value: prefix-[value]
  const arbitrary = extractArbitraryValue(suffix);
  if (arbitrary) {
    return { type: "arbitrary", value: arbitrary };
  }

  // Check for number: prefix-123
  if (/^-?\d+$/.test(suffix)) {
    return { type: "number", value: suffix };
  }

  return null;
}

/**
 * Try to match spacing patterns (p-*, m-*, gap-*, space-*, etc.)
 */
export function matchSpacingPattern(className: string): string | null {
  // Padding patterns: p-4, px-2, py-6, pt-4, pr-4, pb-4, pl-4, ps-4, pe-4
  const paddingMatch = className.match(/^p([xytrblse]?)-(.+)$/);
  if (paddingMatch) {
    const direction = paddingMatch[1];
    let value = paddingMatch[2];
    
    // Handle custom properties: p-(--custom) -> --custom
    if (value.startsWith('(--') && value.endsWith(')')) {
      value = value.slice(1, -1);
    }
    // Handle arbitrary values: p-[5px] -> 5px
    else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }
    
    const spacing = SPACING_SCALE[value] || value;

    const directionMap: Record<string, string> = {
      "": "padding",
      x: "horizontal padding",
      y: "vertical padding",
      t: "top padding",
      r: "right padding",
      b: "bottom padding",
      l: "left padding",
      s: "start padding",
      e: "end padding",
    };

    return `${directionMap[direction] || "padding"} ${spacing}`;
  }

  // Margin patterns: m-4, -m-4, mx-auto, my-2, mt-4, mr-4, mb-4, ml-4, ms-4, me-4
  const marginMatch = className.match(/^(-?)m([xytrblse]?)-(.+)$/);
  if (marginMatch) {
    const isNegative = marginMatch[1] === "-";
    const direction = marginMatch[2];
    let value = marginMatch[3];

    if (value === "auto") {
      if (direction === "x") return "horizontally centered";
      if (direction === "y") return "vertically centered";
      return "centered with auto margin";
    }

    // Handle custom properties: m-(--custom) -> --custom
    if (value.startsWith('(--') && value.endsWith(')')) {
      value = value.slice(1, -1);
    }
    // Handle arbitrary values: m-[5px] -> 5px
    else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }

    const spacing = SPACING_SCALE[value] || value;
    const prefix = isNegative ? "negative " : "";

    const directionMap: Record<string, string> = {
      "": "margin",
      x: "horizontal margin",
      y: "vertical margin",
      t: "top margin",
      r: "right margin",
      b: "bottom margin",
      l: "left margin",
      s: "start margin",
      e: "end margin",
    };

    return `${prefix}${directionMap[direction] || "margin"} ${spacing}`;
  }

  // Gap patterns: gap-4, gap-x-2, gap-y-4
  const gapMatch = className.match(/^gap-([xy]-)?([\d.]+)$/);
  if (gapMatch) {
    const direction = gapMatch[1];
    const value = gapMatch[2];
    const spacing = SPACING_SCALE[value] || value;

    if (direction === "x-") return `horizontal gap ${spacing}`;
    if (direction === "y-") return `vertical gap ${spacing}`;
    return `gap ${spacing}`;
  }

  // Space between patterns: space-x-4, -space-x-4, space-y-2, -space-y-2
  const spaceMatch = className.match(/^(-?)space-([xy])-(.+)$/);
  if (spaceMatch) {
    const isNegative = spaceMatch[1] === "-";
    const direction = spaceMatch[2];
    let value = spaceMatch[3];
    
    // Handle custom properties: space-x-(--custom) -> --custom
    if (value.startsWith('(--') && value.endsWith(')')) {
      value = value.slice(1, -1);
    }
    // Handle arbitrary values: space-x-[5px] -> 5px
    else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }
    
    const spacing = SPACING_SCALE[value] || value;
    const prefix = isNegative ? "negative " : "";

    return direction === "x"
      ? `${prefix}horizontal space ${spacing}`
      : `${prefix}vertical space ${spacing}`;
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
  if (className === "min-w-0") return "min width 0";
  if (className === "min-w-full") return "min width full";

  // Min-height: min-h-0, min-h-full, min-h-screen
  if (className === "min-h-0") return "min height 0";
  if (className === "min-h-full") return "min height full";

  // Size shorthand: size-10, size-px, size-[72px]
  const sizeNumberMatch = className.match(/^size-(\d+(?:\.\d+)?)$/);
  if (sizeNumberMatch) {
    const value = sizeNumberMatch[1];
    const size = SPACING_SCALE[value] || `${value}`;
    return `width and height ${size}`;
  }

  if (className === "size-px") {
    return "width and height 1px";
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
export function matchAspectRatioPattern(className: string): string | null {
  // Match aspect-X/Y patterns: aspect-3/2, aspect-16/9, aspect-21/9
  const ratioMatch = className.match(/^aspect-(\d+)\/(\d+)$/);
  if (ratioMatch) {
    const width = ratioMatch[1];
    const height = ratioMatch[2];
    return `${width}:${height} aspect ratio`;
  }

  // Match aspect with custom property: aspect-(--custom-var)
  const customPropMatch = className.match(/^aspect-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `aspect ratio ${customPropMatch[1]}`;
  }

  // Match aspect with arbitrary value: aspect-[value]
  const arbitraryMatch = className.match(/^aspect-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `aspect ratio ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match columns patterns (columns-*, columns-<number>)
 */
export function matchColumnsPattern(className: string): string | null {
  // Match columns-<number> patterns: columns-1, columns-15, columns-20
  const numberMatch = className.match(/^columns-(\d+)$/);
  if (numberMatch) {
    const num = numberMatch[1];
    const numWord = NUMBER_WORDS[num] || num;
    return `${numWord} column layout`;
  }

  // Match columns with custom property: columns-(--custom-var)
  const customPropMatch = className.match(/^columns-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `columns ${customPropMatch[1]}`;
  }

  // Match columns with arbitrary value: columns-[value]
  const arbitraryMatch = className.match(/^columns-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `columns ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match object-position patterns (object-(<custom-property>), object-[<value>])
 */
export function matchObjectPositionPattern(className: string): string | null {
  // Match object with custom property: object-(--custom-var)
  const customPropMatch = className.match(/^object-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `positions content at ${customPropMatch[1]}`;
  }

  // Match object with arbitrary value: object-[value]
  const arbitraryMatch = className.match(/^object-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `positions content at ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match flex-basis patterns (basis-*, basis-<number>, basis-<fraction>)
 */
export function matchFlexBasisPattern(className: string): string | null {
  // Match basis with custom property: basis-(--custom-var)
  const customPropMatch = className.match(/^basis-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex basis ${customPropMatch[1]}`;
  }

  // Match basis with arbitrary value: basis-[value]
  const arbitraryMatch = className.match(/^basis-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex basis ${arbitraryMatch[1]}`;
  }

  // Match basis with fraction: basis-1/2, basis-2/3, etc.
  const fractionMatch = className.match(/^basis-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const [_, num, denom] = fractionMatch;
    const percent = ((Number(num) / Number(denom)) * 100).toFixed(1).replace(/\.0$/, "");
    return `flex basis ${percent}%`;
  }

  // Match basis with number: basis-16, basis-32, basis-64
  const numberMatch = className.match(/^basis-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const size = SPACING_SCALE[value] || `${value}`;
    return `flex basis ${size}`;
  }

  return null;
}

/**
 * Try to match flex patterns (flex-<number>, flex-<fraction>, flex-(<custom-property>), flex-[<value>])
 */
export function matchFlexPattern(className: string): string | null {
  // Match flex with custom property: flex-(--custom-var)
  const customPropMatch = className.match(/^flex-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex ${customPropMatch[1]}`;
  }

  // Match flex with arbitrary value: flex-[value]
  const arbitraryMatch = className.match(/^flex-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex ${arbitraryMatch[1]}`;
  }

  // Match flex with fraction: flex-1/2, flex-2/3, etc.
  const fractionMatch = className.match(/^flex-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const [_, num, denom] = fractionMatch;
    const percent = ((Number(num) / Number(denom)) * 100).toFixed(1).replace(/\.0$/, "");
    return `flex ${percent}%`;
  }

  // Match flex with number: flex-2, flex-3, flex-10
  const numberMatch = className.match(/^flex-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `flex ${value}`;
  }

  return null;
}

/**
 * Try to match flex-grow patterns (grow-<number>, grow-(<custom-property>), grow-[<value>])
 */
export function matchFlexGrowPattern(className: string): string | null {
  // Match grow with custom property: grow-(--custom-var)
  const customPropMatch = className.match(/^grow-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex grow ${customPropMatch[1]}`;
  }

  // Match grow with arbitrary value: grow-[value]
  const arbitraryMatch = className.match(/^grow-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex grow ${arbitraryMatch[1]}`;
  }

  // Match grow with number: grow-2, grow-3, grow-10
  const numberMatch = className.match(/^grow-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `flex grow ${value}`;
  }

  return null;
}

/**
 * Try to match flex-shrink patterns (shrink-<number>, shrink-(<custom-property>), shrink-[<value>])
 */
export function matchFlexShrinkPattern(className: string): string | null {
  // Match shrink with custom property: shrink-(--custom-var)
  const customPropMatch = className.match(/^shrink-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex shrink ${customPropMatch[1]}`;
  }

  // Match shrink with arbitrary value: shrink-[value]
  const arbitraryMatch = className.match(/^shrink-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex shrink ${arbitraryMatch[1]}`;
  }

  // Match shrink with number: shrink-2, shrink-3, shrink-10
  const numberMatch = className.match(/^shrink-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `flex shrink ${value}`;
  }

  return null;
}

/**
 * Try to match order patterns (order-<number>, -order-<number>, order-(<custom-property>), order-[<value>])
 */
export function matchOrderPattern(className: string): string | null {
  // Match order with custom property: order-(--custom-var)
  const customPropMatch = className.match(/^order-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `order ${customPropMatch[1]}`;
  }

  // Match order with arbitrary value: order-[value]
  const arbitraryMatch = className.match(/^order-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `order ${arbitraryMatch[1]}`;
  }

  // Match negative order: -order-1, -order-5
  const negativeMatch = className.match(/^-order-(\d+)$/);
  if (negativeMatch) {
    const value = negativeMatch[1];
    return `order -${value}`;
  }

  // Match order with number: order-13, order-20
  const numberMatch = className.match(/^order-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `order ${value}`;
  }

  return null;
}

/**
 * Try to match grid-template-columns patterns (grid-cols-<number>, grid-cols-(<custom-property>), grid-cols-[<value>])
 */
export function matchGridColumnsPattern(className: string): string | null {
  // Match grid-cols with custom property: grid-cols-(--custom-var)
  const customPropMatch = className.match(/^grid-cols-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid columns ${customPropMatch[1]}`;
  }

  // Match grid-cols with arbitrary value: grid-cols-[value]
  const arbitraryMatch = className.match(/^grid-cols-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid columns ${arbitraryMatch[1]}`;
  }

  // Match grid-cols with number: grid-cols-13, grid-cols-20
  const numberMatch = className.match(/^grid-cols-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const numWord = NUMBER_WORDS[value] || value;
    return `${numWord} column${value === "1" ? "" : "s"}`;
  }

  return null;
}

/**
 * Try to match grid-template-rows patterns (grid-rows-<number>, grid-rows-(<custom-property>), grid-rows-[<value>])
 */
export function matchGridRowsPattern(className: string): string | null {
  // Match grid-rows with custom property: grid-rows-(--custom-var)
  const customPropMatch = className.match(/^grid-rows-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid rows ${customPropMatch[1]}`;
  }

  // Match grid-rows with arbitrary value: grid-rows-[value]
  const arbitraryMatch = className.match(/^grid-rows-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid rows ${arbitraryMatch[1]}`;
  }

  // Match grid-rows with number: grid-rows-13, grid-rows-20
  const numberMatch = className.match(/^grid-rows-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const numWord = NUMBER_WORDS[value] || value;
    return `${numWord} row${value === "1" ? "" : "s"}`;
  }

  return null;
}

/**
 * Try to match grid-column patterns (col-span-*, col-start-*, col-end-*, col-*)
 */
export function matchGridColumnPattern(className: string): string | null {
  // col-span-* patterns
  if (className.startsWith("col-span-")) {
    // col-span-(--custom-property)
    const customPropMatch = className.match(/^col-span-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `spans ${customPropMatch[1]} columns`;
    }

    // col-span-[value]
    const arbitraryMatch = className.match(/^col-span-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `spans ${arbitraryMatch[1]} columns`;
    }

    // col-span-<number> (dynamic numbers > 12)
    const numberMatch = className.match(/^col-span-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `spans ${value} column${value === "1" ? "" : "s"}`;
    }
  }

  // col-start-* patterns
  if (className.startsWith("col-start-") || className.startsWith("-col-start-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // col-start-(--custom-property)
    const customPropMatch = baseClass.match(/^col-start-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `starts at column ${customPropMatch[1]}`;
    }

    // col-start-[value]
    const arbitraryMatch = baseClass.match(/^col-start-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `starts at column ${arbitraryMatch[1]}`;
    }

    // col-start-<number> or -col-start-<number>
    const numberMatch = baseClass.match(/^col-start-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `starts at column ${isNegative ? "-" : ""}${value}`;
    }
  }

  // col-end-* patterns
  if (className.startsWith("col-end-") || className.startsWith("-col-end-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // col-end-(--custom-property)
    const customPropMatch = baseClass.match(/^col-end-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `ends at column ${customPropMatch[1]}`;
    }

    // col-end-[value]
    const arbitraryMatch = baseClass.match(/^col-end-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `ends at column ${arbitraryMatch[1]}`;
    }

    // col-end-<number> or -col-end-<number>
    const numberMatch = baseClass.match(/^col-end-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `ends at column ${isNegative ? "-" : ""}${value}`;
    }
  }

  // col-* patterns (plain col without span/start/end)
  if (className.startsWith("col-") && !className.startsWith("col-span-") && !className.startsWith("col-start-") && !className.startsWith("col-end-")) {
    const isNegative = className.startsWith("-col-");
    const baseClass = isNegative ? className.slice(1) : className;

    // col-(--custom-property)
    const customPropMatch = baseClass.match(/^col-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `column ${customPropMatch[1]}`;
    }

    // col-[value]
    const arbitraryMatch = baseClass.match(/^col-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `column ${arbitraryMatch[1]}`;
    }

    // col-<number> or -col-<number>
    const numberMatch = baseClass.match(/^col-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `column ${isNegative ? "-" : ""}${value}`;
    }
  }

  return null;
}

/**
 * Try to match grid-row patterns (row-span-*, row-start-*, row-end-*, row-*)
 */
export function matchGridRowPattern(className: string): string | null {
  // row-span-* patterns
  if (className.startsWith("row-span-")) {
    // row-span-(--custom-property)
    const customPropMatch = className.match(/^row-span-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `spans ${customPropMatch[1]} rows`;
    }

    // row-span-[value]
    const arbitraryMatch = className.match(/^row-span-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `spans ${arbitraryMatch[1]} rows`;
    }

    // row-span-<number> (dynamic numbers > 12)
    const numberMatch = className.match(/^row-span-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `spans ${value} row${value === "1" ? "" : "s"}`;
    }
  }

  // row-start-* patterns
  if (className.startsWith("row-start-") || className.startsWith("-row-start-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // row-start-(--custom-property)
    const customPropMatch = baseClass.match(/^row-start-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `starts at row ${customPropMatch[1]}`;
    }

    // row-start-[value]
    const arbitraryMatch = baseClass.match(/^row-start-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `starts at row ${arbitraryMatch[1]}`;
    }

    // row-start-<number> or -row-start-<number>
    const numberMatch = baseClass.match(/^row-start-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `starts at row ${isNegative ? "-" : ""}${value}`;
    }
  }

  // row-end-* patterns
  if (className.startsWith("row-end-") || className.startsWith("-row-end-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // row-end-(--custom-property)
    const customPropMatch = baseClass.match(/^row-end-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `ends at row ${customPropMatch[1]}`;
    }

    // row-end-[value]
    const arbitraryMatch = baseClass.match(/^row-end-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `ends at row ${arbitraryMatch[1]}`;
    }

    // row-end-<number> or -row-end-<number>
    const numberMatch = baseClass.match(/^row-end-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `ends at row ${isNegative ? "-" : ""}${value}`;
    }
  }

  // row-* patterns (plain row without span/start/end)
  if (className.startsWith("row-") && !className.startsWith("row-span-") && !className.startsWith("row-start-") && !className.startsWith("row-end-")) {
    const isNegative = className.startsWith("-row-");
    const baseClass = isNegative ? className.slice(1) : className;

    // row-(--custom-property)
    const customPropMatch = baseClass.match(/^row-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `row ${customPropMatch[1]}`;
    }

    // row-[value]
    const arbitraryMatch = baseClass.match(/^row-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `row ${arbitraryMatch[1]}`;
    }

    // row-<number> or -row-<number>
    const numberMatch = baseClass.match(/^row-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `row ${isNegative ? "-" : ""}${value}`;
    }
  }

  return null;
}

/**
 * Try to match grid-auto-columns patterns (auto-cols-(<custom-property>), auto-cols-[<value>])
 */
export function matchGridAutoColumnsPattern(className: string): string | null {
  // auto-cols-(--custom-property)
  const customPropMatch = className.match(/^auto-cols-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid auto columns ${customPropMatch[1]}`;
  }

  // auto-cols-[value]
  const arbitraryMatch = className.match(/^auto-cols-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid auto columns ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match grid-auto-rows patterns (auto-rows-(<custom-property>), auto-rows-[<value>])
 */
export function matchGridAutoRowsPattern(className: string): string | null {
  // auto-rows-(--custom-property)
  const customPropMatch = className.match(/^auto-rows-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid auto rows ${customPropMatch[1]}`;
  }

  // auto-rows-[value]
  const arbitraryMatch = className.match(/^auto-rows-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid auto rows ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match gap patterns (gap-*, gap-x-*, gap-y-*)
 */
export function matchGapPattern(className: string): string | null {
  // gap-x-* patterns (column gap)
  if (className.startsWith("gap-x-")) {
    // gap-x-(--custom-property)
    const customPropMatch = className.match(/^gap-x-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `horizontal gap ${customPropMatch[1]}`;
    }

    // gap-x-[value]
    const arbitraryMatch = className.match(/^gap-x-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `horizontal gap ${arbitraryMatch[1]}`;
    }

    // gap-x-<number> (dynamic numbers)
    const numberMatch = className.match(/^gap-x-(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `horizontal gap ${value}`;
    }
  }

  // gap-y-* patterns (row gap)
  if (className.startsWith("gap-y-")) {
    // gap-y-(--custom-property)
    const customPropMatch = className.match(/^gap-y-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `vertical gap ${customPropMatch[1]}`;
    }

    // gap-y-[value]
    const arbitraryMatch = className.match(/^gap-y-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `vertical gap ${arbitraryMatch[1]}`;
    }

    // gap-y-<number> (dynamic numbers)
    const numberMatch = className.match(/^gap-y-(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `vertical gap ${value}`;
    }
  }

  // gap-* patterns (both row and column)
  if (className.startsWith("gap-") && !className.startsWith("gap-x-") && !className.startsWith("gap-y-")) {
    // gap-(--custom-property)
    const customPropMatch = className.match(/^gap-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `gap ${customPropMatch[1]}`;
    }

    // gap-[value]
    const arbitraryMatch = className.match(/^gap-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `gap ${arbitraryMatch[1]}`;
    }

    // gap-<number> (dynamic numbers)
    const numberMatch = className.match(/^gap-(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `gap ${value}`;
    }
  }

  return null;
}

/**
 * Try to match width patterns (w-*, size-*)
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
export function matchFontFamilyPattern(className: string): string | null {
  // font-(family-name:--custom-property) - special syntax for font-family custom properties
  const familyNameCustomMatch = className.match(/^font-\(family-name:(--[\w-]+)\)$/);
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
 * Try to match background size patterns (bg-size-*)
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
export function matchBackgroundPositionPattern(className: string): string | null {
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
export function matchGradientColorStopPattern(className: string): string | null {
  // from-<percentage>, via-<percentage>, to-<percentage>
  const percentageMatch = className.match(/^(from|via|to)-(\d+)%$/);
  if (percentageMatch) {
    const position = percentageMatch[1];
    const percent = percentageMatch[2];
    const positionMap: Record<string, string> = {
      from: "start",
      via: "middle",
      to: "end",
    };
    return `gradient ${positionMap[position]} position at ${percent}%`;
  }

  // from-(--custom-property), via-(--custom-property), to-(--custom-property)
  const customPropMatch = className.match(/^(from|via|to)-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    const position = customPropMatch[1];
    const customProp = customPropMatch[2];
    return `gradient ${position} ${customProp}`;
  }

  // from-[value], via-[value], to-[value]
  const arbitraryMatch = className.match(/^(from|via|to)-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const position = arbitraryMatch[1];
    const value = arbitraryMatch[2];
    return `gradient ${position} ${value}`;
  }

  return null;
}

/**
 * Try to match background color custom properties and arbitrary values (bg-*)
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
export function matchTextColorPattern(className: string): string | null {
  // text-(--custom-property) - custom CSS property for text color
  // Note: font-size uses text-(length:--custom) while text color uses text-(--custom)
  const customPropMatch = className.match(/^text-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    // If it has the (--custom) format without "length:" prefix, assume it's a color
    return `text color ${customPropMatch[1]}`;
  }

  // text-[value] - arbitrary values that look like colors (hex, rgb, oklch, etc.)
  const arbitraryMatch = className.match(/^text-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Check if it looks like a color value (hex, rgb, oklch, hsl, etc.)
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      return `text color ${value}`;
    }
    // Otherwise, let matchFontSizePattern or matchArbitraryValue handle it
  }

  return null;
}

/**
 * Try to match font-size patterns (text-*)
 */
export function matchFontSizePattern(className: string): string | null {
  // text-<size>/(<custom-property>) - font size with custom property line height
  const sizeWithCustomLineHeightMatch = className.match(/^text-(xs|sm|base|lg|xl|\dxl)\/\((--[\w-]+)\)$/);
  if (sizeWithCustomLineHeightMatch) {
    const size = sizeWithCustomLineHeightMatch[1];
    const customProp = sizeWithCustomLineHeightMatch[2];
    const sizeMap: Record<string, string> = {
      xs: "extra small",
      sm: "small",
      base: "base",
      lg: "large",
      xl: "extra large",
      "2xl": "2x large",
      "3xl": "3x large",
      "4xl": "4x large",
      "5xl": "5x large",
      "6xl": "6x large",
      "7xl": "7x large",
      "8xl": "8x large",
      "9xl": "9x large",
    };
    const sizeDesc = sizeMap[size] || size;
    return `${sizeDesc} text with line height ${customProp}`;
  }

  // text-<size>/[<value>] - font size with arbitrary line height
  const sizeWithArbitraryLineHeightMatch = className.match(/^text-(xs|sm|base|lg|xl|\dxl)\/\[(.+?)\]$/);
  if (sizeWithArbitraryLineHeightMatch) {
    const size = sizeWithArbitraryLineHeightMatch[1];
    const lineHeight = sizeWithArbitraryLineHeightMatch[2];
    const sizeMap: Record<string, string> = {
      xs: "extra small",
      sm: "small",
      base: "base",
      lg: "large",
      xl: "extra large",
      "2xl": "2x large",
      "3xl": "3x large",
      "4xl": "4x large",
      "5xl": "5x large",
      "6xl": "6x large",
      "7xl": "7x large",
      "8xl": "8x large",
      "9xl": "9x large",
    };
    const sizeDesc = sizeMap[size] || size;
    return `${sizeDesc} text with line height ${lineHeight}`;
  }

  // text-<size>/<line-height> - font size with line height (e.g., text-sm/6, text-lg/7)
  const sizeWithLineHeightMatch = className.match(/^text-(xs|sm|base|lg|xl|\dxl)\/(.+)$/);
  if (sizeWithLineHeightMatch) {
    const size = sizeWithLineHeightMatch[1];
    const lineHeight = sizeWithLineHeightMatch[2];
    const sizeMap: Record<string, string> = {
      xs: "extra small",
      sm: "small",
      base: "base",
      lg: "large",
      xl: "extra large",
      "2xl": "2x large",
      "3xl": "3x large",
      "4xl": "4x large",
      "5xl": "5x large",
      "6xl": "6x large",
      "7xl": "7x large",
      "8xl": "8x large",
      "9xl": "9x large",
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
    const negative = customPropMatch[1] ? "negative " : "";
    return `${negative}letter spacing ${customPropMatch[2]}`;
  }

  // tracking-[value] - arbitrary values
  const arbitraryMatch = className.match(/^(-)?tracking-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const negative = arbitraryMatch[1] ? "negative " : "";
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
export function matchTextIndentPattern(className: string): string | null {
  // indent-<number> or -indent-<number> - numeric indent values
  const numberMatch = className.match(/^(-)?indent-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const negative = numberMatch[1] ? "negative " : "";
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
    const negative = pxMatch[1] ? "negative " : "";
    return `${negative}1px text indent`;
  }

  // indent-(--custom-property) - custom CSS properties
  const customPropMatch = className.match(/^(-)?indent-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    const negative = customPropMatch[1] ? "negative " : "";
    return `${negative}text indent ${customPropMatch[2]}`;
  }

  // indent-[value] - arbitrary values
  const arbitraryMatch = className.match(/^(-)?indent-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const negative = arbitraryMatch[1] ? "negative " : "";
    return `${negative}text indent ${arbitraryMatch[2]}`;
  }

  return null;
}

/**
 * Try to match list-style-type patterns (list-*)
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
export function matchDecorationColorPattern(className: string): string | null {
  // decoration-(--custom-property) - custom CSS property for decoration color
  const customPropMatch = className.match(/^decoration-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `decoration color ${customPropMatch[1]}`;
  }

  // decoration-[value] - arbitrary values that look like colors (hex, rgb, oklch, etc.)
  const arbitraryMatch = className.match(/^decoration-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const value = arbitraryMatch[1];
    // Check if it looks like a color value (hex, rgb, oklch, hsl, etc.)
    if (/^(#|rgb|oklch|hsl|hwb|lab|lch|color\()/i.test(value)) {
      return `decoration color ${value}`;
    }
  }

  return null;
}

/**
 * Try to match typography patterns (underline-offset-*, decoration-*)
 */
export function matchTypographyPattern(className: string): string | null {
  // Underline offset: underline-offset-3, underline-offset-12, -underline-offset-2
  const underlineOffsetMatch = className.match(/^(-)?underline-offset-(\d+)$/);
  if (underlineOffsetMatch) {
    const negative = underlineOffsetMatch[1] ? "negative " : "";
    const value = underlineOffsetMatch[2];
    const size = SPACING_SCALE[value] || `${value}px`;
    return `${negative}underline offset ${size}`;
  }

  // underline-offset-(--custom-property) - custom CSS properties
  const underlineOffsetCustomMatch = className.match(/^(-)?underline-offset-\((--[\w-]+)\)$/);
  if (underlineOffsetCustomMatch) {
    const negative = underlineOffsetCustomMatch[1] ? "negative " : "";
    return `${negative}underline offset ${underlineOffsetCustomMatch[2]}`;
  }

  // underline-offset-[value] - arbitrary values
  const underlineOffsetArbitraryMatch = className.match(/^(-)?underline-offset-\[(.+?)\]$/);
  if (underlineOffsetArbitraryMatch) {
    const negative = underlineOffsetArbitraryMatch[1] ? "negative " : "";
    return `${negative}underline offset ${underlineOffsetArbitraryMatch[2]}`;
  }

  // Decoration thickness: decoration-3, decoration-5
  const decorationThicknessMatch = className.match(/^decoration-(\d+)$/);
  if (decorationThicknessMatch) {
    const value = decorationThicknessMatch[1];
    return `${value}px decoration`;
  }

  // decoration-(length:--custom-property) - special syntax for decoration thickness
  const decorationLengthCustomMatch = className.match(/^decoration-\(length:(--[\w-]+)\)$/);
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
  // Z-index with custom property: z-(--custom-var)
  const zCustomPropMatch = className.match(/^z-\((--[\w-]+)\)$/);
  if (zCustomPropMatch) {
    return `z-index ${zCustomPropMatch[1]}`;
  }

  // Z-index with arbitrary value: z-[value]
  const zArbitraryMatch = className.match(/^z-\[(.+?)\]$/);
  if (zArbitraryMatch) {
    return `z-index ${zArbitraryMatch[1]}`;
  }

  // Z-index with dynamic number: z-100, z-999
  const zNumberMatch = className.match(/^z-(\d+)$/);
  if (zNumberMatch) {
    return `z-index ${zNumberMatch[1]}`;
  }

  // Negative z-index with dynamic number: -z-100, -z-999
  const negativeZMatch = className.match(/^-z-(\d+)$/);
  if (negativeZMatch) {
    return `z-index -${negativeZMatch[1]}`;
  }

  // Helper to format size values
  const formatSize = (value: string): string => {
    if (value === "px") return "1px";
    if (value === "full") return "100%";
    if (value === "auto") return "auto";
    // Handle fractions: 1/2, 1/3, 2/3, etc.
    if (/^\d+\/\d+$/.test(value)) {
      const [num, denom] = value.split("/").map(Number);
      const percent = ((num / denom) * 100).toFixed(3).replace(/\.?0+$/, "");
      return `${percent}%`;
    }
    return SPACING_SCALE[value] || value;
  };

  // Negative inset-x: -inset-x-4, -inset-x-1/2, -inset-x-px
  const negativeInsetXMatch = className.match(/^-inset-x-(.+)$/);
  if (negativeInsetXMatch) {
    const size = formatSize(negativeInsetXMatch[1]);
    return `-${size} from left and right`;
  }

  // Negative inset-y: -inset-y-4, -inset-y-1/2, -inset-y-px
  const negativeInsetYMatch = className.match(/^-inset-y-(.+)$/);
  if (negativeInsetYMatch) {
    const size = formatSize(negativeInsetYMatch[1]);
    return `-${size} from top and bottom`;
  }

  // Positive inset-x: inset-x-4, inset-x-1/2, inset-x-px
  const insetXMatch = className.match(/^inset-x-(.+)$/);
  if (insetXMatch) {
    const size = formatSize(insetXMatch[1]);
    return `${size} from left and right`;
  }

  // Positive inset-y: inset-y-4, inset-y-1/2, inset-y-px
  const insetYMatch = className.match(/^inset-y-(.+)$/);
  if (insetYMatch) {
    const size = formatSize(insetYMatch[1]);
    return `${size} from top and bottom`;
  }

  // Negative start/end (logical properties): -start-4, -end-1/2
  const negativeStartMatch = className.match(/^-start-(.+)$/);
  if (negativeStartMatch) {
    const size = formatSize(negativeStartMatch[1]);
    return `-${size} from start (logical)`;
  }

  const negativeEndMatch = className.match(/^-end-(.+)$/);
  if (negativeEndMatch) {
    const size = formatSize(negativeEndMatch[1]);
    return `-${size} from end (logical)`;
  }

  // Positive start/end (logical properties): start-4, end-1/2
  const startMatch = className.match(/^start-(.+)$/);
  if (startMatch) {
    const size = formatSize(startMatch[1]);
    return `${size} from start (logical)`;
  }

  const endMatch = className.match(/^end-(.+)$/);
  if (endMatch) {
    const size = formatSize(endMatch[1]);
    return `${size} from end (logical)`;
  }

  // Custom property patterns: inset-(<custom-property>), top-(<custom-property>), etc.
  const customPropMatch = className.match(/^(inset|inset-x|inset-y|top|right|bottom|left|start|end)-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    const direction = customPropMatch[1];
    const varName = customPropMatch[2];
    return `${varName} from ${direction}`;
  }

  // Arbitrary value patterns: inset-[<value>], top-[<value>], etc.
  const arbitraryMatch = className.match(/^(inset|inset-x|inset-y|top|right|bottom|left|start|end)-\[(.+?)\]$/);
  if (arbitraryMatch) {
    const direction = arbitraryMatch[1];
    const value = arbitraryMatch[2];
    return `${value} from ${direction}`;
  }

  // Negative positioning: -top-4, -bottom-px, -left-8, -inset-4
  const negativeMatch = className.match(
    /^-(top|right|bottom|left|inset)-(.+)$/
  );
  if (negativeMatch) {
    const direction = negativeMatch[1];
    const value = negativeMatch[2];
    const size = formatSize(value);
    return `-${size} from ${direction}`;
  }

  // Positive positioning: top-4, bottom-0, left-8, inset-4
  const positiveMatch = className.match(/^(top|right|bottom|left|inset)-(.+)$/);
  if (positiveMatch) {
    const direction = positiveMatch[1];
    const value = positiveMatch[2];
    const size = formatSize(value);
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
    const color = COLOR_NAMES[bgMatch[1]];
    const shade = SHADE_DESCRIPTIONS[bgMatch[2]];
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
    const color = COLOR_NAMES[textMatch[1]];
    const shade = SHADE_DESCRIPTIONS[textMatch[2]];
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
    const color = COLOR_NAMES[borderColorMatch[1]];
    const shade = SHADE_DESCRIPTIONS[borderColorMatch[2]];
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
    const color = COLOR_NAMES[ringMatch[1]];
    const shade = SHADE_DESCRIPTIONS[ringMatch[2]];
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
    const color = COLOR_NAMES[divideMatch[1]];
    const shade = SHADE_DESCRIPTIONS[divideMatch[2]];
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
    const color = COLOR_NAMES[fillMatch[1]];
    const shade = SHADE_DESCRIPTIONS[fillMatch[2]];
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
    const color = COLOR_NAMES[strokeMatch[1]];
    const shade = SHADE_DESCRIPTIONS[strokeMatch[2]];
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
    const color = COLOR_NAMES[decorationMatch[1]];
    const shade = SHADE_DESCRIPTIONS[decorationMatch[2]];
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
    const color = COLOR_NAMES[outlineMatch[1]];
    const shade = SHADE_DESCRIPTIONS[outlineMatch[2]];
    if (color && shade) {
      return `${shade} ${color} outline`;
    }
    if (color) {
      return `${color} ${outlineMatch[2]} outline`;
    }
  }

  // Accent colors: accent-blue-500, accent-green-700
  const accentMatch = className.match(/^accent-(\w+)-(\d+)$/);
  if (accentMatch) {
    const color = COLOR_NAMES[accentMatch[1]];
    const shade = SHADE_DESCRIPTIONS[accentMatch[2]];
    if (color && shade) {
      return `${shade} ${color} accent color`;
    }
    if (color) {
      return `${color} accent color`;
    }
  }

  // Caret colors: caret-blue-500, caret-red-700
  const caretMatch = className.match(/^caret-(\w+)-(\d+)$/);
  if (caretMatch) {
    const color = COLOR_NAMES[caretMatch[1]];
    const shade = SHADE_DESCRIPTIONS[caretMatch[2]];
    if (color && shade) {
      return `${shade} ${color} caret color`;
    }
    if (color) {
      return `${color} caret color`;
    }
  }

  // Per-side border colors: border-t-blue-500, border-r-red-300, border-b-gray-200, border-l-green-700
  const borderSideColorMatch = className.match(/^border-([trbl])-(\w+)-(\d+)$/);
  if (borderSideColorMatch) {
    const side = borderSideColorMatch[1];
    const color = COLOR_NAMES[borderSideColorMatch[2]];
    const shade = SHADE_DESCRIPTIONS[borderSideColorMatch[3]];
    
    const sideMap: Record<string, string> = {
      t: "top",
      r: "right",
      b: "bottom",
      l: "left",
    };
    
    const sideName = sideMap[side];
    
    if (color && shade) {
      return `${shade} ${color} ${sideName} border`;
    }
    if (color) {
      return `${color} ${sideName} border`;
    }
  }

  // Ring offset colors: ring-offset-blue-500, ring-offset-gray-200
  const ringOffsetMatch = className.match(/^ring-offset-(\w+)-(\d+)$/);
  if (ringOffsetMatch) {
    const color = COLOR_NAMES[ringOffsetMatch[1]];
    const shade = SHADE_DESCRIPTIONS[ringOffsetMatch[2]];
    if (color && shade) {
      return `${shade} ${color} ring offset`;
    }
    if (color) {
      return `${color} ring offset`;
    }
  }

  // Placeholder colors: placeholder-blue-500, placeholder-gray-400
  const placeholderMatch = className.match(/^placeholder-(\w+)-(\d+)$/);
  if (placeholderMatch) {
    const color = COLOR_NAMES[placeholderMatch[1]];
    const shade = SHADE_DESCRIPTIONS[placeholderMatch[2]];
    if (color && shade) {
      return `${shade} ${color} placeholder`;
    }
    if (color) {
      return `${color} placeholder`;
    }
  }

  // Shadow colors: shadow-blue-500, shadow-red-300 (Tailwind 3.3+)
  const shadowColorMatch = className.match(/^shadow-(\w+)-(\d+)$/);
  if (shadowColorMatch) {
    const color = COLOR_NAMES[shadowColorMatch[1]];
    const shade = SHADE_DESCRIPTIONS[shadowColorMatch[2]];
    if (color && shade) {
      return `${shade} ${color} shadow`;
    }
    if (color) {
      return `${color} shadow`;
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
export function matchGradientPattern(className: string): string | null {
  // v4 Linear gradient directions: bg-linear-to-r, bg-linear-to-br, etc.
  const linearDirMatch = className.match(/^bg-linear-to-([a-z]+)$/);
  if (linearDirMatch) {
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
    const direction = dirMap[linearDirMatch[1]] || linearDirMatch[1];
    return `linear gradient to ${direction}`;
  }

  // v3 Gradient directions: bg-gradient-to-r, bg-gradient-to-br, etc. (legacy)
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
    const color = COLOR_NAMES[fromMatch[1]];
    const shade = SHADE_DESCRIPTIONS[fromMatch[2]];
    if (color && shade) {
      return `gradient from ${shade} ${color}`;
    }
    if (color) {
      return `gradient from ${color}`;
    }
  }

  // Gradient from arbitrary: from-[...]
  const fromArbitrary = className.match(/^from-\[(.+?)\]$/);
  if (fromArbitrary) {
    return `gradient from ${fromArbitrary[1]}`;
  }

  // Gradient via: via-blue-500, via-slate-100
  const viaMatch = className.match(/^via-(\w+)-(\d+)$/);
  if (viaMatch) {
    const color = COLOR_NAMES[viaMatch[1]];
    const shade = SHADE_DESCRIPTIONS[viaMatch[2]];
    if (color && shade) {
      return `gradient via ${shade} ${color}`;
    }
    if (color) {
      return `gradient via ${color}`;
    }
  }

  // Gradient via arbitrary: via-[...]
  const viaArbitrary = className.match(/^via-\[(.+?)\]$/);
  if (viaArbitrary) {
    return `gradient via ${viaArbitrary[1]}`;
  }

  // Gradient to: to-blue-500, to-indigo-950
  const toMatch = className.match(/^to-(\w+)-(\d+)$/);
  if (toMatch) {
    const color = COLOR_NAMES[toMatch[1]];
    const shade = SHADE_DESCRIPTIONS[toMatch[2]];
    if (color && shade) {
      return `gradient to ${shade} ${color}`;
    }
    if (color) {
      return `gradient to ${color}`;
    }
  }

  // Gradient to arbitrary: to-[...]
  const toArbitrary = className.match(/^to-\[(.+?)\]$/);
  if (toArbitrary) {
    return `gradient to ${toArbitrary[1]}`;
  }

  return null;
}
