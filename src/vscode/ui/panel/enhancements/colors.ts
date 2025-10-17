/**
 * Color highlighter for panel translations
 *
 * Detects color names in plain English translations and wraps them
 * in styled spans showing the actual color.
 *
 * Uses Tailwind's default color palette as reference.
 * Note: Users may customize colors in tailwind.config.js, but we use
 * defaults for visual reference in the panel.
 */

/**
 * Tailwind default color palette (v4.1)
 * Source: https://tailwindcss.com/docs/colors
 *
 * Includes all 11 shades (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
 * for accurate color representation matching official Tailwind palette
 */
const TAILWIND_COLORS: Record<string, string> = {
  // Base colors
  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',

  // Slate (all 11 shades)
  slate: '#64748b',
  'lightest slate': '#f8fafc', // slate-50
  'very light slate': '#f1f5f9', // slate-100
  'light slate': '#e2e8f0', // slate-200
  'lightish slate': '#cbd5e1', // slate-300
  'medium light slate': '#94a3b8', // slate-400
  'medium slate': '#64748b', // slate-500
  'medium dark slate': '#475569', // slate-600
  'dark slate': '#334155', // slate-700
  'very dark slate': '#1e293b', // slate-800
  'darkest slate': '#0f172a', // slate-900
  'ultra dark slate': '#020617', // slate-950

  // Gray (all 11 shades)
  gray: '#6b7280',
  'lightest gray': '#f9fafb', // gray-50
  'very light gray': '#f3f4f6', // gray-100
  'light gray': '#e5e7eb', // gray-200
  'lightish gray': '#d1d5db', // gray-300
  'medium light gray': '#9ca3af', // gray-400
  'medium gray': '#6b7280', // gray-500
  'medium dark gray': '#4b5563', // gray-600
  'dark gray': '#374151', // gray-700
  'very dark gray': '#1f2937', // gray-800
  'darkest gray': '#111827', // gray-900
  'ultra dark gray': '#030712', // gray-950

  // Zinc (all 11 shades)
  zinc: '#71717a',
  'lightest zinc': '#fafafa', // zinc-50
  'very light zinc': '#f4f4f5', // zinc-100
  'light zinc': '#e4e4e7', // zinc-200
  'lightish zinc': '#d4d4d8', // zinc-300
  'medium light zinc': '#a1a1aa', // zinc-400
  'medium zinc': '#71717a', // zinc-500
  'medium dark zinc': '#52525b', // zinc-600
  'dark zinc': '#3f3f46', // zinc-700
  'very dark zinc': '#27272a', // zinc-800
  'darkest zinc': '#18181b', // zinc-900
  'ultra dark zinc': '#09090b', // zinc-950

  // Neutral (all 11 shades)
  neutral: '#737373',
  'lightest neutral': '#fafafa', // neutral-50
  'very light neutral': '#f5f5f5', // neutral-100
  'light neutral': '#e5e5e5', // neutral-200
  'lightish neutral': '#d4d4d4', // neutral-300
  'medium light neutral': '#a3a3a3', // neutral-400
  'medium neutral': '#737373', // neutral-500
  'medium dark neutral': '#525252', // neutral-600
  'dark neutral': '#404040', // neutral-700
  'very dark neutral': '#262626', // neutral-800
  'darkest neutral': '#171717', // neutral-900
  'ultra dark neutral': '#0a0a0a', // neutral-950

  // Stone (all 11 shades)
  stone: '#78716c',
  'lightest stone': '#fafaf9', // stone-50
  'very light stone': '#f5f5f4', // stone-100
  'light stone': '#e7e5e4', // stone-200
  'lightish stone': '#d6d3d1', // stone-300
  'medium light stone': '#a8a29e', // stone-400
  'medium stone': '#78716c', // stone-500
  'medium dark stone': '#57534e', // stone-600
  'dark stone': '#44403c', // stone-700
  'very dark stone': '#292524', // stone-800
  'darkest stone': '#1c1917', // stone-900
  'ultra dark stone': '#0c0a09', // stone-950

  // Red (all 11 shades)
  red: '#ef4444',
  'lightest red': '#fef2f2', // red-50
  'very light red': '#fee2e2', // red-100
  'light red': '#fecaca', // red-200
  'lightish red': '#fca5a5', // red-300
  'medium light red': '#f87171', // red-400
  'medium red': '#ef4444', // red-500
  'medium dark red': '#dc2626', // red-600
  'dark red': '#b91c1c', // red-700
  'very dark red': '#991b1b', // red-800
  'darkest red': '#7f1d1d', // red-900
  'ultra dark red': '#450a0a', // red-950

  // Orange (all 11 shades)
  orange: '#f97316',
  'lightest orange': '#fff7ed', // orange-50
  'very light orange': '#ffedd5', // orange-100
  'light orange': '#fed7aa', // orange-200
  'lightish orange': '#fdba74', // orange-300
  'medium light orange': '#fb923c', // orange-400
  'medium orange': '#f97316', // orange-500
  'medium dark orange': '#ea580c', // orange-600
  'dark orange': '#c2410c', // orange-700
  'very dark orange': '#9a3412', // orange-800
  'darkest orange': '#7c2d12', // orange-900
  'ultra dark orange': '#431407', // orange-950

  // Yellow (all 11 shades)
  yellow: '#eab308',
  'lightest yellow': '#fefce8', // yellow-50
  'very light yellow': '#fef9c3', // yellow-100
  'light yellow': '#fef08a', // yellow-200
  'lightish yellow': '#fde047', // yellow-300
  'medium light yellow': '#facc15', // yellow-400
  'medium yellow': '#eab308', // yellow-500
  'medium dark yellow': '#ca8a04', // yellow-600
  'dark yellow': '#a16207', // yellow-700
  'very dark yellow': '#854d0e', // yellow-800
  'darkest yellow': '#713f12', // yellow-900
  'ultra dark yellow': '#422006', // yellow-950

  // Green (all 11 shades)
  green: '#22c55e',
  'lightest green': '#f0fdf4', // green-50
  'very light green': '#dcfce7', // green-100
  'light green': '#bbf7d0', // green-200
  'lightish green': '#86efac', // green-300
  'medium light green': '#4ade80', // green-400
  'medium green': '#22c55e', // green-500
  'medium dark green': '#16a34a', // green-600
  'dark green': '#15803d', // green-700
  'very dark green': '#166534', // green-800
  'darkest green': '#14532d', // green-900
  'ultra dark green': '#052e16', // green-950

  // Blue (all 11 shades)
  blue: '#3b82f6',
  'lightest blue': '#eff6ff', // blue-50
  'very light blue': '#dbeafe', // blue-100
  'light blue': '#bfdbfe', // blue-200
  'lightish blue': '#93c5fd', // blue-300
  'medium light blue': '#60a5fa', // blue-400
  'medium blue': '#3b82f6', // blue-500
  'medium dark blue': '#2563eb', // blue-600
  'dark blue': '#1d4ed8', // blue-700
  'very dark blue': '#1e40af', // blue-800
  'darkest blue': '#1e3a8a', // blue-900
  'ultra dark blue': '#172554', // blue-950

  // Indigo (all 11 shades)
  indigo: '#6366f1',
  'lightest indigo': '#eef2ff', // indigo-50
  'very light indigo': '#e0e7ff', // indigo-100
  'light indigo': '#c7d2fe', // indigo-200
  'lightish indigo': '#a5b4fc', // indigo-300
  'medium light indigo': '#818cf8', // indigo-400
  'medium indigo': '#6366f1', // indigo-500
  'medium dark indigo': '#4f46e5', // indigo-600
  'dark indigo': '#4338ca', // indigo-700
  'very dark indigo': '#3730a3', // indigo-800
  'darkest indigo': '#312e81', // indigo-900
  'ultra dark indigo': '#1e1b4b', // indigo-950

  // Purple (all 11 shades)
  purple: '#a855f7',
  'lightest purple': '#faf5ff', // purple-50
  'very light purple': '#f3e8ff', // purple-100
  'light purple': '#e9d5ff', // purple-200
  'lightish purple': '#d8b4fe', // purple-300
  'medium light purple': '#c084fc', // purple-400
  'medium purple': '#a855f7', // purple-500
  'medium dark purple': '#9333ea', // purple-600
  'dark purple': '#7e22ce', // purple-700
  'very dark purple': '#6b21a8', // purple-800
  'darkest purple': '#581c87', // purple-900
  'ultra dark purple': '#3b0764', // purple-950

  // Pink (all 11 shades)
  pink: '#ec4899',
  'lightest pink': '#fdf2f8', // pink-50
  'very light pink': '#fce7f3', // pink-100
  'light pink': '#fbcfe8', // pink-200
  'lightish pink': '#f9a8d4', // pink-300
  'medium light pink': '#f472b6', // pink-400
  'medium pink': '#ec4899', // pink-500
  'medium dark pink': '#db2777', // pink-600
  'dark pink': '#be185d', // pink-700
  'very dark pink': '#9d174d', // pink-800
  'darkest pink': '#831843', // pink-900
  'ultra dark pink': '#500724', // pink-950

  // Cyan (all 11 shades)
  cyan: '#06b6d4',
  'lightest cyan': '#ecfeff', // cyan-50
  'very light cyan': '#cffafe', // cyan-100
  'light cyan': '#a5f3fc', // cyan-200
  'lightish cyan': '#67e8f9', // cyan-300
  'medium light cyan': '#22d3ee', // cyan-400
  'medium cyan': '#06b6d4', // cyan-500
  'medium dark cyan': '#0891b2', // cyan-600
  'dark cyan': '#0e7490', // cyan-700
  'very dark cyan': '#155e75', // cyan-800
  'darkest cyan': '#164e63', // cyan-900
  'ultra dark cyan': '#083344', // cyan-950

  // Teal (all 11 shades)
  teal: '#14b8a6',
  'lightest teal': '#f0fdfa', // teal-50
  'very light teal': '#ccfbf1', // teal-100
  'light teal': '#99f6e4', // teal-200
  'lightish teal': '#5eead4', // teal-300
  'medium light teal': '#2dd4bf', // teal-400
  'medium teal': '#14b8a6', // teal-500
  'medium dark teal': '#0d9488', // teal-600
  'dark teal': '#0f766e', // teal-700
  'very dark teal': '#115e59', // teal-800
  'darkest teal': '#134e4a', // teal-900
  'ultra dark teal': '#042f2e', // teal-950

  // Emerald (all 11 shades)
  emerald: '#10b981',
  'lightest emerald': '#ecfdf5', // emerald-50
  'very light emerald': '#d1fae5', // emerald-100
  'light emerald': '#a7f3d0', // emerald-200
  'lightish emerald': '#6ee7b7', // emerald-300
  'medium light emerald': '#34d399', // emerald-400
  'medium emerald': '#10b981', // emerald-500
  'medium dark emerald': '#059669', // emerald-600
  'dark emerald': '#047857', // emerald-700
  'very dark emerald': '#065f46', // emerald-800
  'darkest emerald': '#064e3b', // emerald-900
  'ultra dark emerald': '#022c22', // emerald-950

  // Lime (all 11 shades)
  lime: '#84cc16',
  'lightest lime': '#f7fee7', // lime-50
  'very light lime': '#ecfccb', // lime-100
  'light lime': '#d9f99d', // lime-200
  'lightish lime': '#bef264', // lime-300
  'medium light lime': '#a3e635', // lime-400
  'medium lime': '#84cc16', // lime-500
  'medium dark lime': '#65a30d', // lime-600
  'dark lime': '#4d7c0f', // lime-700
  'very dark lime': '#3f6212', // lime-800
  'darkest lime': '#365314', // lime-900
  'ultra dark lime': '#1a2e05', // lime-950

  // Rose (all 11 shades)
  rose: '#f43f5e',
  'lightest rose': '#fff1f2', // rose-50
  'very light rose': '#ffe4e6', // rose-100
  'light rose': '#fecdd3', // rose-200
  'lightish rose': '#fda4af', // rose-300
  'medium light rose': '#fb7185', // rose-400
  'medium rose': '#f43f5e', // rose-500
  'medium dark rose': '#e11d48', // rose-600
  'dark rose': '#be123c', // rose-700
  'very dark rose': '#9f1239', // rose-800
  'darkest rose': '#881337', // rose-900
  'ultra dark rose': '#4c0519', // rose-950

  // Amber (all 11 shades)
  amber: '#f59e0b',
  'lightest amber': '#fffbeb', // amber-50
  'very light amber': '#fef3c7', // amber-100
  'light amber': '#fde68a', // amber-200
  'lightish amber': '#fcd34d', // amber-300
  'medium light amber': '#fbbf24', // amber-400
  'medium amber': '#f59e0b', // amber-500
  'medium dark amber': '#d97706', // amber-600
  'dark amber': '#b45309', // amber-700
  'very dark amber': '#92400e', // amber-800
  'darkest amber': '#78350f', // amber-900
  'ultra dark amber': '#451a03', // amber-950

  // Violet (all 11 shades)
  violet: '#8b5cf6',
  'lightest violet': '#f5f3ff', // violet-50
  'very light violet': '#ede9fe', // violet-100
  'light violet': '#ddd6fe', // violet-200
  'lightish violet': '#c4b5fd', // violet-300
  'medium light violet': '#a78bfa', // violet-400
  'medium violet': '#8b5cf6', // violet-500
  'medium dark violet': '#7c3aed', // violet-600
  'dark violet': '#6d28d9', // violet-700
  'very dark violet': '#5b21b6', // violet-800
  'darkest violet': '#4c1d95', // violet-900
  'ultra dark violet': '#2e1065', // violet-950

  // Fuchsia (all 11 shades)
  fuchsia: '#d946ef',
  'lightest fuchsia': '#fdf4ff', // fuchsia-50
  'very light fuchsia': '#fae8ff', // fuchsia-100
  'light fuchsia': '#f5d0fe', // fuchsia-200
  'lightish fuchsia': '#f0abfc', // fuchsia-300
  'medium light fuchsia': '#e879f9', // fuchsia-400
  'medium fuchsia': '#d946ef', // fuchsia-500
  'medium dark fuchsia': '#c026d3', // fuchsia-600
  'dark fuchsia': '#a21caf', // fuchsia-700
  'very dark fuchsia': '#86198f', // fuchsia-800
  'darkest fuchsia': '#701a75', // fuchsia-900
  'ultra dark fuchsia': '#4a044e', // fuchsia-950

  // Sky (all 11 shades)
  sky: '#0ea5e9',
  'lightest sky': '#f0f9ff', // sky-50
  'very light sky': '#e0f2fe', // sky-100
  'light sky': '#bae6fd', // sky-200
  'lightish sky': '#7dd3fc', // sky-300
  'medium light sky': '#38bdf8', // sky-400
  'medium sky': '#0ea5e9', // sky-500
  'medium dark sky': '#0284c7', // sky-600
  'dark sky': '#0369a1', // sky-700
  'very dark sky': '#075985', // sky-800
  'darkest sky': '#0c4a6e', // sky-900
  'ultra dark sky': '#082f49', // sky-950
};

/**
 * Highlight color names in translation text
 *
 * Detects color names and wraps them in styled spans showing the actual color.
 *
 * @param text - Translation text that may contain color names
 * @returns HTML string with color names highlighted
 *
 * @example
 * ```ts
 * highlightColors("blue background")
 * // Returns: '<span class="color-badge" style="...">blue</span> background'
 *
 * highlightColors("medium dark blue background, white text")
 * // Returns: '<span class="color-badge">medium dark blue</span> background, <span class="color-badge">white</span> text'
 * ```
 */
export function highlightColors(text: string): string {
  // Sort colors by length (longest first) to match multi-word colors first
  const colorNames = Object.keys(TAILWIND_COLORS).sort(
    (a, b) => b.length - a.length
  );

  let result = text;

  // Track which parts of the string have been replaced to avoid double-replacements
  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];

  for (const colorName of colorNames) {
    // Create a regex that matches the color name as a whole word/phrase
    // Use word boundaries but allow for phrases like "medium dark blue"
    const regex = new RegExp(`\\b${colorName}\\b`, 'gi');
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Check if this range overlaps with any existing replacement
      const overlaps = replacements.some(
        (r) =>
          (start >= r.start && start < r.end) || (end > r.start && end <= r.end)
      );

      if (!overlaps) {
        const hexColor = TAILWIND_COLORS[colorName.toLowerCase()];

        const replacement =
          hexColor === 'transparent'
            ? `<span class="color-text color-transparent">${match[0]}</span>`
            : `<span class="color-text" style="color: ${hexColor};">${match[0]}</span>`;

        replacements.push({ start, end, replacement });
      }
    }
  }

  // Sort replacements by position (reverse order) so we can replace from end to start
  replacements.sort((a, b) => b.start - a.start);

  // Apply replacements
  for (const { start, end, replacement } of replacements) {
    result = result.substring(0, start) + replacement + result.substring(end);
  }

  return result;
}
