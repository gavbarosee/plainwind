/**
 * Manages per-file enabled/disabled state
 *
 * Allows users to disable Plainwind for specific files without turning it off globally.
 * State is persisted in workspace storage so it survives VS Code restarts.
 *
 * Use cases:
 * - Disable for large files with many Tailwind classes
 * - Disable for files where inline translations are distracting
 * - Disable for generated files
 */

import * as vscode from 'vscode';

/** Set of file URIs where the extension is disabled */
let disabledFiles: Set<string> = new Set();

/** Extension context for accessing workspace storage */
let workspaceContext: vscode.ExtensionContext | undefined;

/**
 * Initialize file state from workspace storage
 *
 * Loads the list of disabled files from persistent storage.
 * This is called during extension activation.
 *
 * @param context - Extension context for accessing workspace state
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
 *
 * Used by providers (CodeLens, Hover) to determine if they should
 * provide translations for a given document.
 *
 * @param documentUri - URI of the document to check
 * @returns true if extension is enabled for this file
 *
 * @example
 * ```ts
 * if (!isFileEnabled(document.uri)) {
 *   return []; // Don't provide translations
 * }
 * ```
 */
export function isFileEnabled(documentUri: vscode.Uri): boolean {
  return !disabledFiles.has(documentUri.toString());
}

/**
 * Disable extension for a specific file
 *
 * Adds the file to the disabled set and persists the change.
 * Requires window reload to take effect.
 *
 * @param fileUri - String representation of file URI
 */
export async function disableFile(fileUri: string): Promise<void> {
  disabledFiles.add(fileUri);
  await saveFileState();
}

/**
 * Enable extension for a specific file
 *
 * Removes the file from the disabled set and persists the change.
 * Requires window reload to take effect.
 *
 * @param fileUri - String representation of file URI
 */
export async function enableFile(fileUri: string): Promise<void> {
  disabledFiles.delete(fileUri);
  await saveFileState();
}

/**
 * Check if a file is currently disabled
 *
 * @param fileUri - String representation of file URI
 * @returns true if extension is disabled for this file
 */
export function isFileDisabled(fileUri: string): boolean {
  return disabledFiles.has(fileUri);
}

/**
 * Save disabled files list to workspace storage
 *
 * Persists the current set of disabled files so they remain disabled
 * across VS Code restarts.
 */
async function saveFileState(): Promise<void> {
  if (workspaceContext) {
    await workspaceContext.workspaceState.update(
      'disabledFiles',
      Array.from(disabledFiles)
    );
  }
}
