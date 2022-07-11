import {
  CursorArrowIcon,
  DownloadIcon,
  EnterIcon,
  ExitIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  FileIcon,
  FilePlusIcon,
  HandIcon,
  UploadIcon,
} from '@radix-ui/react-icons';
import { ReactComponent as StellarIcon } from 'assets/icons/stellar-icon.svg';
import * as Toolbar2 from 'components/Toolbar2';
import {
  fileExport,
  fileImport,
  fileOpen,
  fileSave,
  loadBlueprint,
} from 'core/blueprint';
import { togglePartsVisibilityBySelection } from 'core/part/functions/togglePartsVisibilityBySelection';
import useApp, { TOOL } from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';

const Toolbar = () => {
  const { tool, isPanning } = useApp();
  const { selections, parts } = useBlueprint();
  const isOneHidden = selections.some(
    (selection) => parts.get(selection)?.hidden,
  );

  const handleMoveClick = () => useApp.setState({ tool: TOOL.MOVE });
  const handlePanClick = () => useApp.setState({ tool: TOOL.PAN });
  const handleNewClick = () => loadBlueprint();
  const handleOpenClick = fileOpen;
  const handleSaveClick = fileSave;
  const handleImportClick = fileImport;
  const handleExportClick = fileExport;
  const handleEyeClick = () => togglePartsVisibilityBySelection();

  return (
    <Toolbar2.Root>
      <Toolbar2.Group>
        <Toolbar2.Button>
          <StellarIcon />
        </Toolbar2.Button>
        <Toolbar2.Dropdown icon={<FileIcon />}>
          <Toolbar2.DropdownItem
            icon={<FilePlusIcon />}
            keybind="Ctrl + N"
            onClick={handleNewClick}
          >
            New
          </Toolbar2.DropdownItem>
          <Toolbar2.DropdownItem
            icon={<UploadIcon />}
            keybind="Ctrl + O"
            onClick={handleOpenClick}
          >
            Open
          </Toolbar2.DropdownItem>
          <Toolbar2.DropdownItem
            icon={<DownloadIcon />}
            keybind="Ctrl + S"
            onClick={handleSaveClick}
          >
            Save
          </Toolbar2.DropdownItem>
          <Toolbar2.DropdownItem
            icon={<EnterIcon />}
            keybind="Ctrl + I"
            onClick={handleImportClick}
          >
            Import
          </Toolbar2.DropdownItem>
          <Toolbar2.DropdownItem
            icon={<ExitIcon />}
            keybind="Ctrl + E"
            onClick={handleExportClick}
          >
            Export
          </Toolbar2.DropdownItem>
        </Toolbar2.Dropdown>
        <Toolbar2.Dropdown
          icon={
            tool === TOOL.PAN || isPanning ? <HandIcon /> : <CursorArrowIcon />
          }
        >
          <Toolbar2.DropdownItem
            icon={<CursorArrowIcon />}
            onClick={handleMoveClick}
          >
            Move
          </Toolbar2.DropdownItem>
          <Toolbar2.DropdownItem
            icon={<HandIcon />}
            keybind="Space"
            onClick={handlePanClick}
          >
            Pan
          </Toolbar2.DropdownItem>
        </Toolbar2.Dropdown>
      </Toolbar2.Group>
      <Toolbar2.Group>
        <Toolbar2.Button
          disabled={selections.length === 0}
          onClick={handleEyeClick}
        >
          {isOneHidden ? <EyeClosedIcon /> : <EyeOpenIcon />}
        </Toolbar2.Button>
      </Toolbar2.Group>
    </Toolbar2.Root>
  );
};
export default Toolbar;
