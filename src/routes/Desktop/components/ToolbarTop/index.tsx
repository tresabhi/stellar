import * as ContextMenu from 'components/ContextMenu';
import * as ControlMenu from 'components/ControlMenu';
import * as TitleBar from 'components/TitleBar';
import * as Tabs from 'components/Tabs';
import { FC } from 'react';
import './index.scss';

/**
 * A toolbar containing the control menu buttons, tabs, file name, and window
 * controls
 */
const ToolBarTop: FC = () => (
  <TitleBar.Container className="toolbar-top">
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

            <ContextMenu.Separator />

            <ContextMenu.Button disabled>Save and close</ContextMenu.Button>
            <ContextMenu.Button disabled>Close</ContextMenu.Button>
          </ContextMenu.Container>
        }
      >
        File
      </ControlMenu.Button>
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            <ContextMenu.Button disabled>Undo</ContextMenu.Button>
            <ContextMenu.Button disabled>Redo</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button disabled>Cut</ContextMenu.Button>
            <ContextMenu.Button disabled>Copy</ContextMenu.Button>
            <ContextMenu.Button disabled>Paste</ContextMenu.Button>
            <ContextMenu.Button disabled>Delete</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button disabled>Hide</ContextMenu.Button>
            <ContextMenu.Button disabled>Unhide</ContextMenu.Button>
            <ContextMenu.Button disabled>Lock</ContextMenu.Button>
            <ContextMenu.Button disabled>Unlock</ContextMenu.Button>
          </ContextMenu.Container>
        }
      >
        Edit
      </ControlMenu.Button>
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            <ContextMenu.Button disabled>Layout</ContextMenu.Button>
            <ContextMenu.Button disabled>Staging</ContextMenu.Button>
            <ContextMenu.Button disabled>Simulation</ContextMenu.Button>
            <ContextMenu.Button disabled>Rendering</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button disabled>Toggle HUD</ContextMenu.Button>
            <ContextMenu.Extension
              disabled
              extension={
                <ContextMenu.Container>
                  <ContextMenu.Button>
                    Stellar Dark (Default)
                  </ContextMenu.Button>
                  <ContextMenu.Button>Stellar Light</ContextMenu.Button>
                </ContextMenu.Container>
              }
            >
              Theme
            </ContextMenu.Extension>
          </ContextMenu.Container>
        }
      >
        View
      </ControlMenu.Button>
      <ControlMenu.Button>Part</ControlMenu.Button>
      <ControlMenu.Button>Help</ControlMenu.Button>
    </ControlMenu.Container>

    <Tabs.Container className="toolbar-tabs">
      <Tabs.Tab selected>Layout</Tabs.Tab>
      <Tabs.Tab>Staging</Tabs.Tab>
      <Tabs.Tab>Simulation</Tabs.Tab>
      <Tabs.Tab>Rendering</Tabs.Tab>
    </Tabs.Container>
  </TitleBar.Container>
);
export default ToolBarTop;
