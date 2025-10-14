import * as vscode from 'vscode';
import { translateClasses } from './translator';

const CLASS_NAME_PATTERN = /(class(?:Name)?=["'])([^"']+)(["'])/g;

/**
 * CodeLens provider for Tailwind class translations
 */
export class TailwindCodeLensProvider implements vscode.CodeLensProvider {
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  public provideCodeLenses(
    document: vscode.TextDocument
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    const codeLenses: vscode.CodeLens[] = [];
    const text = document.getText();
    const regex = new RegExp(CLASS_NAME_PATTERN);
    let match;

    while ((match = regex.exec(text)) !== null) {
      const classString = match[2];

      // Skip empty class strings
      if (!classString || !classString.trim()) {
        continue;
      }

      const translation = translateClasses(classString);
      const startPos = document.positionAt(match.index);
      const range = new vscode.Range(startPos, startPos);

      const codeLens = new vscode.CodeLens(range, {
        title: `💨 ${translation}`,
        command: '',
      });

      codeLenses.push(codeLens);
    }

    return codeLenses;
  }
}
