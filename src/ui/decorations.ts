import * as vscode from 'vscode';
import { translateClasses } from '../translation/translator';

// Constants
// Matches: className="..." or class="..." with single/double quotes
const CLASS_NAME_PATTERN = /(class(?:Name)?=["'])([^"']+)(["'])/g;
const DECORATION_MARGIN = '0 0 0 2em';
const TRANSLATION_PREFIX = ' // ';

let inlineDecorationType: vscode.TextEditorDecorationType;

/**
 * Initialize decoration types
 */
export function initializeDecorations() {
  inlineDecorationType = vscode.window.createTextEditorDecorationType({
    after: {
      color: new vscode.ThemeColor('editorCodeLens.foreground'),
      fontStyle: 'italic',
      margin: DECORATION_MARGIN,
    },
  });
}

/**
 * Update inline decorations for the active editor
 */
export function updateInlineDecorations(editor: vscode.TextEditor) {
  if (!editor) {
    return;
  }

  const text = editor.document.getText();
  const decorations: vscode.DecorationOptions[] = [];

  const classNameRegex = new RegExp(CLASS_NAME_PATTERN);
  let classNameMatch;

  while ((classNameMatch = classNameRegex.exec(text)) !== null) {
    // Group 2 contains the actual class string
    const classString = classNameMatch[2];

    // Skip empty class strings
    if (!classString || !classString.trim()) {
      continue;
    }

    const translation = translateClasses(classString);

    const decoration = createClassNameDecoration(
      classNameMatch,
      translation,
      editor
    );
    decorations.push(decoration);
  }

  editor.setDecorations(inlineDecorationType, decorations);
}

/**
 * Create a decoration for a className attribute
 */
function createClassNameDecoration(
  match: RegExpExecArray,
  translation: string,
  editor: vscode.TextEditor
): vscode.DecorationOptions {
  const endPos = editor.document.positionAt(match.index + match[0].length);

  return {
    range: new vscode.Range(endPos, endPos),
    renderOptions: {
      after: {
        contentText: `${TRANSLATION_PREFIX}${translation}`,
      },
    },
  };
}

/**
 * Dispose decorations
 */
export function disposeDecorations() {
  if (inlineDecorationType) {
    inlineDecorationType.dispose();
  }
}
