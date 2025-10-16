import { describe, it, expect } from 'vitest';
import { categorizeClass, getCategoryOrder, groupTranslationsByCategory } from '@src/core/translation/categorizer';
import { CATEGORIZE_LAYOUT_CASES, CATEGORIZE_FLEX_CASES, CATEGORIZE_GRID_CASES, CATEGORIZE_COLORS_TEXT_CASES, CATEGORIZE_COLORS_BORDER_CASES, CATEGORIZE_COLORS_RING_CASES, CATEGORIZE_BACKGROUNDS_COLOR_CASES, CATEGORIZE_BACKGROUNDS_GRADIENT_CASES, CATEGORIZE_BORDERS_WIDTH_CASES, CATEGORIZE_BORDERS_RADIUS_CASES, CATEGORIZE_BORDERS_STYLE_CASES, CATEGORIZE_TYPOGRAPHY_SIZE_CASES, CATEGORIZE_TYPOGRAPHY_WEIGHT_CASES, CATEGORIZE_TYPOGRAPHY_ALIGN_CASES, CATEGORIZE_TYPOGRAPHY_LINE_CASES, CATEGORIZE_TRANSFORMS_CASES, CATEGORIZE_TRANSITIONS_CASES, CATEGORIZE_ANIMATION_CASES, CATEGORIZE_EFFECTS_SHADOW_CASES, CATEGORIZE_EFFECTS_OPACITY_CASES, CATEGORIZE_SPACING_PADDING_CASES, CATEGORIZE_SPACING_MARGIN_CASES, CATEGORIZE_SPACING_SPACE_BETWEEN_CASES, CATEGORIZE_SIZING_WIDTH_CASES, CATEGORIZE_SIZING_HEIGHT_CASES, CATEGORIZE_SIZING_SIZE_CASES, CATEGORIZE_VARIANTS_STRIP_CASES, CATEGORIZE_VARIANTS_MULTIPLE_CASES, CATEGORIZE_UNKNOWN_CASES, CATEGORY_NAMES, GROUP_BY_CATEGORY_BASIC_CASE, GROUP_SAME_CATEGORY_CASE, GROUP_WITH_VARIANTS_CASE, GROUP_EMOJI_CASE, GROUP_NO_EMOJI_CASE, GROUP_CATEGORY_ORDER_CASE } from '@tests/_support/cases';

describe('categorizeClass', () => {
  describe('Layout', () => {
    it.each(CATEGORIZE_LAYOUT_CASES)('categorizes %s as %s', (cls, expected) => {
      expect(categorizeClass(cls)).toBe(expected);
    });
  });

  describe('Flexbox & Grid', () => {
    it.each(CATEGORIZE_FLEX_CASES)('categorizes %s as Flexbox & Grid', (cls, expected) => {
      expect(categorizeClass(cls)).toBe(expected);
    });

    it.each(CATEGORIZE_GRID_CASES)('categorizes %s as Flexbox & Grid (grid utilities)', (cls, expected) => {
      expect(categorizeClass(cls)).toBe(expected);
    });
  });

  describe('Spacing', () => {
    it.each(CATEGORIZE_SPACING_PADDING_CASES)('padding: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_SPACING_MARGIN_CASES)('margin: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_SPACING_SPACE_BETWEEN_CASES)('space-between: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Sizing', () => {
    it.each(CATEGORIZE_SIZING_WIDTH_CASES)('width: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_SIZING_HEIGHT_CASES)('height: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_SIZING_SIZE_CASES)('size: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Colors', () => {
    it.each(CATEGORIZE_COLORS_TEXT_CASES)('text: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_COLORS_BORDER_CASES)('border: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_COLORS_RING_CASES)('ring: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Backgrounds', () => {
    it.each(CATEGORIZE_BACKGROUNDS_COLOR_CASES)('color: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_BACKGROUNDS_GRADIENT_CASES)('gradient: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Borders', () => {
    it.each(CATEGORIZE_BORDERS_WIDTH_CASES)('width: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_BORDERS_RADIUS_CASES)('radius: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_BORDERS_STYLE_CASES)('style: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Typography', () => {
    it.each(CATEGORIZE_TYPOGRAPHY_SIZE_CASES)('size: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_TYPOGRAPHY_WEIGHT_CASES)('weight: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_TYPOGRAPHY_ALIGN_CASES)('align: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_TYPOGRAPHY_LINE_CASES)('line: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Transforms', () => {
    it.each(CATEGORIZE_TRANSFORMS_CASES)('%s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Transitions & Animation', () => {
    it.each(CATEGORIZE_TRANSITIONS_CASES)('transition: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_ANIMATION_CASES)('animation: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Variants', () => {
    it.each(CATEGORIZE_VARIANTS_STRIP_CASES)('strip: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
    it.each(CATEGORIZE_VARIANTS_MULTIPLE_CASES)('multiple: %s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });

  describe('Unknown classes', () => {
    it.each(CATEGORIZE_UNKNOWN_CASES)('%s -> %s', (cls, expected) => { expect(categorizeClass(cls)).toBe(expected); });
  });
});

describe('getCategoryOrder', () => {
  it.each(CATEGORY_NAMES)('should include %s category', (category) => {
    const order = getCategoryOrder();
    expect(order).toContain(category);
  });

  it('should have consistent ordering', () => {
    const order1 = getCategoryOrder();
    const order2 = getCategoryOrder();
    expect(order1).toEqual(order2);
  });
});

describe('groupTranslationsByCategory', () => {
  it('should group translations by category', () => {
    const result = groupTranslationsByCategory(GROUP_BY_CATEGORY_BASIC_CASE.classes, GROUP_BY_CATEGORY_BASIC_CASE.translations, false);
    GROUP_BY_CATEGORY_BASIC_CASE.expected.forEach(exp => expect(result).toContain(exp));
  });

  it('should group multiple classes in same category', () => {
    const result = groupTranslationsByCategory(GROUP_SAME_CATEGORY_CASE.classes, GROUP_SAME_CATEGORY_CASE.translations, false);
    expect(result).toContain(GROUP_SAME_CATEGORY_CASE.expected);
    expect(result).toContain(GROUP_SAME_CATEGORY_CASE.expectedCategory);
  });

  it('should show emojis when requested', () => {
    const result = groupTranslationsByCategory(GROUP_EMOJI_CASE.classes, GROUP_EMOJI_CASE.translations, true);
    expect(result).toMatch(/[^\x00-\x7F]/);
  });

  it('should not show emojis when not requested', () => {
    const result = groupTranslationsByCategory(GROUP_NO_EMOJI_CASE.classes, GROUP_NO_EMOJI_CASE.translations, false);
    expect(result).toBe(GROUP_NO_EMOJI_CASE.expected);
  });

  it('should maintain category order', () => {
    const result = groupTranslationsByCategory(GROUP_CATEGORY_ORDER_CASE.classes, GROUP_CATEGORY_ORDER_CASE.translations, false);
    const flexIndex = result.indexOf('Flexbox & Grid');
    const spacingIndex = result.indexOf('Spacing');
    const typographyIndex = result.indexOf('Typography');
    expect(flexIndex).toBeLessThan(spacingIndex);
    expect(spacingIndex).toBeLessThan(typographyIndex);
  });

  it('should handle empty arrays', () => {
    const result = groupTranslationsByCategory([], [], false);
    expect(result).toBe('');
  });

  it('should handle classes with variants', () => {
    const result = groupTranslationsByCategory(GROUP_WITH_VARIANTS_CASE.classes, GROUP_WITH_VARIANTS_CASE.translations, false);
    GROUP_WITH_VARIANTS_CASE.expectedCategories.forEach(cat => expect(result).toContain(cat));
  });
});


