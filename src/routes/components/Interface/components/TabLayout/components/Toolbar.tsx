import {
  ClipboardCopyIcon,
  ClipboardIcon,
  Component1Icon,
  CursorArrowIcon,
  DownloadIcon,
  EnterIcon,
  ExitIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  FileIcon,
  FilePlusIcon,
  GearIcon,
  GroupIcon,
  HandIcon,
  KeyboardIcon,
  LockClosedIcon,
  LockOpen2Icon,
  PlusIcon,
  ResetIcon,
  ScissorsIcon,
  StackIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar-icon.svg';
import * as ToolbarComponent from 'components/Toolbar';
import { mutateApp } from 'core/app/mutateApp';
import {
  fileExport,
  fileImport,
  fileOpen,
  fileSave,
  loadBlueprint,
  versionRedo,
  versionUndo,
} from 'core/blueprint';
import { popupOpen } from 'core/interface';
import {
  copyPartsBySelection,
  cutPartsBySelection,
  duplicateParts,
  groupPartsBySelection,
  pasteParts,
  togglePartsLockBySelection,
  togglePartsVisibilityBySelection,
  ungroupGroupsBySelection,
} from 'core/part';
import useApp, { Popup, Tool } from 'stores/useApp';
import useBlueprint from 'stores/useBlueprint';
import useVersionControl from 'stores/useVersionControl';

const Toolbar = () => {
  const tool = useApp((state) => state.editor.tool);
  const isPanning = useApp((state) => state.editor.isPanning);
  const selections = useBlueprint((state) => state.selections);
  const parts = useBlueprint.getState().parts;
  const isOneHidden = selections.some(
    (selection) => parts.get(selection)?.hidden,
  );
  const isOneLocked = selections.some(
    (selection) => parts.get(selection)?.locked,
  );
  const hasNoSelections = selections.length === 0;
  const hasUndos = useVersionControl((state) => state.index > -1);
  const hasRedos = useVersionControl(
    (state) => state.history.length - 1 > state.index,
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
  const handleOpenClick = fileOpen;
  const handleSaveClick = fileSave;
  const handleImportClick = fileImport;
  const handleExportClick = fileExport;
  const handleEyeClick = () => togglePartsVisibilityBySelection();
  const handleLockClick = () => togglePartsLockBySelection();
  const handleCopyClick = () => copyPartsBySelection();
  const handleCutClick = () => cutPartsBySelection();
  const handlePasteClick = pasteParts;
  const handleDuplicateClick = duplicateParts;
  // const handleSnippetClick =
  const handleGroupClick = groupPartsBySelection;
  const handleUngroupClick = () => ungroupGroupsBySelection();
  const handleUndoClick = versionUndo;
  const handleRedoClick = versionRedo;

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
            New
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<UploadIcon />}
            keybind="Ctrl + O"
            onClick={handleOpenClick}
          >
            Open
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<DownloadIcon />}
            keybind="Ctrl + S"
            onClick={handleSaveClick}
          >
            Save
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<EnterIcon />}
            keybind="Ctrl + I"
            onClick={handleImportClick}
          >
            Import
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<ExitIcon />}
            keybind="Ctrl + E"
            onClick={handleExportClick}
          >
            Export
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
            Move
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<HandIcon />}
            keybind="Space"
            onClick={handlePanClick}
          >
            Pan
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>
        <ToolbarComponent.Button onClick={handlePlusClick}>
          <PlusIcon />
        </ToolbarComponent.Button>
      </ToolbarComponent.Group>
      <ToolbarComponent.Group>
        <ToolbarComponent.Dropdown
          disabled={hasNoSelections}
          icon={<ClipboardIcon />}
        >
          <ToolbarComponent.DropdownItem
            icon={<ClipboardCopyIcon />}
            onClick={handleCopyClick}
            keybind="Ctrl + C"
          >
            Copy
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<ScissorsIcon />}
            onClick={handleCutClick}
            keybind="Ctrl + X"
          >
            Cut
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<ClipboardIcon />}
            onClick={handlePasteClick}
            keybind="Ctrl + V"
          >
            Paste
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<StackIcon />}
            onClick={handleDuplicateClick}
            keybind="Ctrl + D"
          >
            Duplicate
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            disabled
            icon={<Component1Icon />}
            keybind="Ctrl + M"
          >
            Create Snippet
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
            Group
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<StackIcon />}
            onClick={handleUngroupClick}
            keybind="Ctrl + Shift + G"
          >
            Ungroup
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
        <ToolbarComponent.Dropdown disabled icon={<GearIcon />}>
          <ToolbarComponent.DropdownItem icon={<GearIcon />} keybind="Ctrl + ,">
            Settings
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            keybind="Ctrl + K"
            icon={<KeyboardIcon />}
          >
            Keybinds
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>
      </ToolbarComponent.Group>
    </ToolbarComponent.Container>
  );
};
export default Toolbar;
