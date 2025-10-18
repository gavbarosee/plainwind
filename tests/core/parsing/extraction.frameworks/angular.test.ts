/**
 * Tests for Angular [ngClass] and [class.x] binding extraction patterns
 */

import { describe, it, expect } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('Angular [ngClass] bindings', () => {
  describe('object syntax', () => {
    it('should extract from [ngClass] with object', () => {
      const text =
        "<div [ngClass]=\"{ 'active': isActive, 'disabled': isDisabled }\">";
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({
        classes: 'active',
        condition: 'isActive',
      });
      expect(conditionals).toContainEqual({
        classes: 'disabled',
        condition: 'isDisabled',
      });
    });

    it('should handle unquoted keys in object', () => {
      const text =
        '<div [ngClass]="{ active: isActive, disabled: isDisabled }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({
        classes: 'active',
        condition: 'isActive',
      });
      expect(conditionals).toContainEqual({
        classes: 'disabled',
        condition: 'isDisabled',
      });
    });

    it('should handle Tailwind classes with dashes and colons', () => {
      const text =
        "<div [ngClass]=\"{ 'bg-blue-500': isActive, 'hover:bg-blue-600': isHovered }\">";
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({
        classes: 'bg-blue-500',
        condition: 'isActive',
      });
      expect(conditionals).toContainEqual({
        classes: 'hover:bg-blue-600',
        condition: 'isHovered',
      });
    });
  });

  describe('array syntax', () => {
    it('should extract from [ngClass] with array', () => {
      const text = "<div [ngClass]=\"['flex', 'items-center']\">";
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toContain('flex');
      expect(extractions[0].classStrings).toContain('items-center');
    });

    it('should handle array with conditionals', () => {
      const text = "<div [ngClass]=\"['base', isActive && 'active']\">";
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'base' });
      expect(conditionals).toContainEqual({
        classes: 'active',
        condition: 'isActive',
      });
    });
  });
});

describe('Angular [class.x] bindings', () => {
  it('should extract from [class.x] binding', () => {
    const text = '<div [class.active]="isActive">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].classStrings).toEqual(['active']);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' },
    ]);
  });

  it('should extract multiple [class.x] bindings', () => {
    const text =
      '<div [class.active]="isActive" [class.disabled]="isDisabled">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' },
    ]);
    expect(extractions[1].conditionalClasses).toEqual([
      { classes: 'disabled', condition: 'isDisabled' },
    ]);
  });

  it('should handle Tailwind classes with dashes', () => {
    const text =
      '<div [class.bg-blue-500]="isActive" [class.text-white]="isActive">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].classStrings).toEqual(['bg-blue-500']);
    expect(extractions[1].classStrings).toEqual(['text-white']);
  });

  it('should handle [class.x] with true literal', () => {
    const text = '<div [class.always-active]="true">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'always-active' },
    ]);
  });

  it('should handle complex expressions', () => {
    const text = '<div [class.error]="hasError || isInvalid">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'error', condition: 'hasError || isInvalid' },
    ]);
  });
});
