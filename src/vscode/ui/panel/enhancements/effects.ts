/**
 * Visual effects enhancements for panel translations
 *
 * Provides visual previews and styling for effect-related properties
 * including opacity, shadows, and border radius.
 */

/**
 * Enhance opacity values with visual opacity effect
 *
 * Detects opacity keywords and applies actual opacity styling
 *
 * @param text - Translation text that may contain opacity values
 * @returns HTML with opacity styling applied
 *
 * @example
 * ```ts
 * enhanceOpacity("50% opacity")
 * // Returns: '<span class="opacity-demo" style="opacity: 0.5;">50% opacity</span>'
 * ```
 */
export function enhanceOpacity(text: string): string {
  let result = text;

  // Pattern to match opacity percentages or decimal values
  const opacityPattern = /\b(\d+)%\s+opacity\b/gi;
  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];
  let match;

  while ((match = opacityPattern.exec(text)) !== null) {
    const start = match.index;
    const end = start + match[0].length;
    const percentage = parseInt(match[1]);
    const opacityValue = percentage / 100;

    const replacement = `<span class="opacity-demo" style="opacity: ${opacityValue};">${match[0]}</span>`;
    replacements.push({ start, end, replacement });
  }

  // Sort and apply replacements
  replacements.sort((a, b) => b.start - a.start);

  for (const { start, end, replacement } of replacements) {
    result = result.substring(0, start) + replacement + result.substring(end);
  }

  return result;
}

/**
 * Enhance border radius keywords with visual preview
 *
 * Shows small rounded boxes next to border radius descriptions
 *
 * @param text - Translation text with border radius keywords
 * @returns HTML with visual border radius indicators
 *
 * @example
 * ```ts
 * enhanceBorderRadius("large rounded corners")
 * // Returns: 'large rounded corners <span class="radius-demo radius-lg"></span>'
 * ```
 */
export function enhanceBorderRadius(text: string): string {
  const radiusKeywords: Record<string, string> = {
    'fully rounded': 'full',
    'extra large rounded corners': '3xl',
    'large rounded corners': 'lg',
    'medium rounded corners': 'md',
    'small rounded corners': 'sm',
    'rounded corners': 'base',
    'slightly rounded corners': 'sm',
  };

  let result = text;
  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];

  // Sort by length (longest first)
  const keywords = Object.keys(radiusKeywords).sort(
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
        const radiusClass = radiusKeywords[keyword.toLowerCase()];
        const replacement = `${match[0]} <span class="radius-demo radius-${radiusClass}"></span>`;
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

/**
 * Enhance shadow keywords with visual preview
 *
 * Shows small boxes with actual shadow effects
 *
 * @param text - Translation text with shadow keywords
 * @returns HTML with visual shadow indicators
 *
 * @example
 * ```ts
 * enhanceShadows("large shadow")
 * // Returns: 'large shadow <span class="shadow-demo shadow-lg"></span>'
 * ```
 */
export function enhanceShadows(text: string): string {
  const shadowKeywords: Record<string, string> = {
    'extra large shadow': 'xl',
    'large shadow': 'lg',
    'medium shadow': 'md',
    'small shadow': 'sm',
    'inner shadow': 'inner',
  };

  let result = text;
  const replacements: Array<{
    start: number;
    end: number;
    replacement: string;
  }> = [];

  // Sort by length (longest first)
  const keywords = Object.keys(shadowKeywords).sort(
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
        const shadowClass = shadowKeywords[keyword.toLowerCase()];
        const replacement = `${match[0]} <span class="shadow-demo shadow-${shadowClass}"></span>`;
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
