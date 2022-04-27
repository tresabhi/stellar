import { supported } from 'browser-fs-access';
import * as ContextMenu from 'components/ContextMenu';
import * as ControlMenu from 'components/ControlMenu';
import * as Tabs from 'components/Tabs';
import produce from 'immer';
import {
  deletePartsBySelection,
  exportBlueprintFile,
  getParentID,
  getPartIndex,
  importBlueprintFile,
  insertPart,
  loadBlueprint,
  openBlueprintFile,
  redo,
  saveAsBlueprintFile,
  saveBlueprintFile,
  undo,
} from 'interfaces/blueprint';
import { loadDevBlueprint } from 'interfaces/devBlueprint';
import { isUndefined, random } from 'lodash';
import { FC } from 'react';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import settingsStore, { SettingsStore } from 'stores/settings';
import styles from './index.module.scss';

const ToolBarTop: FC = () => {
  const disableSave = isUndefined(appStore((state) => state.fileHandle));

  const loadBp = (name?: string) => () => loadDevBlueprint(name);
  const handleOrbitControlsClick = () =>
    settingsStore.setState(
      produce((draft: SettingsStore) => {
        draft.debug.orbit_controls = !draft.debug.orbit_controls;
      }),
    );
  const handleLayoutTabClick = () => appStore.setState({ tab: 'layout' });
  const handleStagingTabClick = () => appStore.setState({ tab: 'staging' });
  const handleSimulationTabClick = () =>
    appStore.setState({ tab: 'simulation' });
  const handleRenderingTabClick = () => appStore.setState({ tab: 'rendering' });
  const tab = appStore((state) => state.tab);
  const isTabLayout = tab === 'layout';
  const isTabStaging = tab === 'staging';
  const isTabSimulation = tab === 'simulation';
  const isTabRendering = tab === 'rendering';

  const adder = (name: string) => {
    return () => {
      const selections = blueprintStore.getState().selections;
      const lastPartID = selections[selections.length - 1];
      if (lastPartID) {
        const parentID = getParentID(lastPartID);
        const index = getPartIndex(lastPartID, parentID);
        insertPart(name, parentID, isUndefined(index) ? 0 : index + 1);
      } else {
        insertPart(name);
      }
    };
  };

  // wonderful grown-up easter egg
  const wonderfulGrownUp = random(0, 999, false) === 0;

  return (
    <div className={styles['toolbar-top']}>
      <ControlMenu.Container>
        <ControlMenu.Button label="File">
          <ContextMenu.Container>
            <ContextMenu.Button onClick={() => loadBlueprint()}>
              New
            </ContextMenu.Button>
            <ContextMenu.Button onClick={openBlueprintFile}>
              Open...
            </ContextMenu.Button>
            <ContextMenu.Separator />
            {supported ? (
              <ContextMenu.Button
                disabled={disableSave}
                onClick={saveBlueprintFile}
              >
                Save
              </ContextMenu.Button>
            ) : null}
            <ContextMenu.Button onClick={saveAsBlueprintFile}>
              Save as...
            </ContextMenu.Button>
            <ContextMenu.Button onClick={importBlueprintFile}>
              Import...
            </ContextMenu.Button>
            <ContextMenu.Button onClick={exportBlueprintFile}>
              Export...
            </ContextMenu.Button>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label="Edit">
          <ContextMenu.Container>
            <ContextMenu.Button onClick={undo}>Undo</ContextMenu.Button>
            <ContextMenu.Button onClick={redo}>Redo</ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button disabled>Cut</ContextMenu.Button>
            <ContextMenu.Button disabled>Copy</ContextMenu.Button>
            <ContextMenu.Button disabled>Paste</ContextMenu.Button>
            <ContextMenu.Button onClick={deletePartsBySelection}>
              Delete
            </ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button disabled>Hide</ContextMenu.Button>
            <ContextMenu.Button disabled>Unhide</ContextMenu.Button>
            <ContextMenu.Button disabled>Lock</ContextMenu.Button>
            <ContextMenu.Button disabled>Unlock</ContextMenu.Button>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label="View">
          <ContextMenu.Container>
            <ContextMenu.Button onClick={handleLayoutTabClick}>
              Layout
            </ContextMenu.Button>
            <ContextMenu.Button onClick={handleStagingTabClick}>
              Staging
            </ContextMenu.Button>
            <ContextMenu.Button onClick={handleSimulationTabClick}>
              Simulation
            </ContextMenu.Button>
            <ContextMenu.Button onClick={handleRenderingTabClick}>
              Rendering
            </ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button disabled>Toggle HUD</ContextMenu.Button>
            <ContextMenu.Extension disabled label="Theme">
              <ContextMenu.Container>
                <ContextMenu.Button disabled>
                  Stellar Dark (Default)
                </ContextMenu.Button>
                <ContextMenu.Button disabled>Stellar Light</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label="Add">
          <ContextMenu.Container>
            <ContextMenu.Extension label="Structural">
              <ContextMenu.Container>
                <ContextMenu.Button onClick={adder('Fuel Tank')}>
                  Fuel Tank
                </ContextMenu.Button>
                <ContextMenu.Button disabled>
                  Structural Part
                </ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Extension disabled label="Propulsion">
              <ContextMenu.Container>
                <ContextMenu.Button>Titan</ContextMenu.Button>
                <ContextMenu.Button>Hawk</ContextMenu.Button>
                <ContextMenu.Button>Frontier</ContextMenu.Button>
                <ContextMenu.Button>Valiant</ContextMenu.Button>
                <ContextMenu.Button>Ion</ContextMenu.Button>
                <ContextMenu.Button>RCS Thruster</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Extension disabled label="Electric">
              <ContextMenu.Container>
                <ContextMenu.Button>Parachute</ContextMenu.Button>
                <ContextMenu.Button>Side Parachute</ContextMenu.Button>
                <ContextMenu.Button>Separator</ContextMenu.Button>
                <ContextMenu.Button>Side Separator</ContextMenu.Button>
                <ContextMenu.Button>Side Landing Leg</ContextMenu.Button>
                <ContextMenu.Button>Landing Legs</ContextMenu.Button>
                <ContextMenu.Button>Large Landing Legs</ContextMenu.Button>
                <ContextMenu.Button>Wheel</ContextMenu.Button>
                <ContextMenu.Button>Large Wheel</ContextMenu.Button>
                <ContextMenu.Button>Solar Panel</ContextMenu.Button>
                <ContextMenu.Button>Large Solar Panel</ContextMenu.Button>
                <ContextMenu.Button>Docking Port</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Extension disabled label="Aerodynamic">
              <ContextMenu.Container>
                <ContextMenu.Button>Nose Cone</ContextMenu.Button>
                <ContextMenu.Button>Side Nose Cone</ContextMenu.Button>
                <ContextMenu.Button>Fuselage</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label="Debug">
          <ContextMenu.Container>
            <ContextMenu.Extension label="Load Template">
              <ContextMenu.Container>
                <ContextMenu.Button onClick={loadBp('fuelTank')}>
                  Fuel Tank Shapes
                </ContextMenu.Button>
                <ContextMenu.Button onClick={loadBp('onePart')}>
                  One Part
                </ContextMenu.Button>
                <ContextMenu.Button onClick={loadBp('shapeAndTextures1')}>
                  Shape &amp; Textures 1
                </ContextMenu.Button>

                <ContextMenu.Separator />

                <ContextMenu.Button onClick={loadBp('saturnV')}>
                  Saturn V
                </ContextMenu.Button>

                <ContextMenu.Separator />

                <ContextMenu.Button onClick={loadBp()}>None</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Toggle
              defaultState={settingsStore.getState().debug.orbit_controls}
              onClick={handleOrbitControlsClick}
            >
              Orbit controls
            </ContextMenu.Toggle>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label="Help">
          <ContextMenu.Container>
            <ContextMenu.Button to="https://discord.gg/nDt7AjGJQH/">
              Discord
            </ContextMenu.Button>
            {wonderfulGrownUp ? (
              <ContextMenu.Button disabled>
                "You'll make a wonderful grown-up!"
              </ContextMenu.Button>
            ) : null}
          </ContextMenu.Container>
        </ControlMenu.Button>
      </ControlMenu.Container>

      <Tabs.Container className={styles['toolbar-tabs']}>
        <Tabs.Tab onClick={handleLayoutTabClick} selected={isTabLayout}>
          Layout
        </Tabs.Tab>
        <Tabs.Tab onClick={handleStagingTabClick} selected={isTabStaging}>
          Staging
        </Tabs.Tab>
        <Tabs.Tab onClick={handleSimulationTabClick} selected={isTabSimulation}>
          Simulation
        </Tabs.Tab>
        <Tabs.Tab onClick={handleRenderingTabClick} selected={isTabRendering}>
          Rendering
        </Tabs.Tab>
      </Tabs.Container>
    </div>
  );
};
export default ToolBarTop;
