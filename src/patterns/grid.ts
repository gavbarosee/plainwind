/**
 * Grid pattern matchers
 */

import { NUMBER_WORDS } from "./helpers";

export function matchGridPattern(className: string): string | null {
  // Column span: col-span-5, col-span-8
  const colSpanMatch = className.match(/^col-span-(\d+)$/);
  if (colSpanMatch) {
    const value = colSpanMatch[1];
    return `spans ${value} columns`;
  }

  // Row span: row-span-4, row-span-6
  const rowSpanMatch = className.match(/^row-span-(\d+)$/);
  if (rowSpanMatch) {
    const value = rowSpanMatch[1];
    return `spans ${value} rows`;
  }

  // Column start: col-start-4, col-start-7
  const colStartMatch = className.match(/^col-start-(\d+)$/);
  if (colStartMatch) {
    const value = colStartMatch[1];
    return `starts at column ${value}`;
  }

  // Column end: col-end-5, col-end-13
  const colEndMatch = className.match(/^col-end-(\d+)$/);
  if (colEndMatch) {
    const value = colEndMatch[1];
    return `ends at column ${value}`;
  }

  // Row start: row-start-4, row-start-7
  const rowStartMatch = className.match(/^row-start-(\d+)$/);
  if (rowStartMatch) {
    const value = rowStartMatch[1];
    return `starts at row ${value}`;
  }

  // Row end: row-end-5, row-end-8
  const rowEndMatch = className.match(/^row-end-(\d+)$/);
  if (rowEndMatch) {
    const value = rowEndMatch[1];
    return `ends at row ${value}`;
  }

  return null;
}

/**
 * Try to match positioning patterns (top-*, -bottom-*, inset-*, etc.)
 */

export function matchGridColumnsPattern(className: string): string | null {
  // Match grid-cols with custom property: grid-cols-(--custom-var)
  const customPropMatch = className.match(/^grid-cols-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid columns ${customPropMatch[1]}`;
  }

  // Match grid-cols with arbitrary value: grid-cols-[value]
  const arbitraryMatch = className.match(/^grid-cols-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid columns ${arbitraryMatch[1]}`;
  }

  // Match grid-cols with number: grid-cols-13, grid-cols-20
  const numberMatch = className.match(/^grid-cols-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const numWord = NUMBER_WORDS[value] || value;
    return `${numWord} column${value === "1" ? "" : "s"}`;
  }

  return null;
}

/**
 * Try to match grid-template-rows patterns (grid-rows-<number>, grid-rows-(<custom-property>), grid-rows-[<value>])
 */

export function matchGridRowsPattern(className: string): string | null {
  // Match grid-rows with custom property: grid-rows-(--custom-var)
  const customPropMatch = className.match(/^grid-rows-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid rows ${customPropMatch[1]}`;
  }

  // Match grid-rows with arbitrary value: grid-rows-[value]
  const arbitraryMatch = className.match(/^grid-rows-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid rows ${arbitraryMatch[1]}`;
  }

  // Match grid-rows with number: grid-rows-13, grid-rows-20
  const numberMatch = className.match(/^grid-rows-(\d+)$/);
  if (numberMatch) {
    const value = numberMatch[1];
    const numWord = NUMBER_WORDS[value] || value;
    return `${numWord} row${value === "1" ? "" : "s"}`;
  }

  return null;
}

/**
 * Try to match grid-column patterns (col-span-*, col-start-*, col-end-*, col-*)
 */

export function matchGridColumnPattern(className: string): string | null {
  // col-span-* patterns
  if (className.startsWith("col-span-")) {
    // col-span-(--custom-property)
    const customPropMatch = className.match(/^col-span-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `spans ${customPropMatch[1]} columns`;
    }

    // col-span-[value]
    const arbitraryMatch = className.match(/^col-span-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `spans ${arbitraryMatch[1]} columns`;
    }

    // col-span-<number> (dynamic numbers > 12)
    const numberMatch = className.match(/^col-span-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `spans ${value} column${value === "1" ? "" : "s"}`;
    }
  }

  // col-start-* patterns
  if (className.startsWith("col-start-") || className.startsWith("-col-start-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // col-start-(--custom-property)
    const customPropMatch = baseClass.match(/^col-start-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `starts at column ${customPropMatch[1]}`;
    }

    // col-start-[value]
    const arbitraryMatch = baseClass.match(/^col-start-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `starts at column ${arbitraryMatch[1]}`;
    }

    // col-start-<number> or -col-start-<number>
    const numberMatch = baseClass.match(/^col-start-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `starts at column ${isNegative ? "-" : ""}${value}`;
    }
  }

  // col-end-* patterns
  if (className.startsWith("col-end-") || className.startsWith("-col-end-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // col-end-(--custom-property)
    const customPropMatch = baseClass.match(/^col-end-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `ends at column ${customPropMatch[1]}`;
    }

    // col-end-[value]
    const arbitraryMatch = baseClass.match(/^col-end-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `ends at column ${arbitraryMatch[1]}`;
    }

    // col-end-<number> or -col-end-<number>
    const numberMatch = baseClass.match(/^col-end-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `ends at column ${isNegative ? "-" : ""}${value}`;
    }
  }

  // col-* patterns (plain col without span/start/end)
  if (className.startsWith("col-") && !className.startsWith("col-span-") && !className.startsWith("col-start-") && !className.startsWith("col-end-")) {
    const isNegative = className.startsWith("-col-");
    const baseClass = isNegative ? className.slice(1) : className;

    // col-(--custom-property)
    const customPropMatch = baseClass.match(/^col-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `column ${customPropMatch[1]}`;
    }

    // col-[value]
    const arbitraryMatch = baseClass.match(/^col-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `column ${arbitraryMatch[1]}`;
    }

    // col-<number> or -col-<number>
    const numberMatch = baseClass.match(/^col-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `column ${isNegative ? "-" : ""}${value}`;
    }
  }

  return null;
}

/**
 * Try to match grid-row patterns (row-span-*, row-start-*, row-end-*, row-*)
 */

export function matchGridRowPattern(className: string): string | null {
  // row-span-* patterns
  if (className.startsWith("row-span-")) {
    // row-span-(--custom-property)
    const customPropMatch = className.match(/^row-span-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `spans ${customPropMatch[1]} rows`;
    }

    // row-span-[value]
    const arbitraryMatch = className.match(/^row-span-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `spans ${arbitraryMatch[1]} rows`;
    }

    // row-span-<number> (dynamic numbers > 12)
    const numberMatch = className.match(/^row-span-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `spans ${value} row${value === "1" ? "" : "s"}`;
    }
  }

  // row-start-* patterns
  if (className.startsWith("row-start-") || className.startsWith("-row-start-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // row-start-(--custom-property)
    const customPropMatch = baseClass.match(/^row-start-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `starts at row ${customPropMatch[1]}`;
    }

    // row-start-[value]
    const arbitraryMatch = baseClass.match(/^row-start-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `starts at row ${arbitraryMatch[1]}`;
    }

    // row-start-<number> or -row-start-<number>
    const numberMatch = baseClass.match(/^row-start-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `starts at row ${isNegative ? "-" : ""}${value}`;
    }
  }

  // row-end-* patterns
  if (className.startsWith("row-end-") || className.startsWith("-row-end-")) {
    const isNegative = className.startsWith("-");
    const baseClass = isNegative ? className.slice(1) : className;

    // row-end-(--custom-property)
    const customPropMatch = baseClass.match(/^row-end-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `ends at row ${customPropMatch[1]}`;
    }

    // row-end-[value]
    const arbitraryMatch = baseClass.match(/^row-end-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `ends at row ${arbitraryMatch[1]}`;
    }

    // row-end-<number> or -row-end-<number>
    const numberMatch = baseClass.match(/^row-end-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `ends at row ${isNegative ? "-" : ""}${value}`;
    }
  }

  // row-* patterns (plain row without span/start/end)
  if (className.startsWith("row-") && !className.startsWith("row-span-") && !className.startsWith("row-start-") && !className.startsWith("row-end-")) {
    const isNegative = className.startsWith("-row-");
    const baseClass = isNegative ? className.slice(1) : className;

    // row-(--custom-property)
    const customPropMatch = baseClass.match(/^row-\((--[\w-]+)\)$/);
    if (customPropMatch) {
      return `row ${customPropMatch[1]}`;
    }

    // row-[value]
    const arbitraryMatch = baseClass.match(/^row-\[(.+?)\]$/);
    if (arbitraryMatch) {
      return `row ${arbitraryMatch[1]}`;
    }

    // row-<number> or -row-<number>
    const numberMatch = baseClass.match(/^row-(\d+)$/);
    if (numberMatch) {
      const value = numberMatch[1];
      return `row ${isNegative ? "-" : ""}${value}`;
    }
  }

  return null;
}

/**
 * Try to match grid-auto-columns patterns (auto-cols-(<custom-property>), auto-cols-[<value>])
 */

export function matchGridAutoColumnsPattern(className: string): string | null {
  // auto-cols-(--custom-property)
  const customPropMatch = className.match(/^auto-cols-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid auto columns ${customPropMatch[1]}`;
  }

  // auto-cols-[value]
  const arbitraryMatch = className.match(/^auto-cols-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid auto columns ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match grid-auto-rows patterns (auto-rows-(<custom-property>), auto-rows-[<value>])
 */

export function matchGridAutoRowsPattern(className: string): string | null {
  // auto-rows-(--custom-property)
  const customPropMatch = className.match(/^auto-rows-\((--[\w-]+)\)$/);
  if (customPropMatch) {
    return `grid auto rows ${customPropMatch[1]}`;
  }

  // auto-rows-[value]
  const arbitraryMatch = className.match(/^auto-rows-\[(.+?)\]$/);
  if (arbitraryMatch) {
    return `grid auto rows ${arbitraryMatch[1]}`;
  }

  return null;
}

/**
 * Try to match gap patterns (gap-*, gap-x-*, gap-y-*)
 */

