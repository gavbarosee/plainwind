/**
 * Panel state management and type definitions
 */

import * as vscode from 'vscode';

/**
 * Information about an open detail panel
 */
export interface PanelInfo {
  panel: vscode.WebviewPanel;
  editor: vscode.TextEditor;
  range: vscode.Range;
}

/**
 * State container for all active panels
 */
export class PanelState {
  private panels: PanelInfo[] = [];
  private focusedPanel: vscode.WebviewPanel | undefined;

  /**
   * Add a new panel to the state
   */
  addPanel(panelInfo: PanelInfo): void {
    this.panels.push(panelInfo);
    this.focusedPanel = panelInfo.panel;
  }

  /**
   * Remove a panel from the state
   */
  removePanel(panelInfo: PanelInfo): void {
    const index = this.panels.indexOf(panelInfo);
    if (index > -1) {
      this.panels.splice(index, 1);
    }

    // Update focused panel if this was it
    if (this.focusedPanel === panelInfo.panel) {
      this.focusedPanel =
        this.panels.length > 0 ? this.panels[0].panel : undefined;
    }
  }

  /**
   * Find an existing panel for the given editor and range
   */
  findPanel(
    editor: vscode.TextEditor,
    range: vscode.Range
  ): PanelInfo | undefined {
    return this.panels.find(
      (p) =>
        p.editor === editor &&
        p.range.start.line === range.start.line &&
        p.range.end.line === range.end.line
    );
  }

  /**
   * Get all active panels
   */
  getAllPanels(): PanelInfo[] {
    return this.panels;
  }

  /**
   * Get the currently focused panel
   */
  getFocusedPanel(): vscode.WebviewPanel | undefined {
    return this.focusedPanel;
  }

  /**
   * Set the currently focused panel
   */
  setFocusedPanel(panel: vscode.WebviewPanel): void {
    this.focusedPanel = panel;
  }

  /**
   * Get the count of active panels
   */
  getPanelCount(): number {
    return this.panels.length;
  }

  /**
   * Clear all panels
   */
  clear(): void {
    this.panels = [];
    this.focusedPanel = undefined;
  }
}
