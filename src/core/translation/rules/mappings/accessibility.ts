/**
 * Accessibility utilities
 */
export const accessibilityMappings: Record<string, string> = {
  // Content (pseudo-elements)
  'content-none': 'removes content from before/after pseudo-elements',
  // Forced Color Adjust
  'forced-color-adjust-auto':
    'allows browser to adjust colors for high contrast mode',
  'forced-color-adjust-none':
    'preserves exact colors even in high contrast mode',
  // Accessibility
  'sr-only': 'screen reader only (hidden visually but accessible)',
  'not-sr-only': 'visible to everyone (screen readers and sighted users)',
};
