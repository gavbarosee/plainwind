/**
 * Tests for framework-specific class extraction patterns
 * Covers Vue, Svelte, Angular, and Solid.js
 */

import { describe, it, expect } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('Vue :class bindings', () => {
  describe('static string bindings', () => {
    it('should extract from :class with double quotes', () => {
      const text = '<div :class="flex items-center gap-4">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'flex items-center gap-4' }
      ]);
    });

    it('should extract from v-bind:class', () => {
      const text = '<div v-bind:class="flex items-center">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center']);
    });
  });

  describe('object syntax', () => {
    it('should extract from :class with object', () => {
      const text = '<div :class="{ active: isActive, \'text-red\': hasError }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'text-red', condition: 'hasError' });
    });

    it('should handle object with true/false literals', () => {
      const text = '<div :class="{ \'always\': true, \'never\': false, \'maybe\': isEnabled }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'always' });
      expect(conditionals.some(c => c.classes === 'never')).toBe(false);
      expect(conditionals).toContainEqual({ classes: 'maybe', condition: 'isEnabled' });
    });
  });

  describe('array syntax', () => {
    it('should extract from :class with array', () => {
      const text = '<div :class="[\'flex\', \'items-center\']">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toContain('flex');
      expect(extractions[0].classStrings).toContain('items-center');
    });

    it('should handle array with conditionals', () => {
      const text = '<div :class="[\'base\', isActive && \'active\']">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'base' });
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
    });

    it('should handle array with ternary', () => {
      const text = '<div :class="[isActive ? \'bg-blue-500\' : \'bg-gray-200\']">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'bg-blue-500', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'bg-gray-200', condition: '!isActive' });
    });
  });

  describe('coexistence with class attribute', () => {
    it('should extract both class and :class', () => {
      const text = '<div class="static-classes" :class="{ active: isActive }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(2);
      expect(extractions[0].classStrings).toEqual(['static-classes']);
      expect(extractions[1].conditionalClasses).toContainEqual({ 
        classes: 'active', 
        condition: 'isActive' 
      });
    });
  });
});

describe('Svelte class: directives', () => {
  it('should extract from class:name with condition', () => {
    const text = '<div class:active={isActive}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].classStrings).toEqual(['active']);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' }
    ]);
  });

  it('should extract multiple class: directives', () => {
    const text = '<div class:active={isActive} class:disabled={isDisabled}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' }
    ]);
    expect(extractions[1].conditionalClasses).toEqual([
      { classes: 'disabled', condition: 'isDisabled' }
    ]);
  });

  it('should handle class: with tailwind classes', () => {
    const text = '<div class:bg-blue-500={isActive} class:text-white={isActive}>';
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
      { classes: 'always-active' }
    ]);
  });

  it('should handle class: with complex expressions', () => {
    const text = '<div class:error={hasError || isInvalid}>';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'error', condition: 'hasError || isInvalid' }
    ]);
  });

  describe('coexistence with class attribute', () => {
    it('should extract both class and class: directive', () => {
      const text = '<div class="base-styles" class:active={isActive}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(2);
      expect(extractions[0].classStrings).toEqual(['base-styles']);
      expect(extractions[1].conditionalClasses).toEqual([
        { classes: 'active', condition: 'isActive' }
      ]);
    });
  });
});

describe('Angular [ngClass] bindings', () => {
  describe('object syntax', () => {
    it('should extract from [ngClass] with object', () => {
      const text = '<div [ngClass]="{ \'active\': isActive, \'disabled\': isDisabled }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'disabled', condition: 'isDisabled' });
    });

    it('should handle unquoted keys in object', () => {
      const text = '<div [ngClass]="{ active: isActive, disabled: isDisabled }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'disabled', condition: 'isDisabled' });
    });

    it('should handle Tailwind classes with dashes and colons', () => {
      const text = '<div [ngClass]="{ \'bg-blue-500\': isActive, \'hover:bg-blue-600\': isHovered }">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'bg-blue-500', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'hover:bg-blue-600', condition: 'isHovered' });
    });
  });

  describe('array syntax', () => {
    it('should extract from [ngClass] with array', () => {
      const text = '<div [ngClass]="[\'flex\', \'items-center\']">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toContain('flex');
      expect(extractions[0].classStrings).toContain('items-center');
    });

    it('should handle array with conditionals', () => {
      const text = '<div [ngClass]="[\'base\', isActive && \'active\']">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'base' });
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
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
      { classes: 'active', condition: 'isActive' }
    ]);
  });

  it('should extract multiple [class.x] bindings', () => {
    const text = '<div [class.active]="isActive" [class.disabled]="isDisabled">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(2);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'active', condition: 'isActive' }
    ]);
    expect(extractions[1].conditionalClasses).toEqual([
      { classes: 'disabled', condition: 'isDisabled' }
    ]);
  });

  it('should handle Tailwind classes with dashes', () => {
    const text = '<div [class.bg-blue-500]="isActive" [class.text-white]="isActive">';
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
      { classes: 'always-active' }
    ]);
  });

  it('should handle complex expressions', () => {
    const text = '<div [class.error]="hasError || isInvalid">';
    const extractions = extractAllClassNames(text);

    expect(extractions).toHaveLength(1);
    expect(extractions[0].conditionalClasses).toEqual([
      { classes: 'error', condition: 'hasError || isInvalid' }
    ]);
  });
});

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

