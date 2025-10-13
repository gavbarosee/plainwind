/**
 * Spacing pattern matchers
 */

import { SPACING_SCALE } from "./helpers";

export function matchSpacingPattern(className: string): string | null {
  // Padding patterns: p-4, px-2, py-6, pt-4, pr-4, pb-4, pl-4, ps-4, pe-4
  const paddingMatch = className.match(/^p([xytrblse]?)-(.+)$/);
  if (paddingMatch) {
    const direction = paddingMatch[1];
    let value = paddingMatch[2];
    
    // Handle custom properties: p-(--custom) -> --custom
    if (value.startsWith('(--') && value.endsWith(')')) {
      value = value.slice(1, -1);
    }
    // Handle arbitrary values: p-[5px] -> 5px
    else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }
    
    const spacing = SPACING_SCALE[value] || value;

    const directionMap: Record<string, string> = {
      "": "padding",
      x: "horizontal padding",
      y: "vertical padding",
      t: "top padding",
      r: "right padding",
      b: "bottom padding",
      l: "left padding",
      s: "start padding",
      e: "end padding",
    };

    return `${directionMap[direction] || "padding"} ${spacing}`;
  }

  // Margin patterns: m-4, -m-4, mx-auto, my-2, mt-4, mr-4, mb-4, ml-4, ms-4, me-4
  const marginMatch = className.match(/^(-?)m([xytrblse]?)-(.+)$/);
  if (marginMatch) {
    const isNegative = marginMatch[1] === "-";
    const direction = marginMatch[2];
    let value = marginMatch[3];

    if (value === "auto") {
      if (direction === "x") return "horizontally centered";
      if (direction === "y") return "vertically centered";
      return "centered with auto margin";
    }

    // Handle custom properties: m-(--custom) -> --custom
    if (value.startsWith('(--') && value.endsWith(')')) {
      value = value.slice(1, -1);
    }
    // Handle arbitrary values: m-[5px] -> 5px
    else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }

    const spacing = SPACING_SCALE[value] || value;
    const prefix = isNegative ? "negative " : "";

    const directionMap: Record<string, string> = {
      "": "margin",
      x: "horizontal margin",
      y: "vertical margin",
      t: "top margin",
      r: "right margin",
      b: "bottom margin",
      l: "left margin",
      s: "start margin",
      e: "end margin",
    };

    return `${prefix}${directionMap[direction] || "margin"} ${spacing}`;
  }

  // Gap patterns: gap-4, gap-x-2, gap-y-4
  const gapMatch = className.match(/^gap-([xy]-)?([\d.]+)$/);
  if (gapMatch) {
    const direction = gapMatch[1];
    const value = gapMatch[2];
    const spacing = SPACING_SCALE[value] || value;

    if (direction === "x-") return `horizontal gap ${spacing}`;
    if (direction === "y-") return `vertical gap ${spacing}`;
    return `gap ${spacing}`;
  }

  // Space between patterns: space-x-4, -space-x-4, space-y-2, -space-y-2
  const spaceMatch = className.match(/^(-?)space-([xy])-(.+)$/);
  if (spaceMatch) {
    const isNegative = spaceMatch[1] === "-";
    const direction = spaceMatch[2];
    let value = spaceMatch[3];
    
    // Handle custom properties: space-x-(--custom) -> --custom
    if (value.startsWith('(--') && value.endsWith(')')) {
      value = value.slice(1, -1);
    }
    // Handle arbitrary values: space-x-[5px] -> 5px
    else if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1);
    }
    
    const spacing = SPACING_SCALE[value] || value;
    const prefix = isNegative ? "negative " : "";

    return direction === "x"
      ? `${prefix}horizontal space ${spacing}`
      : `${prefix}vertical space ${spacing}`;
  }

  return null;
}

/**
 * Try to match sizing patterns (w-*, h-*, min-*, max-*)
 */

export function matchScrollMarginPattern(className: string): string | null {
  // scroll-m-(<custom-property>) - custom CSS property for all scroll margins
  const scrollMCustomPropMatch = className.match(/^scroll-m-\((--[\w-]+)\)$/);
  if (scrollMCustomPropMatch) {
    return `scroll margin ${scrollMCustomPropMatch[1]}`;
  }

  // scroll-mx-(<custom-property>) - custom CSS property for horizontal scroll margins
  const scrollMxCustomPropMatch = className.match(/^scroll-mx-\((--[\w-]+)\)$/);
  if (scrollMxCustomPropMatch) {
    return `horizontal scroll margin ${scrollMxCustomPropMatch[1]}`;
  }

  // scroll-my-(<custom-property>) - custom CSS property for vertical scroll margins
  const scrollMyCustomPropMatch = className.match(/^scroll-my-\((--[\w-]+)\)$/);
  if (scrollMyCustomPropMatch) {
    return `vertical scroll margin ${scrollMyCustomPropMatch[1]}`;
  }

  // scroll-ms-(<custom-property>) - custom CSS property for scroll margin inline start
  const scrollMsCustomPropMatch = className.match(/^scroll-ms-\((--[\w-]+)\)$/);
  if (scrollMsCustomPropMatch) {
    return `scroll margin inline start ${scrollMsCustomPropMatch[1]}`;
  }

  // scroll-me-(<custom-property>) - custom CSS property for scroll margin inline end
  const scrollMeCustomPropMatch = className.match(/^scroll-me-\((--[\w-]+)\)$/);
  if (scrollMeCustomPropMatch) {
    return `scroll margin inline end ${scrollMeCustomPropMatch[1]}`;
  }

  // scroll-mt-(<custom-property>) - custom CSS property for scroll margin top
  const scrollMtCustomPropMatch = className.match(/^scroll-mt-\((--[\w-]+)\)$/);
  if (scrollMtCustomPropMatch) {
    return `scroll margin top ${scrollMtCustomPropMatch[1]}`;
  }

  // scroll-mr-(<custom-property>) - custom CSS property for scroll margin right
  const scrollMrCustomPropMatch = className.match(/^scroll-mr-\((--[\w-]+)\)$/);
  if (scrollMrCustomPropMatch) {
    return `scroll margin right ${scrollMrCustomPropMatch[1]}`;
  }

  // scroll-mb-(<custom-property>) - custom CSS property for scroll margin bottom
  const scrollMbCustomPropMatch = className.match(/^scroll-mb-\((--[\w-]+)\)$/);
  if (scrollMbCustomPropMatch) {
    return `scroll margin bottom ${scrollMbCustomPropMatch[1]}`;
  }

  // scroll-ml-(<custom-property>) - custom CSS property for scroll margin left
  const scrollMlCustomPropMatch = className.match(/^scroll-ml-\((--[\w-]+)\)$/);
  if (scrollMlCustomPropMatch) {
    return `scroll margin left ${scrollMlCustomPropMatch[1]}`;
  }

  // scroll-m-[value] - arbitrary scroll margin value
  const scrollMArbitraryMatch = className.match(/^scroll-m-\[(.+?)\]$/);
  if (scrollMArbitraryMatch) {
    return `scroll margin ${scrollMArbitraryMatch[1]}`;
  }

  // scroll-mx-[value] - arbitrary horizontal scroll margin value
  const scrollMxArbitraryMatch = className.match(/^scroll-mx-\[(.+?)\]$/);
  if (scrollMxArbitraryMatch) {
    return `horizontal scroll margin ${scrollMxArbitraryMatch[1]}`;
  }

  // scroll-my-[value] - arbitrary vertical scroll margin value
  const scrollMyArbitraryMatch = className.match(/^scroll-my-\[(.+?)\]$/);
  if (scrollMyArbitraryMatch) {
    return `vertical scroll margin ${scrollMyArbitraryMatch[1]}`;
  }

  // scroll-ms-[value] - arbitrary scroll margin inline start value
  const scrollMsArbitraryMatch = className.match(/^scroll-ms-\[(.+?)\]$/);
  if (scrollMsArbitraryMatch) {
    return `scroll margin inline start ${scrollMsArbitraryMatch[1]}`;
  }

  // scroll-me-[value] - arbitrary scroll margin inline end value
  const scrollMeArbitraryMatch = className.match(/^scroll-me-\[(.+?)\]$/);
  if (scrollMeArbitraryMatch) {
    return `scroll margin inline end ${scrollMeArbitraryMatch[1]}`;
  }

  // scroll-mt-[value] - arbitrary scroll margin top value
  const scrollMtArbitraryMatch = className.match(/^scroll-mt-\[(.+?)\]$/);
  if (scrollMtArbitraryMatch) {
    return `scroll margin top ${scrollMtArbitraryMatch[1]}`;
  }

  // scroll-mr-[value] - arbitrary scroll margin right value
  const scrollMrArbitraryMatch = className.match(/^scroll-mr-\[(.+?)\]$/);
  if (scrollMrArbitraryMatch) {
    return `scroll margin right ${scrollMrArbitraryMatch[1]}`;
  }

  // scroll-mb-[value] - arbitrary scroll margin bottom value
  const scrollMbArbitraryMatch = className.match(/^scroll-mb-\[(.+?)\]$/);
  if (scrollMbArbitraryMatch) {
    return `scroll margin bottom ${scrollMbArbitraryMatch[1]}`;
  }

  // scroll-ml-[value] - arbitrary scroll margin left value
  const scrollMlArbitraryMatch = className.match(/^scroll-ml-\[(.+?)\]$/);
  if (scrollMlArbitraryMatch) {
    return `scroll margin left ${scrollMlArbitraryMatch[1]}`;
  }

  // -scroll-m-<number> - negative all scroll margins
  const negativeScrollMMatch = className.match(/^-scroll-m-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMMatch) {
    return `scroll margin -${negativeScrollMMatch[1]} (spacing scale)`;
  }

  // -scroll-mx-<number> - negative horizontal scroll margins
  const negativeScrollMxMatch = className.match(/^-scroll-mx-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMxMatch) {
    return `horizontal scroll margin -${negativeScrollMxMatch[1]} (spacing scale)`;
  }

  // -scroll-my-<number> - negative vertical scroll margins
  const negativeScrollMyMatch = className.match(/^-scroll-my-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMyMatch) {
    return `vertical scroll margin -${negativeScrollMyMatch[1]} (spacing scale)`;
  }

  // -scroll-ms-<number> - negative scroll margin inline start
  const negativeScrollMsMatch = className.match(/^-scroll-ms-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMsMatch) {
    return `scroll margin inline start -${negativeScrollMsMatch[1]} (spacing scale)`;
  }

  // -scroll-me-<number> - negative scroll margin inline end
  const negativeScrollMeMatch = className.match(/^-scroll-me-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMeMatch) {
    return `scroll margin inline end -${negativeScrollMeMatch[1]} (spacing scale)`;
  }

  // -scroll-mt-<number> - negative scroll margin top
  const negativeScrollMtMatch = className.match(/^-scroll-mt-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMtMatch) {
    return `scroll margin top -${negativeScrollMtMatch[1]} (spacing scale)`;
  }

  // -scroll-mr-<number> - negative scroll margin right
  const negativeScrollMrMatch = className.match(/^-scroll-mr-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMrMatch) {
    return `scroll margin right -${negativeScrollMrMatch[1]} (spacing scale)`;
  }

  // -scroll-mb-<number> - negative scroll margin bottom
  const negativeScrollMbMatch = className.match(/^-scroll-mb-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMbMatch) {
    return `scroll margin bottom -${negativeScrollMbMatch[1]} (spacing scale)`;
  }

  // -scroll-ml-<number> - negative scroll margin left
  const negativeScrollMlMatch = className.match(/^-scroll-ml-(\d+(?:\.\d+)?)$/);
  if (negativeScrollMlMatch) {
    return `scroll margin left -${negativeScrollMlMatch[1]} (spacing scale)`;
  }

  // scroll-m-<number> - all scroll margins in spacing scale
  const scrollMMatch = className.match(/^scroll-m-(\d+(?:\.\d+)?)$/);
  if (scrollMMatch) {
    return `scroll margin ${scrollMMatch[1]} (spacing scale)`;
  }

  // scroll-mx-<number> - horizontal scroll margins in spacing scale
  const scrollMxMatch = className.match(/^scroll-mx-(\d+(?:\.\d+)?)$/);
  if (scrollMxMatch) {
    return `horizontal scroll margin ${scrollMxMatch[1]} (spacing scale)`;
  }

  // scroll-my-<number> - vertical scroll margins in spacing scale
  const scrollMyMatch = className.match(/^scroll-my-(\d+(?:\.\d+)?)$/);
  if (scrollMyMatch) {
    return `vertical scroll margin ${scrollMyMatch[1]} (spacing scale)`;
  }

  // scroll-ms-<number> - scroll margin inline start in spacing scale
  const scrollMsMatch = className.match(/^scroll-ms-(\d+(?:\.\d+)?)$/);
  if (scrollMsMatch) {
    return `scroll margin inline start ${scrollMsMatch[1]} (spacing scale)`;
  }

  // scroll-me-<number> - scroll margin inline end in spacing scale
  const scrollMeMatch = className.match(/^scroll-me-(\d+(?:\.\d+)?)$/);
  if (scrollMeMatch) {
    return `scroll margin inline end ${scrollMeMatch[1]} (spacing scale)`;
  }

  // scroll-mt-<number> - scroll margin top in spacing scale
  const scrollMtMatch = className.match(/^scroll-mt-(\d+(?:\.\d+)?)$/);
  if (scrollMtMatch) {
    return `scroll margin top ${scrollMtMatch[1]} (spacing scale)`;
  }

  // scroll-mr-<number> - scroll margin right in spacing scale
  const scrollMrMatch = className.match(/^scroll-mr-(\d+(?:\.\d+)?)$/);
  if (scrollMrMatch) {
    return `scroll margin right ${scrollMrMatch[1]} (spacing scale)`;
  }

  // scroll-mb-<number> - scroll margin bottom in spacing scale
  const scrollMbMatch = className.match(/^scroll-mb-(\d+(?:\.\d+)?)$/);
  if (scrollMbMatch) {
    return `scroll margin bottom ${scrollMbMatch[1]} (spacing scale)`;
  }

  // scroll-ml-<number> - scroll margin left in spacing scale
  const scrollMlMatch = className.match(/^scroll-ml-(\d+(?:\.\d+)?)$/);
  if (scrollMlMatch) {
    return `scroll margin left ${scrollMlMatch[1]} (spacing scale)`;
  }

  return null;
}

/**
 * Try to match scroll-padding patterns (scroll-p*, scroll-px*, scroll-py*, scroll-ps*, scroll-pe*, scroll-pt*, scroll-pr*, scroll-pb*, scroll-pl*)
 */

export function matchScrollPaddingPattern(className: string): string | null {
  // scroll-p-(<custom-property>) - custom CSS property for all scroll paddings
  const scrollPCustomPropMatch = className.match(/^scroll-p-\((--[\w-]+)\)$/);
  if (scrollPCustomPropMatch) {
    return `scroll padding ${scrollPCustomPropMatch[1]}`;
  }

  // scroll-px-(<custom-property>) - custom CSS property for horizontal scroll paddings
  const scrollPxCustomPropMatch = className.match(/^scroll-px-\((--[\w-]+)\)$/);
  if (scrollPxCustomPropMatch) {
    return `horizontal scroll padding ${scrollPxCustomPropMatch[1]}`;
  }

  // scroll-py-(<custom-property>) - custom CSS property for vertical scroll paddings
  const scrollPyCustomPropMatch = className.match(/^scroll-py-\((--[\w-]+)\)$/);
  if (scrollPyCustomPropMatch) {
    return `vertical scroll padding ${scrollPyCustomPropMatch[1]}`;
  }

  // scroll-ps-(<custom-property>) - custom CSS property for scroll padding inline start
  const scrollPsCustomPropMatch = className.match(/^scroll-ps-\((--[\w-]+)\)$/);
  if (scrollPsCustomPropMatch) {
    return `scroll padding inline start ${scrollPsCustomPropMatch[1]}`;
  }

  // scroll-pe-(<custom-property>) - custom CSS property for scroll padding inline end
  const scrollPeCustomPropMatch = className.match(/^scroll-pe-\((--[\w-]+)\)$/);
  if (scrollPeCustomPropMatch) {
    return `scroll padding inline end ${scrollPeCustomPropMatch[1]}`;
  }

  // scroll-pt-(<custom-property>) - custom CSS property for scroll padding top
  const scrollPtCustomPropMatch = className.match(/^scroll-pt-\((--[\w-]+)\)$/);
  if (scrollPtCustomPropMatch) {
    return `scroll padding top ${scrollPtCustomPropMatch[1]}`;
  }

  // scroll-pr-(<custom-property>) - custom CSS property for scroll padding right
  const scrollPrCustomPropMatch = className.match(/^scroll-pr-\((--[\w-]+)\)$/);
  if (scrollPrCustomPropMatch) {
    return `scroll padding right ${scrollPrCustomPropMatch[1]}`;
  }

  // scroll-pb-(<custom-property>) - custom CSS property for scroll padding bottom
  const scrollPbCustomPropMatch = className.match(/^scroll-pb-\((--[\w-]+)\)$/);
  if (scrollPbCustomPropMatch) {
    return `scroll padding bottom ${scrollPbCustomPropMatch[1]}`;
  }

  // scroll-pl-(<custom-property>) - custom CSS property for scroll padding left
  const scrollPlCustomPropMatch = className.match(/^scroll-pl-\((--[\w-]+)\)$/);
  if (scrollPlCustomPropMatch) {
    return `scroll padding left ${scrollPlCustomPropMatch[1]}`;
  }

  // scroll-p-[value] - arbitrary scroll padding value
  const scrollPArbitraryMatch = className.match(/^scroll-p-\[(.+?)\]$/);
  if (scrollPArbitraryMatch) {
    return `scroll padding ${scrollPArbitraryMatch[1]}`;
  }

  // scroll-px-[value] - arbitrary horizontal scroll padding value
  const scrollPxArbitraryMatch = className.match(/^scroll-px-\[(.+?)\]$/);
  if (scrollPxArbitraryMatch) {
    return `horizontal scroll padding ${scrollPxArbitraryMatch[1]}`;
  }

  // scroll-py-[value] - arbitrary vertical scroll padding value
  const scrollPyArbitraryMatch = className.match(/^scroll-py-\[(.+?)\]$/);
  if (scrollPyArbitraryMatch) {
    return `vertical scroll padding ${scrollPyArbitraryMatch[1]}`;
  }

  // scroll-ps-[value] - arbitrary scroll padding inline start value
  const scrollPsArbitraryMatch = className.match(/^scroll-ps-\[(.+?)\]$/);
  if (scrollPsArbitraryMatch) {
    return `scroll padding inline start ${scrollPsArbitraryMatch[1]}`;
  }

  // scroll-pe-[value] - arbitrary scroll padding inline end value
  const scrollPeArbitraryMatch = className.match(/^scroll-pe-\[(.+?)\]$/);
  if (scrollPeArbitraryMatch) {
    return `scroll padding inline end ${scrollPeArbitraryMatch[1]}`;
  }

  // scroll-pt-[value] - arbitrary scroll padding top value
  const scrollPtArbitraryMatch = className.match(/^scroll-pt-\[(.+?)\]$/);
  if (scrollPtArbitraryMatch) {
    return `scroll padding top ${scrollPtArbitraryMatch[1]}`;
  }

  // scroll-pr-[value] - arbitrary scroll padding right value
  const scrollPrArbitraryMatch = className.match(/^scroll-pr-\[(.+?)\]$/);
  if (scrollPrArbitraryMatch) {
    return `scroll padding right ${scrollPrArbitraryMatch[1]}`;
  }

  // scroll-pb-[value] - arbitrary scroll padding bottom value
  const scrollPbArbitraryMatch = className.match(/^scroll-pb-\[(.+?)\]$/);
  if (scrollPbArbitraryMatch) {
    return `scroll padding bottom ${scrollPbArbitraryMatch[1]}`;
  }

  // scroll-pl-[value] - arbitrary scroll padding left value
  const scrollPlArbitraryMatch = className.match(/^scroll-pl-\[(.+?)\]$/);
  if (scrollPlArbitraryMatch) {
    return `scroll padding left ${scrollPlArbitraryMatch[1]}`;
  }

  // -scroll-p-<number> - negative all scroll paddings
  const negativeScrollPMatch = className.match(/^-scroll-p-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPMatch) {
    return `scroll padding -${negativeScrollPMatch[1]} (spacing scale)`;
  }

  // -scroll-px-<number> - negative horizontal scroll paddings
  const negativeScrollPxMatch = className.match(/^-scroll-px-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPxMatch) {
    return `horizontal scroll padding -${negativeScrollPxMatch[1]} (spacing scale)`;
  }

  // -scroll-py-<number> - negative vertical scroll paddings
  const negativeScrollPyMatch = className.match(/^-scroll-py-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPyMatch) {
    return `vertical scroll padding -${negativeScrollPyMatch[1]} (spacing scale)`;
  }

  // -scroll-ps-<number> - negative scroll padding inline start
  const negativeScrollPsMatch = className.match(/^-scroll-ps-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPsMatch) {
    return `scroll padding inline start -${negativeScrollPsMatch[1]} (spacing scale)`;
  }

  // -scroll-pe-<number> - negative scroll padding inline end
  const negativeScrollPeMatch = className.match(/^-scroll-pe-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPeMatch) {
    return `scroll padding inline end -${negativeScrollPeMatch[1]} (spacing scale)`;
  }

  // -scroll-pt-<number> - negative scroll padding top
  const negativeScrollPtMatch = className.match(/^-scroll-pt-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPtMatch) {
    return `scroll padding top -${negativeScrollPtMatch[1]} (spacing scale)`;
  }

  // -scroll-pr-<number> - negative scroll padding right
  const negativeScrollPrMatch = className.match(/^-scroll-pr-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPrMatch) {
    return `scroll padding right -${negativeScrollPrMatch[1]} (spacing scale)`;
  }

  // -scroll-pb-<number> - negative scroll padding bottom
  const negativeScrollPbMatch = className.match(/^-scroll-pb-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPbMatch) {
    return `scroll padding bottom -${negativeScrollPbMatch[1]} (spacing scale)`;
  }

  // -scroll-pl-<number> - negative scroll padding left
  const negativeScrollPlMatch = className.match(/^-scroll-pl-(\d+(?:\.\d+)?)$/);
  if (negativeScrollPlMatch) {
    return `scroll padding left -${negativeScrollPlMatch[1]} (spacing scale)`;
  }

  // scroll-p-<number> - all scroll paddings in spacing scale
  const scrollPMatch = className.match(/^scroll-p-(\d+(?:\.\d+)?)$/);
  if (scrollPMatch) {
    return `scroll padding ${scrollPMatch[1]} (spacing scale)`;
  }

  // scroll-px-<number> - horizontal scroll paddings in spacing scale
  const scrollPxMatch = className.match(/^scroll-px-(\d+(?:\.\d+)?)$/);
  if (scrollPxMatch) {
    return `horizontal scroll padding ${scrollPxMatch[1]} (spacing scale)`;
  }

  // scroll-py-<number> - vertical scroll paddings in spacing scale
  const scrollPyMatch = className.match(/^scroll-py-(\d+(?:\.\d+)?)$/);
  if (scrollPyMatch) {
    return `vertical scroll padding ${scrollPyMatch[1]} (spacing scale)`;
  }

  // scroll-ps-<number> - scroll padding inline start in spacing scale
  const scrollPsMatch = className.match(/^scroll-ps-(\d+(?:\.\d+)?)$/);
  if (scrollPsMatch) {
    return `scroll padding inline start ${scrollPsMatch[1]} (spacing scale)`;
  }

  // scroll-pe-<number> - scroll padding inline end in spacing scale
  const scrollPeMatch = className.match(/^scroll-pe-(\d+(?:\.\d+)?)$/);
  if (scrollPeMatch) {
    return `scroll padding inline end ${scrollPeMatch[1]} (spacing scale)`;
  }

  // scroll-pt-<number> - scroll padding top in spacing scale
  const scrollPtMatch = className.match(/^scroll-pt-(\d+(?:\.\d+)?)$/);
  if (scrollPtMatch) {
    return `scroll padding top ${scrollPtMatch[1]} (spacing scale)`;
  }

  // scroll-pr-<number> - scroll padding right in spacing scale
  const scrollPrMatch = className.match(/^scroll-pr-(\d+(?:\.\d+)?)$/);
  if (scrollPrMatch) {
    return `scroll padding right ${scrollPrMatch[1]} (spacing scale)`;
  }

  // scroll-pb-<number> - scroll padding bottom in spacing scale
  const scrollPbMatch = className.match(/^scroll-pb-(\d+(?:\.\d+)?)$/);
  if (scrollPbMatch) {
    return `scroll padding bottom ${scrollPbMatch[1]} (spacing scale)`;
  }

  // scroll-pl-<number> - scroll padding left in spacing scale
  const scrollPlMatch = className.match(/^scroll-pl-(\d+(?:\.\d+)?)$/);
  if (scrollPlMatch) {
    return `scroll padding left ${scrollPlMatch[1]} (spacing scale)`;
  }

  return null;
}

/**
 * Try to match stroke color patterns (stroke-*)
 */

export function matchGapPattern(className: string): string | null {
  // gap-x-* patterns (column gap)
  if (className.startsWith("gap-x-")) {
    // gap-x-(--custom-property)
    const customPropMatch = className.match(/^gap-x-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `horizontal gap ${customPropMatch[1]}`;
    }

    // gap-x-[value]
    const arbitraryMatch = className.match(/^gap-x-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `horizontal gap ${arbitraryMatch[1]}`;
    }

    // gap-x-<number> (dynamic numbers)
    const numberMatch = className.match(/^gap-x-(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `horizontal gap ${value}`;
    }
  }

  // gap-y-* patterns (row gap)
  if (className.startsWith("gap-y-")) {
    // gap-y-(--custom-property)
    const customPropMatch = className.match(/^gap-y-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `vertical gap ${customPropMatch[1]}`;
    }

    // gap-y-[value]
    const arbitraryMatch = className.match(/^gap-y-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `vertical gap ${arbitraryMatch[1]}`;
    }

    // gap-y-<number> (dynamic numbers)
    const numberMatch = className.match(/^gap-y-(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `vertical gap ${value}`;
    }
  }

  // gap-* patterns (both row and column)
  if (className.startsWith("gap-") && !className.startsWith("gap-x-") && !className.startsWith("gap-y-")) {
    // gap-(--custom-property)
    const customPropMatch = className.match(/^gap-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `gap ${customPropMatch[1]}`;
    }

    // gap-[value]
    const arbitraryMatch = className.match(/^gap-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `gap ${arbitraryMatch[1]}`;
    }

    // gap-<number> (dynamic numbers)
    const numberMatch = className.match(/^gap-(\d+(?:\.\d+)?)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `gap ${value}`;
    }
  }

  return null;
}

/**
 * Try to match width patterns (w-*, size-*)
 */

