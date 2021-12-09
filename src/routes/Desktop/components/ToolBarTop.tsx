import * as ContextMenu from 'components/ContextMenu';
import * as ControlMenu from 'components/ControlMenu';
import * as TitleBar from 'components/TitleBar';
import { FC } from 'react';

/**
 * A toolbar containing the control menu buttons, tabs, file name, and window
 * controls
 */
const ToolBarTop: FC = () => (
  <TitleBar.Container style={{ zIndex: 1 }}>
    <ControlMenu.Container>
      <ControlMenu.Button>File</ControlMenu.Button>
      <ControlMenu.Button>Edit</ControlMenu.Button>
      <ControlMenu.Button>View</ControlMenu.Button>
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button>Button 0</ContextMenu.Button>
            <ContextMenu.Button>Button 1</ContextMenu.Button>
            <ContextMenu.Button disabled>Button 2</ContextMenu.Button>
          </ContextMenu.Container>
        }
      >
        Part
      </ControlMenu.Button>
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
