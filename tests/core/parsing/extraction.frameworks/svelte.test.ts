/**
 * Tests for Svelte class: directive extraction patterns
 */

import { describe, it, expect } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('Svelte class: directives', () => {
  it('should extract from class:name with condition', () => {
    const text = '<div class:active={isActive}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].classStrings).toEqual(['active']);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' },
    ]);
  });

  it('should extract multiple class: directives', () => {
    const text = '<div class:active={isActive} class:disabled={isDisabled}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' },
    ]);
    expect(extractions[1].conditionalClasses).toEqual([
      { classes: 'disabled', condition: 'isDisabled' },
    ]);
  });

  it('should handle class: with tailwind classes', () => {
    const text =
      '<div class:bg-blue-500={isActive} class:text-white={isActive}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].classStrings).toEqual(['bg-blue-500']);
    expect(extractions[1].classStrings).toEqual(['text-white']);
  });

  it('should handle class: with true literal', () => {
    const text = '<div class:always-active={true}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'always-active' },
    ]);
  });

  it('should handle class: with complex expressions', () => {
    const text = '<div class:error={hasError || isInvalid}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'error', condition: 'hasError || isInvalid' },
    ]);
  });

  describe('coexistence with class attribute', () => {
    it('should extract both class and class: directive', () => {
      const text = '<div class="base-styles" class:active={isActive}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(2);
      expect(extractions[0].classStrings).toEqual(['base-styles']);
      expect(extractions[1].conditionalClasses).toEqual([
        { classes: 'active', condition: 'isActive' },
      ]);
    });
  });
});
