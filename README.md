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

JavaScript/TypeScript (`.js`, `.ts`, `.jsx`, `.tsx`), HTML, Vue, Svelte

## Advanced

Handles all Tailwind features:
- **Variants** — `hover:`, `md:`, `dark:`, `group-hover:`, etc.
- **Arbitrary values** — `w-[500px]`, `bg-[#1a1a1a]`
- **Modifiers** — `!important`, opacity (`/50`)

## Tips

- Disable for auto-generated files via status bar
- Open multiple detail panels to compare class strings
- Use hover mode for minimal clutter

## Contributing

Issues and pull requests are welcome.

## License

ISC
