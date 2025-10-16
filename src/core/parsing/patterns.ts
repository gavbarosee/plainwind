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
 * Extract simple string literals: className="..."
 */
export function extractSimpleStrings(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];
  const pattern = /(class(?:Name)?=)(["'])([^"']*)\2/g;
  let match;

  while ((match = pattern.exec(text)) !== null) {
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
