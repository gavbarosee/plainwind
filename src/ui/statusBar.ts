/**
 * Status bar item management
 */

import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem | undefined;

/**
 * Create and show the status bar item
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
 * Update status bar item text and tooltip
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
