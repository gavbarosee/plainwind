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
import {
  registerToggleCommands,
  setCodeLensProvider,
} from './vscode/commands/toggleCommands';

// Module instances
let panelManager: PanelManager | undefined;
let highlightManager: HighlightManager | undefined;
let codeLensProvider: TailwindCodeLensProvider | undefined;

/**
 * Extension activation - called when extension is first loaded
 *
 * Initialization flow:
 * 1. Initialize file-level state management
 * 2. Create status bar item
 * 3. Register toggle commands
 * 4. Check if extension is enabled
 * 5. Initialize managers (highlight, panel)
 * 6. Register providers (CodeLens or Hover based on config)
 * 7. Register shared commands
 * 8. Set up configuration change listener
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

  // Listen for configuration changes (must be registered even when disabled)
  registerConfigurationListener(context);

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
 *
 * Creates the two managers and connects them via a callback:
 * - HighlightManager: Handles visual decorations in editor
 * - PanelManager: Handles detail panel lifecycle
 *
 * The callback ensures highlights update whenever panels change
 * (opened, closed, focused, etc.)
 */
function initializeManagers(context: vscode.ExtensionContext): void {
  // Initialize highlight manager
  highlightManager = new HighlightManager();

  // Initialize panel manager with highlight update callback
  panelManager = new PanelManager(context, () => {
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
 *
 * Registers either a CodeLens or Hover provider for Tailwind translations
 * based on the user's `plainwind.displayMode` setting.
 *
 * **Supported Languages:**
 * - React/JSX: javascriptreact, typescriptreact
 * - JavaScript/TypeScript: javascript, typescript
 * - Framework templates: html, vue, svelte
 *
 * **Display Modes:**
 * - `codelens`: Shows translations inline above className attributes
 * - `hover`: Shows translations only on hover
 * - `off`: Extension disabled (handled before this function)
 *
 * @param context - Extension context for subscriptions
 * @param displayMode - User's display mode preference
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
    // Store CodeLens provider instance so we can refresh it when settings change
    codeLensProvider = new TailwindCodeLensProvider();
    context.subscriptions.push(
      vscode.languages.registerCodeLensProvider(
        supportedLanguages,
        codeLensProvider
      )
    );
    // Share provider with toggle commands for file-specific enable/disable
    setCodeLensProvider(codeLensProvider);

    // Show one-time tip about clickable CodeLens
    showClickableTipIfNeeded(context);
  }
}

/**
 * Show one-time tip about clickable CodeLens
 *
 * Displays an informational message the first time the extension is activated
 * to help users discover that CodeLens translations are clickable.
 *
 * @param context - Extension context for accessing configuration
 */
async function showClickableTipIfNeeded(
  _context: vscode.ExtensionContext
): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const hasSeenTip = config.get<boolean>('hasSeenClickableTip', false);

  if (!hasSeenTip) {
    // Small delay to let CodeLens render first
    // eslint-disable-next-line no-undef
    setTimeout(async () => {
      const response = await vscode.window.showInformationMessage(
        'Plainwind: Click any translation to see detailed breakdowns. Click the status bar for settings!',
        'Got it',
        'Watch Demo',
        "Don't show again"
      );

      // Open walkthrough if user clicks "Watch Demo"
      if (response === 'Watch Demo') {
        await vscode.commands.executeCommand(
          'workbench.action.openWalkthrough',
          'gavbarosee.plainwind#plainwind.welcome',
          false
        );
      }

      // Mark as seen regardless of response
      await config.update(
        'hasSeenClickableTip',
        true,
        vscode.ConfigurationTarget.Global
      );
    }, 2000); // 2 second delay
  }
}

/**
 * Register shared commands used by both CodeLens and Hover modes
 *
 * Registers commands that work regardless of display mode:
 *
 * **plainwind.showFullTranslation:**
 * - Triggered by clicking a CodeLens
 * - Receives VS Code Range object directly
 * - Toggles detail panel at the clicked location
 *
 * **plainwind.showFullTranslationFromHover:**
 * - Triggered by clicking a link in hover
 * - Receives serialized range data (command URIs can't pass objects)
 * - Reconstructs Range and URI from serialized data
 * - Toggles detail panel at the hovered location
 *
 * **plainwind.clearAllPanels:**
 * - Closes all open detail panels
 * - Triggered from panel webview "Close All" button
 * - Also available as a command palette command
 *
 * @param context - Extension context for subscriptions
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
 *
 * Toggle behavior:
 * - If a panel exists at this location: close it
 * - If no panel exists: open a new one
 *
 * This provides a convenient way to hide/show panels without cluttering the UI.
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
 *
 * Monitors changes to `plainwind.displayMode` and `plainwind.enabled` settings.
 *
 * **Why Reload is Required:**
 * When display mode or enabled status changes, providers (CodeLens/Hover) need
 * to be registered or unregistered. VS Code doesn't support dynamic provider
 * registration without reloading, so we prompt the user to reload.
 *
 * **Settings that trigger reload:**
 * - `plainwind.enabled`: Enable/disable extension
 * - `plainwind.displayMode`: Switch between codelens/hover/off
 *
 * **Settings that don't trigger reload:**
 * - Category grouping, emoji display, etc. - these take effect immediately
 *
 * @param context - Extension context for subscriptions
 */
function registerConfigurationListener(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      // Settings that require a reload
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

      // Settings that only need a CodeLens refresh (no reload required)
      if (
        e.affectsConfiguration('plainwind.groupByCategory') ||
        e.affectsConfiguration('plainwind.showCategoryEmojis') ||
        e.affectsConfiguration('plainwind.enhanceVisuals')
      ) {
        // Refresh CodeLens to show updated translations
        // Hover doesn't need refresh as it generates translations on-demand
        if (codeLensProvider) {
          codeLensProvider.refresh();
        }

        // Refresh open panels to reflect setting changes
        // All of these settings affect how translations are displayed in panels
        if (panelManager) {
          panelManager.refreshAllPanels();
        }
      }
    })
  );
}

// Re-export isFileEnabled for use by providers
export { isFileEnabled } from './vscode/commands/fileState';
