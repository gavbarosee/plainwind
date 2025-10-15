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

### Display Modes

Choose how translations appear:

- **CodeLens** — Translations appear above your className attributes
- **Hover** — Translations show only when you hover
- **Off** — Disable when you don't need it

### Detail Panels

Click any translation to open a detailed view. Multiple panels can be open simultaneously, each highlighting its corresponding line in your code.

### Category Grouping

Optionally organize translations by category (Layout, Spacing, Colors, Typography, etc.) for better readability with complex class strings.

### File-Level Control

Disable Plainwind for specific files. Useful for generated code or large files where you don't need assistance.

## Getting Started

1. Install Plainwind from the VS Code Marketplace
2. Open a file containing Tailwind classes
3. Translations appear automatically

No configuration required.

## Usage

### Viewing Translations

**CodeLens mode:**
Click the translation text above your className to open a detail panel.

**Hover mode:**
Hover over any className attribute and click "Toggle Details" in the tooltip.

### Quick Settings

Click **Plainwind** in the status bar (bottom right) to access:
- Enable/disable extension
- Change display mode
- Toggle category grouping
- Per-file controls
- Clear all panels

### Command Palette

All commands are available via `⌘⇧P` (macOS) or `Ctrl+Shift+P` (Windows/Linux):

```
Plainwind: Show Options Menu
Plainwind: Choose Display Mode
Plainwind: Toggle Group By Category
Plainwind: Toggle for This File
Plainwind: Clear All Detail Panels
```

## Configuration

### Settings

Configure via VS Code Settings or the status bar menu.

**`plainwind.enabled`**  
Type: `boolean` · Default: `true`  
Enable or disable the extension globally.

**`plainwind.displayMode`**  
Type: `"codelens" | "hover" | "off"` · Default: `"codelens"`  
How translations are displayed.

**`plainwind.groupByCategory`**  
Type: `boolean` · Default: `true`  
Group translations by category (Layout, Spacing, Colors, etc.).

**`plainwind.showCategoryEmojis`**  
Type: `boolean` · Default: `false`  
Show emojis next to category names. Only works when grouping is enabled.

### Keyboard Shortcuts

Assign custom shortcuts to frequently used commands:

1. Open `Preferences → Keyboard Shortcuts`
2. Search for "Plainwind"
3. Set your preferred bindings

## Supported File Types

- JavaScript React (`.jsx`)
- TypeScript React (`.tsx`)
- JavaScript (`.js`)
- TypeScript (`.ts`)
- HTML (`.html`)
- Vue (`.vue`)
- Svelte (`.svelte`)

## Advanced

### Variants

Plainwind understands all Tailwind variants:

```
hover:bg-blue-500     → "on hover: background blue 500"
md:flex               → "on medium screens and up: display as flex"
dark:bg-slate-900     → "in dark mode: background darkest slate"
focus:ring-2          → "on focus: ring width 2px"
group-hover:opacity-100
first:mt-0
peer-focus:border-blue-500
```

### Arbitrary Values

Works with arbitrary values:

```
w-[500px]             → "width 500px"
bg-[#1a1a1a]          → "background #1a1a1a"
p-[2.5rem]            → "padding 2.5rem"
```

### Modifiers

Handles important and opacity modifiers:

```
!bg-red-500           → "background red 500 !important"
bg-blue-500/50        → "background blue 500 with 50% opacity"
```

## Tips

**Performance:** Disable Plainwind for large auto-generated files using the per-file toggle.

**Multiple Panels:** Open several detail panels to compare different className blocks side by side.

**Context Switching:** Use hover mode when you want minimal visual clutter but occasional assistance.

## Contributing

Issues and pull requests are welcome.

## License

ISC
