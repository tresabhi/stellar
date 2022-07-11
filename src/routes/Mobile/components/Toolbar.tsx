import {
  CursorArrowIcon,
  DownloadIcon,
  EnterIcon,
  ExitIcon,
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
import { BlueprintData } from 'game/Blueprint';
import useApp, { TOOL } from 'hooks/useApp';

const Toolbar = () => {
  const handleMoveClick = () => useApp.setState({ tool: TOOL.MOVE });
  const handlePanClick = () => useApp.setState({ tool: TOOL.PAN });
  const handleNewClick = () => loadBlueprint(BlueprintData);
  const handleOpenClick = fileOpen;
  const handleSaveClick = fileSave;
  const handleImportClick = fileImport;
  const handleExportClick = fileExport;

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
        <Toolbar2.Dropdown icon={<CursorArrowIcon />}>
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
    </Toolbar2.Root>
  );
};
export default Toolbar;
