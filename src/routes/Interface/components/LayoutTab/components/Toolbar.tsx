import {
  CardStackMinusIcon,
  CardStackPlusIcon,
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
  selectAllPartsAtRoot,
  togglePartsLockBySelection,
  togglePartsVisibilityBySelection,
  ungroupGroupsBySelection,
  unselectAllParts,
} from 'core/part';
import { duplicatePartsBySelection } from 'core/part/duplicatePartsBySelection';
import { useTranslator } from 'hooks/useTranslator';
import useApp, { Popup, Tool } from 'stores/app';
import useBlueprint from 'stores/blueprint';
import useVersionControl from 'stores/versionControl';

const Toolbar = () => {
  const { t } = useTranslator();
  const tool = useApp((state) =>
    state.editor.isSpacePanning || state.editor.isTouchPanning
      ? Tool.Pan
      : state.editor.tool,
  );
  const isOneHidden = useBlueprint((state) =>
    state.selections.some((selection) => state.parts[selection].hidden),
  );
  const isOneLocked = useBlueprint((state) =>
    state.selections.some((selection) => state.parts[selection].locked),
  );
  const hasNoSelections = useBlueprint(
    (state) => state.selections.length === 0,
  );
  const hasParts = useBlueprint((state) => Object.keys(state.parts).length > 0);
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
  const handleOpenClick = () => openFile();
  const handleSaveClick = () => saveFile();
  const handleSaveAsClick = () => saveFileAs();
  const handleImportClick = () => importFile();
  const handleExportClick = () => exportFile();
  const handleEyeClick = () => togglePartsVisibilityBySelection();
  const handleLockClick = () => togglePartsLockBySelection();
  const handleCopyClick = () => copyPartsBySelection();
  const handleCutClick = () => cutPartsBySelection();
  const handlePasteClick = () => pasteParts();
  const handleDuplicateClick = () => duplicatePartsBySelection();
  // const handleSnippetClick =
  const handleSelectAllClick = () => selectAllPartsAtRoot();
  const handleUnselectAllClick = () => unselectAllParts();
  const handleGroupClick = () => groupPartsBySelection();
  const handleUngroupClick = () => ungroupGroupsBySelection();
  const handleUndoClick = () => undoVersion();
  const handleRedoClick = () => redoVersion();
  const link = (url: string) => () => window.open(url, '_blank');

  return (
    <ToolbarComponent.Container>
      <ToolbarComponent.Group>
        <ToolbarComponent.Button disabled>
          <StellarIcon />
        </ToolbarComponent.Button>

        <ToolbarComponent.DropdownMenu icon={<FileIcon />}>
          <ToolbarComponent.DropdownMenuItem
            icon={<FilePlusIcon />}
            keybind="Ctrl + N"
            onClick={handleNewClick}
          >
            {t`tab.layout.toolbar.file.new`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<UploadIcon />}
            keybind="Ctrl + O"
            onClick={handleOpenClick}
          >
            {t`tab.layout.toolbar.file.open`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<DownloadIcon />}
            keybind="Ctrl + S"
            onClick={handleSaveClick}
          >
            {t`tab.layout.toolbar.file.save`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<DownloadIcon />}
            keybind="Ctrl + Shift + S"
            onClick={handleSaveAsClick}
          >
            {t`tab.layout.toolbar.file.save_as`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<EnterIcon />}
            keybind="Ctrl + I"
            onClick={handleImportClick}
          >
            {t`tab.layout.toolbar.file.import`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<ExitIcon />}
            keybind="Ctrl + E"
            onClick={handleExportClick}
          >
            {t`tab.layout.toolbar.file.export`}
          </ToolbarComponent.DropdownMenuItem>
        </ToolbarComponent.DropdownMenu>

        <ToolbarComponent.DropdownMenu
          icon={tool === Tool.Pan ? <HandIcon /> : <CursorArrowIcon />}
        >
          <ToolbarComponent.DropdownMenuItem
            icon={<CursorArrowIcon />}
            onClick={handleMoveClick}
          >
            {t`tab.layout.toolbar.tool.move`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<HandIcon />}
            keybind="Space"
            onClick={handlePanClick}
          >
            {t`tab.layout.toolbar.tool.pan`}
          </ToolbarComponent.DropdownMenuItem>
        </ToolbarComponent.DropdownMenu>

        <ToolbarComponent.Button onClick={handlePlusClick}>
          <PlusIcon />
        </ToolbarComponent.Button>
      </ToolbarComponent.Group>

      <ToolbarComponent.Group>
        <ToolbarComponent.DropdownMenu
          disabled={!hasParts && hasNoSelections}
          icon={<GroupIcon />}
        >
          <ToolbarComponent.DropdownMenuItem
            disabled={!hasParts}
            icon={<CardStackPlusIcon />}
            onClick={handleSelectAllClick}
            keybind="Ctrl + A"
          >
            {t`tab.layout.toolbar.selection.select_all`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            disabled={hasNoSelections}
            icon={<CardStackMinusIcon />}
            onClick={handleUnselectAllClick}
            keybind="Esc"
          >
            {t`tab.layout.toolbar.selection.unselect_all`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            disabled={hasNoSelections}
            icon={<GroupIcon />}
            onClick={handleGroupClick}
            keybind="Ctrl + G"
          >
            {t`tab.layout.toolbar.selection.group`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            disabled={hasNoSelections}
            icon={<StackIcon />}
            onClick={handleUngroupClick}
            keybind="Ctrl + Shift + G"
          >
            {t`tab.layout.toolbar.selection.ungroup`}
          </ToolbarComponent.DropdownMenuItem>
        </ToolbarComponent.DropdownMenu>

        <ToolbarComponent.DropdownMenu
          disabled={hasNoItemInClipboard && hasNoSelections}
          icon={<ClipboardIcon />}
        >
          <ToolbarComponent.DropdownMenuItem
            icon={<ClipboardCopyIcon />}
            onClick={handleCopyClick}
            keybind="Ctrl + C"
            disabled={hasNoSelections}
          >
            {t`tab.layout.toolbar.clipboard.copy`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<ScissorsIcon />}
            onClick={handleCutClick}
            keybind="Ctrl + X"
            disabled={hasNoSelections}
          >
            {t`tab.layout.toolbar.clipboard.cut`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<ClipboardIcon />}
            onClick={handlePasteClick}
            keybind="Ctrl + V"
            disabled={hasNoItemInClipboard}
          >
            {t`tab.layout.toolbar.clipboard.paste`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<StackIcon />}
            onClick={handleDuplicateClick}
            keybind="Ctrl + D"
            disabled={hasNoSelections}
          >
            {t`tab.layout.toolbar.clipboard.duplicate`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<Component1Icon />}
            keybind="Ctrl + M"
            disabled
          >
            {t`tab.layout.toolbar.clipboard.create_snippet`}
          </ToolbarComponent.DropdownMenuItem>
        </ToolbarComponent.DropdownMenu>

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

        <ToolbarComponent.DropdownMenu icon={<QuestionMarkCircledIcon />}>
          <ToolbarComponent.DropdownMenuItem
            icon={<InfoCircledIcon />}
            keybind="F1"
            onClick={link(WEBSITE)}
          >
            {t`tab.layout.toolbar.help.about`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<ExclamationTriangleIcon />}
            keybind="F4"
            onClick={link(`${GH_REPO_URL}issues/new/choose`)}
          >
            {t`tab.layout.toolbar.help.report`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<DiscordLogoIcon />}
            onClick={link(DISCORD)}
          >
            {t`tab.layout.toolbar.help.discord`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            icon={<GitHubLogoIcon />}
            onClick={link(GH_REPO_URL)}
          >
            {t`tab.layout.toolbar.help.github`}
          </ToolbarComponent.DropdownMenuItem>
        </ToolbarComponent.DropdownMenu>

        <ToolbarComponent.DropdownMenu disabled icon={<GearIcon />}>
          <ToolbarComponent.DropdownMenuItem
            icon={<GearIcon />}
            keybind="Ctrl + ,"
          >
            {t`tab.layout.toolbar.preferences.settings`}
          </ToolbarComponent.DropdownMenuItem>

          <ToolbarComponent.DropdownMenuItem
            keybind="Ctrl + K"
            icon={<KeyboardIcon />}
          >
            {t`tab.layout.toolbar.preferences.keybinds`}
          </ToolbarComponent.DropdownMenuItem>
        </ToolbarComponent.DropdownMenu>
      </ToolbarComponent.Group>
    </ToolbarComponent.Container>
  );
};
export default Toolbar;
