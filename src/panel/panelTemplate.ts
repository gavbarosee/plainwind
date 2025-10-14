/**
 * HTML/CSS template for the Tailwind class detail panel
 */

/**
 * Escape HTML special characters
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
 */
export function generatePanelHTML(
  classString: string,
  translation: string,
  panelCount: number
): string {
  // Split translation by pipe separator and format each category on its own line
  const formattedTranslation = translation
    .split(' | ')
    .map(line => {
      const escapedLine = escapeHtml(line);
      // Bold the category name (text before the first colon)
      const colonIndex = escapedLine.indexOf(':');
      if (colonIndex !== -1) {
        const category = escapedLine.substring(0, colonIndex);
        const rest = escapedLine.substring(colonIndex + 1).trim();
        return `<div class="category-line"><strong>${category}:</strong><span>${rest}</span></div>`;
      }
      return `<div class="category-line"><span>${escapedLine}</span></div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Class Details</title>
    <style>
        * {
            box-sizing: border-box;
        }
        body {
            padding: 32px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            line-height: 1.6;
            margin: 0;
            -webkit-font-smoothing: antialiased;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 24px;
            margin-bottom: 32px;
            border-bottom: 1px solid var(--vscode-panel-border);
        }
        h2 {
            font-size: 18px;
            font-weight: 600;
            color: var(--vscode-foreground);
            margin: 0;
            letter-spacing: -0.015em;
        }
        .clear-all-btn {
            background-color: var(--vscode-button-secondaryBackground);
            color: var(--vscode-button-secondaryForeground);
            border: 1px solid var(--vscode-button-border);
            padding: 7px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            font-family: inherit;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .clear-all-btn:hover {
            background-color: var(--vscode-button-secondaryHoverBackground);
            border-color: var(--vscode-button-border);
            transform: translateY(-1px);
        }
        .clear-all-btn:active {
            transform: translateY(0);
        }
        .label {
            font-size: 11px;
            font-weight: 600;
            color: var(--vscode-descriptionForeground);
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 12px;
        }
        .class-string {
            background-color: var(--vscode-textCodeBlock-background);
            border: 1px solid var(--vscode-panel-border);
            padding: 18px;
            border-radius: 8px;
            margin: 0 0 32px 0;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.7;
            word-wrap: break-word;
            overflow-wrap: break-word;
            color: var(--vscode-foreground);
        }
        .translation {
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            border: 1px solid var(--vscode-panel-border);
            padding: 20px;
            border-radius: 8px;
            margin: 0;
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
            color: var(--vscode-foreground);
            font-weight: 600;
            flex-shrink: 0;
            min-width: 130px;
        }
        .category-line span {
            flex: 1;
            word-wrap: break-word;
            overflow-wrap: break-word;
            color: var(--vscode-foreground);
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>💨 Tailwind Class Translation</h2>
        <button class="clear-all-btn" id="clearBtn" onclick="clearAll()">✕ ${panelCount === 1 ? 'Close tab' : 'Close all tabs'}</button>
    </div>
    
    <div class="label">Original Classes:</div>
    <div class="class-string">${escapeHtml(classString)}</div>
    
    <div class="label">Plain English:</div>
    <div class="translation">${formattedTranslation}</div>

    <script>
        const vscode = acquireVsCodeApi();
        
        function clearAll() {
            vscode.postMessage({ command: 'clearAll' });
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

