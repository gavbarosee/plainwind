/**
 * Panel state management and type definitions
 * 
 * Tracks all open detail panels and their associated metadata.
 * Used by PanelManager to coordinate panel lifecycle.
 */

import * as vscode from 'vscode';

/**
 * Information about an open detail panel
 * 
 * Links a webview panel with its source location in the editor.
 * This allows us to:
 * - Find panels by location
 * - Highlight the correct lines
 * - Handle editor/panel synchronization
 */
export interface PanelInfo {
  /** The webview panel displaying the translation */
  panel: vscode.WebviewPanel;
  /** The editor containing the Tailwind classes */
  editor: vscode.TextEditor;
  /** The text range where the classes are located */
  range: vscode.Range;
}

/**
 * State container for all active panels
 * 
 * Maintains a list of open panels and tracks which one is focused.
 * The focused panel gets a different highlight style in the editor.
 */
export class PanelState {
  private panels: PanelInfo[] = [];
  private focusedPanel: vscode.WebviewPanel | undefined;

  /**
   * Add a new panel to the state
   * 
   * The newly added panel becomes the focused panel.
   * 
   * @param panelInfo - Panel information to add
   */
  addPanel(panelInfo: PanelInfo): void {
    this.panels.push(panelInfo);
    this.focusedPanel = panelInfo.panel;
  }

  /**
   * Remove a panel from the state
   * 
   * If the removed panel was focused, focus shifts to the first remaining panel.
   * If no panels remain, focusedPanel becomes undefined.
   * 
   * @param panelInfo - Panel information to remove
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
   * 
   * Used to prevent duplicate panels for the same location.
   * Matches by line numbers (start and end lines must match exactly).
   * 
   * @param editor - Editor to search in
   * @param range - Range to match
   * @returns Panel info if found, undefined otherwise
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
