import * as vscode from "vscode";
import {
  initializeDecorations,
  updateInlineDecorations,
  disposeDecorations,
} from "./decorations";
import { TailwindCodeLensProvider } from "./codelens";

export function activate(context: vscode.ExtensionContext) {
  console.log("Plainwind extension is now active");

  // Register CodeLens provider
  const codeLensProvider = new TailwindCodeLensProvider();
  context.subscriptions.push(
    vscode.languages.registerCodeLensProvider(
      [
        { language: "javascriptreact" },
        { language: "typescriptreact" },
        { language: "javascript" },
        { language: "typescript" },
        { language: "html" },
        { language: "vue" },
        { language: "svelte" },
      ],
      codeLensProvider
    )
  );

  // Initialize inline decorations
  initializeDecorations();
  updateActiveEditor();
  registerEventListeners(context);
}

export function deactivate() {
  disposeDecorations();
}

/**
 * Update decorations for the currently active editor
 */
function updateActiveEditor() {
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    updateInlineDecorations(activeEditor);
  }
}

/**
 * Register event listeners for editor and document changes
 */
function registerEventListeners(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor(handleEditorChange)
  );

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(handleDocumentChange)
  );
}

/**
 * Handle active editor change events
 */
function handleEditorChange(editor: vscode.TextEditor | undefined) {
  if (editor) {
    updateInlineDecorations(editor);
  }
}

/**
 * Handle document change events
 */
function handleDocumentChange(event: vscode.TextDocumentChangeEvent) {
  const editor = vscode.window.activeTextEditor;
  if (editor && event.document === editor.document) {
    updateInlineDecorations(editor);
  }
}
