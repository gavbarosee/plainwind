/**
 * Full integration tests for translateClasses
 * 
 * End-to-end tests validating the complete translation pipeline from Tailwind
 * classes to plain English, including all modifiers, variants, arbitrary values,
 * category grouping, edge cases, and performance requirements.
 * 
 * @see src/core/translation/engine/index.ts
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { expectIncludesAll, expectIncludesInOrder, expectTranslation } from '@tests/_support/testUtils';
import { setPlainwindConfig } from '@tests/_support/setup';
import { VARIANT_CASES, CATEGORY_ORDER, FULL_MODIFIER_CHAIN_CASES, GRACEFUL_DEGRADATION_CASES, REAL_WORLD_COMPLEX_CASES, PERFORMANCE_CASES, MALFORMED_MODIFIER_CASES } from '@tests/_support/cases';
import { translateClasses } from '@src/core/translation/engine';
import { ClassBuilder } from '@tests/_support/classBuilder';

describe('translateClasses - Full Integration', () => {
  beforeEach(() => {
    setPlainwindConfig({ groupByCategory: true, showCategoryEmojis: false });
  });

  describe('basic translations', () => {
    it('should translate simple class string', () => {
      const cls = new ClassBuilder().flex().itemsCenter().gap(4).toString();
      const result = translateClasses(cls);
      expect(result).toContain('flex');
      expect(result).toContain('center');
      expect(result).toContain('gap');
    });

    it('should translate spacing utilities', () => {
      const cls = new ClassBuilder().p(4).m(2).px(6).toString();
      const result = translateClasses(cls);
      expect(result).toContain('padding');
      expect(result).toContain('margin');
      expect(result).toContain('horizontal padding');
    });

    it('should translate color utilities', () => {
      const cls = new ClassBuilder().bg('white').text('blue-500').toString();
      const result = translateClasses(cls);
      expect(result).toContain('white background');
      expect(result).toContain('blue text');
    });

    it('should translate layout utilities', () => {
      const cls = new ClassBuilder().block().hidden().overflowAuto().toString();
      const result = translateClasses(cls);
      expect(result).toContain('block');
      expect(result).toContain('visible');
      expect(result).toContain('scroll');
    });
  });

  describe('variants', () => {
    it.each(VARIANT_CASES)('translates %s', (cls, expectedParts) => {
      expectTranslation(cls, expectedParts);
    });
  });

  describe('opacity modifiers', () => {
    it('should translate opacity with color', () => {
      const cls = new ClassBuilder().bg('white/50').toString();
      const result = translateClasses(cls);
      expect(result).toContain('50% opacity');
    });

    it('should translate opacity with different values', () => {
      const cls = new ClassBuilder().text('blue-500/75').toString();
      const result = translateClasses(cls);
      expect(result).toContain('75% opacity');
    });

    it('should combine opacity with variants', () => {
      const cls = new ClassBuilder().hover('bg-blue-500/80').toString();
      const result = translateClasses(cls);
      expect(result).toContain('on hover');
      expect(result).toContain('80% opacity');
    });
  });

  describe('important modifier', () => {
    it('should translate important modifier', () => {
      const cls = new ClassBuilder().p(4).important().toString();
      const result = translateClasses(cls);
      expect(result).toContain('!important');
    });

    it('should combine important with variants', () => {
      const cls = new ClassBuilder().hover('bg-white!').toString();
      const result = translateClasses(cls);
      expect(result).toContain('on hover');
      expect(result).toContain('!important');
    });

    it('should combine important with opacity', () => {
      const cls = new ClassBuilder().bg('blue-500/50!').toString();
      const result = translateClasses(cls);
      expect(result).toContain('50% opacity');
      expect(result).toContain('!important');
    });
  });

  describe('prefix modifier', () => {
    it('should translate prefix', () => {
      const cls = new ClassBuilder().prefix('tw', 'bg-white').toString();
      const result = translateClasses(cls);
      expect(result).toContain('[tw]');
    });

    it('should combine prefix with variants', () => {
      const cls = new ClassBuilder().prefix('tw', 'hover:bg-blue-500').toString();
      const result = translateClasses(cls);
      expect(result).toContain('[tw]');
      expect(result).toContain('on hover');
    });
  });

  describe('complex combinations', () => {
    it('should handle all modifiers together', () => {
      const result = translateClasses('tw\\:md:hover:bg-blue-500/50!');
      expectIncludesAll(result, ['[tw]', 'on medium screens', 'on hover', '50% opacity', '!important']);
    });

    it('should translate complex UI component classes', () => {
      const cls = new ClassBuilder()
        .flex().itemsCenter().justifyBetween().p(4)
        .bg('white').rounded('lg').shadow('md').transitionAll()
        .hover('shadow-lg')
        .toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['flex', 'center', 'apart', 'padding', 'white', 'corner', 'shadow', 'hover', 'animates']);
    });

    it('should translate button with responsive states', () => {
      const cls = new ClassBuilder()
        .px(4).py(2).bg('blue-500').text('white').roundedPlain()
        .hover('bg-blue-600').active('bg-blue-700')
        .md('px-6').md('py-3')
        .toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['horizontal padding', 'vertical padding', 'blue background', 'white text', 'on hover', 'when active', 'on medium screens']);
    });
  });

  describe('arbitrary values', () => {
    it('should translate arbitrary width', () => {
      const cls = new ClassBuilder().raw('w-[100px]').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['width', '100px']);
    });

    it('should translate arbitrary padding', () => {
      const cls = new ClassBuilder().raw('p-[2rem]').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['padding', '2rem']);
    });

    it('should translate arbitrary colors', () => {
      const cls = new ClassBuilder().raw('bg-[#fff]').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['background', '#fff']);
    });

    it('should translate CSS variables', () => {
      const cls = new ClassBuilder().raw('[--my-var:10px]').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['CSS variable', '--my-var', '10px']);
    });

    it('should translate arbitrary CSS properties', () => {
      const cls = new ClassBuilder().raw('[mask-type:luminance]').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['CSS property', 'mask-type', 'luminance']);
    });

    it('should combine arbitrary values with variants', () => {
      const cls = new ClassBuilder().hover('w-[200px]').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['width', '200px', 'on hover']);
    });
  });

  describe('grouping by category', () => {
    beforeEach(() => {
      setPlainwindConfig({ groupByCategory: true, showCategoryEmojis: false });
    });

    it('should group translations by category', () => {
      const cls = new ClassBuilder().flex().p(4).text('blue-500').toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['Flexbox & Grid:', 'Spacing:', 'Colors:']);
    });

    it('should combine multiple classes in same category', () => {
      const cls = new ClassBuilder().p(4).m(2).px(6).toString();
      const result = translateClasses(cls);
      expect(result).toMatch(/Spacing:.*padding.*margin.*padding/);
    });

    it('should maintain category order', () => {
      const cls = new ClassBuilder().shadow('lg').flex().p(4).bg('white').text('blue-500').toString();
      const result = translateClasses(cls);
      expectIncludesInOrder(result, [...CATEGORY_ORDER]);
    });
  });

  describe('grouping with emojis', () => {
    beforeEach(() => {
      setPlainwindConfig({ groupByCategory: true, showCategoryEmojis: true });
    });

    it('should show emojis when enabled', () => {
      const cls = new ClassBuilder().flex().p(4).toString();
      const result = translateClasses(cls);
      expect(result).toMatch(/[^\x00-\x7F]/);
    });
  });

  describe('no grouping', () => {
    beforeEach(() => {
      setPlainwindConfig({ groupByCategory: false });
    });

    it('should not group when disabled', () => {
      const cls = new ClassBuilder().flex().p(4).text('blue-500').toString();
      const result = translateClasses(cls);
      expect(result).not.toContain('Flexbox & Grid:');
      expect(result).not.toContain('Spacing:');
      expect(result).not.toContain('Colors:');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string', () => {
      const result = translateClasses('');
      expect(result).toBe('');
    });

    it('should handle single class', () => {
      const cls = new ClassBuilder().flex().toString();
      const result = translateClasses(cls);
      expect(result).toContain('flexbox');
    });

    it('should handle multiple spaces', () => {
      const cls = new ClassBuilder().flex().itemsCenter().gap(4).toString();
      const result = translateClasses(cls.replace(/ /g, '    '));
      expectIncludesAll(result, ['flex', 'center', 'gap']);
    });

    it('should handle unknown classes', () => {
      const result = translateClasses('unknown-class');
      expect(result).toContain('unknown-class');
    });

    it('should handle mix of known and unknown classes', () => {
      const cls = new ClassBuilder().flex().raw('unknown-class').p(4).toString();
      const result = translateClasses(cls);
      expectIncludesAll(result, ['flexbox', 'unknown-class', 'padding']);
    });

    it('should handle very long class strings', () => {
      const longString = Array(50).fill('p-4').join(' ');
      const result = translateClasses(longString);
      expect(result).toContain('padding');
    });
  });

  describe('full modifier chains (order-of-operations)', () => {
    it.each(FULL_MODIFIER_CHAIN_CASES)('correctly processes %s', (cls, expectedParts) => {
      const result = translateClasses(cls);
      expectedParts.forEach(part => {
        expect(result).toContain(part);
      });
    });
  });

  describe('error recovery - graceful degradation', () => {
    it.each(GRACEFUL_DEGRADATION_CASES)('handles malformed input: %s', (input, shouldNotError) => {
      expect(() => {
        const result = translateClasses(input);
        expect(typeof result).toBe('string');
      }).not.toThrow();
    });

    it.each(MALFORMED_MODIFIER_CASES)('processes malformed modifier %s as-is', (input, expected) => {
      const result = translateClasses(input);
      expect(result).toContain(expected);
    });
  });

  describe('real-world complex combinations', () => {
    it.each(REAL_WORLD_COMPLEX_CASES)('correctly translates %s', (cls, expectedParts) => {
      const result = translateClasses(cls);
      expectedParts.forEach(part => {
        expect(result).toContain(part);
      });
    });
  });

  describe('performance - scalability', () => {
    it('should handle very long class strings efficiently', () => {
      const startTime = performance.now();
      const result = translateClasses(PERFORMANCE_CASES.longClassString);
      const duration = performance.now() - startTime;
      
      expect(result).toContain('padding');
      expect(duration).toBeLessThan(100); // Should complete in < 100ms
    });

    it('should handle deeply nested variants', () => {
      const result = translateClasses(PERFORMANCE_CASES.deeplyNestedVariants);
      expect(result).toContain('padding');
      expect(result).toContain('small screens');
    });

    it('should handle long arbitrary values', () => {
      const result = translateClasses(PERFORMANCE_CASES.longArbitraryValue);
      expect(result).toContain('width');
      expect(result).toContain('calc');
    });

    it('should handle many classes efficiently', () => {
      const startTime = performance.now();
      const result = translateClasses(PERFORMANCE_CASES.manyClasses);
      const duration = performance.now() - startTime;
      
      expect(result).toContain('flex');
      expect(duration).toBeLessThan(200); // Should complete in < 200ms
    });
  });
});


