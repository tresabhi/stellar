import PseudoRoot from 'components/PseudoRoot';
import ContextBar from 'components/ContextBar';
import ToolBar from 'components/ToolBar';

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
    <PseudoRoot>
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
        <ToolBar.TextFeild defaultValue={100} suffix="%" />
        <ToolBar.Button>
          <GrabIcon />
        </ToolBar.Button>
        <ToolBar.Seperator />

        <ToolBar.StaticIcon>
          <GridIcon />
        </ToolBar.StaticIcon>
        <ToolBar.TextFeild defaultValue={2} suffix="m" />
        <ToolBar.StaticIcon>
          <RotationIcon />
        </ToolBar.StaticIcon>
        <ToolBar.TextFeild defaultValue={90} suffix="°" />

        <ToolBar.Seperator />
        <ToolBar.DropDownButton icon={<FuelCellIcon />} />
        <ToolBar.DropDownButton icon={<EngineIcon />} />
        <ToolBar.DropDownButton icon={<StructureIcon />} />
        <ToolBar.DropDownButton icon={<WheelIcon />} />
      </ToolBar.Container>
    </PseudoRoot>
  );
}

export default Desktop;
