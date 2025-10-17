/**
 * Core parsing utilities for handling JavaScript syntax
 */

/**
 * Tracks string context and nesting depth while parsing
 * Used to identify "top level" positions in expressions (depth=0, not in string)
 */
export class ParseState {
  /** Current nesting depth of brackets/parens/braces */
  depth = 0;
  /** Quote character if currently inside a string literal, false otherwise */
  inString: false | '"' | "'" | '`' = false;

  /**
   * Updates parse state based on current character
   * Tracks whether we're inside a string literal and maintains depth counter for nested brackets/parens/braces
   *
   * @param char - Current character being processed
   * @param prevChar - Previous character (used to detect escaped quotes with backslash)
   *
   * @example
   * ```ts
   * state.update('"', ' ')  // Enters string mode
   * state.update('"', '\\') // Ignores escaped quote, stays in string
   * state.update('{', ' ')  // Increases depth counter
   * ```
   */
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

  /** True when at top level (depth=0 and not inside a string) */
  get isNeutral() {
    return !this.inString && this.depth === 0;
  }
}

/**
 * Extract content between balanced delimiters (e.g., parentheses, brackets)
 * Respects string literals and nested delimiters
 *
 * @param text - Full text to search
 * @param startIdx - Index AFTER the opening delimiter (we start at depth=1)
 * @param openChar - Opening delimiter character
 * @param closeChar - Closing delimiter character
 *
 * @returns Object with content (excluding outer delimiters) and endIdx (AFTER closing delimiter)
 *          Returns null if delimiters are unbalanced
 *
 * @example
 * ```ts
 * extractContentBetweenDelimiters("foo(bar(baz))", 4, "(", ")")
 * // Returns: { content: "bar(baz)", endIdx: 13 }
 * ```
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
 * Split by comma at top level (respecting nesting and string literals)
 * Used to parse function arguments and array elements
 *
 * @example
 * ```ts
 * splitArgumentsByComma("'a', obj.method(), ['b', 'c']")
 * // Returns: ["'a'", "obj.method()", "['b', 'c']"]
 * ```
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
 *
 * IMPORTANT: Finds the FIRST occurrence at depth 0.
 * For ternary operators, this means `?` is found before `:`,
 * which is critical for correct parsing of nested ternaries.
 *
 * @param expr - Expression to search
 * @param operator - Operator string to find (e.g., '?', ':', '&&', '||', '??')
 *
 * @returns Object with operator index and text before/after, or null if not found
 *
 * @example
 * ```ts
 * findOperator("a ? b : c ? d : e", "?")
 * // Returns: { idx: 2, before: "a", after: "b : c ? d : e" }
 * ```
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
 *
 * @example
 * ```ts
 * unwrapStringLiteral("'hello'") // Returns: "hello"
 * unwrapStringLiteral('"world"') // Returns: "world"
 * unwrapStringLiteral('`test`')  // Returns: "test"
 * unwrapStringLiteral('notQuoted') // Returns: null
 * ```
 */
export function unwrapStringLiteral(expr: string): string | null {
  const match = expr.trim().match(/^(['"`])(.+?)\1$/);
  return match ? match[2] : null;
}

/**
 * Remove outer parentheses from condition for cleaner display
 *
 * @example
 * ```ts
 * removeOuterParentheses("((isActive))") // Returns: "isActive"
 * removeOuterParentheses("(a && b)")     // Returns: "a && b"
 * ```
 */
export function removeOuterParentheses(condition: string): string {
  return condition.replace(/^\(+|\)+$/g, '').trim();
}
