/**
 * Fluent builder for generating Tailwind class strings in tests
 * 
 * Provides a chainable API for constructing Tailwind class strings
 * programmatically. Useful for testing edge cases and combinations.
 * 
 * @example
 * ```ts
 * const classes = new ClassBuilder()
 *   .flex()
 *   .itemsCenter()
 *   .gap(4)
 *   .px(4)
 *   .bg('blue-500')
 *   .hover('bg-blue-600')
 *   .toString();
 * // Returns: "flex items-center gap-4 px-4 bg-blue-500 hover:bg-blue-600"
 * ```
 * 
 * @module tests/_support/classBuilder
 */
export class ClassBuilder {
  private parts: string[] = [];

  // Layout
  flex(): this { this.parts.push('flex'); return this; }
  block(): this { this.parts.push('block'); return this; }
  hidden(): this { this.parts.push('hidden'); return this; }
  overflowAuto(): this { this.parts.push('overflow-auto'); return this; }
  
  // Flexbox
  itemsCenter(): this { this.parts.push('items-center'); return this; }
  justifyBetween(): this { this.parts.push('justify-between'); return this; }
  gap(value: number): this { this.parts.push(`gap-${value}`); return this; }
  
  // Spacing
  p(value: number): this { this.parts.push(`p-${value}`); return this; }
  m(value: number): this { this.parts.push(`m-${value}`); return this; }
  mx(value: number | 'auto'): this { this.parts.push(`mx-${value}`); return this; }
  my(value: number): this { this.parts.push(`my-${value}`); return this; }
  px(value: number): this { this.parts.push(`px-${value}`); return this; }
  py(value: number): this { this.parts.push(`py-${value}`); return this; }
  
  // Colors
  bg(color: string): this { this.parts.push(`bg-${color}`); return this; }
  text(color: string): this { this.parts.push(`text-${color}`); return this; }
  
  // Borders & Effects
  rounded(size = 'lg'): this { this.parts.push(`rounded-${size}`); return this; }
  roundedPlain(): this { this.parts.push('rounded'); return this; }
  shadow(size = ''): this { this.parts.push(size ? `shadow-${size}` : 'shadow'); return this; }
  
  // Transitions
  transitionAll(): this { this.parts.push('transition-all'); return this; }
  
  // Opacity
  opacity(percent: number): this { this.parts.push(`opacity-${percent}`); return this; }
  
  // Variants
  hover(cls: string): this { this.parts.push(`hover:${cls}`); return this; }
  active(cls: string): this { this.parts.push(`active:${cls}`); return this; }
  md(cls: string): this { this.parts.push(`md:${cls}`); return this; }
  variant(name: string, cls: string): this { this.parts.push(`${name}:${cls}`); return this; }
  
  // Modifiers
  important(): this { this.parts = this.parts.map((c) => c.endsWith('!') ? c : `${c}!`); return this; }
  prefix(ns: string, cls: string): this { this.parts.push(`${ns}\\:${cls}`); return this; }
  
  // Utility
  raw(cls: string): this { this.parts.push(cls); return this; }

  toString(): string { return this.parts.join(' '); }
}


