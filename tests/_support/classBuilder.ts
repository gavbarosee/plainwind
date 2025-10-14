export class ClassBuilder {
  private parts: string[] = [];

  flex(): this { this.parts.push('flex'); return this; }
  itemsCenter(): this { this.parts.push('items-center'); return this; }
  justifyBetween(): this { this.parts.push('justify-between'); return this; }
  p(value: number): this { this.parts.push(`p-${value}`); return this; }
  m(value: number): this { this.parts.push(`m-${value}`); return this; }
  mx(value: number | 'auto'): this { this.parts.push(`mx-${value}`); return this; }
  my(value: number): this { this.parts.push(`my-${value}`); return this; }
  px(value: number): this { this.parts.push(`px-${value}`); return this; }
  py(value: number): this { this.parts.push(`py-${value}`); return this; }
  gap(value: number): this { this.parts.push(`gap-${value}`); return this; }
  bg(color: string): this { this.parts.push(`bg-${color}`); return this; }
  text(color: string): this { this.parts.push(`text-${color}`); return this; }
  rounded(size = 'lg'): this { this.parts.push(`rounded-${size}`); return this; }
  roundedPlain(): this { this.parts.push('rounded'); return this; }
  shadow(size = ''): this { this.parts.push(size ? `shadow-${size}` : 'shadow'); return this; }
  transitionAll(): this { this.parts.push('transition-all'); return this; }
  block(): this { this.parts.push('block'); return this; }
  hidden(): this { this.parts.push('hidden'); return this; }
  overflowAuto(): this { this.parts.push('overflow-auto'); return this; }
  hover(cls: string): this { this.parts.push(`hover:${cls}`); return this; }
  active(cls: string): this { this.parts.push(`active:${cls}`); return this; }
  md(cls: string): this { this.parts.push(`md:${cls}`); return this; }
  important(): this { this.parts = this.parts.map((c) => c.endsWith('!') ? c : `${c}!`); return this; }
  opacity(percent: number): this { this.parts.push(`opacity-${percent}`); return this; }
  variant(name: string, cls: string): this { this.parts.push(`${name}:${cls}`); return this; }
  prefix(ns: string, cls: string): this { this.parts.push(`${ns}\\:${cls}`); return this; }
  raw(cls: string): this { this.parts.push(cls); return this; }

  toString(): string { return this.parts.join(' '); }
}


