/**
 * Manages line highlighting for active detail panels
 */

import * as vscode from 'vscode';
import { HighlightDecorations } from './highlightDecorations';
import type { PanelInfo } from '../panel/panelState';

export class HighlightManager {
  private decorations: HighlightDecorations;

  constructor() {
    this.decorations = new HighlightDecorations();
  }

  /**
   * Update highlights for all active panels
   */
  updateHighlights(
    panels: PanelInfo[],
    focusedPanel: vscode.WebviewPanel | undefined
  ): void {
    // Separate normal and focused ranges by editor
    const normalRangesByEditor = new Map<vscode.TextEditor, vscode.Range[]>();
    const focusedRangesByEditor = new Map<vscode.TextEditor, vscode.Range[]>();

    for (const panelInfo of panels) {
      const isFocused = panelInfo.panel === focusedPanel;

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
      editor.setDecorations(this.decorations.getNormalDecoration(), []);
      editor.setDecorations(this.decorations.getFocusedDecoration(), []);
    }

    // Apply normal highlights
    for (const [editor, ranges] of normalRangesByEditor) {
      editor.setDecorations(this.decorations.getNormalDecoration(), ranges);
    }

    // Apply focused highlights
    for (const [editor, ranges] of focusedRangesByEditor) {
      editor.setDecorations(this.decorations.getFocusedDecoration(), ranges);
    }
  }

  /**
   * Dispose all decorations
   */
  dispose(): void {
    this.decorations.dispose();
  }
}
