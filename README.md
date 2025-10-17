# Plainwind

Translate Tailwind CSS classes to plain English directly in your editor.

## Overview

Plainwind helps you understand Tailwind classes without leaving your code. Instead of mentally parsing `flex items-center justify-between px-4 py-2`, you see exactly what it does in readable English.

```jsx
// Before
<div className="flex items-center gap-4 rounded-lg border border-slate-200 px-4 py-2">

// What you see with Plainwind
// → "flexbox container, centers items along cross axis, gap 1rem, 
//    rounded corners large, has border, border light slate, 
//    horizontal padding 1rem, vertical padding 0.5rem"
```

## Features

### Conditional Detection

Plainwind understands when classes apply. See the conditions alongside your translations:

```tsx
<button className={clsx(
  'px-4 py-2 rounded-md',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50'
)}>
```

Shows: `padding, rounded corners | blue background, white text (if isActive) | 50% opacity (if isDisabled)`

Works with all patterns developers actually use:
- Ternaries (`x ? 'a' : 'b'`), including nested
- Logical operators (`&&`, `||`, `??`)
- Object syntax (`{ 'class': condition }`)
- Array syntax (`['class1', 'class2']`)
- Template literals (`` `flex ${dynamic}` ``)

Supports `clsx`, `classnames`, `cn`, `twMerge`, `cva`, and `tw`.

### Display Modes

- **CodeLens** — Translations appear above your className attributes
- **Hover** — Translations show only when you hover
- **Off** — Disable when you don't need it

### Category Grouping

Organize translations by category (Layout, Spacing, Colors, Typography) for complex class strings.

### File-Level Control

Disable for specific files via status bar menu.

## Getting Started

1. Install Plainwind from the VS Code Marketplace
2. Open a file containing Tailwind classes
3. Translations appear automatically

No configuration required.

## Usage

**CodeLens** — Click translation text above className to open detail panel  
**Hover** — Hover and click "Toggle Details" in tooltip  
**Status bar** — Click **Plainwind** (bottom right) for quick settings  
**Command palette** — Search "Plainwind" in `⌘⇧P`/`Ctrl+Shift+P`

## Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `plainwind.enabled` | `true` | Enable/disable globally |
| `plainwind.displayMode` | `codelens` | `codelens`, `hover`, or `off` |
| `plainwind.groupByCategory` | `true` | Group by Layout, Spacing, Colors, etc. |
| `plainwind.showCategoryEmojis` | `false` | Show emojis in category labels |

Assign keyboard shortcuts: `Preferences → Keyboard Shortcuts → Search "Plainwind"`

## Supported File Types

JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`), HTML, Vue, Svelte, Angular

### Framework-Specific Support

- **React/JSX**: `className` attribute with all helper functions
- **Vue**: `:class` and `v-bind:class` with object and array syntax
- **Svelte**: `class:` directives for conditional classes
- **Angular**: `[ngClass]` and `[class.x]` bindings
- **Solid.js**: `classList` object syntax
- **HTML**: Standard `class` attribute

## Advanced

Handles all Tailwind features:
- **Variants** — `hover:`, `md:`, `dark:`, `group-hover:`, etc.
- **Arbitrary values** — `w-[500px]`, `bg-[#1a1a1a]`
- **Modifiers** — `!important`, opacity (`/50`)

## Tips

- Disable for auto-generated files via status bar
- Open multiple detail panels to compare class strings
- Use hover mode for minimal clutter

## Development

### Prerequisites

- Node.js 18+
- npm or compatible package manager
- VS Code (for extension development)

### Setup

```bash
# Clone the repository
git clone <repository-url>
cd plainwind

# Install dependencies
npm install

# Build the extension
npm run compile

# Watch for changes
npm run watch
```

### Testing

Plainwind has a comprehensive test suite with 512+ tests covering all functionality.

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

**Test Suite Highlights:**
- ✅ **512 tests** across 14 test files
- ✅ **70%+ coverage** on core functionality
- ✅ **Performance benchmarks** for critical paths
- ✅ **Framework-specific tests** (React, Vue, Svelte, Angular, Solid)
- ✅ **Integration & unit tests** for all features

See [tests/README.md](tests/README.md) for detailed testing documentation.

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

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and [Husky](https://typicode.github.io/husky/) for commit linting:

```bash
# Commit format
feat: add support for Solid.js
fix: correct hover positioning
docs: update README
test: add categorization tests
```

Commits are automatically linted on commit. Invalid formats will be rejected.

## Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Write tests for your changes
4. Implement your feature
5. Run tests: `npm test`
6. Run linter: `npm run lint`
7. Commit using conventional format
8. Submit a pull request

Please see [tests/README.md](tests/README.md) for testing guidelines.

## License

ISC
