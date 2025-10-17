/**
 * Tests for className parsing and extraction
 */

import { describe, it, expect } from 'vitest';
import {
  extractAllClassNames,
  combineClassStrings,
  findExtractionAtPosition,
} from '@src/core/parsing';

describe('extractAllClassNames', () => {
  describe('simple string literals', () => {
    it('should extract from className with double quotes', () => {
      const text = '<div className="flex items-center gap-4">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'flex items-center gap-4' }
      ]);
      expect(extractions[0].type).toBe('simple');
    });

    it('should extract from className with single quotes', () => {
      const text = "<div className='flex items-center gap-4'>";
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].type).toBe('simple');
    });

    it('should extract from class attribute', () => {
      const text = '<div class="flex items-center">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center']);
    });

    it('should handle multiple className attributes', () => {
      const text = `
        <div className="flex gap-4">
          <span className="text-sm font-bold">
        </div>
      `;
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(2);
      expect(extractions[0].classStrings).toEqual(['flex gap-4']);
      expect(extractions[1].classStrings).toEqual(['text-sm font-bold']);
    });
  });

  describe('template literals', () => {
    it('should extract from simple template literal', () => {
      const text = '<div className={`flex items-center gap-4`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings).toEqual(['flex items-center gap-4']);
      expect(extractions[0].type).toBe('template');
    });

    it('should extract conditionals from template literal with ternary', () => {
      const text = '<div className={`flex gap-4 ${isActive ? "bg-blue-500" : "bg-gray-200"} p-4`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('template');
      
      // Should extract all parts with their conditions
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals.length).toBe(4);
      
      // Static parts
      expect(conditionals[0]).toEqual({ classes: 'flex gap-4' });
      expect(conditionals[3]).toEqual({ classes: 'p-4' });
      
      // Conditional parts
      expect(conditionals[1]).toEqual({ classes: 'bg-blue-500', condition: 'isActive' });
      expect(conditionals[2]).toEqual({ classes: 'bg-gray-200', condition: '!isActive' });
    });

    it('should work with any variable name', () => {
      const text = '<div className={`flex ${isEnabled && "opacity-100"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'opacity-100', condition: 'isEnabled' });
    });

    it('should work with complex variable names', () => {
      const text = '<div className={`flex ${user.isLoggedIn ? "authenticated" : "guest"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'authenticated', condition: 'user.isLoggedIn' });
      expect(conditionals).toContainEqual({ classes: 'guest', condition: '!user.isLoggedIn' });
    });

    it('should handle multiple conditionals in one template', () => {
      const text = '<div className={`flex ${isActive && "active"} ${hasError ? "error" : ""}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'error', condition: 'hasError' });
    });

    it('should handle logical OR (||) fallback', () => {
      const text = '<div className={`flex ${customClass || "default-class"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'flex' });
      expect(conditionals).toContainEqual({ classes: 'default-class', condition: '!customClass' });
    });

    it('should handle nullish coalescing (??)', () => {
      const text = '<div className={`flex ${customClass ?? "default-class"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'flex' });
      expect(conditionals).toContainEqual({ classes: 'default-class', condition: 'customClass == null' });
    });

    it('should handle nested/chained ternaries', () => {
      const text = '<div className={`flex ${v === "a" ? "bg-blue" : v === "b" ? "bg-red" : "bg-gray"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      
      expect(conditionals).toHaveLength(4);
      expect(conditionals).toContainEqual({ classes: 'flex' });
      expect(conditionals).toContainEqual({ classes: 'bg-blue', condition: 'v === "a"' });
      expect(conditionals.some(c => c.classes === 'bg-red' && c.condition?.includes('v === "b"'))).toBe(true);
      expect(conditionals.some(c => c.classes === 'bg-gray')).toBe(true);
    });
  });

  describe('helper functions', () => {
    it('should extract from clsx', () => {
      const text = '<div className={clsx("flex items-center", "p-4 bg-white")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
      expect(extractions[0].classStrings).toContain('flex items-center');
      expect(extractions[0].classStrings).toContain('p-4 bg-white');
    });

    it('should extract from classnames', () => {
      const text = '<div className={classnames("flex", "gap-4")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should extract from cn', () => {
      const text = '<div className={cn("flex items-center", "hover:bg-gray-100")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should extract from twMerge', () => {
      const text = '<div className={twMerge("p-4 bg-blue-500", "hover:bg-blue-600")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should extract from cva', () => {
      const text = '<div className={cva("base-class", "variant-class")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should handle mixed quote styles in helpers', () => {
      const text = `<div className={clsx('flex items-center', "p-4 gap-4")}>`;
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].classStrings.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle template literals inside helpers', () => {
      const text = '<div className={clsx(`flex items-center`, "p-4")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].type).toBe('helper');
    });

    it('should handle object syntax in classnames/clsx', () => {
      const text = '<div className={clsx({ "active": isActive, "disabled": isDisabled })}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'disabled', condition: 'isDisabled' });
    });

    it('should handle object syntax with true/false literals', () => {
      const text = '<div className={clsx({ "always": true, "never": false, "conditional": x })}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      
      // Should have "always" without condition
      expect(conditionals).toContainEqual({ classes: 'always' });
      
      // Should NOT have "never" (false is skipped)
      expect(conditionals.some(c => c.classes === 'never')).toBe(false);
      
      // Should have "conditional" with condition
      expect(conditionals).toContainEqual({ classes: 'conditional', condition: 'x' });
    });

    it('should handle multiline object syntax', () => {
      const text = `<div className={clsx({
        'base': true,
        'active': isActive,
        'disabled': isDisabled
      })} />`;
      
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals.length).toBe(3);
      expect(conditionals).toContainEqual({ classes: 'base' });
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'disabled', condition: 'isDisabled' });
    });

    it('should handle array syntax in helpers', () => {
      const text = `<div className={clsx([
        'flex flex-col gap-4',
        'shadow-md border',
        'hover:shadow-lg'
      ])} />`;
      
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals.length).toBe(3);
      expect(conditionals.some(c => c.classes === 'flex flex-col gap-4')).toBe(true);
      expect(conditionals.some(c => c.classes === 'shadow-md border')).toBe(true);
      expect(conditionals.some(c => c.classes === 'hover:shadow-lg')).toBe(true);
    });

    it('should handle array syntax with conditionals', () => {
      const text = `<div className={clsx([
        'base',
        isActive && 'active',
        condition ? 'yes' : 'no'
      ])} />`;
      
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'base' });
      expect(conditionals).toContainEqual({ classes: 'active', condition: 'isActive' });
      expect(conditionals).toContainEqual({ classes: 'yes', condition: 'condition' });
      expect(conditionals).toContainEqual({ classes: 'no', condition: '!condition' });
    });
  });

  describe('edge cases', () => {
    it('should skip empty className', () => {
      const text = '<div className="">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(0);
    });

    it('should handle className with only whitespace', () => {
      const text = '<div className="   ">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(0);
    });

    it('should not duplicate overlapping patterns', () => {
      const text = '<div className="flex items-center">';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
    });

    it('should maintain document order', () => {
      const text = `
        <div className="first">
          <span className={clsx("second")}>
            <p className={\`third\`}>
      `;
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(3);
      expect(extractions[0].classStrings[0]).toBe('first');
      expect(extractions[1].classStrings[0]).toBe('second');
      expect(extractions[2].classStrings[0]).toBe('third');
    });
  });
});

describe('combineClassStrings', () => {
  it('should combine multiple strings', () => {
    const result = combineClassStrings(['flex gap-4', 'p-4 bg-white']);
    expect(result).toBe('flex gap-4 p-4 bg-white');
  });

  it('should remove duplicate classes', () => {
    const result = combineClassStrings(['flex gap-4', 'flex p-4']);
    expect(result).toContain('flex');
    // Should only contain one instance of 'flex'
    expect(result.split(' ').filter((c) => c === 'flex')).toHaveLength(1);
  });

  it('should handle single string', () => {
    const result = combineClassStrings(['flex items-center']);
    expect(result).toBe('flex items-center');
  });

  it('should handle empty array', () => {
    const result = combineClassStrings([]);
    expect(result).toBe('');
  });

  it('should trim and filter empty strings', () => {
    const result = combineClassStrings(['flex', '  ', 'gap-4', '']);
    expect(result).toBe('flex gap-4');
  });
});

describe('findExtractionAtPosition', () => {
  it('should find extraction at position', () => {
    const text = '<div className="flex items-center">';
    const extractions = extractAllClassNames(text);
    const found = findExtractionAtPosition(extractions, 10);

    expect(found).toBeDefined();
    expect(found?.classStrings).toEqual(['flex items-center']);
  });

  it('should return undefined for position outside any extraction', () => {
    const text = '<div className="flex">text</div>';
    const extractions = extractAllClassNames(text);
    const found = findExtractionAtPosition(extractions, 100);

    expect(found).toBeUndefined();
  });

  it('should find correct extraction when multiple exist', () => {
    const text = '<div className="first"><span className="second">';
    const extractions = extractAllClassNames(text);

    const firstFound = findExtractionAtPosition(extractions, 10);
    const secondFound = findExtractionAtPosition(extractions, 35);

    expect(firstFound?.classStrings).toEqual(['first']);
    expect(secondFound?.classStrings).toEqual(['second']);
  });

  it('should handle boundary positions', () => {
    const text = '<div className="flex">';
    const extractions = extractAllClassNames(text);

    expect(findExtractionAtPosition(extractions, extractions[0].range.start)).toBeDefined();
    expect(findExtractionAtPosition(extractions, extractions[0].range.end)).toBeDefined();
  });
});

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

describe('conditional class extraction', () => {
  describe('logical AND conditions', () => {
    it('should extract condition from && expression', () => {
      const text = '<div className={clsx(isActive && "bg-blue-500")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'bg-blue-500', condition: 'isActive' }
      ]);
    });

    it('should extract multiple conditional classes', () => {
      const text = '<div className={clsx("base", isActive && "active", isDisabled && "disabled")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'base' },
        { classes: 'active', condition: 'isActive' },
        { classes: 'disabled', condition: 'isDisabled' }
      ]);
    });
  });

  describe('ternary operators', () => {
    it('should extract both branches of ternary', () => {
      const text = '<div className={clsx(size === "lg" ? "text-xl" : "text-sm")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].conditionalClasses).toHaveLength(2);
      expect(extractions[0].conditionalClasses[0]).toEqual({
        classes: 'text-xl',
        condition: 'size === "lg"'
      });
      expect(extractions[0].conditionalClasses[1]).toEqual({
        classes: 'text-sm',
        condition: '!size === "lg"'
      });
    });

    it('should handle complex ternary conditions', () => {
      const text = '<div className={clsx(variant === "primary" ? "bg-blue-500" : "bg-gray-500")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toHaveLength(2);
      expect(conditionals[0].condition).toBe('variant === "primary"');
      expect(conditionals[1].condition).toBe('!variant === "primary"');
    });
  });

  describe('mixed conditional and unconditional', () => {
    it('should handle the user example code', () => {
      const text = `<button className={clsx(
        'px-4 py-2 rounded-md font-medium transition-colors',
        'hover:bg-blue-600 focus:ring-2 focus:ring-blue-500',
        isActive && 'bg-blue-500 text-white',
        isDisabled && 'opacity-50 cursor-not-allowed'
      )}>`;
      
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      
      // Should have 4 entries total
      expect(conditionals).toHaveLength(4);
      
      // First two are unconditional
      expect(conditionals[0].condition).toBeUndefined();
      expect(conditionals[1].condition).toBeUndefined();
      
      // Last two are conditional
      expect(conditionals[2]).toEqual({
        classes: 'bg-blue-500 text-white',
        condition: 'isActive'
      });
      expect(conditionals[3]).toEqual({
        classes: 'opacity-50 cursor-not-allowed',
        condition: 'isDisabled'
      });
    });
  });
});

