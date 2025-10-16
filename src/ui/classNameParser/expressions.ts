/**
 * Parse JavaScript conditional expressions
 */

import type { ConditionalClass } from './types';
import {
  findOperator,
  unwrapStringLiteral,
  removeOuterParentheses,
  splitArgumentsByComma,
} from './utilities';

/**
 * Main expression parser - tries each pattern in order
 */
export function parseExpression(expr: string): ConditionalClass[] | null {
  const trimmed = expr.trim();

  return (
    parseObjectLiteral(trimmed) ||
    parseStringLiteral(trimmed) ||
    parseLogicalAndExpression(trimmed) ||
    parseLogicalOrExpression(trimmed) ||
    parseNullishCoalescingExpression(trimmed) ||
    parseTernaryExpression(trimmed) ||
    parseTemplateString(trimmed)
  );
}

/**
 * Parse simple string: 'classes' or "classes"
 */
export function parseStringLiteral(expr: string): ConditionalClass[] | null {
  const match = expr.match(/^(['"`])(.+)\1$/);
  if (!match) return null;

  const classes = match[2].trim();
  return classes ? [{ classes }] : null;
}

/**
 * Parse logical AND: condition && 'classes'
 */
export function parseLogicalAndExpression(
  expr: string
): ConditionalClass[] | null {
  const match = expr.match(/^(.+?)\s*&&\s*(['"`])(.+?)\2$/);
  if (!match) return null;

  const condition = removeOuterParentheses(match[1]);
  const classes = match[3].trim();
  return classes ? [{ classes, condition }] : null;
}

/**
 * Parse logical OR: condition || 'fallback'
 */
export function parseLogicalOrExpression(
  expr: string
): ConditionalClass[] | null {
  const op = findOperator(expr, '||');
  if (!op) return null;

  const condition = op.before;
  const fallback = unwrapStringLiteral(op.after);

  return fallback
    ? [{ classes: fallback, condition: `!${removeOuterParentheses(condition)}` }]
    : null;
}

/**
 * Parse nullish coalescing: condition ?? 'fallback'
 */
export function parseNullishCoalescingExpression(
  expr: string
): ConditionalClass[] | null {
  const op = findOperator(expr, '??');
  if (!op) return null;

  const condition = op.before;
  const fallback = unwrapStringLiteral(op.after);

  return fallback
    ? [
        {
          classes: fallback,
          condition: `${removeOuterParentheses(condition)} == null`,
        },
      ]
    : null;
}

/**
 * Parse ternary: condition ? 'a' : 'b'
 * Supports nested ternaries
 */
export function parseTernaryExpression(
  expr: string
): ConditionalClass[] | null {
  const question = findOperator(expr, '?');
  if (!question) return null;

  const condition = question.before;
  const rest = question.after;

  const colon = findOperator(rest, ':');
  if (!colon) return null;

  const trueCase = colon.before;
  const falseCase = colon.after;

  const result: ConditionalClass[] = [];

  // Parse true branch
  const trueClasses = unwrapStringLiteral(trueCase);
  if (trueClasses) {
    result.push({
      classes: trueClasses,
      condition: removeOuterParentheses(condition),
    });
  }

  // Parse false branch (may be nested ternary)
  const falseParsed = parseTernaryExpression(falseCase);
  if (falseParsed) {
    // Nested ternary: combine conditions
    for (const item of falseParsed) {
      result.push({
        classes: item.classes,
        condition: item.condition
          ? `!${removeOuterParentheses(condition)} && ${item.condition}`
          : `!${removeOuterParentheses(condition)}`,
      });
    }
  } else {
    const falseClasses = unwrapStringLiteral(falseCase);
    if (falseClasses) {
      result.push({
        classes: falseClasses,
        condition: `!${removeOuterParentheses(condition)}`,
      });
    }
  }

  return result.length > 0 ? result : null;
}

/**
 * Parse template string: `classes ${expr}`
 */
export function parseTemplateString(expr: string): ConditionalClass[] | null {
  if (!expr.startsWith('`') || !expr.endsWith('`')) return null;
  
  const template = expr.slice(1, -1);
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
          // Parse the expression recursively
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

  return result.length > 0 ? result : null;
}

/**
 * Parse object literal: { 'class': condition }
 */
export function parseObjectLiteral(expr: string): ConditionalClass[] | null {
  if (!expr.startsWith('{') || !expr.endsWith('}')) return null;

  const content = expr.slice(1, -1).trim();
  if (!content) return null;

  const entries = splitArgumentsByComma(content);
  const result: ConditionalClass[] = [];

  for (const entry of entries) {
    const colonIdx = entry.indexOf(':');
    if (colonIdx === -1) continue;

    const key = entry.slice(0, colonIdx).trim();
    const value = entry.slice(colonIdx + 1).trim();

    const classMatch = key.match(/^(['"`])(.+?)\1$/);
    if (!classMatch) continue;

    const classes = classMatch[2];

    if (value === 'true') {
      result.push({ classes });
    } else if (value !== 'false') {
      result.push({ classes, condition: removeOuterParentheses(value) });
    }
  }

  return result.length > 0 ? result : null;
}

