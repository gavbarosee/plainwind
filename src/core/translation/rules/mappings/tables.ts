/**
 * Table utilities
 */
export const tablesMappings: Record<string, string> = {
  // Table Layout
  'table-auto': 'columns size based on content',
  'table-fixed': 'columns use fixed widths',
  // Table Border Collapse
  'border-collapse': 'merged table borders (cells share borders)',
  'border-separate': 'separate table borders (cells have own borders)',
  // Table Border Spacing
  'border-spacing-0': 'no gap between table cells',
  'border-spacing-px': '1px gap between table cells',
  'border-spacing-0.5': '0.125rem gap between table cells',
  'border-spacing-1': '0.25rem gap between table cells',
  'border-spacing-2': '0.5rem gap between table cells',
  'border-spacing-4': '1rem gap between table cells',
  'border-spacing-8': '2rem gap between table cells',
  // Caption Side
  'caption-top': 'table caption positioned at top',
  'caption-bottom': 'table caption positioned at bottom',
};
