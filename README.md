

<div align="center">

<img width="auto" height="100px" alt="Plainwind" src="https://github.com/user-attachments/assets/9cbb32dd-967c-4f87-8b38-bd1eaeada2b5" />



Translate Tailwind CSS classes to plain English directly in your editor.

**[Full Documentation](https://plainwind.dev)** • **[Report Issue](https://github.com/gavbarosee/plainwind/issues)** • **[Discussions](https://github.com/gavbarosee/plainwind/discussions)**

[![Version](https://img.shields.io/visual-studio-marketplace/v/plainwind.plainwind?color=blue)](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/plainwind.plainwind)](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/plainwind.plainwind)](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
</div>







## What It Does

Plainwind translates Tailwind CSS classes to plain English directly in your editor.

**From complex Tailwind classes:**
```jsx
<div className="fixed bottom-0 right-0 flex items-center justify-between gap-8 p-12 backdrop-blur-3xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-rose-500/20 border border-white/30 shadow-2xl rounded-3xl -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-700 z-50">
```

**To simplified, plain English translations:**
```
Layout: 
  fixed to viewport (stays visible when scrolling page)

Positioning: 
  positioned at bottom edge, positioned at right edge, stacks on top of everything (z-index 50)

Flexbox & Grid: 
  flexbox container, items aligned to center, spread items across full width (space between), 
  2rem space between items

Spacing: 
  3rem padding on all sides

Filters: 
  3x extra large blur behind element (maximum blur)

Backgrounds: 
  gradient flowing to bottom-right corner, gradient starts at purple with 20% opacity, 
  gradient passes through pink with 20% opacity, gradient ends at rose with 20% opacity

Borders: 
  border on all sides, white border with 30% opacity, 3x large rounded corners

Effects: 
  2x extra large box shadow (dramatic elevation)

Transforms: 
  slight tilt counterclockwise (-2°), [Hover] no rotation (0°), [Hover] slightly enlarged (105% size)

Animation: 
  smoothly animates all property changes, very slow animation (700ms)
```

## Features

### Display Modes

Plainwind gives you three ways to view translations:

- **CodeLens** shows translations above className attributes. They're always visible, making it easy to learn Tailwind patterns.
- **Hover** shows translations only when you hover over a className. This keeps your editor clean while still giving you instant access.
- **Off** disables translations when you don't need them. The extension stays loaded for quick re-enabling.

<br />

<div align="center">
  <video src="https://github.com/user-attachments/assets/06b09524-676d-4b7b-8b1f-463c5e195291" autoplay loop muted playsinline></video>
  <p><em>Codelens display mode</em></p>
</div>

<br />

<div align="center">
  <video src="https://github.com/user-attachments/assets/a1c1e842-eceb-415a-a475-b59580630df2" autoplay loop muted playsinline></video>
  <p><em>Hover display mode</em></p>
</div>


**[See display modes →](https://plainwind.dev/features#display-modes)**

### Smart Features

Plainwind includes features that adapt to your workflow:

- **Category Grouping** organizes translations by Layout, Spacing, Colors, and Typography for easier scanning
- **File-Level Control** lets you disable Plainwind for specific files via the status bar
- **Detail Panels** open when you click any translation to show full breakdowns with copy buttons
- **Visual Enhancements** display actual color swatches and font previews in detail panels

**[Explore all features →](https://plainwind.dev/features)**

### Conditional Detection

Plainwind understands when classes apply conditionally. The translations show you the conditions alongside the styles:

```tsx
<button className={clsx(
  'px-4 py-2 rounded-md',
  isActive && 'bg-blue-500 text-white',
  isDisabled && 'opacity-50'
)}>
```

You'll see: 
```
Spacing: padding | Borders: rounded corners 
Colors: blue background, white text (if isActive) 
Interactivity: 50% opacity (if isDisabled)
```

Plainwind recognizes all the patterns you actually use:

- Ternaries (`x ? 'a' : 'b'`), including nested ternaries
- Logical operators (`&&`, `||`, `??`)
- Object syntax (`{ 'class': condition }`)
- Array syntax (`['class1', 'class2']`)
- Template literals (`` `flex ${dynamic}` ``)

Works with `clsx`, `classnames`, `cn`, `twMerge`, `cva`, and `tw`.

**[Learn more about conditional detection →](https://plainwind.dev/features#conditional-detection)**

### Framework Support

Works with React, Vue, Svelte, Angular, Solid.js, and standard HTML.

**[View framework examples →](https://plainwind.dev/frameworks)**

## Quick Start

1. Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=plainwind.plainwind)
2. Open any file with Tailwind classes
3. See translations appear automatically

That's it! No configuration required, but you can [customize it](https://plainwind.dev/configuration) to fit your workflow.

**[View full getting started guide](https://plainwind.dev/getting-started)**

## Documentation

Complete guides, configuration options, and framework examples:

- **[Getting Started](https://plainwind.dev/getting-started)** for installation and setup
- **[Features](https://plainwind.dev/features)** for display modes, detail panels, and conditional detection
- **[Configuration](https://plainwind.dev/configuration)** for settings and keyboard shortcuts
- **[Framework Support](https://plainwind.dev/frameworks)** for React, Vue, Svelte, Angular, and Solid examples
- **[Contributing](https://plainwind.dev/contributing)** for development setup and guidelines

## Commands

Access these commands via the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`):



https://github.com/user-attachments/assets/2bfc41cf-4b22-43ff-b72d-579f894778b2



| Command | Description |
|---------|-------------|
| `Plainwind: Show Options Menu` | Quick menu with all settings and options |
| `Plainwind: Choose Display Mode` | Switch between CodeLens, Hover, or Off |
| `Plainwind: Toggle Extension On/Off` | Enable/disable Plainwind globally |
| `Plainwind: Toggle for This File` | Enable/disable for current file only |
| `Plainwind: Disable for This File` | Disable Plainwind for current file |
| `Plainwind: Enable for This File` | Enable Plainwind for current file |
| `Plainwind: Toggle Group By Category` | Toggle category grouping on/off |
| `Plainwind: Toggle Category Emojis` | Show/hide emojis in category names |
| `Plainwind: Toggle Visual Enhancements In Detail Panel` | Toggle color, font, and spacing previews |
| `Plainwind: Set CodeLens Truncation Length` | Adjust when translations get truncated |
| `Plainwind: Clear All Detail Panels` | Close all open translation panels |

**Tip:** Use `Plainwind: Show Options Menu` for quick access to the most common settings.

## Quick Configuration

| Setting | Default | Description |
|---------|---------|-------------|
| `plainwind.enabled` | `true` | Enable/disable globally |
| `plainwind.displayMode` | `codelens` | Choose `codelens`, `hover`, or `off` |
| `plainwind.groupByCategory` | `true` | Group by Layout, Spacing, Colors, etc. |
| `plainwind.showCategoryEmojis` | `false` | Show emojis in category labels |

**[View all configuration options →](https://plainwind.dev/configuration)**

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

## Learn More

**[Visit the full documentation at plainwind.dev](https://plainwind.dev)** for detailed guides, configuration options, and framework-specific examples.

## License

MIT — see the LICENSE file for details.

Copyright © 2025 Gav Barosee
