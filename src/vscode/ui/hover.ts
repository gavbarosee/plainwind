import * as vscode from 'vscode';
import {
  translateClasses,
  translateConditionalClasses,
} from '@src/core/translation/engine';
import { isFileEnabled } from '@src/extension';
import {
  extractAllClassNames,
  combineClassStrings,
  findExtractionAtPosition,
} from '@src/core/parsing';

/**
 * Hover provider for Tailwind class translations
 */
export class TailwindHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | undefined {
    // Check if extension is enabled for this file
    if (!isFileEnabled(document.uri)) {
      return undefined;
    }

    const text = document.getText();
    const offset = document.offsetAt(position);

    // Extract all className occurrences using the enhanced extractor
    const extractions = extractAllClassNames(text);

    // Find extraction at current position
    const extraction = findExtractionAtPosition(extractions, offset);

    if (!extraction) {
      return undefined;
    }

    // Combine multiple class strings if needed
    const classString = combineClassStrings(extraction.classStrings);

    // Skip empty class strings
    if (!classString || !classString.trim()) {
      return undefined;
    }

    // Use conditional translation if available, otherwise fall back to simple translation
    const translation =
      extraction.conditionalClasses && extraction.conditionalClasses.length > 0
        ? translateConditionalClasses(extraction.conditionalClasses)
        : translateClasses(classString);

    // Calculate the range
    const startPos = document.positionAt(extraction.range.start);
    const endPos = document.positionAt(extraction.range.end);
    const matchRange = new vscode.Range(startPos, endPos);

    // Create markdown content with the translation
    const markdown = new vscode.MarkdownString();
    const typeLabel =
      extraction.type !== 'simple' ? ` (${extraction.type})` : '';
    markdown.appendMarkdown(`**💨 Tailwind Translation${typeLabel}**\n\n`);
    markdown.appendMarkdown(translation);
    markdown.isTrusted = true;
    markdown.supportHtml = true;

    // Add a clickable command to toggle details panel
    // Serialize range data properly for the command
    const rangeData = {
      startLine: startPos.line,
      startChar: startPos.character,
      endLine: endPos.line,
      endChar: endPos.character,
    };
    const commandUri = vscode.Uri.parse(
      `command:plainwind.showFullTranslationFromHover?${encodeURIComponent(
        JSON.stringify([
          translation,
          classString,
          rangeData,
          document.uri.toString(),
        ])
      )}`
    );
    // Use "Toggle Details" since hover content is cached by VS Code
    // and won't update dynamically when panel state changes
    markdown.appendMarkdown(`\n\n[Toggle Details](${commandUri})`);

    return new vscode.Hover(markdown, matchRange);
  }
}
