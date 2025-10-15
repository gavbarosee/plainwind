/**
 * Plainwind - Tailwind to Plain English Translator
 * Main extension entry point
 */

import * as vscode from 'vscode';
import { TailwindCodeLensProvider } from './ui/codelens';
import { TailwindHoverProvider } from './ui/hover';
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
  const enabled = config.get<boolean>('enabled', true);
  const displayMode = config.get<string>('displayMode', 'codelens');

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

  // Register shared commands
  registerSharedCommands(context);

  // Register display mode (CodeLens or Hover)
  if (displayMode === 'hover') {
    registerHoverFeatures(context);
  } else {
    registerCodeLensFeatures(context);
  }

  // Listen for configuration changes
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration('plainwind.displayMode') ||
        e.affectsConfiguration('plainwind.enabled')
      ) {
        vscode.window
          .showInformationMessage(
            'Plainwind settings changed. Reload window to apply changes?',
            'Reload',
            'Later'
          )
          .then((selection) => {
            if (selection === 'Reload') {
              vscode.commands.executeCommand('workbench.action.reloadWindow');
            }
          });
      }
    })
  );
}

/**
 * Extension deactivation
 */
export function deactivate() {
  panelManager?.closeAllPanels();
  highlightManager?.dispose();
}

/**
 * Register shared commands used by both CodeLens and Hover modes
 */
function registerSharedCommands(context: vscode.ExtensionContext) {
  // Register command to show/toggle full translation details (from CodeLens)
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

  // Register command to show/toggle full translation details (from hover)
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'plainwind.showFullTranslationFromHover',
      (
        fullTranslation: string,
        classString: string,
        rangeData: {
          startLine: number;
          startChar: number;
          endLine: number;
          endChar: number;
        },
        documentUriString: string
      ) => {
        // Reconstruct the range and URI from serialized data
        const range = new vscode.Range(
          new vscode.Position(rangeData.startLine, rangeData.startChar),
          new vscode.Position(rangeData.endLine, rangeData.endChar)
        );
        const documentUri = vscode.Uri.parse(documentUriString);

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
}

/**
 * Register Hover provider and related commands
 */
function registerHoverFeatures(context: vscode.ExtensionContext) {
  // Register Hover provider
  const hoverProvider = new TailwindHoverProvider();
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      [
        { language: 'javascriptreact' },
        { language: 'typescriptreact' },
        { language: 'javascript' },
        { language: 'typescript' },
        { language: 'html' },
        { language: 'vue' },
        { language: 'svelte' },
      ],
      hoverProvider
    )
  );
}
