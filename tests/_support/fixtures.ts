/**
 * Test fixtures and constants
 *
 * Provides reusable test data including color scales and sample
 * Tailwind class strings for use across test files.
 *
 * @module tests/_support/fixtures
 */

/**
 * Standard Tailwind color scale values (50-900)
 * Used for testing color-related class patterns
 */
export const COLOR_SCALES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
] as const;

/**
 * Sample Tailwind class strings for common UI patterns
 * Used to test extraction and translation of realistic class combinations
 */
export const SAMPLE_CLASSES = {
  basic: 'flex items-center gap-4',
  button: 'px-4 py-2 bg-blue-500 text-white rounded',
  complex: 'shadow-lg flex p-4 bg-white text-blue-500',
};
