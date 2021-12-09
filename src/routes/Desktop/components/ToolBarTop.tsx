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
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            {/* Pro tip: add "..." only if further interaction is required */}
            <ContextMenu.Button>New</ContextMenu.Button>
            <ContextMenu.Button disabled>Open...</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button disabled>Save</ContextMenu.Button>
            <ContextMenu.Button disabled>Save as...</ContextMenu.Button>
            <ContextMenu.Button disabled>Import...</ContextMenu.Button>
            <ContextMenu.Button disabled>Export...</ContextMenu.Button>
          </ContextMenu.Container>
        }
      >
        File
      </ControlMenu.Button>
      <ControlMenu.Button>Edit</ControlMenu.Button>
      <ControlMenu.Button>View</ControlMenu.Button>
      <ControlMenu.Button>Part</ControlMenu.Button>
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
