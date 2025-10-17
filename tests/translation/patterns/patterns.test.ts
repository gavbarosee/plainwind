/**
 * Tests for pattern matching functions
 * 
 * Validates that Tailwind class patterns (spacing, sizing, colors, etc.) 
 * are correctly identified and translated. Tests both positive matches
 * and negative cases (patterns that should not match).
 * 
 * @see src/core/translation/rules/patterns/
 */

import { describe, it, expect } from 'vitest';
import { COLOR_SCALES } from '@tests/_support/fixtures';
import { testPatternMatch, testPatternNoMatch } from '@tests/_support/testUtils';
import {
  SPACING_DIRECTIONAL_CASES,
  MARGIN_DIRECTIONAL_CASES,
  SPACING_AXIS_CASES,
  SPACING_NEGATIVE_CASES,
  GRID_COLS_CASES,
  GRID_ROWS_CASES,
  OPACITY_CASES,
  TRANSFORM_SCALE_CASES,
  TRANSFORM_ROTATE_CASES,
  TRANSFORM_TRANSLATE_CASES,
  SPACING_NUMERIC_PADDING_CASES,
  SPACING_NUMERIC_MARGIN_CASES,
  SPACING_AUTO_CASES,
  SIZING_SIZE_PATTERN_CASES,
  COLOR_TEXT_NUMERIC_CASES,
  COLOR_BG_NUMERIC_CASES,
  COLOR_BORDER_NUMERIC_CASES,
  ARBITRARY_WIDTH_CASES,
  ARBITRARY_HEIGHT_CASES,
  ARBITRARY_SPACING_CASES,
  ARBITRARY_COLOR_CASES,
  GAP_NUMERIC_CASES,
  GAP_AXIS_CASES,
  NON_SPACING_CASES,
  NON_SIZING_CASES,
  NON_COLOR_WITH_SCALE_CASES,
  NON_ARBITRARY_CASES,
  NON_GAP_CASES,
  NON_OPACITY_CASES,
  MALFORMED_ARBITRARY_CASES,
  ARBITRARY_BG_COLOR_CASES,
  ARBITRARY_TEXT_COLOR_CASES,
  SHADOW_NAMED_CASES,
  FONT_SIZE_NAMED_CASES,
  BORDER_RADIUS_NAMED_CASES,
} from '@tests/_support/cases';
import {
  matchSpacingPattern,
  matchSizingPattern,
  matchColorPattern,
  matchArbitraryValue,
  matchFontSizePattern,
  matchBorderRadiusPattern,
  matchGridColumnsPattern,
  matchGridRowsPattern,
  matchGapPattern,
  matchOpacityPattern,
  matchShadowPattern,
  matchBackgroundColorPattern,
  matchTextColorPattern,
} from '@src/core/translation/rules/patterns';

describe('Pattern Matching Tests', () => {
  describe('matchSpacingPattern', () => {
    it.each(SPACING_NUMERIC_PADDING_CASES)('%s -> %s', testPatternMatch(matchSpacingPattern));
    it.each(SPACING_NUMERIC_MARGIN_CASES)('%s -> %s', testPatternMatch(matchSpacingPattern));
    it.each(SPACING_DIRECTIONAL_CASES)('should match %s', testPatternMatch(matchSpacingPattern));
    it.each(MARGIN_DIRECTIONAL_CASES)('should match %s', testPatternMatch(matchSpacingPattern));
    it.each(SPACING_AXIS_CASES)('should match %s', testPatternMatch(matchSpacingPattern));
    it.each(SPACING_AUTO_CASES)('%s -> %s', testPatternMatch(matchSpacingPattern));
    it.each(SPACING_NEGATIVE_CASES)('should match %s', testPatternMatch(matchSpacingPattern));
    it.each(NON_SPACING_CASES)('should not match %s', testPatternNoMatch(matchSpacingPattern));
  });

  describe('matchSizingPattern', () => {
    it.each(SIZING_SIZE_PATTERN_CASES)('%s -> %s', testPatternMatch(matchSizingPattern));
    it.each(NON_SIZING_CASES)('should not match %s', testPatternNoMatch(matchSizingPattern));
  });

  describe('matchColorPattern', () => {
    it.each(COLOR_TEXT_NUMERIC_CASES)('text: %s -> %s', testPatternMatch(matchColorPattern));
    it.each(COLOR_BG_NUMERIC_CASES)('bg: %s -> %s', testPatternMatch(matchColorPattern));
    it.each(COLOR_BORDER_NUMERIC_CASES)('border: %s -> %s', testPatternMatch(matchColorPattern));

    it.each(COLOR_SCALES.map((s) => [`bg-blue-${s}`]))('should handle color scale %s', (cls) => {
      expect(matchColorPattern(cls)).toContain('blue');
    });

    it.each(NON_COLOR_WITH_SCALE_CASES)('should not match %s (no scale)', testPatternNoMatch(matchColorPattern));
  });

  describe('matchArbitraryValue', () => {
    it.each(ARBITRARY_WIDTH_CASES)('%s contains %s and %s', (cls, prop, value) => {
      const result = matchArbitraryValue(cls);
      expect(result).toContain(prop);
      expect(result).toContain(value);
    });

    it.each(ARBITRARY_HEIGHT_CASES)('%s contains %s and %s', (cls, prop, value) => {
      const result = matchArbitraryValue(cls);
      expect(result).toContain(prop);
      expect(result).toContain(value);
    });

    it.each(ARBITRARY_SPACING_CASES)('%s contains %s and %s', (cls, prop, value) => {
      const result = matchArbitraryValue(cls);
      expect(result).toContain(prop);
      expect(result).toContain(value);
    });

    it.each(ARBITRARY_COLOR_CASES)('%s contains %s and %s', (cls, prop, value) => {
      const result = matchArbitraryValue(cls);
      expect(result).toContain(prop);
      expect(result).toContain(value);
    });

    it.each(NON_ARBITRARY_CASES)('should not match %s', testPatternNoMatch(matchArbitraryValue));
  });

  describe('matchFontSizePattern', () => {
    it.each(FONT_SIZE_NAMED_CASES)('should not match %s (static mapping)', testPatternNoMatch(matchFontSizePattern));

    it('should not match non-font-size patterns', () => {
      expect(matchFontSizePattern('text-blue-500')).toBeNull();
      expect(matchFontSizePattern('text-center')).toBeNull();
    });
  });

  describe('matchBorderRadiusPattern', () => {
    it.each(BORDER_RADIUS_NAMED_CASES)('should not match %s (static mapping)', testPatternNoMatch(matchBorderRadiusPattern));
  });

  describe('matchGridColumnsPattern', () => {
    it.each(GRID_COLS_CASES)('matches %s -> contains %s', (cls, expected) => {
      expect(matchGridColumnsPattern(cls)).toContain(expected);
    });

    it('should not match non-grid patterns', () => {
      expect(matchGridColumnsPattern('flex')).toBeNull();
      expect(matchGridColumnsPattern('col-span-2')).toBeNull();
    });
  });

  describe('matchGridRowsPattern', () => {
    it.each(GRID_ROWS_CASES)('matches %s -> contains %s', (cls, expected) => {
      expect(matchGridRowsPattern(cls)).toContain(expected);
    });
  });

  describe('matchGapPattern', () => {
    it.each(GAP_NUMERIC_CASES)('%s -> %s', testPatternMatch(matchGapPattern));
    it.each(GAP_AXIS_CASES)('%s -> %s', testPatternMatch(matchGapPattern));
    it.each(NON_GAP_CASES)('should not match %s', testPatternNoMatch(matchGapPattern));
  });

  describe('matchOpacityPattern', () => {
    it.each(OPACITY_CASES)('matches %s', (cls) => {
      expect(matchOpacityPattern(cls)).toContain('opacity');
    });

    it.each(NON_OPACITY_CASES)('should not match %s', testPatternNoMatch(matchOpacityPattern));
  });

  describe('matchShadowPattern', () => {
    it.each(SHADOW_NAMED_CASES)('should not match %s (static mapping)', testPatternNoMatch(matchShadowPattern));
  });

  describe('matchBackgroundColorPattern', () => {
    it.each(ARBITRARY_BG_COLOR_CASES)('%s contains %s', testPatternMatch(matchBackgroundColorPattern));
  });

  describe('matchTextColorPattern', () => {
    it.each(ARBITRARY_TEXT_COLOR_CASES)('%s contains %s', testPatternMatch(matchTextColorPattern));
  });

  describe('edge cases', () => {
    it('should handle empty strings', () => {
      expect(matchSpacingPattern('')).toBeNull();
      expect(matchSizingPattern('')).toBeNull();
      expect(matchColorPattern('')).toBeNull();
    });

    it.each(MALFORMED_ARBITRARY_CASES)('should handle malformed %s', testPatternNoMatch(matchArbitraryValue));
  });
});


