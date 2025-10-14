/**
 * Tests for parser utilities
 */

import { describe, it, expect } from 'vitest';
import {
  parseNonEmptyClasses,
  extractVariants,
  extractOpacity,
  extractImportant,
  extractPrefix,
} from '../../parser';

describe('parseNonEmptyClasses', () => {
  it('should split class string into individual classes', () => {
    expect(parseNonEmptyClasses('flex items-center gap-4')).toEqual([
      'flex',
      'items-center',
      'gap-4',
    ]);
  });

  it('should handle multiple spaces between classes', () => {
    expect(parseNonEmptyClasses('flex    items-center   gap-4')).toEqual([
      'flex',
      'items-center',
      'gap-4',
    ]);
  });

  it('should filter out empty strings', () => {
    expect(parseNonEmptyClasses('  flex   ')).toEqual(['flex']);
  });

  it('should handle empty string input', () => {
    expect(parseNonEmptyClasses('')).toEqual([]);
  });

  it('should handle single class', () => {
    expect(parseNonEmptyClasses('flex')).toEqual(['flex']);
  });

  it('should handle tabs and mixed whitespace', () => {
    expect(parseNonEmptyClasses('flex\titems-center\n\ngap-4')).toEqual([
      'flex',
      'items-center',
      'gap-4',
    ]);
  });
});

describe('extractVariants', () => {
  it('should extract single variant', () => {
    expect(extractVariants('hover:bg-blue-500')).toEqual({
      variants: ['hover'],
      baseClass: 'bg-blue-500',
    });
  });

  it('should extract multiple variants', () => {
    expect(extractVariants('md:hover:focus:text-red-500')).toEqual({
      variants: ['md', 'hover', 'focus'],
      baseClass: 'text-red-500',
    });
  });

  it('should handle no variants', () => {
    expect(extractVariants('flex')).toEqual({
      variants: [],
      baseClass: 'flex',
    });
  });

  it('should handle arbitrary values with brackets and colons', () => {
    expect(extractVariants('dark:[--my-var:value]')).toEqual({
      variants: ['dark'],
      baseClass: '[--my-var:value]',
    });
  });

  it('should handle nested brackets in arbitrary values', () => {
    expect(extractVariants('hover:[content:var(--value)]')).toEqual({
      variants: ['hover'],
      baseClass: '[content:var(--value)]',
    });
  });

  it('should handle complex arbitrary values', () => {
    expect(extractVariants('sm:md:lg:[clip-path:circle(50%)]')).toEqual({
      variants: ['sm', 'md', 'lg'],
      baseClass: '[clip-path:circle(50%)]',
    });
  });

  it('should handle group and peer variants', () => {
    expect(extractVariants('group-hover:peer-focus:bg-white')).toEqual({
      variants: ['group-hover', 'peer-focus'],
      baseClass: 'bg-white',
    });
  });

  it('should handle empty string', () => {
    expect(extractVariants('')).toEqual({
      variants: [],
      baseClass: '',
    });
  });

  it('should handle arbitrary variant with selector', () => {
    expect(extractVariants('[&:nth-child(3)]:block')).toEqual({
      variants: ['[&:nth-child(3)]'],
      baseClass: 'block',
    });
  });
});

describe('extractOpacity', () => {
  it('should extract opacity from color class', () => {
    expect(extractOpacity('bg-white/50')).toEqual({
      className: 'bg-white',
      opacity: '50',
    });
  });

  it('should extract opacity with different percentages', () => {
    expect(extractOpacity('text-blue-500/75')).toEqual({
      className: 'text-blue-500',
      opacity: '75',
    });
  });

  it('should handle 0% opacity', () => {
    expect(extractOpacity('bg-black/0')).toEqual({
      className: 'bg-black',
      opacity: '0',
    });
  });

  it('should handle 100% opacity', () => {
    expect(extractOpacity('bg-red-500/100')).toEqual({
      className: 'bg-red-500',
      opacity: '100',
    });
  });

  it('should return null opacity when no slash present', () => {
    expect(extractOpacity('bg-blue-500')).toEqual({
      className: 'bg-blue-500',
      opacity: null,
    });
  });

  it('should not match non-numeric opacity values', () => {
    expect(extractOpacity('bg-blue/abc')).toEqual({
      className: 'bg-blue/abc',
      opacity: null,
    });
  });

  it('should handle arbitrary color with opacity', () => {
    expect(extractOpacity('bg-[#fff]/90')).toEqual({
      className: 'bg-[#fff]',
      opacity: '90',
    });
  });
});

describe('extractImportant', () => {
  it('should extract important modifier', () => {
    expect(extractImportant('bg-white!')).toEqual({
      className: 'bg-white',
      isImportant: true,
    });
  });

  it('should handle class without important', () => {
    expect(extractImportant('bg-white')).toEqual({
      className: 'bg-white',
      isImportant: false,
    });
  });

  it('should handle complex class with important', () => {
    expect(extractImportant('hover:bg-blue-500/50!')).toEqual({
      className: 'hover:bg-blue-500/50',
      isImportant: true,
    });
  });

  it('should handle arbitrary value with important', () => {
    expect(extractImportant('p-[10px]!')).toEqual({
      className: 'p-[10px]',
      isImportant: true,
    });
  });

  it('should handle empty string', () => {
    expect(extractImportant('')).toEqual({
      className: '',
      isImportant: false,
    });
  });

  it('should only match exclamation at the end', () => {
    expect(extractImportant('!flex')).toEqual({
      className: '!flex',
      isImportant: false,
    });
  });
});

describe('extractPrefix', () => {
  it('should extract prefix with escaped colon', () => {
    expect(extractPrefix('tw\\:bg-white')).toEqual({
      className: 'bg-white',
      prefix: 'tw',
    });
  });

  it('should handle class without prefix', () => {
    expect(extractPrefix('bg-white')).toEqual({
      className: 'bg-white',
      prefix: '',
    });
  });

  it('should handle numeric prefix', () => {
    expect(extractPrefix('v2\\:flex')).toEqual({
      className: 'flex',
      prefix: 'v2',
    });
  });

  it('should handle hyphenated prefix', () => {
    expect(extractPrefix('my-app\\:text-lg')).toEqual({
      className: 'text-lg',
      prefix: 'my-app',
    });
  });

  it('should not match unescaped colons (those are variants)', () => {
    expect(extractPrefix('hover:bg-blue')).toEqual({
      className: 'hover:bg-blue',
      prefix: '',
    });
  });

  it('should handle empty string', () => {
    expect(extractPrefix('')).toEqual({
      className: '',
      prefix: '',
    });
  });

  it('should handle complex prefix with variants', () => {
    expect(extractPrefix('tw\\:hover:bg-blue-500')).toEqual({
      className: 'hover:bg-blue-500',
      prefix: 'tw',
    });
  });
});
