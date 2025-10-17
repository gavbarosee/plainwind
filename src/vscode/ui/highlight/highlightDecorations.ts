/**
 * Decoration types for highlighting active CodeLens lines
 *
 * Creates two decoration styles:
 * - Normal: Subtle blue highlight with 3px left border (non-focused panels)
 * - Focused: More intense blue highlight with 4px left border (focused panel)
 *
 * Both decorations apply to the whole line for better visibility.
 */

import * as vscode from 'vscode';

/**
 * Manages text editor decorations for panel highlights
 *
 * Creates and provides access to decoration types.
 * Decorations must be disposed when no longer needed to free resources.
 */
export class HighlightDecorations {
  private normalDecoration: vscode.TextEditorDecorationType;
  private focusedDecoration: vscode.TextEditorDecorationType;

  constructor() {
    /**
     * Normal highlight for non-focused panels
     *
     * Visual style:
     * - Light blue background (20% opacity)
     * - 3px solid blue left border (80% opacity)
     * - Whole line highlighted
     */
    this.normalDecoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: 'rgba(64, 160, 255, 0.2)',
      border: '0 0 0 3px solid rgba(64, 160, 255, 0.8)',
      borderWidth: '0 0 0 3px',
      borderStyle: 'solid',
      borderColor: 'rgba(64, 160, 255, 0.8)',
      isWholeLine: true,
    });

    /**
     * Intense highlight for focused panel
     *
     * Visual style:
     * - Medium blue background (35% opacity)
     * - 4px solid blue left border (100% opacity)
     * - Whole line highlighted
     *
     * More prominent than normal to draw attention to the active panel.
     */
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
   *
   * Used for panels that are open but not currently focused.
   *
   * @returns Decoration type for normal highlights
   */
  getNormalDecoration(): vscode.TextEditorDecorationType {
    return this.normalDecoration;
  }

  /**
   * Get the focused decoration type
   *
   * Used for the panel that currently has focus.
   *
   * @returns Decoration type for focused highlights
   */
  getFocusedDecoration(): vscode.TextEditorDecorationType {
    return this.focusedDecoration;
  }

  /**
   * Dispose all decorations
   *
   * Frees VS Code resources. Should be called when HighlightManager is disposed.
   */
  dispose(): void {
    this.normalDecoration.dispose();
    this.focusedDecoration.dispose();
  }
}
