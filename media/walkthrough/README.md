# Walkthrough Media Assets

This directory is reserved for GIF animations for the VS Code walkthrough feature.

**Current Status:** The walkthrough currently uses markdown/text demonstrations instead of GIFs, so it works immediately without media files. You can optionally add GIFs later for enhanced visual demos.

## Required GIFs

Create the following GIF recordings to demonstrate Plainwind features:

### 1. `click-codelens.gif`
**Show:** Clicking on a CodeLens translation to open detail panel
- Open a file with Tailwind classes
- Hover over a CodeLens translation (shows underline)
- Click it
- Detail panel opens to the side
- **Duration:** ~5 seconds
- **Dimensions:** 800x600px recommended

### 2. `status-bar.gif`
**Show:** Accessing settings via status bar
- Show cursor moving to bottom-right status bar
- Click "～ Plainwind"
- Options menu appears
- Highlight a few options (hover over them)
- **Duration:** ~5 seconds
- **Dimensions:** 800x600px recommended

### 3. `multiple-panels.gif`
**Show:** Opening multiple panels for comparison
- Click on first CodeLens → panel opens
- Click on second CodeLens → second panel opens as tab
- Click on third CodeLens → third panel opens
- Switch between tabs
- Click "Close all tabs" button
- **Duration:** ~8 seconds
- **Dimensions:** 1200x800px recommended (wider for multiple panels)

### 4. `display-modes.gif`
**Show:** Switching between CodeLens and Hover modes
- Show CodeLens mode (translations visible above code)
- Open status bar menu
- Select "Choose Display Mode"
- Switch to "Hover"
- Show hovering over className to see translation
- **Duration:** ~8 seconds
- **Dimensions:** 800x600px recommended

### 5. `settings.gif`
**Show:** Various customization options
- Open settings menu
- Show "Set CodeLens Truncation Length" with presets
- Show "Toggle Group By Category"
- Show "Toggle Visual Enhancements"
- Maybe show enhanced panel with colors/fonts
- **Duration:** ~10 seconds
- **Dimensions:** 1000x700px recommended

## Recording Tips

- **Tool recommendations:**
  - macOS: QuickTime, Kap, or Gifski
  - Windows: ScreenToGif, LICEcap
  - Linux: Peek, SimpleScreenRecorder + gifski
  
- **Settings:**
  - FPS: 15-20 (enough for smooth UI, keeps file size down)
  - Quality: Medium-high (VS Code will resize if needed)
  - Loop: Yes (GIFs should loop continuously)
  
- **Best practices:**
  - Use a clean VS Code theme (light or dark)
  - Clear, simple example code
  - Slow, deliberate cursor movements
  - Pause briefly at key moments
  - Keep file sizes under 2MB per GIF

## Placeholder Images

Until GIFs are created, you can use static placeholder images with the same names (.png format works too):
- VS Code will display them as fallbacks
- Just make sure they show the key UI element being demonstrated

