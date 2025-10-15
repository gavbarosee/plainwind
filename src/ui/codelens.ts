import * as vscode from 'vscode';
import { translateClasses } from '../translation/translator';
import { isFileEnabled } from '../extension';

const CLASS_NAME_PATTERN = /(class(?:Name)?=["'])([^"']+)(["'])/g;
const MAX_CODELENS_LENGTH = 150; // Maximum characters before truncation

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
    // Check if extension is enabled for this file
    if (!isFileEnabled(document.uri)) {
      return [];
    }

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
      const endPos = document.positionAt(match.index + match[0].length);
      const range = new vscode.Range(startPos, endPos);

      // Truncate if too long
      let displayText = translation;
      let isTruncated = false;

      if (translation.length > MAX_CODELENS_LENGTH) {
        displayText =
          translation.substring(0, MAX_CODELENS_LENGTH).trim() + '...';
        isTruncated = true;
      }

      const codeLens = new vscode.CodeLens(range, {
        title: `💨 ${displayText}${isTruncated ? ' (click for details)' : ''}`,
        command: 'plainwind.showFullTranslation',
        arguments: [translation, classString, range, document.uri],
      });

      codeLenses.push(codeLens);
    }

    return codeLenses;
  }
}
