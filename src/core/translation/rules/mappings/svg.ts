/**
 * SVG utilities: fill, stroke
 */
export const svgMappings: Record<string, string> = {
  // SVG Stroke Width
  'stroke-0': 'no stroke outline',
  'stroke-1': '1px stroke outline',
  'stroke-2': '2px stroke outline',
  // SVG Stroke Dash Array
  'stroke-dash-0': 'solid stroke (no dashes)',
  'stroke-dash-1': 'dashed stroke (1px dash pattern)',
  'stroke-dash-2': 'dashed stroke (2px dash pattern)',
  'stroke-dash-4': 'dashed stroke (4px dash pattern)',
  'stroke-dash-8': 'dashed stroke (8px dash pattern)',
  // SVG Stroke Dash Offset
  'stroke-offset-0': 'dash pattern starts at beginning',
  'stroke-offset-1': 'dash pattern starts 1px offset',
  'stroke-offset-2': 'dash pattern starts 2px offset',
  'stroke-offset-4': 'dash pattern starts 4px offset',
  'stroke-offset-8': 'dash pattern starts 8px offset',
  // SVG Fill
  'fill-none': 'no fill (transparent inside)',
  'fill-inherit': 'inherited fill color',
  'fill-current': 'fill matches text color',
  'fill-transparent': 'transparent fill',
  'fill-black': 'black fill',
  'fill-white': 'white fill',
  // SVG Stroke
  'stroke-none': 'no stroke outline',
  'stroke-inherit': 'inherited stroke outline color',
  'stroke-current': 'stroke outline matches text color',
  'stroke-transparent': 'transparent stroke outline',
  'stroke-black': 'black stroke outline',
  'stroke-white': 'white stroke outline',
};
