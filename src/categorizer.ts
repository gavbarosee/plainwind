/**
 * Categorize Tailwind classes for grouped display
 */

export type ClassCategory =
  | "Layout"
  | "Flexbox & Grid"
  | "Spacing"
  | "Sizing"
  | "Colors"
  | "Backgrounds"
  | "Borders"
  | "Typography"
  | "Tables"
  | "Effects"
  | "Filters"
  | "Other";

/**
 * Determine the category of a Tailwind class
 */
export function categorizeClass(className: string): ClassCategory {
  // Remove variants to get base class
  const baseClass = className.split(":").pop() || className;

  // Layout
  if (
    /^(inline|block|hidden|table|flow|contents|list-item)/.test(baseClass) ||
    /^(visible|invisible|collapse)$/.test(baseClass) ||
    /^(start|end)$/.test(baseClass) || // logical float properties
    /^(float-|clear-|box-|border-sizing-|columns-|break-before-|break-after-|break-inside-)/.test(baseClass) ||
    /^(object-|image-render-)/.test(baseClass) ||
    /^(overflow-|overscroll-)/.test(baseClass) ||
    /^(field-sizing-)/.test(baseClass) ||
    /^isolat/.test(baseClass) || // isolation utilities
    /^(static|fixed|absolute|relative|sticky)$/.test(baseClass) || // position utilities
    /^(top-|right-|bottom-|left-|inset-|inset-x-|inset-y-|start-|end-|z-|-top-|-right-|-bottom-|-left-|-inset-|-start-|-end-)/.test(baseClass) || // positioning coordinates
    /^(m-auto|mx-auto|my-auto|ml-auto|mr-auto|mt-auto|mb-auto)$/.test(baseClass)
  ) {
    return "Layout";
  }

  // Flexbox & Grid
  if (
    /^(flex|grid)$/.test(baseClass) || // display: flex, display: grid
    /^(inline-flex|inline-grid)$/.test(baseClass) ||
    /^(basis-|grid-flow-|auto-cols-|auto-rows-)/.test(baseClass) ||
    /^(justify-|items-|content-|self-|place-)/.test(baseClass) ||
    /^(flex-|grid-cols-|grid-rows-|gap-|col-|row-)/.test(baseClass) ||
    /^(order-|-order-)/.test(baseClass) || // order utilities
    /^(grow|grow-|shrink|shrink-)/.test(baseClass) // flex-grow and flex-shrink
  ) {
    return "Flexbox & Grid";
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
    /^text-(left|center|right|justify|start|end|ellipsis|clip|wrap|nowrap|balance|pretty)/.test(baseClass) ||
    /^(font-|leading-|tracking-|uppercase|lowercase|capitalize|normal-case|truncate|italic|not-italic)/.test(
      baseClass
    ) ||
    /^(normal-nums|ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractions)$/.test(
      baseClass
    ) ||
    /^(list-|-?indent-|align-|whitespace-|hyphens-|line-clamp-)/.test(baseClass) ||
    /^break-(normal|words|all|keep)$/.test(baseClass) || // word-break only, not page breaks
    /^wrap-(break-word|anywhere|normal)$/.test(baseClass) ||
    /^(underline|overline|line-through|no-underline)$/.test(baseClass) ||
    /^-?underline-offset-/.test(baseClass) ||
    /^decoration-(solid|double|dotted|dashed|wavy|\d+)$/.test(baseClass) ||
    /^(antialiased|subpixel-antialiased)$/.test(baseClass) ||
    /^content-(none|\[|\()/.test(baseClass) // pseudo-element content utilities
  ) {
    return "Typography";
  }

  // Tables (table layout and border spacing utilities)
  if (
    /^(table-auto|table-fixed)$/.test(baseClass) || // table-layout utilities
    /^(border-collapse|border-separate)$/.test(baseClass) || // border-collapse utilities
    /^border-spacing(-[xy])?(-\d+|-\[|-\()/.test(baseClass) || // border-spacing utilities (border-spacing-2, border-spacing-x-4, border-spacing-[value], border-spacing-(--var))
    /^(caption-top|caption-bottom)$/.test(baseClass) // caption-side utilities
  ) {
    return "Tables";
  }

  // Borders (border-specific utilities, checked BEFORE Effects and Colors)
  if (
    /^rounded/.test(baseClass) || // border-radius (all variants: rounded, rounded-t, rounded-tl, rounded-s, rounded-ss, etc.)
    /^border(-[trblxyse])?(-\d+|-0|-px)?$/.test(baseClass) || // border-width (border, border-2, border-t, border-t-4, etc.)
    /^border(-[trblxyse])?-\(length:/.test(baseClass) || // border-(length:--var), border-t-(length:--var)
    /^border(-[trblxyse])?-\[/.test(baseClass) || // border-[value], border-t-[value]
    /^border-(solid|dashed|dotted|double|hidden|none)$/.test(baseClass) || // border-style utilities
    /^divide-[xy]/.test(baseClass) || // divide utilities (divide-x, divide-y, divide-x-2, divide-y-reverse, etc.)
    /^divide-(solid|dashed|dotted|double|hidden|none)$/.test(baseClass) || // divide-style utilities
    /^outline/.test(baseClass) || // outline utilities (outline, outline-2, outline-solid, outline-offset-2, etc.)
    /^-outline-offset-/.test(baseClass) // negative outline-offset utilities (-outline-offset-1, -outline-offset-2, etc.)
  ) {
    return "Borders";
  }

  // Filters (filter utilities: blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, saturate, sepia, backdrop-filter)
  if (
    /^filter/.test(baseClass) || // filter, filter-none, filter-[...], filter-(...) 
    /^backdrop-filter/.test(baseClass) || // backdrop-filter, backdrop-filter-none, backdrop-filter-[...], backdrop-filter-(...) 
    /^(blur-|blur|brightness-|contrast-|drop-shadow-|drop-shadow|grayscale|hue-rotate-|-hue-rotate-|invert|saturate-|sepia)/.test(
      baseClass
    ) ||
    /^backdrop-(blur|brightness|contrast|grayscale|hue-rotate|invert|opacity|saturate|sepia)/.test(
      baseClass
    )
  ) {
    return "Filters";
  }

  // Effects (shadows, opacity, transitions, transforms, interactivity, blend modes, masks)
  // Check divide and ring structural classes BEFORE Colors (bg-blend- before bg-)
  if (
    /^(shadow|inset-shadow|text-shadow|opacity-|transition|duration-|ease-|delay-|animate-|cursor-)/.test(
      baseClass
    ) ||
    /^(scale-|rotate-|translate-|skew-|-rotate-|-translate-|-skew-|origin-|perspective-|transform-style-|backface-)/.test(
      baseClass
    ) ||
    /^(pointer-events-|resize|scroll|snap-|touch-|select-|will-change-|appearance-|inert)/.test(
      baseClass
    ) ||
    /^(mix-blend-|bg-blend-)/.test(baseClass) ||
    /^(content-visibility-|contain-|mask)/.test(baseClass) ||
    /^ring(-\d+|-offset-\d+)?$/.test(baseClass) || // ring, ring-0, ring-1, ring-offset-0, etc. (but not ring-blue-500)
    /^inset-ring(-\d+)?$/.test(baseClass) // inset-ring, inset-ring-0, inset-ring-1, etc. (but not inset-ring-blue-500)
  ) {
    return "Effects";
  }

  // Backgrounds (background-specific utilities, checked BEFORE Colors)
  if (
    /^bg-(fixed|local|scroll)$/.test(baseClass) || // background-attachment
    /^bg-clip-(border|padding|content|text)$/.test(baseClass) || // background-clip
    /^bg-(none|linear|radial|conic)/.test(baseClass) || // background-image (gradients)
    /^-bg-(linear|conic)/.test(baseClass) || // negative angle gradients
    /^bg-origin-(border|padding|content)$/.test(baseClass) || // background-origin
    /^bg-(top|bottom|left|right|center)/.test(baseClass) || // background-position (includes bg-top-left, bg-bottom-right, etc.)
    /^bg-position-/.test(baseClass) || // bg-position-(--var) and bg-position-[value]
    /^bg-(no-)?repeat/.test(baseClass) || // background-repeat (bg-repeat, bg-no-repeat, bg-repeat-x, bg-repeat-y, bg-repeat-round, bg-repeat-space)
    /^bg-(auto|cover|contain)$/.test(baseClass) || // background-size (static values)
    /^bg-size-/.test(baseClass) // bg-size-(--var) and bg-size-[value]
  ) {
    return "Backgrounds";
  }

  // Colors (text colors, backgrounds, borders, SVG fills/strokes, etc.)
  if (
    /^(bg-|text-|border-|ring-|divide-|fill-|stroke-|decoration-|from-|via-|to-|gradient|accent-|caret-|placeholder-|color-scheme-)/.test(
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
    "Flexbox & Grid",
    "Spacing",
    "Sizing",
    "Colors",
    "Backgrounds",
    "Borders",
    "Typography",
    "Tables",
    "Effects",
    "Filters",
    "Other",
  ];

  // Map categories to emojis for visual distinction
  const categoryEmojis: Record<ClassCategory, string> = {
    Layout: "📐",
    "Flexbox & Grid": "📦",
    Sizing: "📏",
    Spacing: "↔️",
    Colors: "🎨",
    Backgrounds: "🖼️",
    Borders: "🔲",
    Typography: "📝",
    Tables: "📊",
    Effects: "✨",
    Filters: "🎭",
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
