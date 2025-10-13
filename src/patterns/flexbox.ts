/**
 * Flexbox pattern matchers
 */

import { SPACING_SCALE } from "./helpers";

export function matchFlexPattern(className: string): string | null {
  // Match flex with custom property: flex-(--custom-var)
  const customPropMatch = className.match(/^flex-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex ${customPropMatch[1]}`;
  }

  // Match flex with arbitrary value: flex-[value]
  const arbitraryMatch = className.match(/^flex-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex ${arbitraryMatch[1]}`;
  }

  // Match flex with fraction: flex-1/2, flex-2/3, etc.
  const fractionMatch = className.match(/^flex-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const [_, num, denom] = fractionMatch;
    const percent = ((Number(num) / Number(denom)) * 100).toFixed(1).replace(/\.0$/, "");
    return `flex ${percent}%`;
  }

  // Match flex with number: flex-2, flex-3, flex-10
  const numberMatch = className.match(/^flex-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `flex ${value}`;
  }

  return null;
}

/**
 * Try to match flex-grow patterns (grow-<number>, grow-(<custom-property>), grow-[<value>])
 */

export function matchFlexBasisPattern(className: string): string | null {
  // Match basis with custom property: basis-(--custom-var)
  const customPropMatch = className.match(/^basis-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex basis ${customPropMatch[1]}`;
  }

  // Match basis with arbitrary value: basis-[value]
  const arbitraryMatch = className.match(/^basis-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex basis ${arbitraryMatch[1]}`;
  }

  // Match basis with fraction: basis-1/2, basis-2/3, etc.
  const fractionMatch = className.match(/^basis-(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const [_, num, denom] = fractionMatch;
    const percent = ((Number(num) / Number(denom)) * 100).toFixed(1).replace(/\.0$/, "");
    return `flex basis ${percent}%`;
  }

  // Match basis with number: basis-16, basis-32, basis-64
  const numberMatch = className.match(/^basis-(\d+(?:\.\d+)?)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const size = SPACING_SCALE[value] || `${value}`;
    return `flex basis ${size}`;
  }

  return null;
}

/**
 * Try to match flex patterns (flex-<number>, flex-<fraction>, flex-(<custom-property>), flex-[<value>])
 */

export function matchFlexGrowPattern(className: string): string | null {
  // Match grow with custom property: grow-(--custom-var)
  const customPropMatch = className.match(/^grow-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex grow ${customPropMatch[1]}`;
  }

  // Match grow with arbitrary value: grow-[value]
  const arbitraryMatch = className.match(/^grow-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex grow ${arbitraryMatch[1]}`;
  }

  // Match grow with number: grow-2, grow-3, grow-10
  const numberMatch = className.match(/^grow-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `flex grow ${value}`;
  }

  return null;
}

/**
 * Try to match flex-shrink patterns (shrink-<number>, shrink-(<custom-property>), shrink-[<value>])
 */

export function matchFlexShrinkPattern(className: string): string | null {
  // Match shrink with custom property: shrink-(--custom-var)
  const customPropMatch = className.match(/^shrink-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `flex shrink ${customPropMatch[1]}`;
  }

  // Match shrink with arbitrary value: shrink-[value]
  const arbitraryMatch = className.match(/^shrink-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `flex shrink ${arbitraryMatch[1]}`;
  }

  // Match shrink with number: shrink-2, shrink-3, shrink-10
  const numberMatch = className.match(/^shrink-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `flex shrink ${value}`;
  }

  return null;
}

/**
 * Try to match order patterns (order-<number>, -order-<number>, order-(<custom-property>), order-[<value>])
 */

export function matchOrderPattern(className: string): string | null {
  // Match order with custom property: order-(--custom-var)
  const customPropMatch = className.match(/^order-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `order ${customPropMatch[1]}`;
  }

  // Match order with arbitrary value: order-[value]
  const arbitraryMatch = className.match(/^order-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `order ${arbitraryMatch[1]}`;
  }

  // Match negative order: -order-1, -order-5
  const negativeMatch = className.match(/^-order-(\d+)$/);
  if (negativeMatch) {
    const value = negativeMatch[1];
    return `order -${value}`;
  }

  // Match order with number: order-13, order-20
  const numberMatch = className.match(/^order-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    return `order ${value}`;
  }

  return null;
}

/**
 * Try to match grid-template-columns patterns (grid-cols-<number>, grid-cols-(<custom-property>), grid-cols-[<value>])
 */

