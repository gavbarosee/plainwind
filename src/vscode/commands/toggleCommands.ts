/**
 * Command handlers for toggling extension settings
 * 
 * Provides user-facing commands for:
 * - Toggling extension on/off globally
 * - Enabling/disabling for specific files
 * - Changing display mode (CodeLens, Hover, Off)
 * - Toggling category grouping and emojis
 * - Quick menu for all options
 */

import * as vscode from 'vscode';
import { updateStatusBar } from '@src/vscode/ui/statusBar';
import { disableFile, enableFile, isFileDisabled } from './fileState';

/**
 * Register all toggle commands
 * 
 * Registers 8 commands:
 * - plainwind.showMenu: Shows quick menu with all options
 * - plainwind.toggleEnabled: Toggle extension globally
 * - plainwind.disableForFile: Disable for current file
 * - plainwind.enableForFile: Enable for current file  
 * - plainwind.toggleForFile: Toggle for current file
 * - plainwind.chooseDisplayMode: Change display mode picker
 * - plainwind.toggleGroupByCategory: Toggle category grouping
 * - plainwind.toggleCategoryEmojis: Toggle emojis in categories
 * 
 * @param context - Extension context for registering disposables
 */
export function registerToggleCommands(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('plainwind.showMenu', showQuickMenu),
    vscode.commands.registerCommand(
      'plainwind.toggleEnabled',
      toggleExtensionEnabled
    ),
    vscode.commands.registerCommand(
      'plainwind.disableForFile',
      disableForCurrentFile
    ),
    vscode.commands.registerCommand(
      'plainwind.enableForFile',
      enableForCurrentFile
    ),
    vscode.commands.registerCommand(
      'plainwind.toggleForFile',
      toggleForCurrentFile
    ),
    vscode.commands.registerCommand(
      'plainwind.chooseDisplayMode',
      chooseDisplayMode
    ),
    vscode.commands.registerCommand(
      'plainwind.toggleGroupByCategory',
      toggleGroupByCategory
    ),
    vscode.commands.registerCommand(
      'plainwind.toggleCategoryEmojis',
      toggleCategoryEmojis
    )
  );
}

/**
 * Show quick menu with all Plainwind options
 * 
 * Displays a QuickPick menu with all available commands:
 * - Enable/Disable extension
 * - Choose display mode
 * - Toggle grouping and emojis
 * - File-specific toggle
 * - Clear all panels
 * 
 * Menu items show current state (checkmarks, descriptions)
 */
async function showQuickMenu(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const enabled = config.get<boolean>('enabled', true);
  const displayMode = config.get<string>('displayMode', 'codelens');
  const grouping = config.get<boolean>('groupByCategory', true);
  const emojis = config.get<boolean>('showCategoryEmojis', false);

  interface QuickPickItemWithAction extends vscode.QuickPickItem {
    action: () => Promise<void> | void;
  }

  const items: QuickPickItemWithAction[] = [
    {
      label: `$(${enabled ? 'check' : 'circle-outline'}) ${enabled ? 'Disable' : 'Enable'} Extension`,
      description: enabled
        ? 'Turn off Plainwind globally'
        : 'Turn on Plainwind globally',
      action: toggleExtensionEnabled,
    },
    {
      label: '$(settings-gear) Choose Display Mode',
      description: `Current: ${displayMode}`,
      action: chooseDisplayMode,
    },
    {
      label: '$(symbol-namespace) Toggle Group By Category',
      description: grouping ? '✓ Enabled' : '○ Disabled',
      action: toggleGroupByCategory,
    },
    {
      label: '$(smiley) Toggle Category Emojis',
      description: emojis ? '✓ Enabled' : '○ Disabled',
      action: toggleCategoryEmojis,
    },
    {
      label: '',
      kind: vscode.QuickPickItemKind.Separator,
      action: async () => {},
    },
    {
      label: '$(file) Toggle for Current File',
      description: 'Enable/disable for the active file',
      action: toggleForCurrentFile,
    },
    {
      label: '$(close-all) Clear All Detail Panels',
      description: 'Close all open translation panels',
      action: async () => {
        await vscode.commands.executeCommand('plainwind.clearAllPanels');
      },
    },
  ];

  const selected = await vscode.window.showQuickPick(items, {
    placeHolder: 'Plainwind Options',
    title: 'Plainwind - Tailwind to Plain English',
  });

  if (selected) {
    await selected.action();
  }
}

/**
 * Toggle extension globally on/off
 * 
 * Updates the global 'plainwind.enabled' setting and prompts for reload.
 * Also updates the status bar to reflect the new state.
 */
async function toggleExtensionEnabled(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const currentEnabled = config.get<boolean>('enabled', true);
  await config.update(
    'enabled',
    !currentEnabled,
    vscode.ConfigurationTarget.Global
  );

  const newState = !currentEnabled;
  updateStatusBar(newState);

  promptReload(
    `Plainwind ${newState ? 'enabled' : 'disabled'}. Reload window to apply changes?`
  );
}

/**
 * Disable extension for current file
 */
async function disableForCurrentFile(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active file');
    return;
  }

  const fileUri = editor.document.uri.toString();
  await disableFile(fileUri);

  const fileName = editor.document.fileName.split('/').pop();
  promptReload(`Plainwind disabled for ${fileName}. Reload window to apply.`);
}

/**
 * Enable extension for current file
 */
async function enableForCurrentFile(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active file');
    return;
  }

  const fileUri = editor.document.uri.toString();
  if (!isFileDisabled(fileUri)) {
    vscode.window.showInformationMessage(
      'Plainwind is already enabled for this file'
    );
    return;
  }

  await enableFile(fileUri);

  const fileName = editor.document.fileName.split('/').pop();
  promptReload(`Plainwind enabled for ${fileName}. Reload window to apply.`);
}

/**
 * Toggle extension for current file
 */
async function toggleForCurrentFile(): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    vscode.window.showWarningMessage('No active file');
    return;
  }

  const fileUri = editor.document.uri.toString();
  const isDisabled = isFileDisabled(fileUri);

  if (isDisabled) {
    await enableFile(fileUri);
  } else {
    await disableFile(fileUri);
  }

  const fileName = editor.document.fileName.split('/').pop();
  promptReload(
    `Plainwind ${isDisabled ? 'enabled' : 'disabled'} for ${fileName}. Reload window to apply.`
  );
}

/**
 * Show picker to choose display mode
 */
async function chooseDisplayMode(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const currentMode = config.get<string>('displayMode', 'codelens');

  const options = [
    {
      label: 'CodeLens',
      description: 'Show translations above className lines',
      value: 'codelens',
    },
    {
      label: 'Hover',
      description: 'Show translations only on hover',
      value: 'hover',
    },
    {
      label: 'Off',
      description: 'Disable all translations',
      value: 'off',
    },
  ];

  const selected = await vscode.window.showQuickPick(options, {
    placeHolder: `Current: ${currentMode}`,
    title: 'Choose Display Mode',
  });

  if (selected && selected.value !== currentMode) {
    await config.update(
      'displayMode',
      selected.value,
      vscode.ConfigurationTarget.Global
    );

    promptReload(
      `Display mode changed to ${selected.label}. Reload window to apply?`
    );
  }
}

/**
 * Toggle group by category setting
 */
async function toggleGroupByCategory(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const current = config.get<boolean>('groupByCategory', true);
  await config.update(
    'groupByCategory',
    !current,
    vscode.ConfigurationTarget.Global
  );

  vscode.window.showInformationMessage(
    `Group by category ${!current ? 'enabled' : 'disabled'}`
  );
}

/**
 * Toggle category emojis setting
 */
async function toggleCategoryEmojis(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const grouping = config.get<boolean>('groupByCategory', true);

  if (!grouping) {
    const selection = await vscode.window.showWarningMessage(
      'Category emojis only work when "Group by Category" is enabled. Enable grouping?',
      'Enable Grouping',
      'Cancel'
    );

    if (selection === 'Enable Grouping') {
      await config.update(
        'groupByCategory',
        true,
        vscode.ConfigurationTarget.Global
      );
      await config.update(
        'showCategoryEmojis',
        true,
        vscode.ConfigurationTarget.Global
      );
      vscode.window.showInformationMessage('Grouping and emojis enabled');
    }
    return;
  }

  const current = config.get<boolean>('showCategoryEmojis', false);
  await config.update(
    'showCategoryEmojis',
    !current,
    vscode.ConfigurationTarget.Global
  );

  vscode.window.showInformationMessage(
    `Category emojis ${!current ? 'enabled' : 'disabled'}`
  );
}

/**
 * Helper to prompt for window reload
 * 
 * Shows a message with "Reload" and "Later" buttons.
 * Many settings require a reload to take effect because providers
 * are registered during activation.
 * 
 * @param message - Message to show to user
 */
function promptReload(message: string): void {
  vscode.window
    .showInformationMessage(message, 'Reload', 'Later')
    .then((selection) => {
      if (selection === 'Reload') {
        vscode.commands.executeCommand('workbench.action.reloadWindow');
      }
    });
}
