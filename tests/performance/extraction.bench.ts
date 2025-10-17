/**
 * Performance benchmarks for class extraction functions
 * 
 * Measures performance of class extraction from different file types and patterns.
 * Run with: `npx vitest bench`
 * 
 * @module tests/performance/extraction.bench
 */

import { bench, describe } from 'vitest';
import { extractAllClassNames } from '@src/core/parsing';

describe('Extraction Performance', () => {
  describe('Simple class extraction', () => {
    bench('single className attribute', () => {
      extractAllClassNames('<div className="flex items-center gap-4">');
    });

    bench('multiple className attributes', () => {
      extractAllClassNames(`
        <div className="flex flex-col gap-4">
          <button className="px-4 py-2 bg-blue-500">Click</button>
          <span className="text-sm text-gray-600">Label</span>
        </div>
      `);
    });

    bench('complex component (10 classNames)', () => {
      extractAllClassNames(`
        <div className="container mx-auto px-4">
          <header className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold">Title</h1>
            <nav className="flex gap-4">
              <a className="hover:text-blue-500">Link 1</a>
              <a className="hover:text-blue-500">Link 2</a>
            </nav>
          </header>
          <main className="grid grid-cols-3 gap-6 py-8">
            <div className="bg-white rounded-lg shadow-md p-6">Card 1</div>
            <div className="bg-white rounded-lg shadow-md p-6">Card 2</div>
          </main>
        </div>
      `);
    });
  });

  describe('Conditional class extraction', () => {
    bench('template literal with ternary', () => {
      extractAllClassNames('<div className={`flex ${isActive ? "active" : "inactive"}`}>');
    });

    bench('clsx with multiple conditions', () => {
      extractAllClassNames(`
        <button className={clsx(
          'px-4 py-2 rounded-md font-medium',
          isActive && 'bg-blue-500 text-white',
          isDisabled && 'opacity-50 cursor-not-allowed',
          hasError && 'border-red-500'
        )}>
      `);
    });

    bench('complex conditional (object + array syntax)', () => {
      extractAllClassNames(`
        <div className={clsx([
          'base-class',
          'another-class',
          {
            'active': isActive,
            'disabled': isDisabled,
            'error': hasError,
            'success': isSuccess
          },
          condition ? 'yes' : 'no',
          x && 'conditional'
        ])}>
      `);
    });
  });

  describe('Framework-specific extraction', () => {
    bench('Vue :class binding', () => {
      extractAllClassNames(`
        <div :class="['flex', 'items-center', { active: isActive }]">
        <span :class="{ 'text-bold': isBold, 'text-red': isError }">
      `);
    });

    bench('Svelte class: directives', () => {
      extractAllClassNames(`
        <div class="base" class:active={isActive} class:disabled={isDisabled}>
        <button class="btn" class:primary={isPrimary}>Click</button>
      `);
    });

    bench('Angular [ngClass]', () => {
      extractAllClassNames(`
        <div [ngClass]="{'active': isActive, 'disabled': isDisabled}">
        <button [class.primary]="isPrimary" [class.secondary]="isSecondary">
      `);
    });
  });

  describe('Large file extraction (stress test)', () => {
    const componentWith50Elements = Array(50).fill(null).map((_, i) => 
      `<div className="flex items-center gap-4 px-4 py-2 bg-white rounded-lg">${i}</div>`
    ).join('\n');

    bench('50 elements with className', () => {
      extractAllClassNames(componentWith50Elements);
    });

    const componentWith100Elements = Array(100).fill(null).map((_, i) => 
      `<div className="flex items-center gap-4">${i}</div>`
    ).join('\n');

    bench('100 elements with className', () => {
      extractAllClassNames(componentWith100Elements);
    });

    const mixedConditionalsFile = Array(20).fill(null).map((_, i) => `
      <div className={clsx(
        'base-class-${i}',
        'another-class',
        isActive${i} && 'active',
        condition${i} ? 'yes' : 'no'
      )}>
    `).join('\n');

    bench('20 elements with conditionals', () => {
      extractAllClassNames(mixedConditionalsFile);
    });
  });

  describe('Edge cases', () => {
    bench('very long className string (100 classes)', () => {
      const longString = Array(100).fill('class').map((c, i) => `${c}-${i}`).join(' ');
      extractAllClassNames(`<div className="${longString}">`);
    });

    bench('deeply nested JSX (10 levels)', () => {
      const nested = `
        <div className="level-1">
          <div className="level-2">
            <div className="level-3">
              <div className="level-4">
                <div className="level-5">
                  <div className="level-6">
                    <div className="level-7">
                      <div className="level-8">
                        <div className="level-9">
                          <div className="level-10">Deeply nested</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      extractAllClassNames(nested);
    });

    bench('mixed quotes and escapes', () => {
      extractAllClassNames(`
        <div className="flex items-center">
        <div className='single-quotes'>
        <div className={\`template-literal\`}>
        <div className={clsx("double", 'single', \`template\`)}>
      `);
    });
  });
});

