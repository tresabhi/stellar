import PageRoot from 'components/PageRoot';
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
    <PageRoot>
      <ContextBar.Container>
        <ContextBar.Button>File</ContextBar.Button>
        <ContextBar.Button>Edit</ContextBar.Button>
        <ContextBar.Button>Selection</ContextBar.Button>
        <ContextBar.Button>View</ContextBar.Button>
        <ContextBar.Button>Help</ContextBar.Button>
      </ContextBar.Container>
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
        <ToolBar.DropDownButton>
          <FuelCellIcon />
        </ToolBar.DropDownButton>
        <ToolBar.DropDownButton>
          <EngineIcon />
        </ToolBar.DropDownButton>
        <ToolBar.DropDownButton>
          <StructureIcon />
        </ToolBar.DropDownButton>
        <ToolBar.DropDownButton>
          <WheelIcon />
        </ToolBar.DropDownButton>
      </ToolBar.Container>
    </PageRoot>
  );
}

export default Desktop;
