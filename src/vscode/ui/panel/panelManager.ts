/**
 * Manages Tailwind class detail panels
 */

import * as vscode from 'vscode';
import { PanelState, PanelInfo } from './panelState';
import { generatePanelHTML } from './panelTemplate';
import { translateClasses } from '@src/core/translation/engine';

/**
 * Manages lifecycle and coordination of Tailwind class detail panels
 *
 * Responsibilities:
 * - Creating new panels
 * - Tracking panel state (which panels are open and where)
 * - Coordinating with HighlightManager for visual feedback
 * - Handling panel disposal and cleanup
 * - Preventing duplicate panels for same location
 */
export class PanelManager {
  private state: PanelState;
  private onHighlightUpdate: () => void;

  /**
   * @param onHighlightUpdate - Callback to trigger highlight updates when panels change
   */
  constructor(onHighlightUpdate: () => void) {
    this.state = new PanelState();
    this.onHighlightUpdate = onHighlightUpdate;
  }

  /**
   * Show or focus a translation detail panel
   *
   * Behavior:
   * - If a panel already exists for this exact range, just reveal it
   * - Otherwise, create a new panel beside the editor
   * - Automatically sets up disposal handlers and message listeners
   *
   * @param classString - Original Tailwind classes
   * @param translation - Translated plain English description
   * @param range - Text range where classes are located
   * @param documentUri - URI of the document containing the classes
   */
  showPanel(
    classString: string,
    translation: string,
    range: vscode.Range,
    documentUri: vscode.Uri,
    sourceLocation?: { filePath: string; line: number }
  ): void {
    // Find the editor for this document
    const editor = vscode.window.visibleTextEditors.find(
      (e) => e.document.uri.toString() === documentUri.toString()
    );

    if (!editor) {
      return;
    }

    // Check if a panel already exists for this exact range
    const existingPanel = this.state.findPanel(editor, range);
    if (existingPanel) {
      // Just reveal/focus the existing panel
      existingPanel.panel.reveal(vscode.ViewColumn.Beside);
      this.state.setFocusedPanel(existingPanel.panel);
      this.onHighlightUpdate();
      return;
    }

    // Create a new panel
    const panel = vscode.window.createWebviewPanel(
      'plainwindDetails',
      'Tailwind Class Details',
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: false,
      }
    );

    // Generate source location string
    const location =
      sourceLocation ||
      this.generateSourceLocation(documentUri, range.start.line);

    // Track this panel with all necessary data for regeneration
    const panelInfo: PanelInfo = {
      panel,
      editor,
      range,
      classString,
      translation,
      sourceLocation: location,
    };
    this.state.addPanel(panelInfo);

    // Set panel content
    const currentCount = this.state.getPanelCount();
    const config = vscode.workspace.getConfiguration('plainwind');
    const enhanceVisuals = config.get<boolean>('enhanceVisuals', false);

    // Get panel index for position indicator
    const panelIndex = this.state.getAllPanels().length;

    panel.webview.html = generatePanelHTML(
      classString,
      translation,
      currentCount,
      enhanceVisuals,
      panelIndex,
      location
    );
    this.onHighlightUpdate();

    // Handle webview messages
    panel.webview.onDidReceiveMessage((message) => {
      if (message.command === 'clearAll') {
        this.closeAllPanels();
      } else if (message.command === 'ready') {
        this.updateAllPanelCounts();
      } else if (message.command === 'copyClasses') {
        vscode.env.clipboard.writeText(message.text);
        vscode.window.showInformationMessage(
          'Tailwind classes copied to clipboard'
        );
      } else if (message.command === 'copyTranslation') {
        vscode.env.clipboard.writeText(message.text);
        vscode.window.showInformationMessage('Translation copied to clipboard');
      }
    });

    // Track when panel becomes active/visible
    panel.onDidChangeViewState((e) => {
      if (e.webviewPanel.active) {
        this.state.setFocusedPanel(e.webviewPanel);
        this.onHighlightUpdate();
      }
    });

    // Handle panel disposal
    panel.onDidDispose(() => {
      this.state.removePanel(panelInfo);
      this.onHighlightUpdate();
      this.updateAllPanelCounts();
    });
  }

  /**
   * Close all open panels
   */
  closeAllPanels(): void {
    const panelsToClose = [...this.state.getAllPanels()];
    for (const panelInfo of panelsToClose) {
      panelInfo.panel.dispose();
    }
    this.state.clear();
    this.onHighlightUpdate();
  }

  /**
   * Close a specific panel at a given position
   */
  closePanelAtPosition(
    editor: vscode.TextEditor,
    position: vscode.Position
  ): boolean {
    const panelInfo = this.findPanelAtPosition(editor, position);
    if (panelInfo) {
      panelInfo.panel.dispose();
      return true;
    }
    return false;
  }

  /**
   * Find a panel at a specific position
   */
  findPanelAtPosition(
    editor: vscode.TextEditor,
    position: vscode.Position
  ): PanelInfo | undefined {
    return this.state.getAllPanels().find((panelInfo) => {
      return panelInfo.editor === editor && panelInfo.range.contains(position);
    });
  }

  /**
   * Update the panel count in all open panels
   */
  updateAllPanelCounts(): void {
    const count = this.state.getPanelCount();
    for (const panelInfo of this.state.getAllPanels()) {
      panelInfo.panel.webview.postMessage({
        command: 'updateCount',
        count: count,
      });
    }
  }

  /**
   * Refresh all open panels with current settings
   *
   * This regenerates the HTML for all open panels to reflect
   * changes in category grouping, emoji, and visual enhancement settings.
   * Called when these configuration options change.
   *
   * The translation is regenerated from the original class string to ensure
   * the current settings are applied (groupByCategory, showCategoryEmojis).
   */
  refreshAllPanels(): void {
    const config = vscode.workspace.getConfiguration('plainwind');
    const enhanceVisuals = config.get<boolean>('enhanceVisuals', false);
    const allPanels = this.state.getAllPanels();
    const totalCount = allPanels.length;

    allPanels.forEach((panelInfo, index) => {
      // Regenerate translation with current settings
      const freshTranslation = translateClasses(panelInfo.classString);

      // Update stored translation for future reference
      panelInfo.translation = freshTranslation;

      // Regenerate HTML with current settings and fresh translation
      panelInfo.panel.webview.html = generatePanelHTML(
        panelInfo.classString,
        freshTranslation,
        totalCount,
        enhanceVisuals,
        index + 1, // 1-based index
        panelInfo.sourceLocation
      );
    });
  }

  /**
   * Get all active panels (for highlight manager)
   */
  getAllPanels(): PanelInfo[] {
    return this.state.getAllPanels();
  }

  /**
   * Get the currently focused panel (for highlight manager)
   */
  getFocusedPanel(): vscode.WebviewPanel | undefined {
    return this.state.getFocusedPanel();
  }

  /**
   * Generate source location string from document URI and line number
   */
  private generateSourceLocation(
    documentUri: vscode.Uri,
    line: number
  ): { filePath: string; line: number } {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(documentUri);
    let filePath = documentUri.fsPath;

    // Make path relative to workspace if possible
    if (workspaceFolder) {
      filePath = vscode.workspace.asRelativePath(documentUri);
    }

    return { filePath, line: line + 1 }; // +1 for 1-based line numbers
  }

  /**
   * Register webview serializer to prevent restoration
   *
   * This prevents VS Code from trying to restore panels after window reload.
   * We intentionally close any restored panels because:
   * 1. Panels don't have the necessary context to restore properly
   * 2. The code may have changed since the panel was created
   * 3. It's cleaner to start fresh
   */
  registerSerializer(context: vscode.ExtensionContext): void {
    if (vscode.window.registerWebviewPanelSerializer) {
      context.subscriptions.push(
        vscode.window.registerWebviewPanelSerializer('plainwindDetails', {
          async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel) {
            // Close any restored panels instead of trying to deserialize them
            webviewPanel.dispose();
          },
        })
      );
    }
  }
}
