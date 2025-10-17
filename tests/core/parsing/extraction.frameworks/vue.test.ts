/**
 * Tests for Vue :class binding extraction patterns
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

