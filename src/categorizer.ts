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

  // Layout
  if (
    /^(flex|grid|inline|block|hidden|table|flow)/.test(baseClass) ||
    /^(justify-|items-|content-|self-|place-)/.test(baseClass) ||
    /^(flex-|grid-cols-|grid-rows-|gap-|col-|row-)/.test(baseClass)
  ) {
    return "Layout";
  }

  // Spacing (padding, margin, space)
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
    /^text-(left|center|right|justify)/.test(baseClass) ||
    /^(font-|leading-|tracking-|uppercase|lowercase|capitalize|truncate|italic)/.test(
      baseClass
    ) ||
    /^(underline|no-underline|line-through)$/.test(baseClass) ||
    /^underline-offset-/.test(baseClass) ||
    /^decoration-(solid|double|dotted|dashed|wavy|\d+)$/.test(baseClass)
  ) {
    return "Typography";
  }

  // Colors (text colors, backgrounds, borders, SVG fills/strokes, etc.)
  if (
    /^(bg-|text-|border-|ring-|divide-|fill-|stroke-|decoration-|from-|via-|to-|gradient)/.test(
      baseClass
    )
  ) {
    return "Colors";
  }

  // Effects (shadows, borders, rounded, opacity, transitions)
  if (
    /^(shadow|rounded|border|opacity-|transition|duration-|ease-|animate-|cursor-)/.test(
      baseClass
    )
  ) {
    return "Effects";
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

  // Overflow
  if (/^(overflow-)/.test(baseClass)) {
    return "Layout";
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
