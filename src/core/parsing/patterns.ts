/**
 * Extract className patterns from source code
 */

import type { ClassExtraction, ConditionalClass } from './types';
import {
  extractContentBetweenDelimiters,
  splitArgumentsByComma,
} from './utilities';
import { parseExpression } from './expressions';

/**
 * Extract simple string literals: className="..." or class="..."
 * Excludes Vue :class and Svelte class: directives
 */
export function extractSimpleStrings(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /(class(?:Name)?=)(["'])([^"']*)\2/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    // Skip if this is Vue's :class or v-bind:class (check character before match)
    const charBefore = match.index > 0 ? text[match.index - 1] : '';
    if (charBefore === ':') {
      continue;
    }
    
    // Skip if this is v-bind:class (check for 'v-bind:' before match)
    if (match.index >= 7 && text.slice(match.index - 7, match.index) === 'v-bind:') {
      continue;
    }

    // Skip if this is Svelte's class: directive (check if 'class:' in match)
    if (match[1] === 'class:') {
      continue;
    }

    const classString = match[3].trim();
    if (classString) {
      extractions.push({
        classStrings: [classString],
        conditionalClasses: [{ classes: classString }],
        range: { start: match.index, end: match.index + match[0].length },
        type: 'simple',
      });
    }
  }

  return extractions;
}

/**
 * Extract Vue :class bindings: :class="..." or v-bind:class="..."
 */
export function extractVueClassBindings(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /(:class|v-bind:class)=(["'])/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const startIdx = match.index;
    const quote = match[2];
    const contentStart = match.index + match[0].length;

    // Find the closing quote with proper escape handling
    let endIdx = -1;
    let i = contentStart;
    
    while (i < text.length) {
      const char = text[i];
      
      // Check if this is our closing quote (not escaped)
      if (char === quote) {
        // Count preceding backslashes
        let backslashes = 0;
        let j = i - 1;
        while (j >= contentStart && text[j] === '\\') {
          backslashes++;
          j--;
        }
        // If even number of backslashes (including 0), quote is not escaped
        if (backslashes % 2 === 0) {
          endIdx = i;
          break;
        }
      }
      i++;
    }

    if (endIdx === -1) continue; // Couldn't find closing quote

    const content = text.slice(contentStart, endIdx).trim();
    if (!content) continue;

    // Try to parse as dynamic expression (object or array)
    let conditionalClasses: any[] = [];
    let isDynamic = false;

    if (content.startsWith('{')) {
      // Parse object syntax: { 'class': condition }
      conditionalClasses = parseExpression(content) || [];
      isDynamic = conditionalClasses.length > 0;
    } else if (content.startsWith('[')) {
      // Parse array syntax: ['class1', 'class2']
      conditionalClasses = parseHelperArgs(content);
      isDynamic = conditionalClasses.length > 0;
    }

    // If not dynamic, treat as static string
    if (!isDynamic && content) {
      conditionalClasses = [{ classes: content }];
    }

    if (conditionalClasses.length > 0) {
      extractions.push({
        classStrings: conditionalClasses.map((cc) => cc.classes),
        conditionalClasses,
        range: { start: startIdx, end: endIdx + 1 },
        type: isDynamic ? 'helper' : 'simple',
      });
    }
  }

  return extractions;
}

/**
 * Extract Svelte class: directives: class:name={condition}
 */
export function extractSvelteClassDirectives(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /class:([\w-]+)=\{([^}]+)\}/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const className = match[1];
    const condition = match[2].trim();
    
    // Skip empty conditions
    if (!className || !condition) continue;

    // If condition is 'true', treat as unconditional
    const conditionalClasses = condition === 'true' 
      ? [{ classes: className }]
      : [{ classes: className, condition }];

    extractions.push({
      classStrings: [className],
      conditionalClasses,
      range: { start: match.index, end: match.index + match[0].length },
      type: 'helper',
    });
  }

  return extractions;
}

/**
 * Extract Angular [ngClass] bindings: [ngClass]="{'class': condition}"
 */
export function extractAngularNgClass(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /\[ngClass\]=(["'])/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const startIdx = match.index;
    const quote = match[1];
    const contentStart = match.index + match[0].length;

    // Find the closing quote with proper escape handling
    let endIdx = -1;
    let i = contentStart;
    
    while (i < text.length) {
      const char = text[i];
      
      // Check if this is our closing quote (not escaped)
      if (char === quote) {
        // Count preceding backslashes
        let backslashes = 0;
        let j = i - 1;
        while (j >= contentStart && text[j] === '\\') {
          backslashes++;
          j--;
        }
        // If even number of backslashes (including 0), quote is not escaped
        if (backslashes % 2 === 0) {
          endIdx = i;
          break;
        }
      }
      i++;
    }

    if (endIdx === -1) continue; // Couldn't find closing quote

    const content = text.slice(contentStart, endIdx).trim();
    if (!content) continue;

    // Parse the object/array expression
    let conditionalClasses: any[] = [];

    if (content.startsWith('{')) {
      // Object syntax: {'class': condition}
      conditionalClasses = parseExpression(content) || [];
    } else if (content.startsWith('[')) {
      // Array syntax: ['class1', condition && 'class2']
      conditionalClasses = parseHelperArgs(content);
    }

    if (conditionalClasses.length > 0) {
      extractions.push({
        classStrings: conditionalClasses.map((cc) => cc.classes),
        conditionalClasses,
        range: { start: startIdx, end: endIdx + 1 },
        type: 'helper',
      });
    }
  }

  return extractions;
}

/**
 * Extract Angular [class.x] bindings: [class.active]="isActive"
 */
export function extractAngularClassBindings(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /\[class\.([\w-]+)\]=(["'])([^"']*)\2/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const className = match[1];
    const condition = match[3].trim();
    
    // Skip empty conditions
    if (!className || !condition) continue;

    // If condition is 'true', treat as unconditional
    const conditionalClasses = condition === 'true' 
      ? [{ classes: className }]
      : [{ classes: className, condition }];

    extractions.push({
      classStrings: [className],
      conditionalClasses,
      range: { start: match.index, end: match.index + match[0].length },
      type: 'helper',
    });
  }

  return extractions;
}

/**
 * Extract Solid.js classList: classList={{ active: isActive }}
 */
export function extractSolidClassList(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /classList=\{\{/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const startIdx = match.index;
    const contentStart = match.index + match[0].length;

    // Find the closing braces }}, accounting for nested braces
    let endIdx = -1;
    let depth = 1; // We're looking for the closing brace of the inner object
    let i = contentStart;
    
    while (i < text.length) {
      const char = text[i];
      if (char === '{') {
        depth++;
      } else if (char === '}') {
        depth--;
        if (depth === 0) {
          // Found the closing brace of the inner object
          // Check if the next character is also a closing brace
          if (i + 1 < text.length && text[i + 1] === '}') {
            endIdx = i;
            break;
          }
        }
      }
      i++;
    }

    if (endIdx === -1) continue; // Couldn't find closing braces

    const content = text.slice(contentStart, endIdx).trim();
    if (!content) continue;

    // Parse the object expression
    const conditionalClasses = parseExpression(`{${content}}`) || [];

    if (conditionalClasses.length > 0) {
      extractions.push({
        classStrings: conditionalClasses.map((cc) => cc.classes),
        conditionalClasses,
        range: { start: startIdx, end: endIdx + 2 }, // +2 for the two closing braces
        type: 'helper',
      });
    }
  }

  return extractions;
}

/**
 * Extract template literals: className={`...`}
 */
export function extractTemplateLiterals(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /(class(?:Name)?=)\{`([^`]*)`\}/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const templateContent = match[2];
    const conditionalClasses = parseTemplateLiteral(templateContent);

    if (conditionalClasses.length > 0) {
      extractions.push({
        classStrings: conditionalClasses.map((cc) => cc.classes),
        conditionalClasses,
        range: { start: match.index, end: match.index + match[0].length },
        type: 'template',
      });
    }
  }

  return extractions;
}

/**
 * Extract helper functions: className={clsx(...)}
 */
export function extractHelperFunctions(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /(class(?:Name)?=)\{(clsx|classnames|cn|twMerge|cva|tw)\(/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
    const startIdx = match.index;
    const argsStartIdx = match.index + match[0].length;

    // Extract balanced parentheses content
    const argsResult = extractContentBetweenDelimiters(
      text,
      argsStartIdx,
      '(',
      ')'
    );
    if (!argsResult) continue;

    const { content: argsContent, endIdx: argsEndIdx } = argsResult;

    // Verify closing } of className={...}
    if (text[argsEndIdx] !== '}') continue;

    const conditionalClasses = parseHelperArgs(argsContent);
    if (conditionalClasses.length > 0) {
      extractions.push({
        classStrings: conditionalClasses.map((cc) => cc.classes),
        conditionalClasses,
        range: { start: startIdx, end: argsEndIdx + 1 },
        type: 'helper',
      });
    }
  }

  return extractions;
}

/**
 * Remove duplicate extractions based on position
 */
export function removeDuplicateExtractions(
  extractions: ClassExtraction[]
): ClassExtraction[] {
  extractions.sort((a, b) => a.range.start - b.range.start);

  const unique: ClassExtraction[] = [];
  let lastEnd = -1;

  for (const extraction of extractions) {
    if (extraction.range.start >= lastEnd) {
      unique.push(extraction);
      lastEnd = extraction.range.end;
    }
  }

  return unique;
}

/**
 * Parse template literal content: `static ${dynamic} more`
 */
export function parseTemplateLiteral(template: string): ConditionalClass[] {
  const result: ConditionalClass[] = [];
  let staticText = '';
  let inExpr = false;
  let exprContent = '';
  let braceDepth = 0;

  for (let i = 0; i < template.length; i++) {
    const char = template[i];
    const nextChar = template[i + 1];

    if (!inExpr && char === '$' && nextChar === '{') {
      // Save static text
      if (staticText.trim()) {
        result.push({ classes: staticText.trim() });
      }
      staticText = '';
      exprContent = '';
      inExpr = true;
      braceDepth = 1;
      i++; // skip '{'
    } else if (inExpr) {
      if (char === '{') {
        braceDepth++;
        exprContent += char;
      } else if (char === '}') {
        braceDepth--;
        if (braceDepth === 0) {
          // Parse the expression
          const parsed = parseExpression(exprContent.trim());
          if (parsed) result.push(...parsed);
          inExpr = false;
        } else {
          exprContent += char;
        }
      } else {
        exprContent += char;
      }
    } else {
      staticText += char;
    }
  }

  // Save remaining static text
  if (staticText.trim()) {
    result.push({ classes: staticText.trim() });
  }

  return result;
}

/**
 * Parse helper function arguments: clsx('a', condition && 'b')
 */
export function parseHelperArgs(argsContent: string): ConditionalClass[] {
  const trimmed = argsContent.trim();

  // Handle array syntax: clsx([...])
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const arrayContent = trimmed.slice(1, -1).trim();
    return parseArgList(arrayContent);
  }

  // Handle comma-separated args
  return parseArgList(trimmed);
}

/**
 * Parse comma-separated argument list
 */
function parseArgList(content: string): ConditionalClass[] {
  const result: ConditionalClass[] = [];
  const args = splitArgumentsByComma(content);

  for (const arg of args) {
    const trimmed = arg.trim();
    if (!trimmed) continue;

    // Handle nested arrays: clsx('a', ['b', 'c'])
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const arrayContent = trimmed.slice(1, -1).trim();
      const nested = parseArgList(arrayContent);
      result.push(...nested);
      continue;
    }

    // Parse the argument
    const parsed = parseExpression(trimmed);
    if (parsed) result.push(...parsed);
  }

  return result;
}
