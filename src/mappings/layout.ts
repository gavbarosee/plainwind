/**
 * Layout utilities: display, visibility, position, float, clear, box sizing,
 * columns, break, object fit/position, image rendering, overflow, z-index
 */
export const layoutMappings: Record<string, string> = {
  // Display
  block: 'display as block',
  'inline-block': 'display as inline block',
  inline: 'display inline',
  'inline-flex': 'inline flex container',
  'inline-grid': 'inline grid container',
  table: 'display as table',
  'inline-table': 'display as inline table',
  'table-caption': 'display as table caption',
  'table-cell': 'display as table cell',
  'table-column': 'display as table column',
  'table-column-group': 'display as table column group',
  'table-footer-group': 'display as table footer group',
  'table-header-group': 'display as table header group',
  'table-row-group': 'display as table row group',
  'table-row': 'display as table row',
  'flow-root': 'flow-root display',
  contents: 'contents only (no box)',
  'list-item': 'display as list item',
  hidden: 'not visible',

  // Visibility
  visible: 'visible',
  invisible: 'hidden but takes up space',
  collapse: 'collapses table rows/columns',

  // Float
  start: 'floats to start (logical property)',
  end: 'floats to end (logical property)',
  'float-start': 'floats to start side',
  'float-end': 'floats to end side',
  'float-right': 'floats to right',
  'float-left': 'floats to left',
  'float-none': 'no float',

  // Clear
  'clear-start': 'clears start side floats',
  'clear-end': 'clears end side floats',
  'clear-left': 'clears left floats',
  'clear-right': 'clears right floats',
  'clear-both': 'clears both side floats',
  'clear-none': 'no clear',

  // Box Sizing
  'box-border': 'includes border and padding in size',
  'box-content': 'excludes border and padding from size',

  // Box Decoration Break
  'box-decoration-slice': 'box decoration slices at breaks',
  'box-decoration-clone': 'box decoration clones at breaks',

  // Border Sizing (v4 beta)
  'border-sizing-content': 'border sizing uses content-box',
  'border-sizing-border': 'border sizing uses border-box',

  // Columns
  'columns-1': 'one column layout',
  'columns-2': 'two column layout',
  'columns-3': 'three column layout',
  'columns-4': 'four column layout',
  'columns-5': 'five column layout',
  'columns-6': 'six column layout',
  'columns-7': 'seven column layout',
  'columns-8': 'eight column layout',
  'columns-9': 'nine column layout',
  'columns-10': 'ten column layout',
  'columns-11': 'eleven column layout',
  'columns-12': 'twelve column layout',
  'columns-auto': 'automatic column count',
  'columns-4xs': '4xs column width',
  'columns-3xs': '3xs column width',
  'columns-2xs': '2xs column width',
  'columns-xs': 'xs column width',
  'columns-sm': 'small column width',
  'columns-md': 'medium column width',
  'columns-lg': 'large column width',
  'columns-xl': 'extra large column width',
  'columns-2xl': '2xl column width',
  'columns-3xl': '3xl column width',
  'columns-4xl': '4xl column width',
  'columns-5xl': '5xl column width',
  'columns-6xl': '6xl column width',
  'columns-7xl': '7xl column width',

  // Break Before
  'break-before-auto': 'auto break before',
  'break-before-avoid': 'avoid break before',
  'break-before-all': 'break before always',
  'break-before-avoid-page': 'avoid page break before',
  'break-before-page': 'page break before',
  'break-before-left': 'left page break before',
  'break-before-right': 'right page break before',
  'break-before-column': 'column break before',

  // Break After
  'break-after-auto': 'auto break after',
  'break-after-avoid': 'avoid break after',
  'break-after-all': 'break after always',
  'break-after-avoid-page': 'avoid page break after',
  'break-after-page': 'page break after',
  'break-after-left': 'left page break after',
  'break-after-right': 'right page break after',
  'break-after-column': 'column break after',

  // Break Inside
  'break-inside-auto': 'auto break inside',
  'break-inside-avoid': 'avoid break inside',
  'break-inside-avoid-page': 'avoid page break inside',
  'break-inside-avoid-column': 'avoid column break inside',

  // Object Fit
  'object-contain': 'scales to fit while maintaining aspect ratio',
  'object-cover': 'covers container while maintaining aspect ratio',
  'object-fill': 'stretches to fill container',
  'object-none': 'not resized',
  'object-scale-down': 'scales down to fit (contain or none)',

  // Object Position
  'object-bottom': 'positions content at bottom',
  'object-center': 'positions content at center',
  'object-left': 'positions content at left',
  'object-right': 'positions content at right',
  'object-top': 'positions content at top',
  'object-top-left': 'positions content at top left',
  'object-top-right': 'positions content at top right',
  'object-bottom-left': 'positions content at bottom left',
  'object-bottom-right': 'positions content at bottom right',
  'object-left-bottom': 'positions content at left bottom',
  'object-left-top': 'positions content at left top',
  'object-right-bottom': 'positions content at right bottom',
  'object-right-top': 'positions content at right top',

  // Image Rendering
  'image-render-auto': 'auto image rendering',
  'image-render-crisp-edges': 'crisp edge image rendering',
  'image-render-pixelated': 'pixelated image rendering',

  // Position
  static: 'normal positioning (static position)',
  fixed: 'stays in place when scrolling (fixed position)',
  absolute: 'positioned relative to parent (absolute position)',
  relative: 'positioned relative to normal position (relative position)',
  sticky: 'sticks to top when scrolling (sticky position)',

  // Overflow
  'overflow-auto': 'scrolls when needed',
  'overflow-hidden': 'hides overflow content',
  'overflow-clip': 'clips overflow content',
  'overflow-visible': 'shows overflow content',
  'overflow-scroll': 'always scrollable',
  'overflow-x-auto': 'scrolls horizontally when needed',
  'overflow-x-hidden': 'hides horizontal overflow',
  'overflow-x-clip': 'clips horizontal overflow',
  'overflow-x-visible': 'shows horizontal overflow',
  'overflow-x-scroll': 'always scrollable horizontally',
  'overflow-y-auto': 'scrolls vertically when needed',
  'overflow-y-hidden': 'hides vertical overflow',
  'overflow-y-clip': 'clips vertical overflow',
  'overflow-y-visible': 'shows vertical overflow',
  'overflow-y-scroll': 'always scrollable vertically',

  // Overscroll Behavior
  'overscroll-auto': 'auto overscroll behavior',
  'overscroll-contain': 'contains overscroll',
  'overscroll-none': 'no overscroll behavior',
  'overscroll-x-auto': 'auto horizontal overscroll',
  'overscroll-x-contain': 'contains horizontal overscroll',
  'overscroll-x-none': 'no horizontal overscroll',
  'overscroll-y-auto': 'auto vertical overscroll',
  'overscroll-y-contain': 'contains vertical overscroll',
  'overscroll-y-none': 'no vertical overscroll',

  // Z-Index
  '-z-50': 'z-index -50 (deep below)',
  '-z-40': 'z-index -40',
  '-z-30': 'z-index -30',
  '-z-20': 'z-index -20',
  '-z-10': 'z-index -10',
  'z-0': 'z-index 0 (bottom layer)',
  'z-10': 'z-index 10 (above default)',
  'z-20': 'z-index 20 (higher)',
  'z-30': 'z-index 30 (high)',
  'z-40': 'z-index 40 (very high)',
  'z-50': 'z-index 50 (top layer)',
  'z-auto': 'auto z-index',
};
