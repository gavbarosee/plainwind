import * as vscode from 'vscode';
import {
  initializeDecorations,
  updateInlineDecorations,
  disposeDecorations,
} from './decorations';
import { TailwindCodeLensProvider } from './codelens';

// Decoration types for highlighting active CodeLens
let activeCodeLensDecorationType: vscode.TextEditorDecorationType; // Normal highlight
let focusedCodeLensDecorationType: vscode.TextEditorDecorationType; // Intense highlight for focused panel

// Track all open panels and their highlights
interface PanelInfo {
  panel: vscode.WebviewPanel;
  editor: vscode.TextEditor;
  range: vscode.Range;
}
const activePanels: PanelInfo[] = [];
let currentlyFocusedPanel: vscode.WebviewPanel | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('Plainwind extension is now active');

  const config = vscode.workspace.getConfiguration('plainwind');
  const displayMode = config.get<string>('displayMode', 'codelens');
  const enabled = config.get<boolean>('enabled', true);

  if (!enabled || displayMode === 'off') {
    console.log('Plainwind is disabled');
    return;
  }

  // Create decoration type for active CodeLens highlight (normal)
  activeCodeLensDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(64, 160, 255, 0.2)', // Nice blue tint
    border: '0 0 0 3px solid rgba(64, 160, 255, 0.8)', // Left border
    borderWidth: '0 0 0 3px',
    borderStyle: 'solid',
    borderColor: 'rgba(64, 160, 255, 0.8)',
    isWholeLine: true,
  });

  // Create decoration type for focused CodeLens highlight (intense)
  focusedCodeLensDecorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(64, 160, 255, 0.35)', // More intense blue
    border: '0 0 0 4px solid rgba(64, 160, 255, 1)', // Thicker, fully opaque border
    borderWidth: '0 0 0 4px',
    borderStyle: 'solid',
    borderColor: 'rgba(64, 160, 255, 1)',
    isWholeLine: true,
  });

  // Register webview serializer to handle panel restoration (or prevent it)
  if (vscode.window.registerWebviewPanelSerializer) {
    context.subscriptions.push(
      vscode.window.registerWebviewPanelSerializer('plainwindDetails', {
        async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
          // Close any restored panels instead of trying to deserialize them
          webviewPanel.dispose();
        }
      })
    );
  }

  // Register CodeLens provider if enabled
  if (displayMode === 'codelens' || displayMode === 'both') {
    const codeLensProvider = new TailwindCodeLensProvider();
    context.subscriptions.push(
      vscode.languages.registerCodeLensProvider(
        [
          { language: 'javascriptreact' },
          { language: 'typescriptreact' },
          { language: 'javascript' },
          { language: 'typescript' },
          { language: 'html' },
          { language: 'vue' },
          { language: 'svelte' },
        ],
        codeLensProvider
      )
    );

    // Register command to show full translation details
    context.subscriptions.push(
      vscode.commands.registerCommand(
        'plainwind.showFullTranslation',
        (fullTranslation: string, classString: string, range: vscode.Range, documentUri: vscode.Uri) => {
          // Find the editor for this document
          const editor = vscode.window.visibleTextEditors.find(
            e => e.document.uri.toString() === documentUri.toString()
          );

          if (!editor) {
            return;
          }

          // Check if a panel already exists for this exact range
          const existingPanel = activePanels.find(
            p => p.editor === editor && 
                 p.range.start.line === range.start.line &&
                 p.range.end.line === range.end.line
          );

          if (existingPanel) {
            // Just reveal/focus the existing panel
            existingPanel.panel.reveal(vscode.ViewColumn.Beside);
            currentlyFocusedPanel = existingPanel.panel;
            updateAllHighlights();
            return;
          }

          const panel = vscode.window.createWebviewPanel(
            'plainwindDetails',
            'Tailwind Class Details',
            vscode.ViewColumn.Beside,
            {
              enableScripts: true,
              retainContextWhenHidden: false, // Don't keep context when hidden
            }
          );

          // Track this panel
          const panelInfo: PanelInfo = { panel, editor, range };
          activePanels.push(panelInfo);
          
          // Update content with current panel count
          const currentCount = activePanels.length;
          panel.webview.html = getWebviewContent(classString, fullTranslation, currentCount);
          updateAllHighlights();

          // Handle messages from the webview
          panel.webview.onDidReceiveMessage(
            message => {
              if (message.command === 'clearAll') {
                closeAllPanels();
              } else if (message.command === 'ready') {
                // Webview is ready, send it the current count
                updatePanelCounts();
              }
            }
          );

          // Track when this panel becomes active/visible
          panel.onDidChangeViewState(e => {
            if (e.webviewPanel.active) {
              currentlyFocusedPanel = e.webviewPanel;
              updateAllHighlights();
            }
          });

          // Set this as the focused panel initially
          currentlyFocusedPanel = panel;

          // Remove highlight when this panel is closed
          panel.onDidDispose(() => {
            const index = activePanels.indexOf(panelInfo);
            if (index > -1) {
              activePanels.splice(index, 1);
            }
            
            // Clear focused panel if this was it
            if (currentlyFocusedPanel === panel) {
              currentlyFocusedPanel = activePanels.length > 0 ? activePanels[0].panel : undefined;
            }
            
            updateAllHighlights();
            
            // Update all remaining panels with new count
            updatePanelCounts();
          });
        }
      )
    );

    // Register command to clear all panels
    context.subscriptions.push(
      vscode.commands.registerCommand('plainwind.clearAllPanels', () => {
        closeAllPanels();
      })
    );
  }

  // Initialize inline decorations if enabled
  if (displayMode === 'inline' || displayMode === 'both') {
    initializeDecorations();
    updateActiveEditor();
    registerEventListeners(context);
  }
}

export function deactivate() {
  disposeDecorations();
  closeAllPanels();
  if (activeCodeLensDecorationType) {
    activeCodeLensDecorationType.dispose();
  }
  if (focusedCodeLensDecorationType) {
    focusedCodeLensDecorationType.dispose();
  }
}

/**
 * Update highlights for all active panels
 */
function updateAllHighlights() {
  // Separate normal and focused ranges by editor
  const normalRangesByEditor = new Map<vscode.TextEditor, vscode.Range[]>();
  const focusedRangesByEditor = new Map<vscode.TextEditor, vscode.Range[]>();
  
  for (const panelInfo of activePanels) {
    const isFocused = panelInfo.panel === currentlyFocusedPanel;
    
    if (isFocused) {
      const ranges = focusedRangesByEditor.get(panelInfo.editor) || [];
      ranges.push(panelInfo.range);
      focusedRangesByEditor.set(panelInfo.editor, ranges);
    } else {
      const ranges = normalRangesByEditor.get(panelInfo.editor) || [];
      ranges.push(panelInfo.range);
      normalRangesByEditor.set(panelInfo.editor, ranges);
    }
  }

  // Clear all editors first
  for (const editor of vscode.window.visibleTextEditors) {
    editor.setDecorations(activeCodeLensDecorationType, []);
    editor.setDecorations(focusedCodeLensDecorationType, []);
  }

  // Apply normal highlights
  for (const [editor, ranges] of normalRangesByEditor) {
    editor.setDecorations(activeCodeLensDecorationType, ranges);
  }
  
  // Apply focused highlights (these will override normal ones if both exist)
  for (const [editor, ranges] of focusedRangesByEditor) {
    editor.setDecorations(focusedCodeLensDecorationType, ranges);
  }
}

/**
 * Close all open panels and clear highlights
 */
function closeAllPanels() {
  // Dispose all panels (this will trigger onDidDispose which removes from array)
  const panelsToClose = [...activePanels]; // Copy array since dispose modifies it
  for (const panelInfo of panelsToClose) {
    panelInfo.panel.dispose();
  }
  
  // Clear array, focused panel, and highlights
  activePanels.length = 0;
  currentlyFocusedPanel = undefined;
  updateAllHighlights();
}

/**
 * Update the panel count display in all open panels
 */
function updatePanelCounts() {
  const count = activePanels.length;
  for (const panelInfo of activePanels) {
    panelInfo.panel.webview.postMessage({
      command: 'updateCount',
      count: count
    });
  }
}

/**
 * Update decorations for the currently active editor
 */
function updateActiveEditor() {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    updateInlineDecorations(activeEditor);
  }
}

/**
 * Register event listeners for editor and document changes
 */
function registerEventListeners(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(handleEditorChange)
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(handleDocumentChange)
  );
}

/**
 * Handle active editor change events
 */
function handleEditorChange(editor: vscode.TextEditor | undefined) {
  if (editor) {
    updateInlineDecorations(editor);
  }
}

/**
 * Handle document change events
 */
function handleDocumentChange(event: vscode.TextDocumentChangeEvent) {
  const editor = vscode.window.activeTextEditor;
  if (editor && event.document === editor.document) {
    updateInlineDecorations(editor);
  }
}

/**
 * Generate webview HTML content for displaying full translation
 */
function getWebviewContent(classString: string, translation: string, panelCount: number): string {
  // Split translation by pipe separator and format each category on its own line
  const formattedTranslation = translation
    .split(' | ')
    .map(line => {
      const escapedLine = escapeHtml(line);
      // Bold the category name (text before the first colon)
      const colonIndex = escapedLine.indexOf(':');
      if (colonIndex !== -1) {
        const category = escapedLine.substring(0, colonIndex);
        const rest = escapedLine.substring(colonIndex);
        return `<div class="category-line"><strong>${category}</strong>${rest}</div>`;
      }
      return `<div class="category-line">${escapedLine}</div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Class Details</title>
    <style>
        body {
            padding: 20px;
            font-family: var(--vscode-font-family);
            color: var(--vscode-foreground);
            background-color: var(--vscode-editor-background);
            line-height: 1.6;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid var(--vscode-panel-border);
            padding-bottom: 10px;
            margin-bottom: 15px;
        }
        h2 {
            color: var(--vscode-textLink-foreground);
            margin: 0;
        }
        .clear-all-btn {
            background-color: var(--vscode-button-background);
            color: var(--vscode-button-foreground);
            border: none;
            padding: 6px 12px;
            border-radius: 3px;
            cursor: pointer;
            font-size: 12px;
            font-family: var(--vscode-font-family);
        }
        .clear-all-btn:hover {
            background-color: var(--vscode-button-hoverBackground);
        }
        .class-string {
            background-color: var(--vscode-textCodeBlock-background);
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            font-family: var(--vscode-editor-font-family);
            font-size: var(--vscode-editor-font-size);
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        .translation {
            background-color: var(--vscode-editor-inactiveSelectionBackground);
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .category-line {
            margin-bottom: 12px;
            line-height: 1.8;
        }
        .category-line:last-child {
            margin-bottom: 0;
        }
        .label {
            font-weight: bold;
            color: var(--vscode-textLink-foreground);
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>💨 Tailwind Class Translation</h2>
        <button class="clear-all-btn" id="clearBtn" onclick="clearAll()">✕ ${panelCount === 1 ? 'Close 1 tab' : 'Close All tabs'}</button>
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
