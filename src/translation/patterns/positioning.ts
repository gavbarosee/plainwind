/**
 * Positioning pattern matchers
 */

import { SPACING_SCALE } from './helpers';

export function matchPositioningPattern(className: string): string | null {
  // Z-index with custom property: z-(--custom-var)
  const zCustomPropMatch = className.match(/^z-\((--[\w-]+)\)$/);
  if (zCustomPropMatch) {
    return `z-index ${zCustomPropMatch[1]}`;
  }

  // Z-index with arbitrary value: z-[value]
  const zArbitraryMatch = className.match(/^z-\[(.+?)\]$/);
  if (zArbitraryMatch) {
    return `z-index ${zArbitraryMatch[1]}`;
  }

  // Z-index with dynamic number: z-100, z-999
  const zNumberMatch = className.match(/^z-(\d+)$/);
  if (zNumberMatch) {
    return `z-index ${zNumberMatch[1]}`;
  }

  // Negative z-index with dynamic number: -z-100, -z-999
  const negativeZMatch = className.match(/^-z-(\d+)$/);
  if (negativeZMatch) {
    return `z-index -${negativeZMatch[1]}`;
  }

  // Helper to format size values
  const formatSize = (value: string): string => {
    if (value === 'px') return '1px';
    if (value === 'full') return '100%';
    if (value === 'auto') return 'auto';
    // Handle fractions: 1/2, 1/3, 2/3, etc.
    if (/^\d+\/\d+$/.test(value)) {
      const [num, denom] = value.split('/').map(Number);
      const percent = ((num / denom) * 100).toFixed(3).replace(/\.?0+$/, '');
      return `${percent}%`;
    }
    return SPACING_SCALE[value] || value;
  };

  // Negative inset-x: -inset-x-4, -inset-x-1/2, -inset-x-px
  const negativeInsetXMatch = className.match(/^-inset-x-(.+)$/);
  if (negativeInsetXMatch) {
    const size = formatSize(negativeInsetXMatch[1]);
    return `-${size} from left and right`;
  }

  // Negative inset-y: -inset-y-4, -inset-y-1/2, -inset-y-px
  const negativeInsetYMatch = className.match(/^-inset-y-(.+)$/);
  if (negativeInsetYMatch) {
    const size = formatSize(negativeInsetYMatch[1]);
    return `-${size} from top and bottom`;
  }

  // Positive inset-x: inset-x-4, inset-x-1/2, inset-x-px
  const insetXMatch = className.match(/^inset-x-(.+)$/);
  if (insetXMatch) {
    const size = formatSize(insetXMatch[1]);
    return `${size} from left and right`;
  }

  // Positive inset-y: inset-y-4, inset-y-1/2, inset-y-px
  const insetYMatch = className.match(/^inset-y-(.+)$/);
  if (insetYMatch) {
    const size = formatSize(insetYMatch[1]);
    return `${size} from top and bottom`;
  }

  // Negative start/end (logical properties): -start-4, -end-1/2
  const negativeStartMatch = className.match(/^-start-(.+)$/);
  if (negativeStartMatch) {
    const size = formatSize(negativeStartMatch[1]);
    return `-${size} from start (logical)`;
  }

  const negativeEndMatch = className.match(/^-end-(.+)$/);
  if (negativeEndMatch) {
    const size = formatSize(negativeEndMatch[1]);
    return `-${size} from end (logical)`;
  }

  // Positive start/end (logical properties): start-4, end-1/2
  const startMatch = className.match(/^start-(.+)$/);
  if (startMatch) {
    const size = formatSize(startMatch[1]);
    return `${size} from start (logical)`;
  }

  const endMatch = className.match(/^end-(.+)$/);
  if (endMatch) {
    const size = formatSize(endMatch[1]);
    return `${size} from end (logical)`;
  }

  // Custom property patterns: inset-(<custom-property>), top-(<custom-property>), etc.
  const customPropMatch = className.match(
    /^(inset|inset-x|inset-y|top|right|bottom|left|start|end)-\((--[\w-]+)\)$/
  );
  if (customPropMatch) {
    const direction = customPropMatch[1];
    const varName = customPropMatch[2];
    return `${varName} from ${direction}`;
  }

  // Arbitrary value patterns: inset-[<value>], top-[<value>], etc.
  const arbitraryMatch = className.match(
    /^(inset|inset-x|inset-y|top|right|bottom|left|start|end)-\[(.+?)\]$/
  );
  if (arbitraryMatch) {
    const direction = arbitraryMatch[1];
    const value = arbitraryMatch[2];
    return `${value} from ${direction}`;
  }

  // Negative positioning: -top-4, -bottom-px, -left-8, -inset-4
  const negativeMatch = className.match(
    /^-(top|right|bottom|left|inset)-(.+)$/
  );
  if (negativeMatch) {
    const direction = negativeMatch[1];
    const value = negativeMatch[2];
    const size = formatSize(value);
    return `-${size} from ${direction}`;
  }

  // Positive positioning: top-4, bottom-0, left-8, inset-4
  const positiveMatch = className.match(/^(top|right|bottom|left|inset)-(.+)$/);
  if (positiveMatch) {
    const direction = positiveMatch[1];
    const value = positiveMatch[2];
    const size = formatSize(value);
    return `${size} from ${direction}`;
  }

  return null;
}

/**
 * Try to match color patterns (bg-*, text-*, border-*, etc.)
 */
