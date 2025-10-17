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
 *
 * Attempts to parse the expression using multiple strategies:
 * 1. Object literal: { class: condition }
 * 2. String literal: 'classes' or "classes"
 * 3. Logical AND: condition && 'classes'
 * 4. Logical OR: condition || 'fallback'
 * 5. Nullish coalescing: condition ?? 'fallback'
 * 6. Ternary: condition ? 'a' : 'b'
 * 7. Template string: `static ${dynamic}`
 *
 * @param expr - JavaScript expression to parse
 * @returns Array of conditional classes, or null if expression cannot be parsed
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
    ? [
        {
          classes: fallback,
          condition: `!${removeOuterParentheses(condition)}`,
        },
      ]
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
 *
 * Handles nested ternaries in the false branch by combining conditions with AND:
 *
 * @example
 * ```ts
 * "a ? 'x' : b ? 'y' : 'z'" becomes:
 * - 'x' when: a
 * - 'y' when: !a && b
 * - 'z' when: !a && !b
 * ```
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
    // If outer condition is false AND inner condition is true
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
 *
 * State machine:
 * - Outside expression: accumulate static text until we see ${
 * - Inside expression: track brace depth to handle nested objects/functions
 * - Exit expression: when braceDepth reaches 0, parse the accumulated expression recursively
 *
 * @example
 * ```ts
 * parseTemplateString("`static ${obj.method()} dynamic`")
 * // Returns: [
 * //   { classes: "static" },
 * //   ...parseExpression("obj.method()"),
 * //   { classes: "dynamic" }
 * // ]
 * ```
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
 * Parse object literal: { 'class': condition } or { class: condition }
 * Supports both quoted and unquoted keys (for Vue compatibility)
 */
export function parseObjectLiteral(expr: string): ConditionalClass[] | null {
  if (!expr.startsWith('{') || !expr.endsWith('}')) return null;

  const content = expr.slice(1, -1).trim();
  if (!content) return null;

  const entries = splitArgumentsByComma(content);
  const result: ConditionalClass[] = [];

  for (const entry of entries) {
    /**
     * Find the colon separating key from value
     *
     * Special handling: Vue/Tailwind classes may contain colons in their names
     * (e.g., 'hover:bg-blue-500'), so we must only split on colons that are
     * OUTSIDE of quote marks.
     *
     * @example
     * "'hover:bg-blue': isActive" → splits at the unquoted colon
     * "hover:bg-blue: isActive" → would incorrectly split at first colon without quote tracking
     */
    let colonIdx = -1;
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < entry.length; i++) {
      const char = entry[i];
      const prevChar = i > 0 ? entry[i - 1] : '';

      // Track if we're inside quotes
      if ((char === '"' || char === "'" || char === '`') && prevChar !== '\\') {
        if (!inQuotes) {
          inQuotes = true;
          quoteChar = char;
        } else if (char === quoteChar) {
          inQuotes = false;
        }
      }

      // Only consider colons outside of quotes
      if (char === ':' && !inQuotes) {
        colonIdx = i;
        break;
      }
    }

    if (colonIdx === -1) continue;

    const key = entry.slice(0, colonIdx).trim();
    const value = entry.slice(colonIdx + 1).trim();

    // Try quoted key first (e.g., 'active' or "text-red")
    const quotedMatch = key.match(/^(['"`])(.+?)\1$/);
    let classes: string;

    if (quotedMatch) {
      classes = quotedMatch[2];
    } else {
      // Handle unquoted key (e.g., active or textRed)
      // This is valid in Vue and JavaScript object literals
      classes = key;
    }

    if (value === 'true') {
      result.push({ classes });
    } else if (value !== 'false') {
      result.push({ classes, condition: removeOuterParentheses(value) });
    }
  }

  return result.length > 0 ? result : null;
}
