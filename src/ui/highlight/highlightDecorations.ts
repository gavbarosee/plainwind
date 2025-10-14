/**
 * Decoration types for highlighting active CodeLens lines
 */

import * as vscode from 'vscode';

export class HighlightDecorations {
  private normalDecoration: vscode.TextEditorDecorationType;
  private focusedDecoration: vscode.TextEditorDecorationType;

  constructor() {
    // Normal highlight for non-focused panels
    this.normalDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: 'rgba(64, 160, 255, 0.2)',
      border: '0 0 0 3px solid rgba(64, 160, 255, 0.8)',
      borderWidth: '0 0 0 3px',
      borderStyle: 'solid',
      borderColor: 'rgba(64, 160, 255, 0.8)',
      isWholeLine: true,
    });

    // Intense highlight for focused panel
    this.focusedDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: 'rgba(64, 160, 255, 0.35)',
      border: '0 0 0 4px solid rgba(64, 160, 255, 1)',
      borderWidth: '0 0 0 4px',
      borderStyle: 'solid',
      borderColor: 'rgba(64, 160, 255, 1)',
      isWholeLine: true,
    });
  }

  /**
   * Get the normal (non-focused) decoration type
   */
  getNormalDecoration(): vscode.TextEditorDecorationType {
    return this.normalDecoration;
  }

  /**
   * Get the focused decoration type
   */
  getFocusedDecoration(): vscode.TextEditorDecorationType {
    return this.focusedDecoration;
  }

  /**
   * Dispose all decorations
   */
  dispose(): void {
    this.normalDecoration.dispose();
    this.focusedDecoration.dispose();
  }
}

