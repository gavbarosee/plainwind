/**
 * Spacing enhancements for panel translations
 *
 * Adds pixel value annotations to spacing-related translations
 * to make rem values more intuitive.
 */

/**
 * Add spacing values to spacing-related translations
 *
 * Detects spacing keywords (padding, margin, gap) with rem values
 * and adds a helpful note showing the pixel equivalent.
 *
 * @param text - Translation text that may contain spacing values
 * @returns Text with spacing values annotated
 *
 * @example
 * ```ts
 * enhanceSpacingValues("padding 1rem")
 * // Returns: "padding 1rem <span class='spacing-value'>(16px)</span>"
 *
 * enhanceSpacingValues("gap 2rem, padding 0.5rem")
 * // Returns: "gap 2rem <span class='spacing-value'>(32px)</span>, padding 0.5rem <span class='spacing-value'>(8px)</span>"
 * ```
 */
export function enhanceSpacingValues(text: string): string {
  let result = text;

  // Pattern to match spacing with rem values
  // Matches: "padding 1rem", "margin 2.5rem", "gap 0.25rem", etc.
  const spacingPattern =
    /\b(padding|margin|gap|horizontal padding|vertical padding|horizontal margin|vertical margin)\s+([\d.]+)rem\b/gi;

  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];
  let match;

  while ((match = spacingPattern.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    const remValue = parseFloat(match[2]);

    // Calculate pixel value (1rem = 16px by default)
    const pxValue = Math.round(remValue * 16);

    const replacement = `${match[0]} <span class="spacing-value">(${pxValue}px)</span>`;

    replacements.push({ start, end, replacement });
  }

  // Sort and apply replacements from end to start
  replacements.sort((a, b) => b.start - a.start);

  for (const { start, end, replacement } of replacements) {
    result = result.substring(0, start) + replacement + result.substring(end);
  }

  return result;
}
