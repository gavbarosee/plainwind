/**
 * Manages per-file enabled/disabled state
 */

import * as vscode from 'vscode';

let disabledFiles: Set<string> = new Set();
let workspaceContext: vscode.ExtensionContext | undefined;

/**
 * Initialize file state from workspace storage
 */
export function initializeFileState(context: vscode.ExtensionContext): void {
  workspaceContext = context;
  const savedDisabledFiles = context.workspaceState.get<string[]>(
    'disabledFiles',
    []
  );
  disabledFiles = new Set(savedDisabledFiles);
}

/**
 * Check if extension should be active for a file
 */
export function isFileEnabled(documentUri: vscode.Uri): boolean {
  return !disabledFiles.has(documentUri.toString());
}

/**
 * Disable extension for a specific file
 */
export async function disableFile(fileUri: string): Promise<void> {
  disabledFiles.add(fileUri);
  await saveFileState();
}

/**
 * Enable extension for a specific file
 */
export async function enableFile(fileUri: string): Promise<void> {
  disabledFiles.delete(fileUri);
  await saveFileState();
}

/**
 * Check if a file is currently disabled
 */
export function isFileDisabled(fileUri: string): boolean {
  return disabledFiles.has(fileUri);
}

/**
 * Save disabled files list to workspace state
 */
async function saveFileState(): Promise<void> {
  if (workspaceContext) {
    await workspaceContext.workspaceState.update(
      'disabledFiles',
      Array.from(disabledFiles)
    );
  }
}
