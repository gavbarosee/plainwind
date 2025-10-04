// Tailwind class to plain English mappings
export const tailwindMappings: Record<string, string> = {
  // Flexbox Layout
  flex: "flexbox container",
  "flex-row": "horizontal layout",
  "flex-col": "stacks vertically",
  "flex-wrap": "wraps items to next line",
  "flex-1": "takes remaining space",

  // Justify Content
  "justify-start": "aligns items to start",
  "justify-end": "aligns items to end",
  "justify-center": "centers items horizontally",
  "justify-between": "spreads items apart",
  "justify-around": "distributes space around items",

  // Align Items
  "items-start": "aligns items to top",
  "items-end": "aligns items to bottom",
  "items-center": "centers items vertically",
  "items-stretch": "stretches items to fill",

  // Gap
  "gap-1": "gap 0.25rem",
  "gap-2": "gap 0.5rem",
  "gap-3": "gap 0.75rem",
  "gap-4": "gap 1rem",
  "gap-6": "gap 1.5rem",
  "gap-8": "gap 2rem",

  // Padding
  "p-0": "no padding",
  "p-1": "padding 0.25rem",
  "p-2": "padding 0.5rem",
  "p-4": "padding 1rem",
  "p-6": "padding 1.5rem",
  "p-8": "padding 2rem",

  // Margin
  "m-0": "no margin",
  "m-auto": "centered with auto margin",
  "m-4": "margin 1rem",

  // Width
  "w-full": "full width",
  "w-screen": "full screen width",
  "w-10": "width 2.5rem",

  // Height
  "h-full": "full height",
  "h-screen": "full screen height",
  "h-10": "height 2.5rem",
  "min-h-screen": "minimum screen height",

  // Background Colors
  "bg-white": "white background",
  "bg-black": "black background",
  "bg-gray-50": "very light gray background",
  "bg-gray-100": "light gray background",
  "bg-gray-500": "medium gray background",

  // Text
  "text-white": "white text",
  "text-black": "black text",
  "text-sm": "small text",
  "text-base": "base text size",
  "text-lg": "large text",
  "text-xl": "extra large text",
  "text-2xl": "2x large text",

  // Font Weight
  "font-normal": "normal weight",
  "font-medium": "medium weight",
  "font-semibold": "semi-bold weight",
  "font-bold": "bold weight",
};
