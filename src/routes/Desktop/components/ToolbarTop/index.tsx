import * as ContextMenu from 'components/ContextMenu';
import * as ControlMenu from 'components/ControlMenu';
import * as Tabs from 'components/Tabs';
import { FC } from 'react';
import './index.scss';

/**
 * A toolbar containing the control menu buttons, tabs, file name, and window
 * controls
 */
const ToolBarTop: FC = () => (
  <div className="toolbar-top">
    <ControlMenu.Container>
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            {/* Pro tip: add "..." only if further interaction is required */}
            <ContextMenu.Button>New</ContextMenu.Button>
            <ContextMenu.Button>Open...</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button>Save</ContextMenu.Button>
            <ContextMenu.Button>Save as...</ContextMenu.Button>
            <ContextMenu.Button>Import...</ContextMenu.Button>
            <ContextMenu.Button>Export...</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button>Save and close</ContextMenu.Button>
            <ContextMenu.Button>Close</ContextMenu.Button>
          </ContextMenu.Container>
        }
      >
        File
      </ControlMenu.Button>
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            <ContextMenu.Button>Undo</ContextMenu.Button>
            <ContextMenu.Button>Redo</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button>Cut</ContextMenu.Button>
            <ContextMenu.Button>Copy</ContextMenu.Button>
            <ContextMenu.Button>Paste</ContextMenu.Button>
            <ContextMenu.Button>Delete</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button>Hide</ContextMenu.Button>
            <ContextMenu.Button>Unhide</ContextMenu.Button>
            <ContextMenu.Button>Lock</ContextMenu.Button>
            <ContextMenu.Button>Unlock</ContextMenu.Button>
          </ContextMenu.Container>
        }
      >
        Edit
      </ControlMenu.Button>
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            <ContextMenu.Button>Layout</ContextMenu.Button>
            <ContextMenu.Button>Staging</ContextMenu.Button>
            <ContextMenu.Button>Simulation</ContextMenu.Button>
            <ContextMenu.Button>Rendering</ContextMenu.Button>

            <ContextMenu.Separator />

            <ContextMenu.Button>Toggle HUD</ContextMenu.Button>
            <ContextMenu.Extension
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
      <ControlMenu.Button
        extension={
          <ContextMenu.Container>
            <ContextMenu.Extension
              extension={
                <ContextMenu.Container>
                  <ContextMenu.Extension
                    extension={
                      <ContextMenu.Container>
                        <ContextMenu.Button>Fuel Tank</ContextMenu.Button>
                        <ContextMenu.Button>Structural Part</ContextMenu.Button>
                      </ContextMenu.Container>
                    }
                  >
                    Structural
                  </ContextMenu.Extension>
                  <ContextMenu.Extension
                    extension={
                      <ContextMenu.Container>
                        <ContextMenu.Button>Titan</ContextMenu.Button>
                        <ContextMenu.Button>Hawk</ContextMenu.Button>
                        <ContextMenu.Button>Frontier</ContextMenu.Button>
                        <ContextMenu.Button>Valiant</ContextMenu.Button>
                        <ContextMenu.Button>Ion</ContextMenu.Button>
                        <ContextMenu.Button>RCS Thruster</ContextMenu.Button>
                      </ContextMenu.Container>
                    }
                  >
                    Propulsion
                  </ContextMenu.Extension>
                  <ContextMenu.Extension
                    extension={
                      <ContextMenu.Container>
                        <ContextMenu.Button>Parachute</ContextMenu.Button>
                        <ContextMenu.Button>Side Parachute</ContextMenu.Button>
                        <ContextMenu.Button>Separator</ContextMenu.Button>
                        <ContextMenu.Button>Side Separator</ContextMenu.Button>
                        <ContextMenu.Button>
                          Side Landing Leg
                        </ContextMenu.Button>
                        <ContextMenu.Button>Landing Legs</ContextMenu.Button>
                        <ContextMenu.Button>
                          Large Landing Legs
                        </ContextMenu.Button>
                        <ContextMenu.Button>Wheel</ContextMenu.Button>
                        <ContextMenu.Button>Large Wheel</ContextMenu.Button>
                        <ContextMenu.Button>Solar Panel</ContextMenu.Button>
                        <ContextMenu.Button>
                          Large Solar Panel
                        </ContextMenu.Button>
                        <ContextMenu.Button>Docking Port</ContextMenu.Button>
                      </ContextMenu.Container>
                    }
                  >
                    Electric
                  </ContextMenu.Extension>
                  <ContextMenu.Extension
                    extension={
                      <ContextMenu.Container>
                        <ContextMenu.Button>Nose Cone</ContextMenu.Button>
                        <ContextMenu.Button>Side Nose Cone</ContextMenu.Button>
                        <ContextMenu.Button>Fuselage</ContextMenu.Button>
                      </ContextMenu.Container>
                    }
                  >
                    Aerodynamic
                  </ContextMenu.Extension>
                </ContextMenu.Container>
              }
            >
              Add
            </ContextMenu.Extension>
          </ContextMenu.Container>
        }
      >
        Part
      </ControlMenu.Button>
      <ControlMenu.Button>Help</ControlMenu.Button>
    </ControlMenu.Container>

    <Tabs.Container className="toolbar-tabs">
      <Tabs.Tab selected>Layout</Tabs.Tab>
      <Tabs.Tab>Staging</Tabs.Tab>
      <Tabs.Tab>Simulation</Tabs.Tab>
      <Tabs.Tab>Rendering</Tabs.Tab>
    </Tabs.Container>
  </div>
);
export default ToolBarTop;
