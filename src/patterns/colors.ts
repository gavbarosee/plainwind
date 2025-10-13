/**
 * Colors pattern matchers
 */

import { COLOR_NAMES, SHADE_DESCRIPTIONS } from "./helpers";

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

export function matchCaretColorPattern(className: string): string | null {
  // caret-(<custom-property>) - custom CSS property for caret color
  const customPropMatch = className.match(/^caret-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `caret color ${customPropMatch[1]}`;
  }

  // caret-[value] - arbitrary caret color value
  const arbitraryMatch = className.match(/^caret-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `caret color ${arbitraryMatch[1]}`;
  }

  // caret-<color>-<shade> - Tailwind color palette
  const colorMatch = className.match(/^caret-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/);
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} caret color`;
  }

  return null;
}

/**
 * Try to match scroll-margin patterns (scroll-m*, scroll-mx*, scroll-my*, scroll-ms*, scroll-me*, scroll-mt*, scroll-mr*, scroll-mb*, scroll-ml*)
 */

export function matchAccentColorPattern(className: string): string | null {
  // accent-(<custom-property>) - custom CSS property for accent color
  const customPropMatch = className.match(/^accent-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `accent color ${customPropMatch[1]}`;
  }

  // accent-[value] - arbitrary accent color value
  const arbitraryMatch = className.match(/^accent-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `accent color ${arbitraryMatch[1]}`;
  }

  // accent-<color>-<shade> - Tailwind color palette
  const colorMatch = className.match(/^accent-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/);
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} accent color`;
  }

  return null;
}

/**
 * Try to match caret-color patterns (caret-*)
 */

export function matchFillPattern(className: string): string | null {
  // fill-(<custom-property>) - custom CSS property for fill
  const customPropMatch = className.match(/^fill-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `fill ${customPropMatch[1]}`;
  }

  // fill-[value] - arbitrary fill value
  const arbitraryMatch = className.match(/^fill-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `fill ${arbitraryMatch[1]}`;
  }

  // fill-<color>-<shade> - Tailwind color palette
  const colorMatch = className.match(/^fill-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/);
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} fill`;
  }

  return null;
}

/**
 * Try to match will-change patterns (will-change-*)
 */

export function matchStrokePattern(className: string): string | null {
  // stroke-(length:<custom-property>) - custom CSS property for stroke width
  const strokeWidthCustomPropMatch = className.match(/^stroke-\(length:(--[\w-]+)\)$/);
  if (strokeWidthCustomPropMatch) {
    return `stroke width ${strokeWidthCustomPropMatch[1]}`;
  }

  // stroke-(<custom-property>) - custom CSS property for stroke color
  const customPropMatch = className.match(/^stroke-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `stroke ${customPropMatch[1]}`;
  }

  // stroke-[value] - arbitrary stroke value (could be width or color)
  const arbitraryMatch = className.match(/^stroke-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `stroke ${arbitraryMatch[1]}`;
  }

  // stroke-<number> - stroke width (numeric values)
  const widthMatch = className.match(/^stroke-(\d+(?:\.\d+)?)$/);
  if (widthMatch) {
    return `stroke width ${widthMatch[1]}`;
  }

  // stroke-<color>-<shade> - Tailwind color palette
  const colorMatch = className.match(/^stroke-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/);
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} stroke`;
  }

  return null;
}

/**
 * Try to match fill patterns (fill-*)
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


