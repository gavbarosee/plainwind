/**
 * Advanced class name extraction for various patterns
 * Supports: string literals, template literals, clsx, classnames, cn, twMerge
 */

/**
 * Class string with optional conditional context
 */
export interface ConditionalClass {
  classes: string; // The class string
  condition?: string; // The condition (e.g., "isActive", "size === 'lg'")
}

/**
 * Extract class strings from different patterns
 */
export interface ClassExtraction {
  classStrings: string[]; // All extracted static class strings (backward compat)
  conditionalClasses: ConditionalClass[]; // Classes with their conditions
  range: { start: number; end: number }; // Position in document text
  type: 'simple' | 'template' | 'helper' | 'mixed';
}

/**
 * Find all className occurrences in text and extract their class strings
 */
export function extractAllClassNames(text: string): ClassExtraction[] {
  const extractions: ClassExtraction[] = [];

  // Pattern 1: Simple string literals
  // class="..." or className="..."
  const simplePattern = /(class(?:Name)?=)(["'])([^"']*)\2/g;
  let match;

  while ((match = simplePattern.exec(text)) !== null) {
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

  // Pattern 2: Template literals
  // className={`...`} or className={`... ${expr} ...`}
  const templatePattern = /(class(?:Name)?=)\{`([^`]*)`\}/g;
  while ((match = templatePattern.exec(text)) !== null) {
    const templateContent = match[2];
    const conditionalClasses = extractFromTemplateLiteral(templateContent);
    if (conditionalClasses.length > 0) {
      const classStrings = conditionalClasses.map((cc) => cc.classes);
      extractions.push({
        classStrings,
        conditionalClasses,
        range: { start: match.index, end: match.index + match[0].length },
        type: 'template',
      });
    }
  }

  // Pattern 3: Helper functions with balanced brace matching
  // className={clsx(...)} or className={cn(...)} etc.
  const helperStartPattern =
    /(class(?:Name)?=)\{(clsx|classnames|cn|twMerge|cva|tw)\(/g;
  let helperMatch;

  while ((helperMatch = helperStartPattern.exec(text)) !== null) {
    const startIdx = helperMatch.index;
    const helperName = helperMatch[2];
    const argsStartIdx = helperMatch.index + helperMatch[0].length;

    // Find the matching closing parenthesis, accounting for nesting
    const argsResult = extractBalancedParens(text, argsStartIdx);
    if (!argsResult) continue;

    const argsContent = argsResult.content;
    const argsEndIdx = argsResult.endIdx;

    // Now find the closing } of the className={...}
    if (text[argsEndIdx] !== '}') continue;

    const endIdx = argsEndIdx + 1;

    const conditionalClasses = extractFromHelper(argsContent);
    const classStrings = conditionalClasses.map((cc) => cc.classes);
    if (classStrings.length > 0) {
      extractions.push({
        classStrings,
        conditionalClasses,
        range: { start: startIdx, end: endIdx },
        type: 'helper',
      });
    }
  }

  // Sort by position to maintain document order
  extractions.sort((a, b) => a.range.start - b.range.start);

  // Remove duplicates (in case patterns overlap)
  const uniqueExtractions: ClassExtraction[] = [];
  let lastEnd = -1;
  for (const extraction of extractions) {
    if (extraction.range.start >= lastEnd) {
      uniqueExtractions.push(extraction);
      lastEnd = extraction.range.end;
    }
  }

  return uniqueExtractions;
}

/**
 * Extract content between balanced parentheses, accounting for nesting
 * Returns the content and the index of the closing paren
 */
function extractBalancedParens(
  text: string,
  startIdx: number
): { content: string; endIdx: number } | null {
  let depth = 1;
  let inString: false | '"' | "'" | '`' = false;
  let content = '';

  for (let i = startIdx; i < text.length; i++) {
    const char = text[i];
    const prevChar = i > 0 ? text[i - 1] : '';

    // Track strings to avoid counting parens inside them
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = char;
      content += char;
    } else if (inString && char === inString && prevChar !== '\\') {
      inString = false;
      content += char;
    } else if (inString) {
      content += char;
    } else {
      // Not in a string, track nesting
      if (char === '(' || char === '[' || char === '{') {
        depth++;
        content += char;
      } else if (char === ')' || char === ']' || char === '}') {
        depth--;
        if (depth === 0 && char === ')') {
          // Found the matching closing paren
          return { content, endIdx: i + 1 };
        }
        content += char;
      } else {
        content += char;
      }
    }
  }

  return null; // No matching closing paren found
}

/**
 * Extract class strings from template literal, including conditionals in ${...}
 * Parses both static text and conditional expressions
 */
function extractFromTemplateLiteral(template: string): ConditionalClass[] {
  const conditionalClasses: ConditionalClass[] = [];
  let current = '';
  let inExpr = false;
  let exprContent = '';
  let braceDepth = 0;

  for (let i = 0; i < template.length; i++) {
    const char = template[i];
    const nextChar = template[i + 1];

    if (!inExpr && char === '$' && nextChar === '{') {
      // Start of expression - save any static text first
      if (current.trim()) {
        conditionalClasses.push({ classes: current.trim() });
      }
      current = '';
      exprContent = '';
      inExpr = true;
      braceDepth = 1;
      i++; // skip the {
    } else if (inExpr) {
      if (char === '{') {
        braceDepth++;
        exprContent += char;
      } else if (char === '}') {
        braceDepth--;
        if (braceDepth === 0) {
          // End of expression - try to parse it
          const parsed = parseConditionalExpression(exprContent.trim());
          if (parsed) {
            conditionalClasses.push(...parsed);
          }
          inExpr = false;
          exprContent = '';
        } else {
          exprContent += char;
        }
      } else {
        exprContent += char;
      }
    } else {
      current += char;
    }
  }

  // Add remaining static text
  if (current.trim()) {
    conditionalClasses.push({ classes: current.trim() });
  }

  return conditionalClasses;
}

/**
 * Extract class strings from helper function arguments with their conditions
 * Handles: 'string', "string", `template`, condition && 'classes', x ? 'a' : 'b'
 */
function extractFromHelper(argsContent: string): ConditionalClass[] {
  const conditionalClasses: ConditionalClass[] = [];
  const trimmedContent = argsContent.trim();

  // Check if the entire argument is an array literal: clsx([...])
  if (trimmedContent.startsWith('[') && trimmedContent.endsWith(']')) {
    // Extract array contents
    const arrayContent = trimmedContent.slice(1, -1).trim();
    const arrayArgs = splitTopLevelArgs(arrayContent);

    for (const arg of arrayArgs) {
      const trimmed = arg.trim();
      if (!trimmed) continue;

      const conditional = parseConditionalExpression(trimmed);
      if (conditional) {
        conditionalClasses.push(...conditional);
      }
    }

    return conditionalClasses;
  }

  // Otherwise, parse as regular comma-separated arguments
  const args = splitTopLevelArgs(argsContent);

  for (const arg of args) {
    const trimmed = arg.trim();
    if (!trimmed) continue;

    // Check if this individual argument is an array: clsx('a', ['b', 'c'])
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      const arrayContent = trimmed.slice(1, -1).trim();
      const arrayArgs = splitTopLevelArgs(arrayContent);

      for (const arrayArg of arrayArgs) {
        const arrayTrimmed = arrayArg.trim();
        if (!arrayTrimmed) continue;

        const conditional = parseConditionalExpression(arrayTrimmed);
        if (conditional) {
          conditionalClasses.push(...conditional);
        }
      }
      continue;
    }

    // Try to extract conditional patterns
    const conditional = parseConditionalExpression(trimmed);
    if (conditional) {
      conditionalClasses.push(...conditional);
    }
  }

  return conditionalClasses;
}

/**
 * Split arguments by comma at top level (respecting nested structures)
 */
function splitTopLevelArgs(argsContent: string): string[] {
  const args: string[] = [];
  let current = '';
  let depth = 0;
  let inString: false | '"' | "'" | '`' = false;

  for (let i = 0; i < argsContent.length; i++) {
    const char = argsContent[i];
    const prevChar = i > 0 ? argsContent[i - 1] : '';

    // Handle strings
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = char;
      current += char;
    } else if (inString && char === inString && prevChar !== '\\') {
      inString = false;
      current += char;
    } else if (inString) {
      current += char;
    }
    // Handle nesting
    else if (char === '(' || char === '[' || char === '{') {
      depth++;
      current += char;
    } else if (char === ')' || char === ']' || char === '}') {
      depth--;
      current += char;
    }
    // Split on comma at top level
    else if (char === ',' && depth === 0) {
      if (current.trim()) {
        args.push(current);
      }
      current = '';
    } else {
      current += char;
    }
  }

  // Add remaining
  if (current.trim()) {
    args.push(current);
  }

  return args;
}

/**
 * Parse a conditional expression and extract classes with conditions
 * Handles:
 *   - 'simple string' -> { classes: 'simple string' }
 *   - isActive && 'classes' -> { classes: 'classes', condition: 'isActive' }
 *   - x ? 'a' : 'b' -> [{ classes: 'a', condition: 'x' }, { classes: 'b', condition: '!x' }]
 */
function parseConditionalExpression(expr: string): ConditionalClass[] | null {
  const trimmed = expr.trim();

  // Pattern 0: Object syntax { 'class': condition }
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return parseObjectSyntax(trimmed);
  }

  // Pattern 1: Simple string literal
  const stringMatch = trimmed.match(/^(['"`])(.+)\1$/);
  if (stringMatch) {
    const classString = stringMatch[2];
    if (classString.trim()) {
      return [{ classes: classString }];
    }
    return null;
  }

  // Pattern 2: condition && 'classes'
  // Match: <condition> && <string>
  const andMatch = trimmed.match(/^(.+?)\s*&&\s*(['"`])(.+?)\2$/);
  if (andMatch) {
    const condition = andMatch[1].trim();
    const classes = andMatch[3];
    if (classes.trim()) {
      return [{ classes, condition: cleanCondition(condition) }];
    }
    return null;
  }

  // Pattern 3: condition || 'fallback' (logical OR)
  const orMatch = parseOrExpression(trimmed);
  if (orMatch) {
    return orMatch;
  }

  // Pattern 4: condition ?? 'fallback' (nullish coalescing)
  const nullishMatch = parseNullishCoalescing(trimmed);
  if (nullishMatch) {
    return nullishMatch;
  }

  // Pattern 5: condition ? 'classes-a' : 'classes-b' (including nested)
  // This is more complex - need to find the ? and : at the right depth
  const ternaryMatch = parseTernary(trimmed);
  if (ternaryMatch) {
    return ternaryMatch;
  }

  // Pattern 4: Template literal - extract with conditionals
  if (trimmed.startsWith('`') && trimmed.endsWith('`')) {
    const templateContent = trimmed.slice(1, -1);
    return extractFromTemplateLiteral(templateContent);
  }

  return null;
}

/**
 * Parse object syntax: { 'class1': condition1, 'class2': condition2 }
 * Common with classnames library
 */
function parseObjectSyntax(expr: string): ConditionalClass[] | null {
  // Remove outer braces
  const content = expr.slice(1, -1).trim();
  if (!content) return null;

  const result: ConditionalClass[] = [];
  let current = '';
  let inString: false | '"' | "'" | '`' = false;
  let depth = 0;

  // Split by commas at the top level
  const entries: string[] = [];

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const prevChar = i > 0 ? content[i - 1] : '';

    // Track strings
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = char;
      current += char;
    } else if (inString && char === inString && prevChar !== '\\') {
      inString = false;
      current += char;
    } else if (inString) {
      current += char;
    }
    // Track nesting
    else if (char === '{' || char === '[' || char === '(') {
      depth++;
      current += char;
    } else if (char === '}' || char === ']' || char === ')') {
      depth--;
      current += char;
    }
    // Split on comma at top level
    else if (char === ',' && depth === 0) {
      if (current.trim()) {
        entries.push(current.trim());
      }
      current = '';
    } else {
      current += char;
    }
  }

  // Add remaining
  if (current.trim()) {
    entries.push(current.trim());
  }

  // Parse each entry: 'className': condition
  for (const entry of entries) {
    const colonIdx = entry.indexOf(':');
    if (colonIdx === -1) continue;

    const keyPart = entry.slice(0, colonIdx).trim();
    const valuePart = entry.slice(colonIdx + 1).trim();

    // Extract class name from key (remove quotes)
    const classMatch = keyPart.match(/^(['"`])(.+?)\1$/);
    if (!classMatch) continue;

    const className = classMatch[2];

    // Parse the condition value
    if (valuePart === 'true') {
      // Always applied
      result.push({ classes: className });
    } else if (valuePart === 'false') {
      // Never applied - skip it
      continue;
    } else {
      // It's a condition
      result.push({
        classes: className,
        condition: cleanCondition(valuePart),
      });
    }
  }

  return result.length > 0 ? result : null;
}

/**
 * Parse logical OR expression: condition || 'fallback'
 * Shows fallback as conditional on !condition
 */
function parseOrExpression(expr: string): ConditionalClass[] | null {
  let depth = 0;
  let inString: false | '"' | "'" | '`' = false;
  let orIdx = -1;

  for (let i = 0; i < expr.length - 1; i++) {
    const char = expr[i];
    const nextChar = expr[i + 1];
    const prevChar = i > 0 ? expr[i - 1] : '';

    // Track strings
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = char;
    } else if (inString && char === inString && prevChar !== '\\') {
      inString = false;
    } else if (inString) {
      continue;
    }

    // Track nesting
    if (char === '(' || char === '[' || char === '{') {
      depth++;
    } else if (char === ')' || char === ']' || char === '}') {
      depth--;
    }

    // Find || at depth 0
    if (depth === 0 && char === '|' && nextChar === '|' && orIdx === -1) {
      orIdx = i;
      break;
    }
  }

  if (orIdx !== -1) {
    const condition = expr.slice(0, orIdx).trim();
    const fallback = expr.slice(orIdx + 2).trim();

    const result: ConditionalClass[] = [];

    // The fallback applies when condition is falsy
    const fallbackClasses = extractStringLiteral(fallback);
    if (fallbackClasses) {
      result.push({
        classes: fallbackClasses,
        condition: `!${cleanCondition(condition)}`,
      });
    }

    return result.length > 0 ? result : null;
  }

  return null;
}

/**
 * Parse nullish coalescing: condition ?? 'fallback'
 * Shows fallback as conditional on condition being null/undefined
 */
function parseNullishCoalescing(expr: string): ConditionalClass[] | null {
  let depth = 0;
  let inString: false | '"' | "'" | '`' = false;
  let nullishIdx = -1;

  for (let i = 0; i < expr.length - 1; i++) {
    const char = expr[i];
    const nextChar = expr[i + 1];
    const prevChar = i > 0 ? expr[i - 1] : '';

    // Track strings
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = char;
    } else if (inString && char === inString && prevChar !== '\\') {
      inString = false;
    } else if (inString) {
      continue;
    }

    // Track nesting
    if (char === '(' || char === '[' || char === '{') {
      depth++;
    } else if (char === ')' || char === ']' || char === '}') {
      depth--;
    }

    // Find ?? at depth 0
    if (depth === 0 && char === '?' && nextChar === '?' && nullishIdx === -1) {
      nullishIdx = i;
      break;
    }
  }

  if (nullishIdx !== -1) {
    const condition = expr.slice(0, nullishIdx).trim();
    const fallback = expr.slice(nullishIdx + 2).trim();

    const result: ConditionalClass[] = [];

    // The fallback applies when condition is null/undefined
    const fallbackClasses = extractStringLiteral(fallback);
    if (fallbackClasses) {
      result.push({
        classes: fallbackClasses,
        condition: `${cleanCondition(condition)} == null`,
      });
    }

    return result.length > 0 ? result : null;
  }

  return null;
}

/**
 * Parse ternary expression: condition ? 'a' : 'b'
 * Now supports nested/chained ternaries
 */
function parseTernary(expr: string): ConditionalClass[] | null {
  let depth = 0;
  let inString: false | '"' | "'" | '`' = false;
  let questionIdx = -1;
  let colonIdx = -1;

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    const prevChar = i > 0 ? expr[i - 1] : '';

    // Track strings
    if (!inString && (char === '"' || char === "'" || char === '`')) {
      inString = char;
    } else if (inString && char === inString && prevChar !== '\\') {
      inString = false;
    } else if (inString) {
      continue;
    }

    // Track nesting
    if (char === '(' || char === '[' || char === '{') {
      depth++;
    } else if (char === ')' || char === ']' || char === '}') {
      depth--;
    }

    // Find ? and : at depth 0
    if (depth === 0 && char === '?' && questionIdx === -1) {
      questionIdx = i;
    } else if (
      depth === 0 &&
      char === ':' &&
      questionIdx !== -1 &&
      colonIdx === -1
    ) {
      colonIdx = i;
    }
  }

  if (questionIdx !== -1 && colonIdx !== -1) {
    const condition = expr.slice(0, questionIdx).trim();
    const trueCase = expr.slice(questionIdx + 1, colonIdx).trim();
    const falseCase = expr.slice(colonIdx + 1).trim();

    const result: ConditionalClass[] = [];

    // Extract classes from true case
    const trueClasses = extractStringLiteral(trueCase);
    if (trueClasses) {
      result.push({
        classes: trueClasses,
        condition: cleanCondition(condition),
      });
    }

    // Extract classes from false case
    // Check if false case is another ternary (nested/chained)
    const falseCaseNested = parseTernary(falseCase);
    if (falseCaseNested) {
      // It's a nested ternary - add all its results with updated conditions
      for (const nested of falseCaseNested) {
        if (nested.condition) {
          // Combine conditions: "!mainCondition && nestedCondition"
          result.push({
            classes: nested.classes,
            condition: `!${cleanCondition(condition)} && ${nested.condition}`,
          });
        } else {
          // Simple nested value
          result.push({
            classes: nested.classes,
            condition: `!${cleanCondition(condition)}`,
          });
        }
      }
    } else {
      // Not a nested ternary, extract as simple string
      const falseClasses = extractStringLiteral(falseCase);
      if (falseClasses) {
        result.push({
          classes: falseClasses,
          condition: `!${cleanCondition(condition)}`,
        });
      }
    }

    return result.length > 0 ? result : null;
  }

  return null;
}

/**
 * Extract string literal value from expression
 */
function extractStringLiteral(expr: string): string | null {
  const trimmed = expr.trim();
  const match = trimmed.match(/^(['"`])(.+?)\1$/);
  return match ? match[2] : null;
}

/**
 * Clean up condition for display
 */
function cleanCondition(condition: string): string {
  return condition
    .replace(/^\(+|\)+$/g, '') // Remove outer parens
    .trim();
}

/**
 * Find extraction at a specific position in the text
 */
export function findExtractionAtPosition(
  extractions: ClassExtraction[],
  position: number
): ClassExtraction | undefined {
  return extractions.find(
    (ext) => position >= ext.range.start && position <= ext.range.end
  );
}

/**
 * Combine multiple class strings into one, removing duplicates
 */
export function combineClassStrings(classStrings: string[]): string {
  const allClasses = new Set<string>();

  for (const str of classStrings) {
    const classes = str.split(/\s+/).filter((c) => c.trim());
    classes.forEach((c) => allClasses.add(c));
  }

  return Array.from(allClasses).join(' ');
}
