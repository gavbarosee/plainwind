# Plainwind

[![Version](https://img.shields.io/visual-studio-marketplace/v/plainwind.plainwind?color=blue)](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/plainwind.plainwind)](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/plainwind.plainwind)](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
[![License](https://img.shields.io/badge/license-ISC-green)](LICENSE)

Translate Tailwind CSS classes to plain English directly in your editor.

<div align="center">
  <img src="path/to/demo.gif" alt="Plainwind Demo" width="800">
  <p><em>See translations inline as you code</em></p>
</div>

**[📖 Full Documentation](https://plainwind.dev)** • **[🐛 Report Issue](https://github.com/gavbarosee/plainwind/issues)** • **[💬 Discussions](https://github.com/gavbarosee/plainwind/discussions)**

## Overview

Plainwind helps you understand Tailwind classes without leaving your code. Instead of mentally parsing `flex items-center justify-between px-4 py-2`, you'll see exactly what it does in readable English.

```jsx
<div className="flex items-center gap-4 rounded-lg border border-slate-200 px-4 py-2">

// You'll see with Plainwind:
// → "flexbox container, centers items along cross axis, gap 1rem, 
//    rounded corners large, has border, border light slate, 
//    horizontal padding 1rem, vertical padding 0.5rem"
```

## Quick Start

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
2. Open any file with Tailwind classes
3. See translations appear automatically

That's it. No configuration required.

**[👉 View full getting started guide](https://plainwind.dev/getting-started)**

## Features

### Conditional Detection

Plainwind understands when classes apply conditionally. You'll see the conditions alongside your translations:

```tsx
<button className={clsx(
  'px-4 py-2 rounded-md',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50'
)}>
```

You'll see: `padding, rounded corners | blue background, white text (if isActive) | 50% opacity (if isDisabled)`

Works with all the patterns you actually use:
- Ternaries (`x ? 'a' : 'b'`), including nested
- Logical operators (`&&`, `||`, `??`)
- Object syntax (`{ 'class': condition }`)
- Array syntax (`['class1', 'class2']`)
- Template literals (`` `flex ${dynamic}` ``)

Supports `clsx`, `classnames`, `cn`, `twMerge`, `cva`, and `tw`.

**[Learn more about conditional detection →](https://plainwind.dev/features#conditional-detection)**

### Display Modes

Choose how you want to see translations:
- **CodeLens** — Always visible above className attributes
- **Hover** — Show only when you hover
- **Off** — Disable when you don't need it

**[See display modes in action →](https://plainwind.dev/features#display-modes)**

### Smart Features

- **Category Grouping** — Organize by Layout, Spacing, Colors, and Typography
- **File-Level Control** — Disable for specific files via status bar
- **Detail Panels** — Click any translation to see full breakdowns
- **Visual Enhancements** — Color swatches and font previews

**[Explore all features →](https://plainwind.dev/features)**

### Framework Support

Works seamlessly with React, Vue, Svelte, Angular, Solid.js, and standard HTML.

**[View framework examples →](https://plainwind.dev/frameworks)**

## Documentation

For complete guides, configuration options, and examples:

- **[Getting Started](https://plainwind.dev/getting-started)** — Installation and first use
- **[Features](https://plainwind.dev/features)** — Display modes, detail panels, and more
- **[Configuration](https://plainwind.dev/configuration)** — Settings and keyboard shortcuts
- **[Framework Support](https://plainwind.dev/frameworks)** — React, Vue, Svelte, Angular, Solid examples
- **[Contributing](https://plainwind.dev/contributing)** — Development setup and guidelines

## Quick Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `plainwind.enabled` | `true` | Enable/disable globally |
| `plainwind.displayMode` | `codelens` | Choose `codelens`, `hover`, or `off` |
| `plainwind.groupByCategory` | `true` | Group by Layout, Spacing, Colors, etc. |
| `plainwind.showCategoryEmojis` | `false` | Show emojis in category labels |

**[View all configuration options →](https://plainwind.dev/configuration)**

## Development

### Prerequisites

- Node.js 18 or later
- npm (or a compatible package manager)
- VS Code

### Setup

```bash
git clone https://github.com/gavbarosee/plainwind.git
cd plainwind
npm install
npm run compile
npm run watch  # Watch mode for development
```

### Testing

Plainwind has a comprehensive test suite with 512+ tests.

```bash
# Run all tests
npm test

# Run with coverage report
npm run test:coverage

# Run performance benchmarks
npx vitest bench

# Interactive test UI
npx vitest --ui
```

**Test Suite:**
- ✅ 512 tests across 14 test files
- ✅ 70%+ coverage on core functionality
- ✅ Performance benchmarks for critical paths
- ✅ Framework-specific tests (React, Vue, Svelte, Angular, Solid)
- ✅ Integration & unit tests for all features

See [tests/README.md](tests/README.md) for more details.

### Project Structure

```
plainwind/
├── src/                      # Extension source code
│   ├── core/                # Core functionality
│   │   ├── parsing/         # Class extraction from files
│   │   └── translation/     # Translation engine
│   │       ├── categorizer/ # Category grouping
│   │       ├── engine/      # Main translation logic
│   │       └── rules/       # Translation rules & patterns
│   ├── vscode/              # VS Code integration
│   │   ├── commands/        # Extension commands
│   │   └── ui/              # UI components (codelens, hover, panel)
│   └── extension.ts         # Extension entry point
│
├── tests/                   # Test suite
│   ├── _support/            # Test utilities & fixtures
│   ├── core/                # Core functionality tests
│   ├── translation/         # Translation engine tests
│   └── performance/         # Performance benchmarks
│
├── out/                     # Compiled JavaScript (gitignored)
└── package.json             # Extension manifest & dependencies
```

### Code Quality

```bash
# Lint
npm run lint

# Fix lint issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### Git Workflow

This project uses [Conventional Commits](https://www.conventionalcommits.org/) with [Husky](https://typicode.github.io/husky/) for commit linting:

```bash
feat: add support for Solid.js
fix: correct hover positioning
docs: update README
test: add categorization tests
```

Commits are linted automatically. Invalid formats will be rejected.

## Contributing

We'd love your help making Plainwind better.

**Quick start:**
```bash
git clone https://github.com/gavbarosee/plainwind.git
cd plainwind
npm install
npm run compile
```

Press `F5` in VS Code to launch the extension in debug mode.

**[Read the full contributing guide →](https://plainwind.dev/contributing)**

See [tests/README.md](tests/README.md) for testing guidelines and [CONTRIBUTING.md](CONTRIBUTING.md) for detailed contribution workflows.

## License

ISC
