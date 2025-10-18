/**
 * Layout utilities: display, visibility, position, float, clear, box sizing,
 * columns, break, object fit/position, image rendering, overflow, z-index
 */
export const layoutMappings: Record<string, string> = {
  // Display
  block: 'display as block (takes full width, stacks vertically)',
  'inline-block':
    'display as inline block (flows with text, respects width/height)',
  inline: 'display inline (flows with text like a word)',
  'inline-flex': 'inline flex container (flexbox that flows with text)',
  'inline-grid': 'inline grid container (grid that flows with text)',
  table: 'display as table',
  'inline-table': 'display as inline table (flows with text)',
  'table-caption': 'display as table caption',
  'table-cell': 'display as table cell',
  'table-column': 'display as table column',
  'table-column-group': 'display as table column group',
  'table-footer-group': 'display as table footer',
  'table-header-group': 'display as table header',
  'table-row-group': 'display as table body',
  'table-row': 'display as table row',
  'flow-root':
    'keeps child elements inside container (prevents content from escaping)',
  contents: 'shows children only (removes wrapper from layout)',
  'list-item': 'display as list item (with bullet/number marker)',
  hidden: 'completely hidden (removed from layout)',

  // Visibility
  visible: 'visible',
  invisible: 'hidden but still takes up space',
  collapse: 'collapses table rows/columns (removes from layout)',

  // Float
  'float-start': 'floats to start (left in LTR, right in RTL)',
  'float-end': 'floats to end (right in LTR, left in RTL)',
  'float-right': 'floats to right (text wraps around left)',
  'float-left': 'floats to left (text wraps around right)',
  'float-none': 'no float (normal positioning)',

  // Clear
  'clear-start': 'clears start side floats (left in LTR, right in RTL)',
  'clear-end': 'clears end side floats (right in LTR, left in RTL)',
  'clear-left': 'moves below left floating items',
  'clear-right': 'moves below right floating items',
  'clear-both': 'moves below all floating items',
  'clear-none': 'allows floating elements beside',

  // Box Sizing
  'box-border': 'width includes border and padding (border-box)',
  'box-content': 'width excludes border and padding (content-box)',

  // Box Decoration Break
  'box-decoration-slice':
    'borders and backgrounds slice at line breaks (continues across lines)',
  'box-decoration-clone':
    'borders and backgrounds repeat at each line (independent styling per line)',

  // Border Sizing (v4 beta)
  'border-sizing-content': 'width excludes border and padding (content-box)',
  'border-sizing-border': 'width includes border and padding (border-box)',

  // Columns
  'columns-1': 'splits content into 1 column (magazine-style)',
  'columns-2': 'splits content into 2 columns (magazine-style)',
  'columns-3': 'splits content into 3 columns (magazine-style)',
  'columns-4': 'splits content into 4 columns (magazine-style)',
  'columns-5': 'splits content into 5 columns (magazine-style)',
  'columns-6': 'splits content into 6 columns (magazine-style)',
  'columns-7': 'splits content into 7 columns (magazine-style)',
  'columns-8': 'splits content into 8 columns (magazine-style)',
  'columns-9': 'splits content into 9 columns (magazine-style)',
  'columns-10': 'splits content into 10 columns (magazine-style)',
  'columns-11': 'splits content into 11 columns (magazine-style)',
  'columns-12': 'splits content into 12 columns (magazine-style)',
  'columns-auto': 'automatic column count based on width',
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
  'break-before-auto': 'allows automatic breaks before element',
  'break-before-avoid': 'prevents breaks before element',
  'break-before-all': 'always forces break before element',
  'break-before-avoid-page': 'prevents page break before element',
  'break-before-page': 'forces page break before element',
  'break-before-left': 'forces break to left page before element',
  'break-before-right': 'forces break to right page before element',
  'break-before-column': 'forces column break before element',

  // Break After
  'break-after-auto': 'allows automatic breaks after element',
  'break-after-avoid': 'prevents breaks after element',
  'break-after-all': 'always forces break after element',
  'break-after-avoid-page': 'prevents page break after element',
  'break-after-page': 'forces page break after element',
  'break-after-left': 'forces break to left page after element',
  'break-after-right': 'forces break to right page after element',
  'break-after-column': 'forces column break after element',

  // Break Inside
  'break-inside-auto': 'allows automatic breaks inside element',
  'break-inside-avoid': 'prevents breaks inside element',
  'break-inside-avoid-page': 'prevents page breaks inside element',
  'break-inside-avoid-column': 'prevents column breaks inside element',

  // Object Fit
  'object-contain':
    'scales to fit inside container (maintains proportions, no cropping)',
  'object-cover': 'scales to fill container (may crop edges)',
  'object-fill': 'stretches to fill container (may distort)',
  'object-none': 'keeps original size (no scaling)',
  'object-scale-down': 'shrinks if too large, otherwise stays original size',

  // Object Position
  'object-bottom': 'aligns image/video to bottom of container',
  'object-center': 'centers image/video in container',
  'object-left': 'aligns image/video to left of container',
  'object-right': 'aligns image/video to right of container',
  'object-top': 'aligns image/video to top of container',
  'object-top-left': 'aligns image/video to top-left corner',
  'object-top-right': 'aligns image/video to top-right corner',
  'object-bottom-left': 'aligns image/video to bottom-left corner',
  'object-bottom-right': 'aligns image/video to bottom-right corner',
  'object-left-bottom': 'aligns image/video to left-bottom',
  'object-left-top': 'aligns image/video to left-top',
  'object-right-bottom': 'aligns image/video to right-bottom',
  'object-right-top': 'aligns image/video to right-top',

  // Image Rendering
  'image-render-auto': 'automatically determined image scaling quality',
  'image-render-crisp-edges': 'preserve sharp edges (no smoothing)',
  'image-render-pixelated': 'pixelated scaling for pixel art',

  // Position
  static: 'normal positioning (ignores top/left/right/bottom)',
  fixed: 'fixed to viewport (stays visible when scrolling page)',
  absolute: 'positioned relative to nearest positioned parent',
  relative: 'positioned relative to its normal position',
  sticky: 'toggles between relative and fixed based on scroll position',

  // Overflow
  'overflow-auto': 'adds scrollbars when content overflows',
  'overflow-hidden': 'hides content that extends beyond (no scrollbars)',
  'overflow-clip': 'clips content that extends beyond (strict cut-off)',
  'overflow-visible': 'shows content that extends beyond (spills outside)',
  'overflow-scroll': 'always shows scrollbars (even if not needed)',
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
  'overscroll-auto': 'allows bounce effects and parent scrolling',
  'overscroll-contain':
    'stops scrolling at element boundary (no parent scroll)',
  'overscroll-none': 'stops scrolling at boundary (no bounce or parent scroll)',
  'overscroll-x-auto': 'allows horizontal bounce and parent scrolling',
  'overscroll-x-contain':
    'stops horizontal scrolling at boundary (no parent scroll)',
  'overscroll-x-none':
    'stops horizontal scrolling at boundary (no bounce or parent scroll)',
  'overscroll-y-auto': 'allows vertical bounce and parent scrolling',
  'overscroll-y-contain':
    'stops vertical scrolling at boundary (no parent scroll)',
  'overscroll-y-none':
    'stops vertical scrolling at boundary (no bounce or parent scroll)',

  // Z-Index
  '-z-50': 'far below other elements (layer -50)',
  '-z-40': 'below other elements (layer -40)',
  '-z-30': 'below other elements (layer -30)',
  '-z-20': 'below other elements (layer -20)',
  '-z-10': 'below other elements (layer -10)',
  'z-0': 'default depth level (layer 0)',
  'z-10': 'above default elements (layer 10)',
  'z-20': 'above most elements (layer 20)',
  'z-30': 'well above elements (layer 30)',
  'z-40': 'far above elements (layer 40)',
  'z-50': 'at top of stack (layer 50)',
  'z-auto': 'automatic depth level',
};
