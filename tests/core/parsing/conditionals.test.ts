/**
 * Tests for conditional class extraction patterns
 *
 * Validates extraction of conditional class patterns from JSX/TSX code,
 * including template literals, ternary operators, logical operators,
 * object syntax (clsx/classnames), and array syntax.
 *
 * Tests cover all common patterns:
 * - Template literals with conditionals: `flex ${isActive && "active"}`
 * - Ternary operators: `condition ? "yes" : "no"`
 * - Logical operators: `&&`, `||`, `??`
 * - Object syntax: `{ "class": condition }`
 * - Array syntax: `["class1", condition && "class2"]`
 *
 * @see src/core/parsing/
 */

import { describe, it, expect } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('conditional class extraction', () => {
  describe('template literals with conditionals', () => {
    it('should extract conditionals from template literal with ternary', () => {
      const text =
        '<div className={`flex gap-4 ${isActive ? "bg-blue-500" : "bg-gray-200"} p-4`}>';
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
      expect(conditionals[1]).toEqual({
        classes: 'bg-blue-500',
        condition: 'isActive',
      });
      expect(conditionals[2]).toEqual({
        classes: 'bg-gray-200',
        condition: '!isActive',
      });
    });

    it('should work with any variable name', () => {
      const text = '<div className={`flex ${isEnabled && "opacity-100"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({
        classes: 'opacity-100',
        condition: 'isEnabled',
      });
    });

    it('should work with complex variable names', () => {
      const text =
        '<div className={`flex ${user.isLoggedIn ? "authenticated" : "guest"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({
        classes: 'authenticated',
        condition: 'user.isLoggedIn',
      });
      expect(conditionals).toContainEqual({
        classes: 'guest',
        condition: '!user.isLoggedIn',
      });
    });

    it('should handle multiple conditionals in one template', () => {
      const text =
        '<div className={`flex ${isActive && "active"} ${hasError ? "error" : ""}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({
        classes: 'active',
        condition: 'isActive',
      });
      expect(conditionals).toContainEqual({
        classes: 'error',
        condition: 'hasError',
      });
    });

    it('should handle logical OR (||) fallback', () => {
      const text = '<div className={`flex ${customClass || "default-class"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'flex' });
      expect(conditionals).toContainEqual({
        classes: 'default-class',
        condition: '!customClass',
      });
    });

    it('should handle nullish coalescing (??)', () => {
      const text = '<div className={`flex ${customClass ?? "default-class"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;
      expect(conditionals).toContainEqual({ classes: 'flex' });
      expect(conditionals).toContainEqual({
        classes: 'default-class',
        condition: 'customClass == null',
      });
    });

    it('should handle nested/chained ternaries', () => {
      const text =
        '<div className={`flex ${v === "a" ? "bg-blue" : v === "b" ? "bg-red" : "bg-gray"}`}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;

      expect(conditionals).toHaveLength(4);
      expect(conditionals).toContainEqual({ classes: 'flex' });
      expect(conditionals).toContainEqual({
        classes: 'bg-blue',
        condition: 'v === "a"',
      });
      expect(
        conditionals.some(
          (c) => c.classes === 'bg-red' && c.condition?.includes('v === "b"')
        )
      ).toBe(true);
      expect(conditionals.some((c) => c.classes === 'bg-gray')).toBe(true);
    });
  });

  describe('object syntax conditionals', () => {
    it('should handle object syntax in classnames/clsx', () => {
      const text =
        '<div className={clsx({ "active": isActive, "disabled": isDisabled })}>';
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

    it('should handle object syntax with true/false literals', () => {
      const text =
        '<div className={clsx({ "always": true, "never": false, "conditional": x })}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      const conditionals = extractions[0].conditionalClasses;

      // Should have "always" without condition
      expect(conditionals).toContainEqual({ classes: 'always' });

      // Should NOT have "never" (false is skipped)
      expect(conditionals.some((c) => c.classes === 'never')).toBe(false);

      // Should have "conditional" with condition
      expect(conditionals).toContainEqual({
        classes: 'conditional',
        condition: 'x',
      });
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
      expect(conditionals).toContainEqual({
        classes: 'active',
        condition: 'isActive',
      });
      expect(conditionals).toContainEqual({
        classes: 'disabled',
        condition: 'isDisabled',
      });
    });
  });

  describe('array syntax conditionals', () => {
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
      expect(
        conditionals.some((c) => c.classes === 'flex flex-col gap-4')
      ).toBe(true);
      expect(conditionals.some((c) => c.classes === 'shadow-md border')).toBe(
        true
      );
      expect(conditionals.some((c) => c.classes === 'hover:shadow-lg')).toBe(
        true
      );
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
      expect(conditionals).toContainEqual({
        classes: 'active',
        condition: 'isActive',
      });
      expect(conditionals).toContainEqual({
        classes: 'yes',
        condition: 'condition',
      });
      expect(conditionals).toContainEqual({
        classes: 'no',
        condition: '!condition',
      });
    });
  });

  describe('logical AND conditions', () => {
    it('should extract condition from && expression', () => {
      const text = '<div className={clsx(isActive && "bg-blue-500")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'bg-blue-500', condition: 'isActive' },
      ]);
    });

    it('should extract multiple conditional classes', () => {
      const text =
        '<div className={clsx("base", isActive && "active", isDisabled && "disabled")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].conditionalClasses).toEqual([
        { classes: 'base' },
        { classes: 'active', condition: 'isActive' },
        { classes: 'disabled', condition: 'isDisabled' },
      ]);
    });
  });

  describe('ternary operators', () => {
    it('should extract both branches of ternary', () => {
      const text =
        '<div className={clsx(size === "lg" ? "text-xl" : "text-sm")}>';
      const extractions = extractAllClassNames(text);

      expect(extractions).toHaveLength(1);
      expect(extractions[0].conditionalClasses).toHaveLength(2);
      expect(extractions[0].conditionalClasses[0]).toEqual({
        classes: 'text-xl',
        condition: 'size === "lg"',
      });
      expect(extractions[0].conditionalClasses[1]).toEqual({
        classes: 'text-sm',
        condition: '!size === "lg"',
      });
    });

    it('should handle complex ternary conditions', () => {
      const text =
        '<div className={clsx(variant === "primary" ? "bg-blue-500" : "bg-gray-500")}>';
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
        condition: 'isActive',
      });
      expect(conditionals[3]).toEqual({
        classes: 'opacity-50 cursor-not-allowed',
        condition: 'isDisabled',
      });
    });
  });
});
