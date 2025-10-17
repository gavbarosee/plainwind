/**
 * Typography enhancements for panel translations
 *
 * Provides visual enhancements for font-related properties
 * including font weights and font sizes.
 */

/**
 * Font weight mappings
 * Maps plain English weight descriptions to CSS font-weight values
 */
const FONT_WEIGHTS: Record<string, string> = {
  thin: '100',
  'extra light': '200',
  extralight: '200',
  light: '300',
  normal: '400',
  regular: '400',
  'medium weight': '500',
  medium: '500',
  semibold: '600',
  'semi-bold': '600',
  bold: '700',
  'extra bold': '800',
  extrabold: '800',
  black: '900',
};

/**
 * Enhance font weight words with actual font weight styling
 *
 * Detects font weight keywords in translation text and applies
 * the corresponding font-weight CSS property for visual clarity.
 *
 * @param text - Translation text that may contain font weight keywords
 * @returns HTML string with font weight words styled
 *
 * @example
 * ```ts
 * enhanceFontWeights("bold text")
 * // Returns: '<span class="font-weight-demo" style="font-weight: 700;">bold</span> text'
 *
 * enhanceFontWeights("light text, semibold heading")
 * // Returns: '<span style="font-weight: 300;">light</span> text, <span style="font-weight: 600;">semibold</span> heading'
 * ```
 */
export function enhanceFontWeights(text: string): string {
  // Sort by length (longest first) to match multi-word weights first
  const weightNames = Object.keys(FONT_WEIGHTS).sort(
    (a, b) => b.length - a.length
  );

  let result = text;
  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];

  for (const weightName of weightNames) {
    const regex = new RegExp(`\\b${weightName}\\b`, 'gi');
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Check for overlaps
      const overlaps = replacements.some(
        (r) =>
          (start >= r.start && start < r.end) || (end > r.start && end <= r.end)
      );

      if (!overlaps) {
        const weightValue = FONT_WEIGHTS[weightName.toLowerCase()];
        const replacement = `<span class="font-weight-demo" style="font-weight: ${weightValue};">${match[0]}</span>`;

        replacements.push({ start, end, replacement });
      }
    }
  }

  // Sort and apply replacements from end to start
  replacements.sort((a, b) => b.start - a.start);

  for (const { start, end, replacement } of replacements) {
    result = result.substring(0, start) + replacement + result.substring(end);
  }

  return result;
}

/**
 * Enhance font size keywords with visual sizing
 *
 * Makes text size keywords appear in relative sizing
 *
 * @param text - Translation text with size keywords
 * @returns HTML with sized text
 *
 * @example
 * ```ts
 * enhanceFontSizes("extra large text")
 * // Returns: '<span class="size-demo size-xl">extra large</span> text'
 * ```
 */
export function enhanceFontSizes(text: string): string {
  const sizeKeywords: Record<string, string> = {
    'extra small text': 'xs',
    'small text': 'sm',
    'large text': 'lg',
    'extra large text': 'xl',
    'extra extra large text': '2xl',
    '3xl text': '3xl',
    '4xl text': '4xl',
    '5xl text': '5xl',
    '6xl text': '6xl',
  };

  let result = text;
  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];

  // Sort by length (longest first)
  const keywords = Object.keys(sizeKeywords).sort(
    (a, b) => b.length - a.length
  );

  for (const keyword of keywords) {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    let match;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      // Check for overlaps
      const overlaps = replacements.some(
        (r) =>
          (start >= r.start && start < r.end) || (end > r.start && end <= r.end)
      );

      if (!overlaps) {
        const sizeClass = sizeKeywords[keyword.toLowerCase()];
        const replacement = `<span class="size-demo size-${sizeClass}">${match[0]}</span>`;
        replacements.push({ start, end, replacement });
      }
    }
  }

  // Sort and apply
  replacements.sort((a, b) => b.start - a.start);

  for (const { start, end, replacement } of replacements) {
    result = result.substring(0, start) + replacement + result.substring(end);
  }

  return result;
}
