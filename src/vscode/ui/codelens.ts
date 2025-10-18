/**
 * CodeLens provider for inline Tailwind class translations
 *
 * Displays translations above className/class attributes in the editor.
 * Each CodeLens shows:
 * - Plain English translation
 * - Type indicator for complex patterns ([template], [helper])
 * - Click-to-expand for truncated translations
 *
 * The provider implements VS Code's CodeLensProvider interface and is
 * registered during extension activation.
 */

import * as vscode from 'vscode';
import {
  translateClasses,
  translateConditionalClasses,
} from '@src/core/translation/engine';
import { isFileEnabled } from '@src/extension';
import { extractAllClassNames, combineClassStrings } from '@src/core/parsing';

/**
 * Maximum characters before truncation
 *
 * Longer translations are truncated to avoid cluttering the editor.
 * Users can click to see the full translation in a detail panel.
 */
const MAX_CODELENS_LENGTH = 150;

/**
 * CodeLens provider for Tailwind class translations
 *
 * VS Code calls `provideCodeLenses` whenever the document changes or
 * when CodeLens needs to be refreshed.
 */
export class TailwindCodeLensProvider implements vscode.CodeLensProvider {
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> =
    new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> =
    this._onDidChangeCodeLenses.event;

  /**
   * Trigger a refresh of all CodeLenses
   *
   * This is called when settings change that affect how translations are displayed
   * (e.g., groupByCategory, showCategoryEmojis, enhanceVisuals)
   */
  public refresh(): void {
    this._onDidChangeCodeLenses.fire();
  }

  /**
   * Provide CodeLenses for a document
   *
   * Process:
   * 1. Check if extension is enabled for this file
   * 2. Extract all className occurrences
   * 3. Translate each occurrence
   * 4. Truncate long translations
   * 5. Add type indicators for complex patterns
   * 6. Create CodeLens with click command
   *
   * @param document - Text document to provide CodeLenses for
   * @returns Array of CodeLens objects to display
   */
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

      /**
       * Truncate long translations to avoid cluttering the editor
       * Full translation is available by clicking the CodeLens
       */
      let displayText = translation;
      let isTruncated = false;

      if (translation.length > MAX_CODELENS_LENGTH) {
        displayText =
          translation.substring(0, MAX_CODELENS_LENGTH).trim() + '...';
        isTruncated = true;
      }

      /**
       * Add type indicator for non-simple patterns
       * - [template]: Template literals with ${...}
       * - [helper]: Helper functions like clsx() or framework directives
       */
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
