/**
 * Categorize Tailwind classes for grouped display
 */

export type ClassCategory =
  | "Layout"
  | "Spacing"
  | "Colors"
  | "Typography"
  | "Effects"
  | "Positioning"
  | "Sizing"
  | "Other";

/**
 * Determine the category of a Tailwind class
 */
export function categorizeClass(className: string): ClassCategory {
  // Remove variants to get base class
  const baseClass = className.split(":").pop() || className;

  // Layout (check auto margins first - they're for centering/alignment)
  if (
    /^(flex|grid|inline|block|hidden|table|flow|contents|list-item)/.test(baseClass) ||
    /^(visible|invisible|collapse)$/.test(baseClass) ||
    /^(float-|clear-|box-|order-|columns-|break-before-|break-after-|break-inside-)/.test(baseClass) ||
    /^(basis-|grid-flow-|auto-cols-|auto-rows-)/.test(baseClass) ||
    /^(justify-|items-|content-|self-|place-)/.test(baseClass) ||
    /^(flex-|grid-cols-|grid-rows-|gap-|col-|row-)/.test(baseClass) ||
    /^(object-|table-auto|table-fixed|border-collapse|border-separate|border-spacing-|caption-)/.test(baseClass) ||
    /^(overflow-|overscroll-)/.test(baseClass) ||
    /^(m-auto|mx-auto|my-auto|ml-auto|mr-auto|mt-auto|mb-auto)$/.test(baseClass)
  ) {
    return "Layout";
  }

  // Spacing (padding, margin, space) - check AFTER auto margins
  if (
    /^(p-|px-|py-|pt-|pr-|pb-|pl-|m-|mx-|my-|mt-|mr-|mb-|ml-|space-)/.test(
      baseClass
    )
  ) {
    return "Spacing";
  }

  // Typography (check BEFORE colors to catch text-xl, text-center, etc.)
  if (
    /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/.test(
      baseClass
    ) ||
    /^text-(left|center|right|justify|ellipsis|clip)/.test(baseClass) ||
    /^(font-|leading-|tracking-|uppercase|lowercase|capitalize|normal-case|truncate|italic|not-italic)/.test(
      baseClass
    ) ||
    /^(list-|indent-|align-|whitespace-|hyphens-)/.test(baseClass) ||
    /^break-(normal|words|all|keep)$/.test(baseClass) || // word-break only, not page breaks
    /^(underline|no-underline|line-through)$/.test(baseClass) ||
    /^underline-offset-/.test(baseClass) ||
    /^decoration-(solid|double|dotted|dashed|wavy|\d+)$/.test(baseClass)
  ) {
    return "Typography";
  }

  // Effects (shadows, borders, rounded, opacity, transitions, backdrop filters, outlines, transforms, filters, interactivity, blend modes)
  // Check divide and ring structural classes BEFORE Colors (bg-blend- before bg-)
  if (
    /^(shadow|rounded|border|opacity-|transition|duration-|ease-|delay-|animate-|cursor-|backdrop-|outline|-outline|isolat)/.test(
      baseClass
    ) ||
    /^(scale-|rotate-|translate-|skew-|-rotate-|-translate-|-skew-|origin-)/.test(
      baseClass
    ) ||
    /^(blur-|blur|brightness-|contrast-|drop-shadow-|drop-shadow|grayscale|hue-rotate-|-hue-rotate-|invert|saturate-|sepia)/.test(
      baseClass
    ) ||
    /^(pointer-events-|resize|scroll-|snap-|touch-|select-|will-change-|appearance-)/.test(
      baseClass
    ) ||
    /^(mix-blend-|bg-blend-)/.test(baseClass) ||
    /^divide-[xy](-|$)/.test(baseClass) || // divide-x, divide-y, divide-x-0, divide-y-2, etc.
    /^divide-[xy]-reverse$/.test(baseClass) || // divide-x-reverse, divide-y-reverse
    /^ring(-\d+|-inset|-offset-\d+)?$/.test(baseClass) // ring, ring-0, ring-1, ring-inset, ring-offset-0, etc. (but not ring-blue-500)
  ) {
    return "Effects";
  }

  // Colors (text colors, backgrounds, borders, SVG fills/strokes, etc.)
  if (
    /^(bg-|text-|border-|ring-|divide-|fill-|stroke-|decoration-|outline-|from-|via-|to-|gradient)/.test(
      baseClass
    )
  ) {
    return "Colors";
  }

  // Positioning (including negative positioning)
  if (
    /^(static|fixed|absolute|relative|sticky|top-|right-|bottom-|left-|inset-|z-|-top-|-right-|-bottom-|-left-|-inset-)/.test(
      baseClass
    )
  ) {
    return "Positioning";
  }

  // Sizing
  if (
    /^(w-|h-|min-w-|min-h-|max-w-|max-h-|container|aspect-)/.test(baseClass)
  ) {
    return "Sizing";
  }

  return "Other";
}

/**
 * Group translations by category
 */
export function groupTranslationsByCategory(
  classNames: string[],
  translations: string[],
  showEmojis: boolean = false
): string {
  const grouped = new Map<ClassCategory, string[]>();

  classNames.forEach((className, index) => {
    const category = categorizeClass(className);
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(translations[index]);
  });

  // Order categories logically
  const categoryOrder: ClassCategory[] = [
    "Layout",
    "Sizing",
    "Spacing",
    "Colors",
    "Typography",
    "Effects",
    "Positioning",
    "Other",
  ];

  // Map categories to emojis for visual distinction
  const categoryEmojis: Record<ClassCategory, string> = {
    Layout: "📐",
    Sizing: "📏",
    Spacing: "↔️",
    Colors: "🎨",
    Typography: "📝",
    Effects: "✨",
    Positioning: "📍",
    Other: "🔧",
  };

  const parts: string[] = [];
  categoryOrder.forEach((category) => {
    if (grouped.has(category)) {
      const items = grouped.get(category)!.join(", ");
      if (showEmojis) {
        const emoji = categoryEmojis[category];
        parts.push(`${emoji} ${category}: ${items}`);
      } else {
        parts.push(`${category}: ${items}`);
      }
    }
  });

  return parts.join(" | ");
}
