/**
 * Manages line highlighting for active detail panels
 *
 * Provides visual feedback showing which code has open detail panels:
 * - Normal highlight: subtle background for panels that aren't focused
 * - Focused highlight: more prominent background for the active panel
 *
 * Coordinates with PanelManager to keep highlights in sync with panel state.
 */

import * as vscode from 'vscode';
import { HighlightDecorations } from './highlightDecorations';
import type { PanelInfo } from '@src/vscode/ui/panel/panelState';

export class HighlightManager {
  private decorations: HighlightDecorations;

  constructor() {
    this.decorations = new HighlightDecorations();
  }

  /**
   * Update highlights for all active panels
   *
   * Algorithm:
   * 1. Group panels by editor and focused state
   * 2. Clear all existing decorations from all editors
   * 3. Apply normal decorations to non-focused panels
   * 4. Apply focused decorations to the focused panel
   * 5. Navigate to the focused highlight
   *
   * This ensures only relevant highlights are shown and prevents stale decorations.
   *
   * @param panels - All active panel information
   * @param focusedPanel - The currently focused panel (if any)
   */
  updateHighlights(
    panels: PanelInfo[],
    focusedPanel: vscode.WebviewPanel | undefined
  ): void {
    // Separate normal and focused ranges by editor
    const normalRangesByEditor = new Map<vscode.TextEditor, vscode.Range[]>();
    const focusedRangesByEditor = new Map<vscode.TextEditor, vscode.Range[]>();
    let focusedPanelInfo: PanelInfo | undefined;

    for (const panelInfo of panels) {
      const isFocused = panelInfo.panel === focusedPanel;

      if (isFocused) {
        const ranges = focusedRangesByEditor.get(panelInfo.editor) || [];
        ranges.push(panelInfo.range);
        focusedRangesByEditor.set(panelInfo.editor, ranges);
        focusedPanelInfo = panelInfo;
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

    // Navigate to focused highlight
    if (focusedPanelInfo) {
      this.navigateToHighlight(focusedPanelInfo.editor, focusedPanelInfo.range);
    }
  }

  /**
   * Navigate the editor view to a highlighted range
   *
   * Centers the editor viewport on the highlighted code line.
   * This helps users quickly locate the code associated with the active panel.
   *
   * @param editor - The editor containing the highlight
   * @param range - The range to navigate to
   */
  private navigateToHighlight(
    editor: vscode.TextEditor,
    range: vscode.Range
  ): void {
    // Reveal the editor and bring it to focus
    vscode.window.showTextDocument(editor.document, {
      viewColumn: editor.viewColumn,
      preserveFocus: false,
      preview: false,
    });

    // Scroll to the range and center it in the viewport
    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
  }

  /**
   * Dispose all decorations
   */
  dispose(): void {
    this.decorations.dispose();
  }
}
