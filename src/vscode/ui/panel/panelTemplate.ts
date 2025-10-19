/**
 * HTML/CSS template for the Tailwind class detail panel
 *
 * Generates a styled webview panel showing:
 * - Original Tailwind classes in a code block
 * - Translated plain English, formatted by category
 * - Color names highlighted with their actual colors
 * - Button to close all panels
 *
 * Design philosophy:
 * - Uses VS Code theme variables for consistent appearance
 * - Responsive layout with proper spacing
 * - Category-based formatting for readability
 * - Visual color indicators for better UX
 * - Inter-process messaging for panel interactions
 */

import { enhanceTranslation } from './enhancements';

/**
 * Escape HTML special characters to prevent XSS
 *
 * @param text - Raw text that may contain HTML characters
 * @returns HTML-safe string
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generate webview HTML content for displaying full translation
 *
 * Translation formatting:
 * - Splits by pipe separator (categories are joined with " | ")
 * - Each category gets its own line
 * - Category names are bolded
 * - Uses flexbox for proper alignment
 * - Optionally applies visual enhancements (colors, fonts, spacing)
 *
 * Webview messaging:
 * - Sends 'clearAll' message when button clicked
 * - Listens for 'updateCount' to update button text
 * - Sends 'ready' message when loaded
 * - Sends navigation and copy messages
 *
 * @param classString - Original Tailwind classes
 * @param translation - Translated plain English (may contain pipes)
 * @param panelCount - Number of open panels (for button text)
 * @param enhanceVisuals - Whether to apply visual enhancements (default: false)
 * @param panelIndex - Current panel's position (1-based)
 * @param sourceLocation - File path and line number of the source code
 * @returns Complete HTML string for webview
 */
export function generatePanelHTML(
  classString: string,
  translation: string,
  panelCount: number,
  enhanceVisuals: boolean = false,
  panelIndex: number = 1,
  sourceLocation?: { filePath: string; line: number },
  iconUri?: string
): string {
  /**
   * Format translation by splitting on pipe separator
   *
   * Translations are formatted as "Category: items | Category: items"
   * We split by pipe and format each category on its own line with
   * the category name bolded and color names highlighted.
   */
  const formattedTranslation = translation
    .split(' | ')
    .map((line) => {
      const escapedLine = escapeHtml(line);
      // Bold the category name (text before the first colon)
      const colonIndex = escapedLine.indexOf(':');
      if (colonIndex !== -1) {
        const category = escapedLine.substring(0, colonIndex);
        let rest = escapedLine.substring(colonIndex + 1).trim();

        // Apply visual enhancements if enabled
        if (enhanceVisuals) {
          rest = enhanceTranslation(rest);
        }

        return `<div class="category-line"><strong>${category}:</strong><span>${rest}</span></div>`;
      }

      let content = escapedLine;

      // Apply visual enhancements if enabled
      if (enhanceVisuals) {
        content = enhanceTranslation(content);
      }

      return `<div class="category-line"><span>${content}</span></div>`;
    })
    .join('');

  // Generate source location display (for top of panel)
  const sourceLocationHTML = sourceLocation
    ? `<div class="source-label-row">
        <div class="location-label">Source</div>
        <button class="btn" id="clearBtn" onclick="clearAll()">✕ ${panelCount === 1 ? 'Close tab' : 'Close all tabs'}</button>
      </div>
      <div class="source-section">
        <div class="source-container" title="${escapeHtml(sourceLocation.filePath)}:${sourceLocation.line}">
          ${escapeHtml(sourceLocation.filePath)}:${sourceLocation.line}
        </div>
      </div>`
    : `<div class="header-row">
        <div></div>
        <button class="btn" id="clearBtn" onclick="clearAll()">✕ ${panelCount === 1 ? 'Close tab' : 'Close all tabs'}</button>
      </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Plainwind</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            padding: 32px;
            font-family: var(--vscode-font-family), -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            font-size: var(--vscode-font-size, 13px);
            color: var(--vscode-editor-foreground);
            background-color: var(--vscode-editor-background);
            line-height: 1.6;
            margin: 0;
            -webkit-font-smoothing: antialiased;
        }
        .source-label-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .source-label-row .location-label {
            font-size: 11px;
            font-weight: 600;
            color: var(--vscode-descriptionForeground);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-top: 11px;
        }
        .source-section {
            margin-bottom: 32px;
        }
        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }
        .source-container {
            background-color: var(--vscode-textCodeBlock-background);
            border: 1px solid var(--vscode-panel-border);
            padding: 14px 18px;
            border-radius: 8px;
            font-family: var(--vscode-editor-font-family), 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 12px;
            color: var(--vscode-descriptionForeground);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .btn {
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            border: 1px solid var(--vscode-button-border);
            padding: 7px 14px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            font-family: inherit;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn:hover {
            background-color: var(--vscode-button-secondaryHoverBackground);
            border-color: var(--vscode-button-border);
            transform: translateY(-1px);
        }
        .btn:active {
            transform: translateY(0);
        }
        .btn.icon-btn {
            padding: 7px 10px;
            min-width: 32px;
        }
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .btn:disabled:hover {
            transform: none;
        }
        .label {
            font-size: 11px;
            font-weight: 600;
            color: var(--vscode-descriptionForeground);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 12px;
        }
        .code-block {
            position: relative;
            margin-bottom: 32px;
        }
        .code-block .copy-btn {
            position: absolute;
            top: 12px;
            right: 12px;
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            border: 1px solid var(--vscode-panel-border);
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 10px;
            font-weight: 500;
            font-family: inherit;
            transition: all 0.15s ease;
            opacity: 0;
        }
        .code-block:hover .copy-btn {
            opacity: 0.7;
        }
        .code-block .copy-btn:hover {
            opacity: 1;
            background-color: var(--vscode-button-secondaryHoverBackground);
            transform: translateY(-1px);
        }
        .code-block .copy-btn:active {
            transform: translateY(0);
        }
        .code-block .copy-btn.copied {
            background-color: var(--vscode-inputValidation-infoBackground);
            border-color: var(--vscode-inputValidation-infoBorder);
        }
        .class-string {
            background-color: var(--vscode-textCodeBlock-background);
            border: 1px solid var(--vscode-panel-border);
            padding: 18px;
            padding-right: 80px;
            border-radius: 8px;
            font-family: var(--vscode-editor-font-family), 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: var(--vscode-editor-font-size, 13px);
            line-height: 1.7;
            word-wrap: break-word;
            overflow-wrap: break-word;
            color: var(--vscode-editor-foreground);
        }
        .translation {
            background-color: var(--vscode-input-background);
            border: 1px solid var(--vscode-panel-border);
            padding: 20px;
            padding-right: 80px;
            border-radius: 8px;
            overflow-x: auto;
        }
        .category-line {
            padding: 10px 0;
            line-height: 1.65;
            font-size: 14px;
            border-bottom: 1px solid var(--vscode-widget-border);
            display: flex;
            gap: 12px;
        }
        .category-line:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        .category-line:first-child {
            padding-top: 0;
        }
        .category-line strong {
            color: var(--vscode-editor-foreground);
            font-weight: 600;
            flex-shrink: 0;
            min-width: 130px;
            letter-spacing: 0.01em;
        }
        .category-line span {
            flex: 1;
            word-wrap: break-word;
            overflow-wrap: break-word;
            color: var(--vscode-editor-foreground);
        }
        .color-text {
            font-weight: 600;
        }
        .color-text.color-transparent {
            color: var(--vscode-editor-foreground);
            opacity: 0.6;
        }
        .font-weight-demo {
            /* Font weight is applied inline via style attribute */
        }
        .spacing-value {
            color: var(--vscode-descriptionForeground);
            font-size: 0.9em;
            font-style: italic;
            opacity: 0.8;
        }
        .opacity-demo {
            /* Opacity is applied inline via style attribute */
        }
        .size-demo {
            /* Font size classes defined below */
        }
        .size-demo.size-xs {
            font-size: 0.75em;
        }
        .size-demo.size-sm {
            font-size: 0.875em;
        }
        .size-demo.size-lg {
            font-size: 1.125em;
        }
        .size-demo.size-xl {
            font-size: 1.25em;
        }
        .size-demo.size-2xl {
            font-size: 1.5em;
        }
        .size-demo.size-3xl {
            font-size: 1.75em;
        }
        .size-demo.size-4xl {
            font-size: 2em;
        }
        .size-demo.size-5xl {
            font-size: 2.5em;
        }
        .size-demo.size-6xl {
            font-size: 3em;
        }
        .radius-demo {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: var(--vscode-button-background);
            margin-left: 4px;
            vertical-align: middle;
            border: 1px solid var(--vscode-button-border);
        }
        .radius-demo.radius-sm {
            border-radius: 2px;
        }
        .radius-demo.radius-base {
            border-radius: 4px;
        }
        .radius-demo.radius-md {
            border-radius: 6px;
        }
        .radius-demo.radius-lg {
            border-radius: 8px;
        }
        .radius-demo.radius-3xl {
            border-radius: 12px;
        }
        .radius-demo.radius-full {
            border-radius: 50%;
        }
        .shadow-demo {
            display: inline-block;
            width: 16px;
            height: 16px;
            background-color: var(--vscode-editor-background);
            margin-left: 4px;
            vertical-align: middle;
            border: 1px solid var(--vscode-panel-border);
        }
        .shadow-demo.shadow-sm {
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .shadow-demo.shadow-md {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .shadow-demo.shadow-lg {
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .shadow-demo.shadow-xl {
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .shadow-demo.shadow-inner {
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
        }
    </style>
</head>
<body>
    ${sourceLocationHTML}
    
    <div class="label">Original Classes</div>
    <div class="code-block">
        <button class="copy-btn" id="copyClassesBtn" onclick="copyClasses()">Copy</button>
        <div class="class-string">${escapeHtml(classString)}</div>
    </div>
    
    <div class="label">Plain English Translation</div>
    <div class="code-block">
        <button class="copy-btn" id="copyTranslationBtn" onclick="copyTranslation()">Copy</button>
        <div class="translation">${formattedTranslation}</div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        
        const originalClasses = ${JSON.stringify(classString)};
        const plainTranslation = ${JSON.stringify(translation)};
        
        function clearAll() {
            vscode.postMessage({ command: 'clearAll' });
        }

        function copyClasses() {
            const btn = document.getElementById('copyClassesBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied';
            btn.classList.add('copied');
            
            vscode.postMessage({ 
                command: 'copyClasses',
                text: originalClasses
            });
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 2000);
        }

        function copyTranslation() {
            const btn = document.getElementById('copyTranslationBtn');
            const originalText = btn.textContent;
            btn.textContent = 'Copied';
            btn.classList.add('copied');
            
            vscode.postMessage({ 
                command: 'copyTranslation',
                text: plainTranslation
            });
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.classList.remove('copied');
            }, 2000);
        }

        // Listen for count updates from the extension
        window.addEventListener('message', event => {
            const message = event.data;
            if (message.command === 'updateCount') {
                const btn = document.getElementById('clearBtn');
                const count = message.count;
                btn.textContent = count === 1 ? 'Close tab' : 'Close all tabs';
            }
        });

        // Tell the extension we're ready
        vscode.postMessage({ command: 'ready' });
    </script>
</body>
</html>`;
}
