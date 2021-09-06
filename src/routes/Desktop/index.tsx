import PseudoContainer from 'components/PseudoContainer';
import ToolBar from 'components/ToolBar';
import EditingPanel from 'components/EditingPanel';
import Explorer from 'components/Explorer';
import EditingCanvas from 'components/EditingCanvas';
import UnitTextBox from 'components/UnitTextBox';

import '../../assets/themes/default/index.scss';
// then import the theme

import { ReactComponent as SaveIcon } from 'assets/icons/save.svg';
import { ReactComponent as UndoIcon } from 'assets/icons/undo.svg';
import { ReactComponent as RedoIcon } from 'assets/icons/redo.svg';
import { ReactComponent as ZoomInIcon } from 'assets/icons/zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from 'assets/icons/zoom-out.svg';
import { ReactComponent as GrabIcon } from 'assets/icons/grab.svg';
import { ReactComponent as GridIcon } from 'assets/icons/grid.svg';
import { ReactComponent as RotationIcon } from 'assets/icons/rotation.svg';
import { ReactComponent as FuelCellIcon } from 'assets/icons/fuel-cell.svg';
import { ReactComponent as EngineIcon } from 'assets/icons/engine.svg';
import { ReactComponent as StructureIcon } from 'assets/icons/structure.svg';
import { ReactComponent as WheelIcon } from 'assets/icons/wheel.svg';

function Desktop() {
  return (
    <PseudoContainer>
      <ToolBar.Container>
        <ToolBar.Button>File</ToolBar.Button>
        <ToolBar.Button>Edit</ToolBar.Button>
        <ToolBar.Button>Selection</ToolBar.Button>
        <ToolBar.Button>View</ToolBar.Button>
        <ToolBar.Button>Help</ToolBar.Button>
      </ToolBar.Container>
      <ToolBar.Container>
        <ToolBar.Button>
          <SaveIcon />
        </ToolBar.Button>
        <ToolBar.Button>
          <UndoIcon />
        </ToolBar.Button>
        <ToolBar.Button>
          <RedoIcon />
        </ToolBar.Button>
        <ToolBar.Seperator />

        <ToolBar.Button>
          <ZoomInIcon />
        </ToolBar.Button>
        <ToolBar.Button>
          <ZoomOutIcon />
        </ToolBar.Button>
        <UnitTextBox defaultValue={100} suffix="%" />
        <ToolBar.Button>
          <GrabIcon />
        </ToolBar.Button>
        <ToolBar.Seperator />

        <ToolBar.StaticIcon>
          <GridIcon />
        </ToolBar.StaticIcon>
        <UnitTextBox defaultValue={2} suffix="m" />
        <ToolBar.StaticIcon>
          <RotationIcon />
        </ToolBar.StaticIcon>
        <UnitTextBox defaultValue={90} suffix="°" />

        <ToolBar.Seperator />
        <ToolBar.DropDownButton icon={<FuelCellIcon />} />
        <ToolBar.DropDownButton icon={<EngineIcon />} />
        <ToolBar.DropDownButton icon={<StructureIcon />} />
        <ToolBar.DropDownButton icon={<WheelIcon />} />
      </ToolBar.Container>

      <EditingPanel>
        <Explorer.Container>
          <Explorer.TabsContainer>
            <Explorer.StaticTab>Parts</Explorer.StaticTab>
          </Explorer.TabsContainer>
          <Explorer.ListingContainer>
            <Explorer.PartListing icon={<StructureIcon />}>4m Structural Piece</Explorer.PartListing>
            <Explorer.PartListing icon={<WheelIcon />}>Big Wheel</Explorer.PartListing>
            <Explorer.PartListing icon={<EngineIcon />}>Hawk Engine</Explorer.PartListing>
            <Explorer.PartListing icon={<FuelCellIcon />}>4m Fuel Cell</Explorer.PartListing>
          </Explorer.ListingContainer>
        </Explorer.Container>

        <EditingCanvas />

        <Explorer.Container rightSide={true}>
          <Explorer.TabsContainer>
            <Explorer.Tab defaultSelected={true}>Properties</Explorer.Tab>
            <Explorer.Tab>Staging</Explorer.Tab>
          </Explorer.TabsContainer>
          <Explorer.ListingContainer>
            <Explorer.PropertyListing subProperties={[<button>hello</button>]}>Position</Explorer.PropertyListing>
          </Explorer.ListingContainer>
        </Explorer.Container>
      </EditingPanel>
    </PseudoContainer>
  );
}

export default Desktop;
