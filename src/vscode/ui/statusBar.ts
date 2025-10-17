/**
 * Status bar item management
 * 
 * Displays a clickable status bar item showing extension state.
 * Clicking the item opens the quick menu with all options.
 */

import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Create and show the status bar item
 * 
 * Creates a status bar item on the right side with:
 * - Plainwind icon
 * - "Plainwind" text
 * - Click command to show menu
 * 
 * @param context - Extension context for registering disposable
 */
export function createStatusBar(context: vscode.ExtensionContext): void {
  statusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right,
    100
  );
  statusBarItem.command = 'plainwind.showMenu';
  statusBarItem.show();
  context.subscriptions.push(statusBarItem);
}

/**
 * Update status bar item text and tooltip based on enabled state
 * 
 * Visual feedback:
 * - Enabled: Normal appearance with "$(wind) Plainwind"
 * - Disabled: Warning background with "$(wind) Plainwind (disabled)"
 * 
 * @param enabled - Whether extension is currently enabled
 */
export function updateStatusBar(enabled: boolean): void {
  if (!statusBarItem) return;

  if (enabled) {
    statusBarItem.text = '$(wind) Plainwind';
    statusBarItem.tooltip = 'Plainwind is enabled (click for options)';
    statusBarItem.backgroundColor = undefined;
  } else {
    statusBarItem.text = '$(wind) Plainwind (disabled)';
    statusBarItem.tooltip = 'Plainwind is disabled (click for options)';
    statusBarItem.backgroundColor = new vscode.ThemeColor(
      'statusBarItem.warningBackground'
    );
  }
}
