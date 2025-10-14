/**
 * Tests for pattern matching and translation logic
 */

import { describe, it, expect } from 'vitest';
import {
  translateBaseClass,
  applyOpacity,
  isCustomCSSVariable,
  isArbitraryProperty,
  describeArbitraryProperty,
} from '../../matchers';

describe('translateBaseClass', () => {
  describe('static mappings', () => {
    it('should translate flex utilities', () => {
      expect(translateBaseClass('flex')).toBe('flexbox container');
      expect(translateBaseClass('flex-row')).toBe('horizontal layout');
      expect(translateBaseClass('flex-col')).toBe('vertical layout');
    });

    it('should translate spacing utilities', () => {
      expect(translateBaseClass('p-4')).toBe('padding 1rem');
      expect(translateBaseClass('m-2')).toBe('margin 0.5rem');
      expect(translateBaseClass('px-4')).toBe('horizontal padding 1rem');
      expect(translateBaseClass('my-2')).toBe('vertical margin 0.5rem');
    });

    it('should translate color utilities', () => {
      expect(translateBaseClass('bg-white')).toBe('white background');
      expect(translateBaseClass('text-blue-500')).toBe('blue text');
      expect(translateBaseClass('bg-transparent')).toBe(
        'transparent background'
      );
    });

    it('should translate layout utilities', () => {
      expect(translateBaseClass('block')).toBe('display as block');
      expect(translateBaseClass('inline')).toBe('display inline');
      expect(translateBaseClass('hidden')).toBe('not visible');
    });
  });

  describe('arbitrary CSS variables', () => {
    it('should detect custom CSS variables', () => {
      expect(isCustomCSSVariable('[--my-var:10px]')).toBe(true);
      expect(isCustomCSSVariable('[--scroll-offset:56px]')).toBe(true);
    });

    it('should not detect regular arbitrary values as CSS variables', () => {
      expect(isCustomCSSVariable('[10px]')).toBe(false);
      expect(isCustomCSSVariable('[mask-type:luminance]')).toBe(false);
    });

    it('should translate CSS variables', () => {
      expect(translateBaseClass('[--my-var:10px]')).toBe(
        'CSS variable --my-var: 10px'
      );
      expect(translateBaseClass('[--theme-color:blue]')).toBe(
        'CSS variable --theme-color: blue'
      );
    });
  });

  describe('arbitrary CSS properties', () => {
    it('should detect arbitrary CSS properties', () => {
      expect(isArbitraryProperty('[mask-type:luminance]')).toBe(true);
      expect(isArbitraryProperty('[clip-path:circle(50%)]')).toBe(true);
    });

    it('should not detect CSS variables as arbitrary properties', () => {
      expect(isArbitraryProperty('[--my-var:value]')).toBe(false);
    });

    it('should describe arbitrary properties', () => {
      expect(describeArbitraryProperty('[mask-type:luminance]')).toBe(
        'mask-type: luminance'
      );
      expect(describeArbitraryProperty('[clip-path:circle(50%)]')).toBe(
        'clip-path: circle(50%)'
      );
    });

    it('should translate arbitrary CSS properties', () => {
      expect(translateBaseClass('[mask-type:luminance]')).toBe(
        'CSS property mask-type: luminance'
      );
      expect(translateBaseClass('[clip-path:circle(50%)]')).toBe(
        'CSS property clip-path: circle(50%)'
      );
    });
  });

  describe('pattern matching', () => {
    it('should match spacing patterns', () => {
      expect(translateBaseClass('p-12')).toContain('padding');
      expect(translateBaseClass('m-0')).toContain('margin');
      expect(translateBaseClass('pt-6')).toContain('top padding');
      expect(translateBaseClass('ml-auto')).toContain('left margin');
    });

    it('should match sizing patterns', () => {
      expect(translateBaseClass('w-full')).toContain('width');
      expect(translateBaseClass('h-screen')).toContain('height');
      expect(translateBaseClass('max-w-xl')).toContain('max width');
      expect(translateBaseClass('min-h-0')).toBe('no minimum height'); // Exact translation
    });

    it('should match color patterns with numeric scales', () => {
      expect(translateBaseClass('bg-gray-100')).toContain('gray');
      expect(translateBaseClass('text-red-500')).toContain('red');
      expect(translateBaseClass('border-blue-700')).toContain('blue');
    });

    it('should match border patterns', () => {
      expect(translateBaseClass('border')).toBe('has border');
      expect(translateBaseClass('border-2')).toContain('border');
      expect(translateBaseClass('rounded-lg')).toContain('corner');
    });

    it('should match typography patterns', () => {
      expect(translateBaseClass('text-xl')).toContain('text');
      expect(translateBaseClass('font-bold')).toBe('bold weight'); // Exact translation
      expect(translateBaseClass('leading-tight')).toContain('line');
    });

    it('should match grid patterns', () => {
      expect(translateBaseClass('grid-cols-3')).toBe('three columns');
      expect(translateBaseClass('grid-rows-2')).toBe('two rows');
      expect(translateBaseClass('col-span-2')).toContain('span');
    });

    it('should match transform patterns', () => {
      expect(translateBaseClass('rotate-45')).toContain('rotate');
      expect(translateBaseClass('scale-150')).toContain('scale');
      expect(translateBaseClass('translate-x-4')).toContain('translate');
    });

    it('should match opacity patterns', () => {
      expect(translateBaseClass('opacity-50')).toContain('opacity');
      expect(translateBaseClass('opacity-0')).toBe('invisible'); // opacity-0 translates to "invisible"
    });

    it('should match shadow patterns', () => {
      expect(translateBaseClass('shadow')).toContain('shadow');
      expect(translateBaseClass('shadow-lg')).toContain('shadow');
      expect(translateBaseClass('shadow-none')).toContain('shadow');
    });
  });

  describe('arbitrary values', () => {
    it('should translate arbitrary width values', () => {
      expect(translateBaseClass('w-[100px]')).toBe('width 100px');
      expect(translateBaseClass('w-[50%]')).toBe('width 50%');
      expect(translateBaseClass('w-[calc(100%-2rem)]')).toBe(
        'width calc(100%-2rem)'
      );
    });

    it('should translate arbitrary padding/margin', () => {
      expect(translateBaseClass('p-[10px]')).toBe('padding 10px');
      expect(translateBaseClass('m-[2rem]')).toBe('margin 2rem');
      expect(translateBaseClass('mt-[5px]')).toContain('top');
    });

    it('should translate arbitrary colors', () => {
      expect(translateBaseClass('bg-[#fff]')).toBe('background color #fff');
      expect(translateBaseClass('text-[rgb(0,0,0)]')).toBe(
        'text color rgb(0,0,0)'
      );
      expect(translateBaseClass('text-[oklch(0.5_0.2_180)]')).toBe(
        'text color oklch(0.5_0.2_180)'
      );
    });

    it('should handle CSS variables in arbitrary values', () => {
      expect(translateBaseClass('bg-[var(--primary)]')).toBe(
        'background var(--primary)'
      );
      expect(translateBaseClass('text-[color(--custom)]')).toBe(
        'text color color(--custom)'
      );
    });

    it('should handle container query units', () => {
      expect(translateBaseClass('w-[50cqw]')).toBe('width 50cqw');
      expect(translateBaseClass('h-[100cqh]')).toBe('height 100cqh');
    });

    it('should handle viewport units', () => {
      expect(translateBaseClass('h-[100svh]')).toBe('height 100svh');
      expect(translateBaseClass('w-[100dvw]')).toBe('width 100dvw');
    });
  });

  describe('unknown classes', () => {
    it('should return original class name for unknown classes', () => {
      expect(translateBaseClass('unknown-class')).toBe('unknown-class');
      expect(translateBaseClass('custom-utility')).toBe('custom-utility');
      // my-123-class matches margin pattern (my- prefix), so it gets translated
      expect(translateBaseClass('my-123-class')).toContain('margin');
    });
  });
});

describe('applyOpacity', () => {
  it('should apply opacity modifier', () => {
    expect(applyOpacity('white background', '50')).toBe(
      'white background with 50% opacity'
    );
  });

  it('should apply opacity for different values', () => {
    expect(applyOpacity('blue text', '75')).toBe('blue text with 75% opacity');
    expect(applyOpacity('red background', '10')).toBe(
      'red background with 10% opacity'
    );
  });

  it('should handle 0% opacity', () => {
    expect(applyOpacity('black background', '0')).toBe(
      'black background with 0% opacity'
    );
  });

  it('should handle 100% opacity', () => {
    expect(applyOpacity('green background', '100')).toBe(
      'green background with 100% opacity'
    );
  });

  it('should not apply opacity when null', () => {
    expect(applyOpacity('white background', null)).toBe('white background');
    expect(applyOpacity('blue text', null)).toBe('blue text');
  });

  it('should work with complex translations', () => {
    expect(applyOpacity('horizontal padding 1rem on hover', '80')).toBe(
      'horizontal padding 1rem on hover with 80% opacity'
    );
  });
});
