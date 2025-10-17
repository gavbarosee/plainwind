/**
 * Manages Tailwind class detail panels
 */

import * as vscode from 'vscode';
import { PanelState, PanelInfo } from './panelState';
import { generatePanelHTML } from './panelTemplate';

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
    documentUri: vscode.Uri
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

    // Track this panel
    const panelInfo: PanelInfo = { panel, editor, range };
    this.state.addPanel(panelInfo);

    // Set panel content
    const currentCount = this.state.getPanelCount();
    panel.webview.html = generatePanelHTML(
      classString,
      translation,
      currentCount
    );
    this.onHighlightUpdate();

    // Handle webview messages
    panel.webview.onDidReceiveMessage((message) => {
      if (message.command === 'clearAll') {
        this.closeAllPanels();
      } else if (message.command === 'ready') {
        this.updateAllPanelCounts();
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
