/**
 * Tests for variant description and application
 * 
 * Tests the translation of Tailwind variants (pseudo-classes, responsive breakpoints,
 * dark mode, group/peer states, etc.) to human-readable descriptions and their
 * application to base translations.
 * 
 * @see src/core/translation/engine/variants.ts
 */

import { describe, it, expect } from 'vitest';
import { applyVariants, describeArbitraryVariant, VARIANT_DESCRIPTIONS } from '@src/core/translation/engine/variants';
import { 
  VARIANT_INTERACTION_CASES, 
  VARIANT_RESPONSIVE_CASES, 
  VARIANT_DARK_MODE_CASES, 
  VARIANT_PSEUDO_ELEMENT_CASES, 
  VARIANT_GROUP_CASES, 
  VARIANT_PEER_CASES,
  APPLY_VARIANTS_CASES,
  DESCRIBE_ARBITRARY_VARIANT_CASES
} from '@tests/_support/cases';

describe('VARIANT_DESCRIPTIONS', () => {
  it.each(VARIANT_INTERACTION_CASES)('interaction: %s -> %s', (name, key, expected) => {
    expect(VARIANT_DESCRIPTIONS[key]).toBe(expected);
  });

  it.each(VARIANT_RESPONSIVE_CASES)('responsive: %s contains %s', (name, key, expected) => {
    expect(VARIANT_DESCRIPTIONS[key]).toContain(expected);
  });

  it.each(VARIANT_DARK_MODE_CASES)('dark mode: %s -> %s', (name, key, expected) => {
    expect(VARIANT_DESCRIPTIONS[key]).toBe(expected);
  });

  it.each(VARIANT_PSEUDO_ELEMENT_CASES)('pseudo-element: %s -> %s', (name, key, expected) => {
    expect(VARIANT_DESCRIPTIONS[key]).toBe(expected);
  });

  it.each(VARIANT_GROUP_CASES)('group: %s -> %s', (name, key, expected) => {
    expect(VARIANT_DESCRIPTIONS[key]).toBe(expected);
  });

  it.each(VARIANT_PEER_CASES)('peer: %s -> %s', (name, key, expected) => {
    expect(VARIANT_DESCRIPTIONS[key]).toBe(expected);
  });
});

describe('applyVariants', () => {
  it.each(APPLY_VARIANTS_CASES)('applies variants: %s + %s -> %s', (text, variants, expected) => {
    expect(applyVariants(text, variants)).toBe(expected);
  });
});

describe('describeArbitraryVariant', () => {
  it.each(DESCRIBE_ARBITRARY_VARIANT_CASES)('%s -> %s', (variant, expected) => {
    expect(describeArbitraryVariant(variant)).toBe(expected);
  });
});


