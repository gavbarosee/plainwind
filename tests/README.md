# Testing

## Quick Start

```bash
npm test                    # Run all tests
npm run test:coverage       # Generate coverage report
npx vitest --ui             # Open interactive test UI
```

## How It's Organized

The test suite mirrors the source code structure, making it easy to find what you need:

```
tests/
├── _support/              # Your testing toolkit
│   ├── cases/            # Pre-built test datasets
│   ├── testUtils.ts      # Reusable helpers (use these!)
│   ├── fixtures.ts       # Sample data
│   ├── setup.ts          # Global config
│   └── classBuilder.ts   # Build test classes programmatically
│
├── core/                  # Core functionality tests
│   └── parsing/          # Class extraction and parsing
│
├── translation/           # Translation engine tests
│   ├── categorizer/      # How we group classes
│   ├── patterns/         # Pattern matching
│   └── translator/       # The actual translation logic
│
└── performance/           # Speed benchmarks
```

## Writing Tests

### Save Time with Helpers

I've built helpers to eliminate boilerplate. Please use them:

```typescript
import { testCategorization, testPatternMatch, testFlexibleMatch } from '@tests/_support/testUtils';

// Categorization tests
it.each(LAYOUT_CASES)(
  'categorizes %s as %s',
  testCategorization(categorizeClass)
);

// Pattern matching
it.each(SPACING_CASES)(
  '%s -> %s',
  testPatternMatch(matchSpacingPattern)
);

// Flexible assertions (exact or contains)
it.each(MATCHER_CASES)(
  '%s -> %s (%s)',
  testFlexibleMatch(translateBaseClass)
);
```

### Available Helpers

| Helper | What It Does |
|--------|--------------|
| `testCategorization` | Tests category assignment |
| `testPatternMatch` | Tests if result contains expected string |
| `testPatternNoMatch` | Tests for null results |
| `testExactMatch` | Tests for exact string matches |
| `testFlexibleMatch` | Tests exact or contains based on parameter |

### Use Pre-Built Test Data

Don't create test data from scratch as you've already got datasets ready to go:

```typescript
import {
  CATEGORIZE_LAYOUT_CASES,
  MATCHER_BORDER_CASES,
  SPACING_NUMERIC_PADDING_CASES,
} from '@tests/_support/cases';
```

### Build Classes Programmatically

Need to generate test classes dynamically? Use `ClassBuilder`:

```typescript
import { ClassBuilder } from '@tests/_support/classBuilder';

const classes = new ClassBuilder()
  .flex()
  .itemsCenter()
  .gap(4)
  .px(4)
  .bg('blue-500')
  .hover('bg-blue-600')
  .toString();
// Result: "flex items-center gap-4 px-4 bg-blue-500 hover:bg-blue-600"
```

## Performance Testing

Want to know if your changes are fast? Run the benchmarks:

```bash
npx vitest bench                          # Run all benchmarks
npx vitest bench translation.bench.ts     # Run specific suite
npx vitest bench --watch                  # Watch mode
```

We benchmark three areas:
- **Translation**: Converting classes to English
- **Extraction**: Parsing classes from source files
- **Categorization**: Grouping classes by type

## Coverage Reports

See what's tested and what's not:

```bash
npm run test:coverage
open coverage/index.html
```

Current coverage:
- **71.51%** lines (target: 70%) ✓
- **96.61%** functions (target: 70%) ✓
- **45.53%** branches (lower due to untested UI code)
- **71.51%** statements (target: 70%) ✓

## Writing Good Tests

### Descriptive Names

Your test names are documentation. Please try make them clear:

```typescript
// Good ✓
it('should translate flex to flexbox')
it('should handle arbitrary values like w-[500px]')
it('should return original class when no translation exists')

// Not great ✗
it('works')
it('test flex')
```

### File Structure

Starting a new test file? Here's the template:

```typescript
/**
 * Tests for [feature name]
 * 
 * Brief description and link to source.
 * 
 * @see src/path/to/source.ts
 */

import { describe, it, expect } from 'vitest';
import { functionToTest } from '@src/path';

describe('functionToTest', () => {
  it('should handle basic case', () => {
    expect(functionToTest('input')).toBe('expected');
  });
});
```

### Large Test Datasets

Got a lot of test cases? Please extract them to `tests/_support/cases/`:

```typescript
// tests/_support/cases/my-feature.ts
export const MY_FEATURE_CASES: Array<[string, string]> = [
  ['input1', 'output1'],
  ['input2', 'output2'],
];

// Don't forget to re-export from tests/_support/cases/index.ts
```

## Debugging

### Run a Single File

```bash
npx vitest tests/translation/translator/unit/matchers.test.ts
```

### Debug in VS Code

1. Set a breakpoint in your test
2. Open JavaScript Debug Terminal
3. Run `npm test`

### Focus on Specific Tests

Need to iterate on one test? Use `.only`:

```typescript
it.only('should test specific case', () => {
  // Only this test runs
});
```

Just remember to remove `.only` before committing!

## Common Patterns

### Mocking vscode

Most tests need the vscode API mocked (we handle this in `setup.ts`):

```typescript
import { vi } from 'vitest';
import * as vscode from 'vscode';

vi.mock('vscode', () => ({
  workspace: {
    getConfiguration: vi.fn(),
  },
}));
```

### Clean Imports

Use the configured path aliases:

```typescript
import { translateClasses } from '@src/core/translation/engine';
import { testCategorization } from '@tests/_support/testUtils';
```

## Need Help?

### Project Resources
- [Report an issue](https://github.com/gavbarosee/plainwind/issues) - Found a bug or have a feature request?
- [Start a discussion](https://github.com/gavbarosee/plainwind/discussions) - Questions, ideas, or feedback
- [View source](https://github.com/gavbarosee/plainwind) - Explore the codebase

### Testing Resources
- [Vitest docs](https://vitest.dev/) - The test framework we use
- [Testing best practices](https://github.com/goldbergyoni/javascript-testing-best-practices) - General testing wisdom
- [VS Code extension testing](https://code.visualstudio.com/api/working-with-extensions/testing-extension) - Extension-specific guidance

## Contributing

Adding a feature? Here's the flow:

1. Use existing helpers and patterns
2. Add test data to `_support/cases/` if you have lots of cases
3. Make sure everything passes: `npm test`
4. Check coverage: `npm run test:coverage`

The test suite exists to help you ship with confidence. Please use it, and feel free to improve it.
