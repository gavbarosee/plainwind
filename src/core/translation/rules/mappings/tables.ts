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
  'border-spacing-0': 'no border spacing',
  'border-spacing-px': '1px border spacing',
  'border-spacing-0.5': '0.125rem border spacing',
  'border-spacing-1': '0.25rem border spacing',
  'border-spacing-2': '0.5rem border spacing',
  'border-spacing-4': '1rem border spacing',
  'border-spacing-8': '2rem border spacing',
  // Caption Side
  'caption-top': 'table caption positioned at top',
  'caption-bottom': 'table caption positioned at bottom',
};
