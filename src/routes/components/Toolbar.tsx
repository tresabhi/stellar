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
  LockClosedIcon,
  LockOpen2Icon,
  MixerHorizontalIcon,
  PlusIcon,
  ResetIcon,
  ScissorsIcon,
  StackIcon,
  TrashIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as RedoIcon } from 'assets/icons/redo.svg';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar-icon.svg';
import * as ToolbarComponent from 'components/Toolbar';
import {
  fileExport,
  fileImport,
  fileOpen,
  fileSave,
  loadBlueprint,
} from 'core/blueprint';
import {
  copyPartsBySelection,
  cutPartsBySelection,
  togglePartsLockBySelection,
  togglePartsVisibilityBySelection,
} from 'core/part';
import useApp, { TOOL } from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';

const Toolbar = () => {
  const { tool, isPanning } = useApp();
  const { selections, parts } = useBlueprint();
  const isOneHidden = selections.some(
    (selection) => parts.get(selection)?.hidden,
  );
  const isOneLocked = selections.some(
    (selection) => parts.get(selection)?.locked,
  );
  const hasNoSelections = selections.length === 0;

  const handleMoveClick = () => useApp.setState({ tool: TOOL.MOVE });
  const handlePanClick = () => useApp.setState({ tool: TOOL.PAN });
  const handleNewClick = () => loadBlueprint();
  const handleOpenClick = fileOpen;
  const handleSaveClick = fileSave;
  const handleImportClick = fileImport;
  const handleExportClick = fileExport;
  const handleEyeClick = () => togglePartsVisibilityBySelection();
  const handleLockClick = () => togglePartsLockBySelection();
  const handleCopyClick = () => copyPartsBySelection();
  const handleCutClick = () => cutPartsBySelection();

  return (
    <ToolbarComponent.Root>
      <ToolbarComponent.Group>
        <ToolbarComponent.Button>
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
            tool === TOOL.PAN || isPanning ? <HandIcon /> : <CursorArrowIcon />
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
        <ToolbarComponent.Button>
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
            keybind="Ctrl + V"
          >
            Paste
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<StackIcon />}
            keybind="Ctrl + D"
          >
            Duplicate
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem
            icon={<Component1Icon />}
            keybind="Ctrl + M"
          >
            Create Snippet
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>
        <ToolbarComponent.Button disabled={hasNoSelections}>
          <GroupIcon />
        </ToolbarComponent.Button>
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
        <ToolbarComponent.Button>
          <ResetIcon />
        </ToolbarComponent.Button>
        <ToolbarComponent.Button>
          <RedoIcon />
        </ToolbarComponent.Button>
        <ToolbarComponent.Dropdown icon={<GearIcon />}>
          <ToolbarComponent.DropdownItem icon={<GearIcon />} keybind="Ctrl + ,">
            Settings
          </ToolbarComponent.DropdownItem>
          <ToolbarComponent.DropdownItem icon={<MixerHorizontalIcon />}>
            File Preferences
          </ToolbarComponent.DropdownItem>
        </ToolbarComponent.Dropdown>
      </ToolbarComponent.Group>
    </ToolbarComponent.Root>
  );
};
export default Toolbar;
