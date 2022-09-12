import {
  ClipboardCopyIcon,
  ClipboardIcon,
  Component1Icon,
  CursorArrowIcon,
  DiscordLogoIcon,
  DownloadIcon,
  EnterIcon,
  ExclamationTriangleIcon,
  ExitIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  FileIcon,
  FilePlusIcon,
  GearIcon,
  GitHubLogoIcon,
  GroupIcon,
  HandIcon,
  InfoCircledIcon,
  KeyboardIcon,
  LockClosedIcon,
  LockOpen2Icon,
  PlusIcon,
  QuestionMarkCircledIcon,
  ResetIcon,
  ScissorsIcon,
  StackIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar-icon.svg';
import * as ToolbarComponent from 'components/Toolbar';
import { DISCORD, WEBSITE } from 'constants/social';
import { GH_REPO_URL } from 'constants/sourceCode';
import { mutateApp } from 'core/app/mutateApp';
import {
  exportFile,
  importFile,
  loadBlueprint,
  openFile,
  redoVersion,
  saveFile,
  saveFileAs,
  undoVersion,
} from 'core/blueprint';
import { popupOpen } from 'core/interface';
import {
  copyPartsBySelection,
  cutPartsBySelection,
  groupPartsBySelection,
  pasteParts,
  togglePartsLockBySelection,
  togglePartsVisibilityBySelection,
  ungroupGroupsBySelection,
} from 'core/part';
import { duplicatePartsBySelection } from 'core/part/duplicatePartsBySelection';
import { useTranslator } from 'hooks/useTranslator';
import useApp, { Popup, Tool } from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import useVersionControl from 'stores/useVersionControl';

const Toolbar = () => {
  const { t } = useTranslator();
  const tool = useApp((state) => state.editor.tool);
  const isPanning = useApp((state) => state.editor.isPanning);
  const parts = useBlueprint.getState().parts;
  const isOneHidden = useBlueprint((state) =>
    state.selections.some((selection) => parts.get(selection)?.hidden),
  );
  const isOneLocked = useBlueprint((state) =>
    state.selections.some((selection) => parts.get(selection)?.locked),
  );
  const hasNoSelections = useBlueprint(
    (state) => state.selections.length === 0,
  );
  const hasUndos = useVersionControl((state) => state.index > -1);
  const hasRedos = useVersionControl(
    (state) => state.history.length - 1 > state.index,
  );
  const hasNoItemInClipboard = useApp(
    (state) => state.editor.clipboard === undefined,
  );

  const handleMoveClick = () =>
    mutateApp((draft) => {
      draft.editor.tool = Tool.Move;
    });
  const handlePanClick = () =>
    mutateApp((draft) => {
      draft.editor.tool = Tool.Pan;
    });
  const handlePlusClick = () => popupOpen(Popup.InsertPart);
  const handleNewClick = () => loadBlueprint();
  const handleOpenClick = openFile;
  const handleSaveClick = saveFile;
  const handleSaveAsClick = saveFileAs;
  const handleImportClick = importFile;
  const handleExportClick = exportFile;
  const handleEyeClick = () => togglePartsVisibilityBySelection();
  const handleLockClick = () => togglePartsLockBySelection();
  const handleCopyClick = () => copyPartsBySelection();
  const handleCutClick = () => cutPartsBySelection();
  const handlePasteClick = pasteParts;
  const handleDuplicateClick = () => duplicatePartsBySelection();
  // const handleSnippetClick =
  const handleGroupClick = groupPartsBySelection;
  const handleUngroupClick = () => ungroupGroupsBySelection();
  const handleUndoClick = undoVersion;
  const handleRedoClick = redoVersion;
  const link = (url: string) => () => window.open(url, '_blank');

  return (
    <ToolbarComponent.Container>
      <ToolbarComponent.Group>
        <ToolbarComponent.Button disabled>
          <StellarIcon />
        </ToolbarComponent.Button>

        <ToolbarComponent.Dropdown icon={<FileIcon />}>
          <ToolbarComponent.DropdownItem
            icon={<FilePlusIcon />}
            keybind="Ctrl + N"
            onClick={handleNewClick}
          >
            {t`tab.layout.toolbar.file.new`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<UploadIcon />}
            keybind="Ctrl + O"
            onClick={handleOpenClick}
          >
            {t`tab.layout.toolbar.file.open`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<DownloadIcon />}
            keybind="Ctrl + S"
            onClick={handleSaveClick}
          >
            {t`tab.layout.toolbar.file.save`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<DownloadIcon />}
            keybind="Ctrl + Shift + S"
            onClick={handleSaveAsClick}
          >
            {t`tab.layout.toolbar.file.save_as`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<EnterIcon />}
            keybind="Ctrl + I"
            onClick={handleImportClick}
          >
            {t`tab.layout.toolbar.file.import`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<ExitIcon />}
            keybind="Ctrl + E"
            onClick={handleExportClick}
          >
            {t`tab.layout.toolbar.file.export`}
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>

        <ToolbarComponent.Dropdown
          icon={
            tool === Tool.Pan || isPanning ? <HandIcon /> : <CursorArrowIcon />
          }
        >
          <ToolbarComponent.DropdownItem
            icon={<CursorArrowIcon />}
            onClick={handleMoveClick}
          >
            {t`tab.layout.toolbar.tool.move`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<HandIcon />}
            keybind="Space"
            onClick={handlePanClick}
          >
            {t`tab.layout.toolbar.tool.pan`}
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>

        <ToolbarComponent.Button onClick={handlePlusClick}>
          <PlusIcon />
        </ToolbarComponent.Button>
      </ToolbarComponent.Group>

      <ToolbarComponent.Group>
        <ToolbarComponent.Dropdown
          disabled={hasNoItemInClipboard && hasNoSelections}
          icon={<ClipboardIcon />}
        >
          <ToolbarComponent.DropdownItem
            icon={<ClipboardCopyIcon />}
            onClick={handleCopyClick}
            keybind="Ctrl + C"
            disabled={hasNoSelections}
          >
            {t`tab.layout.toolbar.selection.copy`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<ScissorsIcon />}
            onClick={handleCutClick}
            keybind="Ctrl + X"
            disabled={hasNoSelections}
          >
            {t`tab.layout.toolbar.selection.cut`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<ClipboardIcon />}
            onClick={handlePasteClick}
            keybind="Ctrl + V"
            disabled={hasNoItemInClipboard}
          >
            {t`tab.layout.toolbar.selection.paste`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<StackIcon />}
            onClick={handleDuplicateClick}
            keybind="Ctrl + D"
            disabled={hasNoSelections}
          >
            {t`tab.layout.toolbar.selection.duplicate`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<Component1Icon />}
            keybind="Ctrl + M"
            disabled
          >
            {t`tab.layout.toolbar.selection.create_snippet`}
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>

        <ToolbarComponent.Dropdown
          disabled={hasNoSelections}
          icon={<GroupIcon />}
        >
          <ToolbarComponent.DropdownItem
            icon={<GroupIcon />}
            onClick={handleGroupClick}
            keybind="Ctrl + G"
          >
            {t`tab.layout.toolbar.group.group`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<StackIcon />}
            onClick={handleUngroupClick}
            keybind="Ctrl + Shift + G"
          >
            {t`tab.layout.toolbar.group.ungroup`}
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>

        <ToolbarComponent.Button disabled={hasNoSelections}>
          <TrashIcon />
        </ToolbarComponent.Button>

        <ToolbarComponent.Button
          disabled={hasNoSelections}
          onClick={handleEyeClick}
        >
          {isOneHidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </ToolbarComponent.Button>

        <ToolbarComponent.Button
          disabled={hasNoSelections}
          onClick={handleLockClick}
        >
          {isOneLocked ? <LockClosedIcon /> : <LockOpen2Icon />}
        </ToolbarComponent.Button>
      </ToolbarComponent.Group>

      <ToolbarComponent.Group>
        <ToolbarComponent.Button onClick={handleUndoClick} disabled={!hasUndos}>
          <ResetIcon />
        </ToolbarComponent.Button>

        <ToolbarComponent.Button onClick={handleRedoClick} disabled={!hasRedos}>
          <ResetIcon style={{ transform: 'scaleX(-1)' }} />
        </ToolbarComponent.Button>

        <ToolbarComponent.Dropdown icon={<QuestionMarkCircledIcon />}>
          <ToolbarComponent.DropdownItem
            icon={<InfoCircledIcon />}
            keybind="F1"
            onClick={link(WEBSITE)}
          >
            {t`tab.layout.toolbar.help.about`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<ExclamationTriangleIcon />}
            keybind="F4"
            onClick={link(`${GH_REPO_URL}issues/new/choose`)}
          >
            {t`tab.layout.toolbar.help.report`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<DiscordLogoIcon />}
            onClick={link(DISCORD)}
          >
            {t`tab.layout.toolbar.help.discord`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            icon={<GitHubLogoIcon />}
            onClick={link(GH_REPO_URL)}
          >
            {t`tab.layout.toolbar.help.github`}
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>

        <ToolbarComponent.Dropdown disabled icon={<GearIcon />}>
          <ToolbarComponent.DropdownItem icon={<GearIcon />} keybind="Ctrl + ,">
            {t`tab.layout.toolbar.preferences.settings`}
          </ToolbarComponent.DropdownItem>

          <ToolbarComponent.DropdownItem
            keybind="Ctrl + K"
            icon={<KeyboardIcon />}
          >
            {t`tab.layout.toolbar.preferences.keybinds`}
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>
      </ToolbarComponent.Group>
    </ToolbarComponent.Container>
  );
};
export default Toolbar;
