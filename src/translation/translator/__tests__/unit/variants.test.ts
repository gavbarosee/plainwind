/**
 * Tests for variant descriptions and application logic
 */

import { describe, it, expect } from 'vitest';
import {
  applyVariants,
  describeArbitraryVariant,
  VARIANT_DESCRIPTIONS,
} from '../../variants';

describe('VARIANT_DESCRIPTIONS', () => {
  it('should have descriptions for common interaction variants', () => {
    expect(VARIANT_DESCRIPTIONS.hover).toBe('on hover');
    expect(VARIANT_DESCRIPTIONS.focus).toBe('on focus');
    expect(VARIANT_DESCRIPTIONS.active).toBe('when active');
    expect(VARIANT_DESCRIPTIONS.disabled).toBe('when disabled');
  });

  it('should have descriptions for responsive variants', () => {
    expect(VARIANT_DESCRIPTIONS.sm).toContain('small screens');
    expect(VARIANT_DESCRIPTIONS.md).toContain('medium screens');
    expect(VARIANT_DESCRIPTIONS.lg).toContain('large screens');
    expect(VARIANT_DESCRIPTIONS.xl).toContain('extra large screens');
  });

  it('should have descriptions for dark mode variants', () => {
    expect(VARIANT_DESCRIPTIONS.dark).toBe('in dark mode');
    expect(VARIANT_DESCRIPTIONS['not-dark']).toBe('in light mode');
  });

  it('should have descriptions for pseudo-elements', () => {
    expect(VARIANT_DESCRIPTIONS.before).toBe('before pseudo-element');
    expect(VARIANT_DESCRIPTIONS.after).toBe('after pseudo-element');
    expect(VARIANT_DESCRIPTIONS.placeholder).toBe('placeholder');
  });

  it('should have descriptions for group variants', () => {
    expect(VARIANT_DESCRIPTIONS['group-hover']).toBe('when group hovered');
    expect(VARIANT_DESCRIPTIONS['group-focus']).toBe('when group focused');
  });

  it('should have descriptions for peer variants', () => {
    expect(VARIANT_DESCRIPTIONS['peer-hover']).toBe('when peer hovered');
    expect(VARIANT_DESCRIPTIONS['peer-focus']).toBe('when peer focused');
  });
});

describe('applyVariants', () => {
  it('should apply single variant', () => {
    expect(applyVariants('white background', ['hover'])).toBe(
      'white background on hover'
    );
  });

  it('should apply multiple variants', () => {
    expect(applyVariants('blue text', ['md', 'hover'])).toBe(
      'blue text on medium screens (≥768px), on hover'
    );
  });

  it('should handle no variants', () => {
    expect(applyVariants('flexbox', [])).toBe('flexbox');
  });

  it('should apply dark mode variant', () => {
    expect(applyVariants('black background', ['dark'])).toBe(
      'black background in dark mode'
    );
  });

  it('should apply group and peer variants together', () => {
    expect(applyVariants('visible', ['group-hover', 'peer-focus'])).toBe(
      'visible when group hovered, when peer focused'
    );
  });

  it('should apply responsive with state variants', () => {
    expect(applyVariants('padding 1rem', ['lg', 'hover', 'focus'])).toBe(
      'padding 1rem on large screens (≥1024px), on hover, on focus'
    );
  });

  it('should apply pseudo-element variants', () => {
    expect(applyVariants('content "→"', ['after'])).toBe(
      'content "→" after pseudo-element'
    );
  });

  it('should handle form state variants', () => {
    expect(applyVariants('red border', ['invalid', 'required'])).toBe(
      'red border when invalid, when required'
    );
  });

  it('should handle structural pseudo-classes', () => {
    expect(applyVariants('bold font', ['first', 'last'])).toBe(
      'bold font on first child, on last child'
    );
  });
});

describe('describeArbitraryVariant', () => {
  describe('has-[...] variants', () => {
    it('should describe has selector variant', () => {
      expect(describeArbitraryVariant('has-[>img]')).toBe('when has >img');
      expect(describeArbitraryVariant('has-[:checked]')).toBe(
        'when has :checked'
      );
    });

    it('should describe group-has variant', () => {
      expect(describeArbitraryVariant('group-has-[>img]')).toBe(
        'when group has >img'
      );
    });

    it('should describe peer-has variant', () => {
      expect(describeArbitraryVariant('peer-has-[:checked]')).toBe(
        'when peer has :checked'
      );
    });
  });

  describe('data-[...] variants', () => {
    it('should describe data attribute variant', () => {
      expect(describeArbitraryVariant('data-[state=open]')).toBe(
        'when data-state=open'
      );
      expect(describeArbitraryVariant('data-[disabled]')).toBe(
        'when data-disabled'
      );
    });

    it('should describe group-data variant', () => {
      expect(describeArbitraryVariant('group-data-[state=active]')).toBe(
        'when group data-state=active'
      );
    });

    it('should describe peer-data variant', () => {
      expect(describeArbitraryVariant('peer-data-[checked]')).toBe(
        'when peer data-checked'
      );
    });
  });

  describe('aria-[...] variants', () => {
    it('should describe aria attribute variant', () => {
      expect(describeArbitraryVariant('aria-[expanded=true]')).toBe(
        'when aria-expanded=true'
      );
      expect(describeArbitraryVariant('aria-[hidden]')).toBe(
        'when aria-hidden'
      );
    });

    it('should describe group-aria variant', () => {
      expect(describeArbitraryVariant('group-aria-[selected=true]')).toBe(
        'when group aria-selected=true'
      );
    });

    it('should describe peer-aria variant', () => {
      expect(describeArbitraryVariant('peer-aria-[pressed]')).toBe(
        'when peer aria-pressed'
      );
    });
  });

  describe('nth-[...] variants', () => {
    it('should describe nth-child variant', () => {
      expect(describeArbitraryVariant('nth-[3]')).toBe('nth-child(3)');
      expect(describeArbitraryVariant('nth-[2n+1]')).toBe('nth-child(2n+1)');
    });

    it('should describe nth-last variant', () => {
      expect(describeArbitraryVariant('nth-last-[2]')).toBe(
        'nth-last-child(2)'
      );
    });

    it('should describe nth-of-type variant', () => {
      expect(describeArbitraryVariant('nth-of-type-[3]')).toBe(
        'nth-of-type(3)'
      );
    });

    it('should describe nth-last-of-type variant', () => {
      expect(describeArbitraryVariant('nth-last-of-type-[1]')).toBe(
        'nth-last-of-type(1)'
      );
    });
  });

  describe('not-[...] and in-[...] variants', () => {
    it('should describe not selector variant', () => {
      expect(describeArbitraryVariant('not-[:first-child]')).toBe(
        'when not :first-child'
      );
      expect(describeArbitraryVariant('not-[.active]')).toBe(
        'when not .active'
      );
    });

    it('should describe in selector variant', () => {
      expect(describeArbitraryVariant('in-[:hover]')).toBe('when in :hover');
    });
  });

  describe('supports-[...] variants', () => {
    it('should describe supports feature query', () => {
      expect(describeArbitraryVariant('supports-[display:grid]')).toBe(
        'when supports display:grid'
      );
      expect(
        describeArbitraryVariant('supports-[(backdrop-filter:blur(1px))]')
      ).toBe('when supports (backdrop-filter:blur(1px))');
    });

    it('should describe not-supports variant', () => {
      expect(describeArbitraryVariant('not-supports-[display:grid]')).toBe(
        'when not supports display:grid'
      );
    });
  });

  describe('responsive variants with arbitrary values', () => {
    it('should describe min-width breakpoint', () => {
      expect(describeArbitraryVariant('min-[768px]')).toBe('on screens ≥768px');
      expect(describeArbitraryVariant('min-[1200px]')).toBe(
        'on screens ≥1200px'
      );
    });

    it('should describe max-width breakpoint', () => {
      expect(describeArbitraryVariant('max-[767px]')).toBe('on screens <767px');
      expect(describeArbitraryVariant('max-[1199px]')).toBe(
        'on screens <1199px'
      );
    });
  });

  describe('container query variants', () => {
    it('should describe min-width container query', () => {
      expect(describeArbitraryVariant('@min-[400px]')).toBe(
        'in container ≥400px'
      );
    });

    it('should describe max-width container query', () => {
      expect(describeArbitraryVariant('@max-[800px]')).toBe(
        'in container <800px'
      );
    });
  });

  describe('named groups and peers', () => {
    it('should describe named group', () => {
      expect(describeArbitraryVariant('group/sidebar')).toBe(
        'when group "sidebar"'
      );
      expect(describeArbitraryVariant('group/main')).toBe('when group "main"');
    });

    it('should describe named peer', () => {
      expect(describeArbitraryVariant('peer/input')).toBe('when peer "input"');
      expect(describeArbitraryVariant('peer/checkbox')).toBe(
        'when peer "checkbox"'
      );
    });

    it('should describe named container', () => {
      expect(describeArbitraryVariant('@container/main')).toBe(
        'container "main"'
      );
    });

    it('should describe named container query', () => {
      expect(describeArbitraryVariant('@sm/sidebar')).toBe(
        'in small (≥384px) container "sidebar"'
      );
      expect(describeArbitraryVariant('@lg/main')).toBe(
        'in large (≥512px) container "main"'
      );
    });

    it('should describe named container max-width query', () => {
      expect(describeArbitraryVariant('@max-sm/sidebar')).toBe(
        'in max-sm container "sidebar"'
      );
    });
  });

  describe('fallback behavior', () => {
    it('should fallback for unknown group-* variants', () => {
      expect(describeArbitraryVariant('group-custom-state')).toBe(
        'when group custom-state'
      );
    });

    it('should fallback for unknown peer-* variants', () => {
      expect(describeArbitraryVariant('peer-custom-state')).toBe(
        'when peer custom-state'
      );
    });

    it('should return variant as-is for completely unknown patterns', () => {
      expect(describeArbitraryVariant('unknown-variant')).toBe(
        'unknown-variant'
      );
    });
  });
});
