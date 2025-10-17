/**
 * Tests for Solid.js classList extraction patterns
 */

import { describe, it, expect } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('Solid.js classList', () => {
  it('should extract from classList object', () => {
    const text = '<div classList={{ active: isActive, disabled: isDisabled }}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    const conditionals = extractions[0].conditionalClasses;
    expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
    expect(conditionals).toContainEqual({ classes: 'disabled', condition: 'isDisabled' });
  });

  it('should handle Tailwind classes', () => {
    const text = '<div classList={{ "bg-blue-500": isActive, "text-white": isActive }}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    const conditionals = extractions[0].conditionalClasses;
    expect(conditionals).toContainEqual({ classes: 'bg-blue-500', condition: 'isActive' });
    expect(conditionals).toContainEqual({ classes: 'text-white', condition: 'isActive' });
  });

  it('should handle single quotes', () => {
    const text = "<div classList={{ 'active': isActive, 'disabled': isDisabled }}>";
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    const conditionals = extractions[0].conditionalClasses;
    expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
    expect(conditionals).toContainEqual({ classes: 'disabled', condition: 'isDisabled' });
  });

  it('should handle true/false literals', () => {
    const text = '<div classList={{ always: true, never: false, maybe: isEnabled }}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    const conditionals = extractions[0].conditionalClasses;
    expect(conditionals).toContainEqual({ classes: 'always' });
    expect(conditionals.some(c => c.classes === 'never')).toBe(false);
    expect(conditionals).toContainEqual({ classes: 'maybe', condition: 'isEnabled' });
  });

  it('should handle complex expressions', () => {
    const text = '<div classList={{ error: hasError() && isVisible }}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toContainEqual({ 
      classes: 'error', 
      condition: 'hasError() && isVisible' 
    });
  });

  it('should coexist with regular class attribute', () => {
    const text = '<div class="base-styles" classList={{ active: isActive }}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].classStrings).toEqual(['base-styles']);
    expect(extractions[1].conditionalClasses).toContainEqual({ 
      classes: 'active', 
      condition: 'isActive' 
    });
  });
});

