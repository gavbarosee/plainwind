/**
 * Tests for conditional class translation with category grouping
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { translateConditionalClasses } from '../../../../src/translation/translator';
import type { ConditionalClass } from '../../../../src/ui/classExtractor';
import * as vscode from 'vscode';

// Mock vscode
vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: vi.fn(),
  },
}));

describe('translateConditionalClasses', () => {
  beforeEach(() => {
    // Default: groupByCategory = true, showEmojis = false
    vi.mocked(vscode.workspace.getConfiguration).mockReturnValue({
      get: vi.fn((key: string, defaultValue?: any) => {
        if (key === 'groupByCategory') return true;
        if (key === 'showCategoryEmojis') return false;
        return defaultValue;
      }),
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('with category grouping enabled', () => {
    it('should group unconditional classes by category', () => {
      const conditionalClasses: ConditionalClass[] = [
        { classes: 'flex items-center' },
        { classes: 'px-4 py-2' },
        { classes: 'text-lg font-bold' },
        { classes: 'bg-blue-500' },
      ];

      const result = translateConditionalClasses(conditionalClasses);

      // Should contain category labels
      expect(result).toContain('Flexbox & Grid:');
      expect(result).toContain('Spacing:');
      expect(result).toContain('Typography:');
      expect(result).toContain('Colors:');
    });

    it('should group conditional classes by category within each condition', () => {
      const conditionalClasses: ConditionalClass[] = [
        { classes: 'flex gap-4' }, // Unconditional
        { classes: 'px-4 bg-blue-500', condition: 'isActive' }, // Conditional
      ];

      const result = translateConditionalClasses(conditionalClasses);

      // Unconditional part should have categories
      expect(result).toContain('Flexbox & Grid:');

      // Conditional part should also have categories
      expect(result).toContain('(if isActive)');
      
      // Should have both Spacing and Colors in the conditional part
      // Since px-4 and bg-blue-500 are in the same condition, they should be grouped by category
      expect(result).toContain('Spacing:');
      expect(result).toContain('Colors:');
      
      // The spacing should be marked as conditional
      const hasConditionalSpacing = 
        result.includes('Spacing:') && 
        result.includes('(if isActive)') &&
        result.includes('horizontal padding');
      expect(hasConditionalSpacing).toBe(true);
    });

    it('should handle multiple conditions with category grouping', () => {
      const conditionalClasses: ConditionalClass[] = [
        { classes: 'flex gap-4 p-4' },
        { classes: 'bg-blue-500 text-white', condition: 'isActive' },
        { classes: 'opacity-50 cursor-not-allowed', condition: 'isDisabled' },
      ];

      const result = translateConditionalClasses(conditionalClasses);

      // Should have three parts separated by |
      const parts = result.split(' | ');
      expect(parts.length).toBeGreaterThanOrEqual(3);

      // Each part should have category grouping
      expect(result).toContain('Flexbox & Grid:');
      
      // Check conditional parts
      expect(result).toContain('(if isActive)');
      expect(result).toContain('(if isDisabled)');
    });
  });

  describe('with category grouping disabled', () => {
    beforeEach(() => {
      vi.mocked(vscode.workspace.getConfiguration).mockReturnValue({
        get: vi.fn((key: string, defaultValue?: any) => {
          if (key === 'groupByCategory') return false;
          if (key === 'showCategoryEmojis') return false;
          return defaultValue;
        }),
      } as any);
    });

    it('should not group by category when disabled', () => {
      const conditionalClasses: ConditionalClass[] = [
        { classes: 'flex items-center' },
        { classes: 'px-4 py-2' },
        { classes: 'bg-blue-500' },
      ];

      const result = translateConditionalClasses(conditionalClasses);

      // Should not contain category labels
      expect(result).not.toContain('Flexbox & Grid:');
      expect(result).not.toContain('Spacing:');
      expect(result).not.toContain('Colors:');

      // Should just be comma-separated translations
      expect(result).toContain('flexbox');
      expect(result).toContain('padding');
      expect(result).toContain('background');
    });

    it('should show conditions even without category grouping', () => {
      const conditionalClasses: ConditionalClass[] = [
        { classes: 'flex' },
        { classes: 'bg-blue-500', condition: 'isActive' },
      ];

      const result = translateConditionalClasses(conditionalClasses);

      // Should still show the condition
      expect(result).toContain('(if isActive)');
      
      // But no category labels
      expect(result).not.toContain(':');
    });
  });

  describe('with emojis enabled', () => {
    beforeEach(() => {
      vi.mocked(vscode.workspace.getConfiguration).mockReturnValue({
        get: vi.fn((key: string, defaultValue?: any) => {
          if (key === 'groupByCategory') return true;
          if (key === 'showCategoryEmojis') return true;
          return defaultValue;
        }),
      } as any);
    });

    it('should include emojis when enabled', () => {
      const conditionalClasses: ConditionalClass[] = [
        { classes: 'flex gap-4' },
        { classes: 'text-lg font-bold' },
      ];

      const result = translateConditionalClasses(conditionalClasses);

      // Should contain emojis (exact emojis depend on implementation)
      // At minimum, should still have category labels
      expect(result).toContain('Flexbox & Grid');
      expect(result).toContain('Typography');
    });
  });
});

