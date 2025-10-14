/**
 * Category Pattern Definitions
 *
 * This file defines how Tailwind classes are categorized.
 *
 * IMPORTANT: Order matters! Categories are checked in array order, and the
 * first matching pattern wins. This is why specific patterns (like "Tables")
 * must come before general ones (like "Layout").
 *
 * Each category has:
 *   name:        The display name of the category
 *   emoji:       Icon for visual distinction
 *   patterns:    Array of RegExp patterns to match class names
 *   description: Optional note about ordering or special handling
 */

import type { Category } from './types';

export const CATEGORIES: Category[] = [
  {
    name: 'Layout',
    emoji: '📐',
    patterns: [
      /^(inline|block|hidden|flow|contents|list-item)/, // display utilities
      /^table$/, // display: table
      /^(visible|invisible|collapse)$/,
      /^(start|end)$/, // logical float properties
      /^(float-|clear-|box-|border-sizing-|columns-|break-before-|break-after-|break-inside-)/,
      /^(object-|image-render-)/,
      /^(overflow-|overscroll-)/,
      /^(field-sizing-)/,
      /^isolat/, // isolation utilities
      /^(static|fixed|absolute|relative|sticky)$/, // position utilities
      /^(top-|right-|bottom-|left-|inset-|inset-x-|inset-y-|start-|end-|z-|-top-|-right-|-bottom-|-left-|-inset-|-start-|-end-)/, // positioning coordinates
      /^(m-auto|mx-auto|my-auto|ml-auto|mr-auto|mt-auto|mb-auto)$/,
    ],
  },
  {
    name: 'Flexbox & Grid',
    emoji: '📦',
    patterns: [
      /^(flex|grid)$/, // display: flex, display: grid
      /^(inline-flex|inline-grid)$/,
      /^(basis-|grid-flow-|auto-cols-|auto-rows-)/,
      /^(justify-|items-|content-|self-|place-)/,
      /^(flex-|grid-cols-|grid-rows-|gap-|col-|row-)/,
      /^(order-|-order-)/, // order utilities
      /^(grow|grow-|shrink|shrink-)/, // flex-grow and flex-shrink
    ],
  },
  {
    name: 'Spacing',
    emoji: '↔️',
    description: 'padding, margin, space - check AFTER auto margins',
    patterns: [
      /^(p-|px-|py-|pt-|pr-|pb-|pl-|ps-|pe-|m-|mx-|my-|mt-|mr-|mb-|ml-|ms-|me-|space-)/,
    ],
  },
  {
    name: 'Typography',
    emoji: '📝',
    description: 'check BEFORE colors to catch text-xl, text-center, etc.',
    patterns: [
      /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
      /^text-(left|center|right|justify|start|end|ellipsis|clip|wrap|nowrap|balance|pretty)/,
      /^(font-|leading-|tracking-|uppercase|lowercase|capitalize|normal-case|truncate|italic|not-italic)/,
      /^(normal-nums|ordinal|slashed-zero|lining-nums|oldstyle-nums|proportional-nums|tabular-nums|diagonal-fractions|stacked-fractions)$/,
      /^(list-|-?indent-|align-|whitespace-|hyphens-|line-clamp-)/,
      /^break-(normal|words|all|keep)$/, // word-break only, not page breaks
      /^wrap-(break-word|anywhere|normal)$/,
      /^(underline|overline|line-through|no-underline)$/,
      /^-?underline-offset-/,
      /^decoration-(solid|double|dotted|dashed|wavy|\d+)$/,
      /^(antialiased|subpixel-antialiased)$/,
      /^content-(none|\[|\()/, // pseudo-element content utilities
    ],
  },
  {
    name: 'Tables',
    emoji: '📊',
    description: 'table layout and border spacing utilities',
    patterns: [
      /^(table-auto|table-fixed)$/, // table-layout utilities
      /^(border-collapse|border-separate)$/, // border-collapse utilities
      /^border-spacing(-[xy])?(-\d+|-\[|-\()/, // border-spacing utilities
      /^(caption-top|caption-bottom)$/, // caption-side utilities
    ],
  },
  {
    name: 'Borders',
    emoji: '🔲',
    description: 'checked BEFORE Effects and Colors',
    patterns: [
      /^rounded/, // border-radius
      /^border(-[trblxyse])?(-\d+|-0|-px)?$/, // border-width
      /^border(-[trblxyse])?-\(length:/, // border-(length:--var)
      /^border(-[trblxyse])?-\[/, // border-[value]
      /^border-(solid|dashed|dotted|double|hidden|none)$/, // border-style
      /^divide-[xy]/, // divide utilities
      /^divide-(solid|dashed|dotted|double|hidden|none)$/, // divide-style
      /^outline/, // outline utilities
      /^-outline-offset-/, // negative outline-offset utilities
    ],
  },
  {
    name: 'Transitions & Animation',
    emoji: '🎬',
    description: 'transition properties, timing, duration, delay, animations',
    patterns: [
      /^transition/, // transition, transition-all, transition-colors, etc.
      /^(duration-|delay-|ease-|animate-)/, // duration, delay, ease, animate
    ],
  },
  {
    name: 'Transforms',
    emoji: '🔄',
    description:
      'scale, rotate, translate, skew, transform-origin, perspective',
    patterns: [
      /^(scale-|rotate-|translate-|skew-|-rotate-|-translate-|-skew-)/, // transform utilities
      /^(origin-)/, // transform-origin utilities
      /^(perspective-|transform-style-|backface-)/, // 3D transform utilities
      /^(transform-none|transform-gpu|transform-cpu|transform-3d|transform-flat|transform-\[|transform-\()/, // transform control
    ],
  },
  {
    name: 'Interactivity',
    emoji: '👆',
    description:
      'accent, appearance, pointer-events, resize, scroll, snap, user-select, cursor',
    patterns: [
      /^accent-/, // accent-color utilities
      /^(appearance-|scheme-|color-scheme-|field-sizing-|caret-|pointer-events-|resize|scroll|snap-|touch-|select-|user-select-|will-change-|cursor-)/,
    ],
  },
  {
    name: 'Filters',
    emoji: '🎭',
    description:
      'blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, backdrop-filter',
    patterns: [
      /^filter/, // filter, filter-none, filter-[...], filter-(...)
      /^backdrop-filter/, // backdrop-filter, backdrop-filter-none
      /^(blur-|blur|brightness-|contrast-|drop-shadow-|drop-shadow|grayscale|hue-rotate-|-hue-rotate-|invert|saturate-|sepia)/,
      /^backdrop-(blur|brightness|contrast|grayscale|hue-rotate|invert|opacity|saturate|sepia)/,
    ],
  },
  {
    name: 'Effects',
    emoji: '✨',
    description:
      'shadows, opacity, blend modes, masks, inert - check BEFORE Colors',
    patterns: [
      /^(shadow|inset-shadow|text-shadow|opacity-)/,
      /^(inert)/,
      /^(mix-blend-|bg-blend-)/,
      /^(content-visibility-|contain-|mask)/,
      /^ring(-\d+|-offset-\d+)?$/, // ring, ring-0, ring-1 (but not ring-blue-500)
      /^inset-ring(-\d+)?$/, // inset-ring, inset-ring-0 (but not inset-ring-blue-500)
    ],
  },
  {
    name: 'Backgrounds',
    emoji: '🖼️',
    description: 'background-specific utilities, checked BEFORE Colors',
    patterns: [
      /^bg-(fixed|local|scroll)$/, // background-attachment
      /^bg-clip-(border|padding|content|text)$/, // background-clip
      /^bg-(none|linear|radial|conic)/, // background-image (gradients)
      /^-bg-(linear|conic)/, // negative angle gradients
      /^bg-origin-(border|padding|content)$/, // background-origin
      /^bg-(top|bottom|left|right|center)/, // background-position
      /^bg-position-/, // bg-position-(--var) and bg-position-[value]
      /^bg-(no-)?repeat/, // background-repeat
      /^bg-(auto|cover|contain)$/, // background-size (static values)
      /^bg-size-/, // bg-size-(--var) and bg-size-[value]
    ],
  },
  {
    name: 'Colors',
    emoji: '🎨',
    description: 'text colors, backgrounds, borders, etc.',
    patterns: [
      /^(bg-|text-|border-|ring-|divide-|decoration-|from-|via-|to-|gradient|accent-|caret-|placeholder-|color-scheme-)/,
    ],
  },
  {
    name: 'Sizing',
    emoji: '📏',
    patterns: [/^(size-|w-|h-|min-w-|min-h-|max-w-|max-h-|container|aspect-)/],
  },
  {
    name: 'SVG',
    emoji: '🎨',
    description: 'fill, stroke',
    patterns: [
      /^fill-/, // fill utilities
      /^stroke-/, // stroke utilities
    ],
  },
  {
    name: 'Accessibility',
    emoji: '♿',
    description: 'forced-color-adjust, sr-only',
    patterns: [
      /^forced-color-adjust-/, // forced-color-adjust utilities
      /^(sr-only|not-sr-only)$/, // screen reader utilities
    ],
  },
];
