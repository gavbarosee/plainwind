/**
 * Plainwind - Tailwind to Plain English Translator
 * Main extension entry point
 */

import * as vscode from 'vscode';
import { TailwindCodeLensProvider } from './vscode/ui/codelens';
import { TailwindHoverProvider } from './vscode/ui/hover';
import { PanelManager } from './vscode/ui/panel/panelManager';
import { HighlightManager } from './vscode/ui/highlight/highlightManager';
import { createStatusBar, updateStatusBar } from './vscode/ui/statusBar';
import { initializeFileState } from './vscode/commands/fileState';
import { registerToggleCommands } from './vscode/commands/toggleCommands';

// Module instances
let panelManager: PanelManager | undefined;
let highlightManager: HighlightManager | undefined;

/**
 * Extension activation
 */
export function activate(context: vscode.ExtensionContext) {
  console.log('Plainwind extension is now active');

  // Initialize file state management
  initializeFileState(context);

  const config = vscode.workspace.getConfiguration('plainwind');
  const enabled = config.get<boolean>('enabled', true);
  const displayMode = config.get<string>('displayMode', 'codelens');

  // Create status bar item
  createStatusBar(context);
  updateStatusBar(enabled);

  // Register toggle and settings commands
  registerToggleCommands(context);

  // Exit early if disabled
  if (!enabled || displayMode === 'off') {
    console.log('Plainwind is disabled');
    return;
  }

  // Initialize managers
  initializeManagers(context);

  // Register display mode providers
  registerProviders(context, displayMode);

  // Register shared commands
  registerSharedCommands(context);

  // Listen for configuration changes
  registerConfigurationListener(context);
}

/**
 * Extension deactivation
 */
export function deactivate() {
  panelManager?.closeAllPanels();
  highlightManager?.dispose();
}

/**
 * Initialize panel and highlight managers
 */
function initializeManagers(context: vscode.ExtensionContext): void {
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
}

/**
 * Register CodeLens or Hover providers based on display mode
 */
function registerProviders(
  context: vscode.ExtensionContext,
  displayMode: string
): void {
  const supportedLanguages = [
    { language: 'javascriptreact' },
    { language: 'typescriptreact' },
    { language: 'javascript' },
    { language: 'typescript' },
    { language: 'html' },
    { language: 'vue' },
    { language: 'svelte' },
  ];

  if (displayMode === 'hover') {
    const hoverProvider = new TailwindHoverProvider();
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(supportedLanguages, hoverProvider)
    );
  } else {
    const codeLensProvider = new TailwindCodeLensProvider();
    context.subscriptions.push(
      vscode.languages.registerCodeLensProvider(
        supportedLanguages,
        codeLensProvider
      )
    );
  }
}

/**
 * Register shared commands used by both CodeLens and Hover modes
 */
function registerSharedCommands(context: vscode.ExtensionContext): void {
  // Command: Show/toggle translation details from CodeLens
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'plainwind.showFullTranslation',
      (
        fullTranslation: string,
        classString: string,
        range: vscode.Range,
        documentUri: vscode.Uri
      ) => {
        handleShowTranslation(fullTranslation, classString, range, documentUri);
      }
    )
  );

  // Command: Show/toggle translation details from hover
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
        // Reconstruct range and URI from serialized data
        const range = new vscode.Range(
          new vscode.Position(rangeData.startLine, rangeData.startChar),
          new vscode.Position(rangeData.endLine, rangeData.endChar)
        );
        const documentUri = vscode.Uri.parse(documentUriString);

        handleShowTranslation(fullTranslation, classString, range, documentUri);
      }
    )
  );

  // Command: Clear all detail panels
  context.subscriptions.push(
    vscode.commands.registerCommand('plainwind.clearAllPanels', () => {
      panelManager?.closeAllPanels();
    })
  );
}

/**
 * Handle showing or toggling a translation panel
 */
function handleShowTranslation(
  fullTranslation: string,
  classString: string,
  range: vscode.Range,
  documentUri: vscode.Uri
): void {
  // Find the editor for this document
  const editor = vscode.window.visibleTextEditors.find(
    (e) => e.document.uri.toString() === documentUri.toString()
  );

  if (editor && panelManager) {
    // Check if a panel already exists for this range
    const existingPanel = panelManager.findPanelAtPosition(editor, range.start);

    if (existingPanel) {
      // Panel exists - close it
      existingPanel.panel.dispose();
    } else {
      // No panel - open one
      panelManager.showPanel(classString, fullTranslation, range, documentUri);
    }
  }
}

/**
 * Listen for configuration changes
 */
function registerConfigurationListener(context: vscode.ExtensionContext): void {
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

// Re-export isFileEnabled for use by providers
export { isFileEnabled } from './vscode/commands/fileState';
