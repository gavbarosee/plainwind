/**
 * Accessibility utilities
 */
export const accessibilityMappings: Record<string, string> = {
  // Content (pseudo-elements)
  'content-none': 'removes content from before/after pseudo-elements',
  // Forced Color Adjust
  'forced-color-adjust-auto': 'let browser adjust colors in high contrast mode',
  'forced-color-adjust-none': 'prevent color adjustments in high contrast mode',
  // Accessibility
  'sr-only': 'screen reader only (visually hidden)',
  'not-sr-only': 'visible to all (not just screen readers)',
};
