/**
 * Effects pattern matchers
 */

export function matchShadowPattern(className: string): string | null {
  // shadow-(<custom-property>) - custom CSS property for shadow
  const customPropMatch = className.match(/^shadow-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `box shadow ${customPropMatch[1]}`;
  }

  // shadow-(color:<custom-property>) - custom CSS property for shadow color
  const colorCustomPropMatch = className.match(/^shadow-\(color:(--[\w-]+)\)$/);
  if (colorCustomPropMatch) {
    return `shadow color ${colorCustomPropMatch[1]}`;
  }

  // shadow-[value] - arbitrary shadow value
  const arbitraryMatch = className.match(/^shadow-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `box shadow ${arbitraryMatch[1]}`;
  }

  // shadow-<color>-<shade> - shadow colors (e.g., shadow-red-500, shadow-blue-100)
  const colorMatch = className.match(
    /^shadow-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/
  );
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} shadow color`;
  }

  return null;
}

/**
 * Try to match inset-shadow patterns (inset-shadow-*)
 */

export function matchInsetShadowPattern(className: string): string | null {
  // inset-shadow-(<custom-property>) - custom CSS property for inset shadow
  const customPropMatch = className.match(/^inset-shadow-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `inset shadow ${customPropMatch[1]}`;
  }

  // inset-shadow-[value] - arbitrary inset shadow value
  const arbitraryMatch = className.match(/^inset-shadow-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `inset shadow ${arbitraryMatch[1]}`;
  }

  // inset-shadow-<color>-<shade> - inset shadow colors
  const colorMatch = className.match(
    /^inset-shadow-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/
  );
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} inset shadow color`;
  }

  return null;
}

/**
 * Try to match ring patterns (ring-*)
 */

export function matchTextShadowPattern(className: string): string | null {
  // text-shadow-(<custom-property>) - custom CSS property for text shadow
  const customPropMatch = className.match(/^text-shadow-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `text shadow ${customPropMatch[1]}`;
  }

  // text-shadow-(color:<custom-property>) - custom CSS property for text shadow color
  const colorCustomPropMatch = className.match(/^text-shadow-\(color:(--[\w-]+)\)$/);
  if (colorCustomPropMatch) {
    return `text shadow color ${colorCustomPropMatch[1]}`;
  }

  // text-shadow-[value] - arbitrary text shadow value
  const arbitraryMatch = className.match(/^text-shadow-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `text shadow ${arbitraryMatch[1]}`;
  }

  // text-shadow-<color>-<shade> - text shadow colors (e.g., text-shadow-red-500, text-shadow-blue-100)
  const colorMatch = className.match(
    /^text-shadow-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/
  );
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} text shadow color`;
  }

  return null;
}

/**
 * Try to match opacity patterns (opacity-*)
 */

export function matchOpacityPattern(className: string): string | null {
  // opacity-<number> - dynamic opacity values
  const numberMatch = className.match(/^opacity-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}% opacity`;
  }

  // opacity-(<custom-property>) - custom CSS property
  const customPropMatch = className.match(/^opacity-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `opacity ${customPropMatch[1]}`;
  }

  // opacity-[value] - arbitrary opacity value
  const arbitraryMatch = className.match(/^opacity-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `opacity ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match mask-image patterns (mask-*)
 */

export function matchRingPattern(className: string): string | null {
  // ring-<number> - dynamic ring width
  const numberMatch = className.match(/^ring-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}px ring`;
  }

  // ring-(<custom-property>) - custom CSS property for ring
  const customPropMatch = className.match(/^ring-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `ring width ${customPropMatch[1]}`;
  }

  // ring-[value] - arbitrary ring value
  const arbitraryMatch = className.match(/^ring-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `ring width ${arbitraryMatch[1]}`;
  }

  // ring-<color>-<shade> - ring colors
  const colorMatch = className.match(
    /^ring-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/
  );
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} ring color`;
  }

  return null;
}

/**
 * Try to match inset-ring patterns (inset-ring-*)
 */

export function matchInsetRingPattern(className: string): string | null {
  // inset-ring-<number> - dynamic inset ring width
  const numberMatch = className.match(/^inset-ring-(\d+)$/);
  if (numberMatch) {
    return `${numberMatch[1]}px inset ring`;
  }

  // inset-ring-(<custom-property>) - custom CSS property for inset ring
  const customPropMatch = className.match(/^inset-ring-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `inset ring width ${customPropMatch[1]}`;
  }

  // inset-ring-[value] - arbitrary inset ring value
  const arbitraryMatch = className.match(/^inset-ring-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `inset ring width ${arbitraryMatch[1]}`;
  }

  // inset-ring-<color>-<shade> - inset ring colors
  const colorMatch = className.match(
    /^inset-ring-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|slate|gray|zinc|neutral|stone)-(\d+)$/
  );
  if (colorMatch) {
    return `${colorMatch[1]}-${colorMatch[2]} inset ring color`;
  }

  return null;
}

/**
 * Try to match text-shadow patterns (text-shadow-*)
 */

