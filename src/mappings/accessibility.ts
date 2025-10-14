/**
 * Accessibility utilities
 */
export const accessibilityMappings: Record<string, string> = {
  // Content (pseudo-elements)
  'content-none': 'no content (for ::before/::after)',
  // Forced Color Adjust
  'forced-color-adjust-auto': 'auto forced color adjust',
  'forced-color-adjust-none': 'no forced color adjust',
  // Accessibility
  'sr-only': 'screen reader only (visually hidden)',
  'not-sr-only': 'visible to all (not just screen readers)',
};
