import { ReactComponent as EngineIcon } from '../../assets/icons/engine.svg';
import { ReactComponent as FuelCellIcon } from '../../assets/icons/fuel-cell.svg';
import { ReactComponent as GrabIcon } from '../../assets/icons/grab.svg';
import { ReactComponent as GridIcon } from '../../assets/icons/grid.svg';
import { ReactComponent as RedoIcon } from '../../assets/icons/redo.svg';
import { ReactComponent as RotationIcon } from '../../assets/icons/rotation.svg';
import { ReactComponent as SaveIcon } from '../../assets/icons/save.svg';
import { ReactComponent as StructureIcon } from '../../assets/icons/structure.svg';
import { ReactComponent as UndoIcon } from '../../assets/icons/undo.svg';
import { ReactComponent as WheelIcon } from '../../assets/icons/wheel.svg';
import { ReactComponent as ZoomInIcon } from '../../assets/icons/zoom-in.svg';
import { ReactComponent as ZoomOutIcon } from '../../assets/icons/zoom-out.svg';
import EditingCanvas from '../../components/EditingCanvas';
import EditingPanel from '../../components/EditingPanel';
import Explorer from '../../components/Explorer';
import PseudoContainer from '../../components/PseudoContainer';
import ToolBar from '../../components/ToolBar';
import UnitTextInput from '../../components/UnitTextInput';
import * as blueprints from '../../utilities/blueprints';
import devBlueprint from '../../utilities/blueprints/shapeAndTextures1.json';

function Desktop() {
  let data = blueprints.updateBlueprint(devBlueprint);

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
        <UnitTextInput defaultValue={100} suffix="%" />
        <ToolBar.Button>
          <GrabIcon />
        </ToolBar.Button>
        <ToolBar.Seperator />

        <ToolBar.StaticIcon>
          <GridIcon />
        </ToolBar.StaticIcon>
        <UnitTextInput defaultValue={2} suffix="m" />
        <ToolBar.StaticIcon>
          <RotationIcon />
        </ToolBar.StaticIcon>
        <UnitTextInput defaultValue={90} suffix="°" />

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
          <Explorer.ListingContainer list={data.parts} />
        </Explorer.Container>

        <EditingCanvas
          center={data.center}
          offset={data.offset}
          parts={data.parts}
        />

        {/* <Explorer.Container rightSide={true}>
          <Explorer.TabsContainer>
            <Explorer.Tab defaultSelected={true}>Properties</Explorer.Tab>
            <Explorer.Tab>Staging</Explorer.Tab>
          </Explorer.TabsContainer>
          <Explorer.ListingContainer>
            <Explorer.PropertyListing subProperties={[<Explorer.SubPropertyTextInput defaultValue={0} suffix={'m'} name="X" />, <Explorer.SubPropertyTextInput defaultValue={0} suffix={'m'} name="Y" />]}>Position</Explorer.PropertyListing>
            <Explorer.PropertyListing subProperties={[<Explorer.SubPropertyTextInput defaultValue={1} suffix={'x'} name="X" />, <Explorer.SubPropertyTextInput defaultValue={1} suffix={'x'} name="Y" />]}>Scale</Explorer.PropertyListing>
            <Explorer.PropertyListing subProperties={[<Explorer.SubPropertyTextInput defaultValue={0} suffix={'°'} />]}>Rotation</Explorer.PropertyListing>
            <Explorer.PropertyListing subProperties={[<Toggle defaultOn={true} />]}>Toggle On</Explorer.PropertyListing>
            <Explorer.PropertyListing subProperties={[<Toggle defaultOn={false} />]}>Toggle Off</Explorer.PropertyListing>
          </Explorer.ListingContainer>
        </Explorer.Container> */}
      </EditingPanel>
    </PseudoContainer>
  );
}

export default Desktop;
