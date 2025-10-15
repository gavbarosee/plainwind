import * as vscode from 'vscode';
import { translateClasses } from '../translation/translator';

const CLASS_NAME_PATTERN = /(class(?:Name)?=["'])([^"']+)(["'])/g;

/**
 * Hover provider for Tailwind class translations
 */
export class TailwindHoverProvider implements vscode.HoverProvider {
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | undefined {
    const line = document.lineAt(position.line);
    const lineText = line.text;
    const regex = new RegExp(CLASS_NAME_PATTERN);
    let match;

    while ((match = regex.exec(lineText)) !== null) {
      const classString = match[2];

      // Skip empty class strings
      if (!classString || !classString.trim()) {
        continue;
      }

      // Calculate the range of the className attribute
      const startIndex = match.index;
      const endIndex = match.index + match[0].length;
      const startPos = new vscode.Position(position.line, startIndex);
      const endPos = new vscode.Position(position.line, endIndex);
      const matchRange = new vscode.Range(startPos, endPos);

      // Check if the hover position is within this className attribute
      if (matchRange.contains(position)) {
        const translation = translateClasses(classString);

        // Create markdown content with the translation
        const markdown = new vscode.MarkdownString();
        markdown.appendMarkdown(`**💨 Tailwind Translation**\n\n`);
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

    return undefined;
  }
}
