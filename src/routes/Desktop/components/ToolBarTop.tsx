import * as TitleBar from 'components/TitleBar';
import * as ControlMenu from 'components/ControlMenu';
import { FC } from 'react';

/**
 * A toolbar containing the control menu buttons, tabs, file name, and window
 * controls
 */
const ToolBarTop: FC = () => (
  <TitleBar.Container>
    <ControlMenu.Container>
      <ControlMenu.Button>File</ControlMenu.Button>
      <ControlMenu.Button>Edit</ControlMenu.Button>
      <ControlMenu.Button>View</ControlMenu.Button>
      <ControlMenu.Button extension={<audio />}>Part</ControlMenu.Button>
      <ControlMenu.Button>Help</ControlMenu.Button>
    </ControlMenu.Container>

    <TitleBar.TabsContainer>
      <TitleBar.Tab selected>Layout</TitleBar.Tab>
      <TitleBar.Tab>Staging</TitleBar.Tab>
      <TitleBar.Tab>Simulation</TitleBar.Tab>
      <TitleBar.Tab>Rendering</TitleBar.Tab>
    </TitleBar.TabsContainer>
  </TitleBar.Container>
);
export default ToolBarTop;
