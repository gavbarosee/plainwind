/**
 * Core parsing utilities for handling JavaScript syntax
 */

/**
 * Tracks string context and nesting depth while parsing
 */
export class ParseState {
  depth = 0;
  inString: false | '"' | "'" | '`' = false;

  update(char: string, prevChar: string) {
    if (!this.inString && (char === '"' || char === "'" || char === '`')) {
      this.inString = char;
    } else if (this.inString && char === this.inString && prevChar !== '\\') {
      this.inString = false;
    } else if (!this.inString) {
      if (char === '(' || char === '[' || char === '{') {
        this.depth++;
      } else if (char === ')' || char === ']' || char === '}') {
        this.depth--;
      }
    }
  }

  get isNeutral() {
    return !this.inString && this.depth === 0;
  }
}

/**
 * Extract content between balanced delimiters
 */
export function extractContentBetweenDelimiters(
  text: string,
  startIdx: number,
  openChar: string,
  closeChar: string
): { content: string; endIdx: number } | null {
  const state = new ParseState();
  state.depth = 1;
  let content = '';

  for (let i = startIdx; i < text.length; i++) {
    const char = text[i];
    const prevChar = i > 0 ? text[i - 1] : '';

    state.update(char, prevChar);

    if (char === openChar && !state.inString) {
      content += char;
    } else if (char === closeChar && !state.inString) {
      if (state.depth === 0) {
        return { content, endIdx: i + 1 };
      }
      content += char;
    } else {
      content += char;
    }
  }

  return null;
}

/**
 * Split by comma at top level (respecting nesting)
 */
export function splitArgumentsByComma(content: string): string[] {
  const parts: string[] = [];
  const state = new ParseState();
  let current = '';

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';

    state.update(char, prevChar);

    if (char === ',' && state.isNeutral) {
      if (current.trim()) parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  if (current.trim()) parts.push(current.trim());

  return parts;
}

/**
 * Find operator at top level (not in strings or nested structures)
 */
export function findOperator(
  expr: string,
  operator: string
): { idx: number; before: string; after: string } | null {
  const state = new ParseState();
  const opLen = operator.length;

  for (let i = 0; i <= expr.length - opLen; i++) {
    const char = expr[i];
    const prevChar = i > 0 ? expr[i - 1] : '';

    state.update(char, prevChar);

    if (state.isNeutral && expr.slice(i, i + opLen) === operator) {
      return {
        idx: i,
        before: expr.slice(0, i).trim(),
        after: expr.slice(i + opLen).trim(),
      };
    }
  }

  return null;
}

/**
 * Remove quotes from string literal
 */
export function unwrapStringLiteral(expr: string): string | null {
  const match = expr.trim().match(/^(['"`])(.+?)\1$/);
  return match ? match[2] : null;
}

/**
 * Clean up condition for display
 */
export function removeOuterParentheses(condition: string): string {
  return condition.replace(/^\(+|\)+$/g, '').trim();
}

