/**
 * Test cases for edge cases, error recovery, and graceful degradation
 * These ensure the system handles malformed or unusual input
 */

// Error recovery - graceful degradation cases
export const GRACEFUL_DEGRADATION_CASES: Array<[string, boolean]> = [
  ['', true], // empty string should work
  ['   ', true], // whitespace only
  ['flex  items-center', true], // multiple spaces
  ['flex\titems-center', true], // tabs
  ['flex\nitems-center', true], // newlines
  ['hover:', true], // incomplete modifier
  [':bg-white', true], // leading colon
  ['::::', true], // only colons
  ['//////', true], // only slashes
  ['!!!!!!', true], // only exclamation marks
];

// Performance test cases
export const PERFORMANCE_CASES = {
  longClassString: Array(100).fill('p-4 m-2 bg-white text-black').join(' '),
  deeplyNestedVariants:
    'sm:md:lg:xl:2xl:hover:focus:active:disabled:group-hover:p-4',
  longArbitraryValue: `w-[calc(100vw-theme(spacing.64)-theme(spacing.48))]`,
  manyClasses: Array(50)
    .fill([
      'flex',
      'items-center',
      'justify-between',
      'p-4',
      'm-2',
      'bg-white',
      'text-black',
      'rounded-lg',
      'shadow-md',
      'hover:shadow-lg',
    ])
    .flat()
    .join(' '),
};
