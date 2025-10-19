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

// Store CodeLens provider reference so we can refresh it
let codeLensProviderInstance: { refresh: () => void } | undefined;

/**
 * Set the CodeLens provider instance for refreshing
 * Called from extension.ts during activation
 */
export function setCodeLensProvider(provider: { refresh: () => void }): void {
  codeLensProviderInstance = provider;
}

/**
 * Register all toggle commands
 *
 * Registers 11 commands:
 * - plainwind.showMenu: Shows quick menu with all options
 * - plainwind.toggleEnabled: Toggle extension globally
 * - plainwind.disableForFile: Disable for current file
 * - plainwind.enableForFile: Enable for current file
 * - plainwind.toggleForFile: Toggle for current file
 * - plainwind.chooseDisplayMode: Change display mode picker
 * - plainwind.toggleGroupByCategory: Toggle category grouping
 * - plainwind.toggleCategoryEmojis: Toggle emojis in categories
 * - plainwind.toggleEnhanceVisuals: Toggle visual enhancements
 * - plainwind.setCodeLensMaxLength: Set maximum CodeLens display length
 * - plainwind.showWalkthrough: Open getting started guide
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
    ),
    vscode.commands.registerCommand(
      'plainwind.toggleEnhanceVisuals',
      toggleEnhanceVisuals
    ),
    vscode.commands.registerCommand(
      'plainwind.setCodeLensMaxLength',
      setCodeLensMaxLength
    ),
    vscode.commands.registerCommand(
      'plainwind.showWalkthrough',
      showWalkthrough
    )
  );
}

/**
 * Show quick menu with all Plainwind options
 *
 * Displays a well-organized QuickPick menu with logical grouping:
 * 
 * **Display & Formatting** (most used)
 * - Display mode, truncation, category grouping, emojis
 * 
 * **Visual Enhancements**
 * - Enhanced visual rendering options
 * 
 * **Scope & Actions**
 * - File-specific controls, clear panels
 * 
 * **Help & Settings**
 * - Getting started guide, global enable/disable
 *
 * Menu items show current state with checkmarks and detailed descriptions.
 */
async function showQuickMenu(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const enabled = config.get<boolean>('enabled', true);
  const displayMode = config.get<string>('displayMode', 'codelens');
  const grouping = config.get<boolean>('groupByCategory', true);
  const emojis = config.get<boolean>('showCategoryEmojis', false);
  const enhanceVisuals = config.get<boolean>('enhanceVisuals', false);
  const codeLensMaxLength = config.get<number>('codeLensMaxLength', 180);

  interface QuickPickItemWithAction extends vscode.QuickPickItem {
    action: () => Promise<void> | void;
  }

  const items: QuickPickItemWithAction[] = [
    // ===== DISPLAY & FORMATTING (Most Used) =====
    {
      label: 'Display & Formatting',
      kind: vscode.QuickPickItemKind.Separator,
      action: async () => {},
    },
    {
      label: '$(eye) Display Mode',
      description: `Current: ${displayMode}`,
      detail: 'CodeLens (always visible), Hover (on hover), or Off',
      action: chooseDisplayMode,
    },
    {
      label: '$(text-size) Truncation Length',
      description: `Cutoff at ${codeLensMaxLength} chars`,
      detail: 'Adjust when translations get truncated with "..."',
      action: setCodeLensMaxLength,
    },
    {
      label: `$(list-tree) Group By Category`,
      description: grouping ? '✓ Enabled' : '○ Disabled',
      detail: 'Organize translations by Layout, Colors, Typography, etc.',
      action: toggleGroupByCategory,
    },
    {
      label: `$(smiley) Category Emojis`,
      description: emojis ? '✓ Enabled' : '○ Disabled',
      detail: 'Show emoji icons next to category names',
      action: toggleCategoryEmojis,
    },

    // ===== VISUAL ENHANCEMENTS =====
    {
      label: 'Visual Enhancements',
      kind: vscode.QuickPickItemKind.Separator,
      action: async () => {},
    },
    {
      label: '$(paintcan) Enhanced Visuals',
      description: enhanceVisuals ? '✓ Enabled' : '○ Disabled',
      detail: enhanceVisuals
        ? 'Colors, font weights, shadows shown visually'
        : 'Enable visual rendering of colors, fonts, shadows',
      action: toggleEnhanceVisuals,
    },

    // ===== SCOPE & ACTIONS =====
    {
      label: 'Scope & Actions',
      kind: vscode.QuickPickItemKind.Separator,
      action: async () => {},
    },
    {
      label: '$(file-code) This File',
      description: 'Toggle extension for active file',
      detail: 'Enable or disable Plainwind for the current file only',
      action: toggleForCurrentFile,
    },
    {
      label: '$(clear-all) Clear All Panels',
      description: 'Close all open translation panels',
      detail: 'Remove all detail panel tabs at once',
      action: async () => {
        await vscode.commands.executeCommand('plainwind.clearAllPanels');
      },
    },

    // ===== HELP & SETTINGS =====
    {
      label: 'Help & Settings',
      kind: vscode.QuickPickItemKind.Separator,
      action: async () => {},
    },
    {
      label: '$(question) Getting Started',
      description: 'Interactive walkthrough with demos',
      detail: 'Learn how to use Plainwind features',
      action: showWalkthrough,
    },
    {
      label: `$(${enabled ? 'circle-slash' : 'check'}) ${enabled ? 'Disable' : 'Enable'} Extension`,
      description: enabled ? 'Turn off globally' : 'Turn on globally',
      detail: enabled
        ? 'Disable Plainwind for all files'
        : 'Enable Plainwind for all files',
      action: toggleExtensionEnabled,
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
 * Updates the global 'plainwind.enabled' setting.
 * The configuration listener will prompt for reload.
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

  // Refresh CodeLens to immediately hide translations for this file
  if (codeLensProviderInstance) {
    codeLensProviderInstance.refresh();
  }

  const fileName = editor.document.fileName.split('/').pop();
  vscode.window.showInformationMessage(`Plainwind disabled for ${fileName}`);
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

  // Refresh CodeLens to immediately show translations for this file
  if (codeLensProviderInstance) {
    codeLensProviderInstance.refresh();
  }

  const fileName = editor.document.fileName.split('/').pop();
  vscode.window.showInformationMessage(`Plainwind enabled for ${fileName}`);
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

  // Refresh CodeLens to immediately apply the change
  if (codeLensProviderInstance) {
    codeLensProviderInstance.refresh();
  }

  const fileName = editor.document.fileName.split('/').pop();
  vscode.window.showInformationMessage(
    `Plainwind ${isDisabled ? 'enabled' : 'disabled'} for ${fileName}`
  );
}

/**
 * Show picker to choose display mode
 */
async function chooseDisplayMode(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const currentMode = config.get<string>('displayMode', 'codelens');

  interface DisplayModeOption extends vscode.QuickPickItem {
    value: string | 'back';
  }

  const options: DisplayModeOption[] = [
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
    {
      label: '',
      kind: vscode.QuickPickItemKind.Separator,
      value: 'separator',
    },
    {
      label: '$(arrow-left) Back to Menu',
      description: 'Return to main options',
      value: 'back',
    },
  ];

  const selected = await vscode.window.showQuickPick(options, {
    placeHolder: `Current: ${currentMode}`,
    title: 'Choose Display Mode',
  });

  if (selected) {
    if (selected.value === 'back') {
      await showQuickMenu();
    } else if (selected.value !== currentMode && selected.value !== 'separator') {
      await config.update(
        'displayMode',
        selected.value,
        vscode.ConfigurationTarget.Global
      );
      // The configuration listener will prompt for reload
    }
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
 * Toggle visual enhancements setting
 */
async function toggleEnhanceVisuals(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const current = config.get<boolean>('enhanceVisuals', false);
  await config.update(
    'enhanceVisuals',
    !current,
    vscode.ConfigurationTarget.Global
  );

  vscode.window.showInformationMessage(
    `Visual enhancements ${!current ? 'enabled' : 'disabled'} (colors, font weights, shadows, spacing values, etc.)`
  );
}

/**
 * Set CodeLens truncation length
 *
 * Shows a quick-pick menu with preset options for common window sizes,
 * plus a custom option for manual entry.
 */
async function setCodeLensMaxLength(): Promise<void> {
  const config = vscode.workspace.getConfiguration('plainwind');
  const current = config.get<number>('codeLensMaxLength', 180);

  interface PresetOption extends vscode.QuickPickItem {
    value: number | 'custom' | 'back' | 'separator';
  }

  const presets: PresetOption[] = [
    {
      label: '$(arrow-small-left) Compact',
      description: '100 chars',
      detail: 'For small or split windows',
      value: 100,
    },
    {
      label: '$(dash) Normal',
      description: '180 chars',
      detail: 'Balanced for most screens (default)',
      value: 180,
    },
    {
      label: '$(arrow-small-right) Generous',
      description: '250 chars',
      detail: 'For wide monitors',
      value: 250,
    },
    {
      label: '$(arrow-right) Maximum',
      description: '400 chars',
      detail: 'For ultra-wide displays',
      value: 400,
    },
    {
      label: '$(edit) Custom...',
      description: 'Enter your own value',
      detail: 'Set a specific character count (50-500)',
      value: 'custom',
    },
    {
      label: '',
      kind: vscode.QuickPickItemKind.Separator,
      value: 'separator',
    },
    {
      label: '$(arrow-left) Back to Menu',
      description: 'Return to main options',
      value: 'back',
    },
  ];

  // Mark the current selection
  const currentPreset = presets.find((p) => p.value === current);
  if (currentPreset) {
    currentPreset.label = `$(check) ${currentPreset.label.replace('$(arrow-small-left) ', '').replace('$(dash) ', '').replace('$(arrow-small-right) ', '').replace('$(arrow-right) ', '')}`;
  }

  const selected = await vscode.window.showQuickPick(presets, {
    placeHolder: `Current: ${current} characters`,
    title: 'Set CodeLens Truncation Length',
  });

  if (!selected) {
    return;
  }

  // Handle back navigation
  if (selected.value === 'back') {
    await showQuickMenu();
    return;
  }

  // Ignore separator
  if (selected.value === 'separator') {
    return;
  }

  let newValue: number | undefined;

  if (selected.value === 'custom') {
    // Show input box for custom value
    const input = await vscode.window.showInputBox({
      prompt: 'Enter custom truncation length (50-500 characters)',
      value: current.toString(),
      placeHolder: '180',
      validateInput: (value: string) => {
        const num = parseInt(value, 10);
        if (isNaN(num)) {
          return 'Please enter a valid number';
        }
        if (num < 50 || num > 500) {
          return 'Value must be between 50 and 500';
        }
        return null;
      },
    });

    if (input !== undefined) {
      newValue = parseInt(input, 10);
    }
  } else {
    newValue = selected.value as number;
  }

  if (newValue !== undefined) {
    await config.update(
      'codeLensMaxLength',
      newValue,
      vscode.ConfigurationTarget.Global
    );

    // Refresh CodeLens to immediately apply the new length
    if (codeLensProviderInstance) {
      codeLensProviderInstance.refresh();
    }

    vscode.window.showInformationMessage(
      `CodeLens will truncate after ${newValue} characters`
    );
  }
}

/**
 * Open the Getting Started walkthrough
 *
 * Opens the interactive walkthrough with demos and guides for using Plainwind.
 */
async function showWalkthrough(): Promise<void> {
  await vscode.commands.executeCommand(
    'workbench.action.openWalkthrough',
    'gavbarosee.plainwind#plainwind.welcome',
    false
  );
}
