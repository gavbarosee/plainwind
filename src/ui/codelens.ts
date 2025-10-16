import * as vscode from 'vscode';
import {
  translateClasses,
  translateConditionalClasses,
} from '../translation/translator';
import { isFileEnabled } from '../extension';
import {
  extractAllClassNames,
  combineClassStrings,
  type ClassExtraction,
} from './classExtractor';

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

    // Extract all className occurrences using the enhanced extractor
    const extractions = extractAllClassNames(text);

    for (const extraction of extractions) {
      // Combine multiple class strings if needed (e.g., from template literals)
      const classString = combineClassStrings(extraction.classStrings);

      // Skip empty class strings
      if (!classString || !classString.trim()) {
        continue;
      }

      // Use conditional translation if available, otherwise fall back to simple translation
      const translation =
        extraction.conditionalClasses &&
        extraction.conditionalClasses.length > 0
          ? translateConditionalClasses(extraction.conditionalClasses)
          : translateClasses(classString);

      const startPos = document.positionAt(extraction.range.start);
      const endPos = document.positionAt(extraction.range.end);
      const range = new vscode.Range(startPos, endPos);

      // Truncate if too long
      let displayText = translation;
      let isTruncated = false;

      if (translation.length > MAX_CODELENS_LENGTH) {
        displayText =
          translation.substring(0, MAX_CODELENS_LENGTH).trim() + '...';
        isTruncated = true;
      }

      // Add indicator for dynamic/complex patterns
      const typeIndicator =
        extraction.type !== 'simple' ? ` [${extraction.type}]` : '';

      const codeLens = new vscode.CodeLens(range, {
        title: `💨 ${displayText}${typeIndicator}${isTruncated ? ' (click for details)' : ''}`,
        command: 'plainwind.showFullTranslation',
        arguments: [translation, classString, range, document.uri],
      });

      codeLenses.push(codeLens);
    }

    return codeLenses;
  }
}
