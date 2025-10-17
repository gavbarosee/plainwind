/**
 * Hover provider for on-demand Tailwind class translations
 * 
 * Displays translations when hovering over className/class attributes.
 * Unlike CodeLens, hover doesn't show translations inline - they only
 * appear on mouse hover, keeping the editor cleaner.
 * 
 * The hover shows:
 * - Plain English translation
 * - Type indicator for complex patterns
 * - "Toggle Details" link to open/close detail panel
 * 
 * Implements VS Code's HoverProvider interface.
 */

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
 * 
 * VS Code calls `provideHover` when the user hovers over text.
 * We check if the hover position is within a className attribute.
 */
export class TailwindHoverProvider implements vscode.HoverProvider {
  /**
   * Provide hover information at a specific position
   * 
   * Process:
   * 1. Check if extension is enabled for this file
   * 2. Find className extraction at hover position
   * 3. Translate the classes
   * 4. Create Markdown hover with translation and toggle link
   * 
   * @param document - Document being hovered
   * @param position - Cursor position
   * @returns Hover object with translation, or undefined if not in className
   */
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

    /**
     * Add a clickable command to toggle details panel
     * 
     * Note: Hover content is cached by VS Code and doesn't update dynamically.
     * We use "Toggle Details" instead of "Show/Hide" because we can't reflect
     * the actual panel state in the cached hover text.
     * 
     * Range data must be serialized because command URIs only accept strings.
     */
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
    markdown.appendMarkdown(`\n\n[Toggle Details](${commandUri})`);

    return new vscode.Hover(markdown, matchRange);
  }
}
