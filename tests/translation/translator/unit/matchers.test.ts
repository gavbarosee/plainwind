import { describe, it, expect } from 'vitest';
import { translateBaseClass, applyOpacity, isCustomCSSVariable, isArbitraryProperty, describeArbitraryProperty } from '@src/translation/translator/matchers';
import { 
  TRANSLATE_STATIC_CASES,
  IS_CSS_VARIABLE_CASES,
  TRANSLATE_CSS_VARIABLE_CASES,
  IS_ARBITRARY_PROPERTY_CASES,
  DESCRIBE_ARBITRARY_PROPERTY_CASES,
  TRANSLATE_ARBITRARY_PROPERTY_CASES,
  MATCHER_SPACING_CASES,
  MATCHER_SIZING_CASES,
  MATCHER_COLOR_SCALE_CASES,
  MATCHER_BORDER_CASES,
  MATCHER_TYPOGRAPHY_CASES,
  MATCHER_GRID_CASES,
  MATCHER_TRANSFORM_CASES,
  MATCHER_OPACITY_CASES,
  MATCHER_SHADOW_CASES,
  MATCHER_ARBITRARY_WIDTH_CASES,
  MATCHER_ARBITRARY_SPACING_CASES,
  MATCHER_ARBITRARY_COLOR_CASES,
  MATCHER_CSS_VAR_CASES,
  MATCHER_CQ_UNITS_CASES,
  MATCHER_VIEWPORT_UNITS_CASES,
  MATCHER_UNKNOWN_CASES,
  APPLY_OPACITY_CASES,
  APPLY_OPACITY_COMPLEX_CASES
} from '@tests/_support/cases';

describe('translateBaseClass', () => {
  describe('static mappings', () => {
    it.each(TRANSLATE_STATIC_CASES)('translates %s -> %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toBe(expected);
    });
  });

  describe('arbitrary CSS variables', () => {
    it.each(IS_CSS_VARIABLE_CASES)('%s is CSS variable: %s', (cls, expected) => {
      expect(isCustomCSSVariable(cls)).toBe(expected);
    });

    it.each(TRANSLATE_CSS_VARIABLE_CASES)('translates %s -> %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toBe(expected);
    });
  });

  describe('arbitrary CSS properties', () => {
    it.each(IS_ARBITRARY_PROPERTY_CASES)('%s is arbitrary property: %s', (cls, expected) => {
      expect(isArbitraryProperty(cls)).toBe(expected);
    });

    it.each(DESCRIBE_ARBITRARY_PROPERTY_CASES)('describes %s -> %s', (cls, expected) => {
      expect(describeArbitraryProperty(cls)).toBe(expected);
    });

    it.each(TRANSLATE_ARBITRARY_PROPERTY_CASES)('translates %s -> %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toBe(expected);
    });
  });

  describe('pattern matching', () => {
    it.each(MATCHER_SPACING_CASES)('spacing: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });

    it('should match min-h-0 exactly', () => {
      expect(translateBaseClass('min-h-0')).toBe('no minimum height');
    });

    it.each(MATCHER_SIZING_CASES)('sizing: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });

    it.each(MATCHER_COLOR_SCALE_CASES)('color scale: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });

    it.each(MATCHER_BORDER_CASES)('border: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it('should match font-bold exactly', () => {
      expect(translateBaseClass('font-bold')).toBe('bold weight');
    });

    it.each(MATCHER_TYPOGRAPHY_CASES)('typography: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });

    it.each(MATCHER_GRID_CASES)('grid: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it.each(MATCHER_TRANSFORM_CASES)('transform: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });

    it.each(MATCHER_OPACITY_CASES)('opacity: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it.each(MATCHER_SHADOW_CASES)('shadow: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });
  });

  describe('arbitrary values', () => {
    it.each(MATCHER_ARBITRARY_WIDTH_CASES)('width: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it.each(MATCHER_ARBITRARY_SPACING_CASES)('spacing: %s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });

    it.each(MATCHER_ARBITRARY_COLOR_CASES)('color: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it.each(MATCHER_CSS_VAR_CASES)('CSS var: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it.each(MATCHER_CQ_UNITS_CASES)('container query: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });

    it.each(MATCHER_VIEWPORT_UNITS_CASES)('viewport: %s -> %s (%s)', (cls, expected, type) => {
      if (type === 'exact') {
        expect(translateBaseClass(cls)).toBe(expected);
      } else {
        expect(translateBaseClass(cls)).toContain(expected);
      }
    });
  });

  describe('unknown classes', () => {
    it.each(MATCHER_UNKNOWN_CASES)('%s contains %s', (cls, expected) => {
      expect(translateBaseClass(cls)).toContain(expected);
    });
  });
});

describe('applyOpacity', () => {
  it.each(APPLY_OPACITY_CASES)('%s + %s% -> %s', (text, percent, expected) => {
    expect(applyOpacity(text, percent)).toBe(expected);
  });

  it('should not apply opacity when null', () => {
    expect(applyOpacity('white background', null)).toBe('white background');
    expect(applyOpacity('blue text', null)).toBe('blue text');
  });

  it.each(APPLY_OPACITY_COMPLEX_CASES)('complex: %s + %s% -> %s', (text, percent, expected) => {
    expect(applyOpacity(text, percent)).toBe(expected);
  });
});


