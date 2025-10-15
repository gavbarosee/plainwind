/**
 * Plainwind - Tailwind to Plain English Translator
 * Main extension entry point
 */

import * as vscode from 'vscode';
import {
  initializeDecorations,
  updateInlineDecorations,
  disposeDecorations,
} from './ui/decorations';
import { TailwindCodeLensProvider } from './ui/codelens';
import { PanelManager } from './ui/panel/panelManager';
import { HighlightManager } from './ui/highlight/highlightManager';

// Module instances
let panelManager: PanelManager | undefined;
let highlightManager: HighlightManager | undefined;

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Plainwind extension is now active');

  const config = vscode.workspace.getConfiguration('plainwind');
  const displayMode = config.get<string>('displayMode', 'codelens');
  const enabled = config.get<boolean>('enabled', true);

  if (!enabled || displayMode === 'off') {
    console.log('Plainwind is disabled');
    return;
  }

  // Initialize highlight manager
  highlightManager = new HighlightManager();

  // Initialize panel manager with highlight update callback
  panelManager = new PanelManager(() => {
    if (highlightManager && panelManager) {
      highlightManager.updateHighlights(
        panelManager.getAllPanels(),
        panelManager.getFocusedPanel()
      );
    }
  });

  // Register panel serializer
  panelManager.registerSerializer(context);

  // Register CodeLens provider if enabled
  if (displayMode === 'codelens' || displayMode === 'both') {
    registerCodeLensFeatures(context);
  }

  // Initialize inline decorations if enabled
  if (displayMode === 'inline' || displayMode === 'both') {
    initializeInlineDecorations(context);
  }
}

/**
 * Extension deactivation
 */
export function deactivate() {
  disposeDecorations();
  panelManager?.closeAllPanels();
  highlightManager?.dispose();
}

/**
 * Register CodeLens provider and related commands
 */
function registerCodeLensFeatures(context: vscode.ExtensionContext) {
  // Register CodeLens provider
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

  // Register command to show/toggle full translation details
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'plainwind.showFullTranslation',
      (
        fullTranslation: string,
        classString: string,
        range: vscode.Range,
        documentUri: vscode.Uri
      ) => {
        // Find the editor for this document
        const editor = vscode.window.visibleTextEditors.find(
          (e) => e.document.uri.toString() === documentUri.toString()
        );

        if (editor && panelManager) {
          // Check if a panel already exists for this range
          const existingPanel = panelManager.findPanelAtPosition(
            editor,
            range.start
          );

          if (existingPanel) {
            // Panel exists - close it
            existingPanel.panel.dispose();
          } else {
            // No panel - open one
            panelManager.showPanel(
              classString,
              fullTranslation,
              range,
              documentUri
            );
          }
        }
      }
    )
  );

  // Register command to clear all panels
  context.subscriptions.push(
    vscode.commands.registerCommand('plainwind.clearAllPanels', () => {
      panelManager?.closeAllPanels();
    })
  );
}

/**
 * Initialize inline decorations and event listeners
 */
function initializeInlineDecorations(context: vscode.ExtensionContext) {
  initializeDecorations();
  updateActiveEditor();

  // Register event listeners
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateInlineDecorations(editor);
      }
    })
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateInlineDecorations(editor);
      }
    })
  );
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
