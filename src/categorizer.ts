/**
 * Categorize Tailwind classes for grouped display
 */

export type ClassCategory =
  | "Layout"
  | "Spacing"
  | "Colors"
  | "Typography"
  | "Effects"
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
    /^(start|end)$/.test(baseClass) || // logical float properties
    /^(float-|clear-|box-|border-sizing-|order-|columns-|break-before-|break-after-|break-inside-)/.test(baseClass) ||
    /^(basis-|grid-flow-|auto-cols-|auto-rows-)/.test(baseClass) ||
    /^(justify-|items-|content-|self-|place-)/.test(baseClass) ||
    /^(flex-|grid-cols-|grid-rows-|gap-|col-|row-)/.test(baseClass) ||
    /^(object-|image-render-|table-auto|table-fixed|border-collapse|border-separate|border-spacing-|caption-)/.test(baseClass) ||
    /^(overflow-|overscroll-)/.test(baseClass) ||
    /^(field-sizing-)/.test(baseClass) ||
    /^isolat/.test(baseClass) || // isolation utilities
    /^(static|fixed|absolute|relative|sticky)$/.test(baseClass) || // position utilities
    /^(top-|right-|bottom-|left-|inset-|inset-x-|inset-y-|start-|end-|z-|-top-|-right-|-bottom-|-left-|-inset-|-start-|-end-)/.test(baseClass) || // positioning coordinates
    /^(m-auto|mx-auto|my-auto|ml-auto|mr-auto|mt-auto|mb-auto)$/.test(baseClass)
  ) {
    return "Layout";
  }

  // Spacing (padding, margin, space) - check AFTER auto margins
  if (
    /^(p-|px-|py-|pt-|pr-|pb-|pl-|ps-|pe-|m-|mx-|my-|mt-|mr-|mb-|ml-|ms-|me-|space-)/.test(
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
    /^text-(left|center|right|justify|ellipsis|clip|wrap|nowrap|balance|pretty)/.test(baseClass) ||
    /^(font-|leading-|tracking-|uppercase|lowercase|capitalize|normal-case|truncate|italic|not-italic)/.test(
      baseClass
    ) ||
    /^(normal-nums|ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractions)$/.test(
      baseClass
    ) ||
    /^(list-|indent-|align-|whitespace-|hyphens-|line-clamp-)/.test(baseClass) ||
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
    /^(shadow|text-shadow|rounded|border|opacity-|transition|duration-|ease-|delay-|animate-|cursor-|backdrop-|outline|-outline)/.test(
      baseClass
    ) ||
    /^(scale-|rotate-|translate-|skew-|-rotate-|-translate-|-skew-|origin-|perspective-|transform-style-|backface-)/.test(
      baseClass
    ) ||
    /^(blur-|blur|brightness-|contrast-|drop-shadow-|drop-shadow|grayscale|hue-rotate-|-hue-rotate-|invert|saturate-|sepia)/.test(
      baseClass
    ) ||
    /^(pointer-events-|resize|scroll|snap-|touch-|select-|will-change-|appearance-|inert)/.test(
      baseClass
    ) ||
    /^(mix-blend-|bg-blend-)/.test(baseClass) ||
    /^(content-visibility-|contain-|mask)/.test(baseClass) ||
    /^divide-[xy](-|$)/.test(baseClass) || // divide-x, divide-y, divide-x-0, divide-y-2, etc.
    /^divide-[xy]-reverse$/.test(baseClass) || // divide-x-reverse, divide-y-reverse
    /^ring(-\d+|-inset|-offset-\d+)?$/.test(baseClass) // ring, ring-0, ring-1, ring-inset, ring-offset-0, etc. (but not ring-blue-500)
  ) {
    return "Effects";
  }

  // Colors (text colors, backgrounds, borders, SVG fills/strokes, etc.)
  if (
    /^(bg-|text-|border-|ring-|divide-|fill-|stroke-|decoration-|outline-|from-|via-|to-|gradient|accent-|caret-|placeholder-|color-scheme-)/.test(
      baseClass
    )
  ) {
    return "Colors";
  }


  // Sizing
  if (
    /^(size-|w-|h-|min-w-|min-h-|max-w-|max-h-|container|aspect-)/.test(baseClass)
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
