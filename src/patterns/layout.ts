/**
 * Layout pattern matchers
 */

import { NUMBER_WORDS } from "./helpers";

export function matchAspectRatioPattern(className: string): string | null {
  // Match aspect-X/Y patterns: aspect-3/2, aspect-16/9, aspect-21/9
  const ratioMatch = className.match(/^aspect-(\d+)\/(\d+)$/);
  if (ratioMatch) {
    const width = ratioMatch[1];
    const height = ratioMatch[2];
    return `${width}:${height} aspect ratio`;
  }

  // Match aspect with custom property: aspect-(--custom-var)
  const customPropMatch = className.match(/^aspect-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `aspect ratio ${customPropMatch[1]}`;
  }

  // Match aspect with arbitrary value: aspect-[value]
  const arbitraryMatch = className.match(/^aspect-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `aspect ratio ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match columns patterns (columns-*, columns-<number>)
 */

export function matchColumnsPattern(className: string): string | null {
  // Match columns-<number> patterns: columns-1, columns-15, columns-20
  const numberMatch = className.match(/^columns-(\d+)$/);
  if (numberMatch) {
    const num = numberMatch[1];
    const numWord = NUMBER_WORDS[num] || num;
    return `${numWord} column layout`;
  }

  // Match columns with custom property: columns-(--custom-var)
  const customPropMatch = className.match(/^columns-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `columns ${customPropMatch[1]}`;
  }

  // Match columns with arbitrary value: columns-[value]
  const arbitraryMatch = className.match(/^columns-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `columns ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match object-position patterns (object-(<custom-property>), object-[<value>])
 */

export function matchObjectPositionPattern(className: string): string | null {
  // Match object with custom property: object-(--custom-var)
  const customPropMatch = className.match(/^object-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `positions content at ${customPropMatch[1]}`;
  }

  // Match object with arbitrary value: object-[value]
  const arbitraryMatch = className.match(/^object-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `positions content at ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match flex-basis patterns (basis-*, basis-<number>, basis-<fraction>)
 */

