/*
{
  "toolbar": {
    "control_menu": {
      "file": {
        "$": "File",

        "new": "New",
        "open": "Open...",
        "save": "Save as...",
        "save_as": "Save as...",
        "import": "Import...",
        "export": "Export..."
      },
      "edit": {
        "$": "Edit",

        "undo": "Undo",
        "redo": "Redo",
        "cut": "Cut",
        "copy": "Copy",
        "paste": "Paste",
        "delete": "Delete",
        "hide": "Hide",
        "unhide": "Unhide",
        "lock": "Lock",
        "unlock": "Unlock"
      },
      "view": {
        "$": "View",

        "layout": "Layout",
        "staging": "Staging",
        "simulation": "Simulation",
        "rendering": "Rendering",
        "hud": "HUD",
        "theme": "Theme"
      },
      "add": {
        "$": "Add",

        "structural": {
          "$": "Structural",

          "fuel_tank": "Fuel Tank",
          "structural_part": "Structural Part"
        },
        "propulsion": {
          "$": "Propulsion",

          "titan": "Titan",
          "hawk": "Hawk",
          "frontier": "Frontier",
          "valiant": "Valiant",
          "ion": "Ion",
          "rcs_thruster": "RCS Thruster"
        },
        "electric": {
          "$": "Electric",

          "parachute": "Parachute",
          "side_parachute": "Side Parachute",
          "separator": "Separator",
          "side_separator": "Side Separator",
          "landing_legs": "Landing Legs",
          "large_landing_legs": "Large Landing Legs",
          "wheel": "Wheel",
          "large_wheel": "Large Wheel",
          "solar_panel": "Solar Panel",
          "large_solar_panel": "Large Solar Panel",
          "docking_port": "Docking Port"
        },
        "aerodynamic": {
          "$": "Aerodynamic",

          "nose_cone": "Nose Cone",
          "side_nose_cone": "Side Nose Cone",
          "fuselage": "Fuselage"
        }
      },
      "debug": {
        "$": "Debug",

        "load_template": "Load Template"
      },
      "help": {
        "$": "Help",

        "discord": "Discord",
        "you_will_make_a_wonderful_grown_up": "\"You'll make a wonderful grown-up!\""
      }
    },
    "tabs": {
      "layout": "Layout",
      "staging": "Staging",
      "simulation": "Simulation",
      "rendering": "Rendering"
    }
  },
  "parts_explorer": {
    "parts": {
      "$": "Parts"
    },
    "snippets": {
      "$": "Snippets",

      "coming_soon": "Coming soon!"
    }
  },
  "properties_explorer": {
    "properties": {
      "$": "Properties",

      "canvas": {
        "$": "Canvas",

        "center": "Center",
        "offset_x": "Offset X",
        "offset_y": "Offset Y"
      },
      "transformations": {
        "$": "Transformations",

        "position_x": "Position X",
        "position_y": "Position Y",
        "rotation": "Rotation",
        "scale_x": "Scale X",
        "scale_y": "Scale Y",
        "ratio": "Ratio"
      },
      "Fuel Tank": {
        "$": "Fuel Tank",

        "width": "Width",
        "height": "Height",
        "fuel": "Fuel"
      }
    },

    "inspect": {
      "$": "Inspect",

      "json": "JSON",
      "internal_data": {
        "$": "Internal Data",

        "id": "ID",
        "parent_id": "Parent ID"
      },
      "meta_data": {
        "$": "Meta Data",

        "name": "Name",
        "locked": "Locked",
        "hidden": "Hidden"
      },
      "bounding_box": {
        "$": "Bounding Box",
        "min_x": "Min X",
        "min_y": "Min Y",
        "max_x": "Max X",
        "max_y": "Max Y"
      }
    }
  },
  "canvas": {},
  "statusbar": {},
  "parts": {
    "Fuel Tank": "Fuel Tank",
    "Group": "Group"
  }
}
*/

import { supported } from 'browser-fs-access';
import * as ContextMenu from 'components/ContextMenu';
import * as ControlMenu from 'components/ControlMenu';
import * as Tabs from 'components/Tabs';
import {
  exportBlueprintFile,
  fileImport,
  fileOpen,
  fileSave,
  fileSaveAs,
  loadBlueprint,
  loadBlueprintTemplate,
  versionRedo,
  versionUndo,
} from 'core/blueprint';
import {
  deletePartsBySelection,
  getParentID,
  getPartIndex,
  insertPart,
} from 'core/part';
import useApp from 'hooks/useApp';
import blueprintStore from 'hooks/useBlueprint';
import useTranslator from 'hooks/useTranslator';
import { isUndefined, random } from 'lodash';
import { FC } from 'react';
import styles from './index.module.scss';

const ToolBarTop: FC = () => {
  const { t } = useTranslator();
  const disableSave = isUndefined(useApp((state) => state.fileHandle));
  const loadBp = (name?: string) => () => loadBlueprintTemplate(name);
  const handleLayoutTabClick = () => useApp.setState({ tab: 'layout' });
  const handleStagingTabClick = () => useApp.setState({ tab: 'staging' });
  const handleSimulationTabClick = () => useApp.setState({ tab: 'simulation' });
  const handleRenderingTabClick = () => useApp.setState({ tab: 'rendering' });
  const tab = useApp((state) => state.tab);
  const isTabLayout = tab === 'layout';
  const isTabStaging = tab === 'staging';
  const isTabSimulation = tab === 'simulation';
  const isTabRendering = tab === 'rendering';

  const add = (name: string) => {
    return () => {
      const selections = blueprintStore.getState().selections;
      const lastPartID = selections[selections.length - 1];

      if (lastPartID) {
        const parentID = getParentID(lastPartID);
        const index = getPartIndex(lastPartID, parentID ?? null);
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
        <ControlMenu.Button label={t`toolbar.control_menu.file`}>
          <ContextMenu.Container>
            <ContextMenu.Button onClick={() => loadBlueprint()}>
              {t`toolbar.control_menu.file.new`}
            </ContextMenu.Button>
            <ContextMenu.Button
              onClick={fileOpen}
            >{t`toolbar.control_menu.file.open`}</ContextMenu.Button>
            <ContextMenu.Separator />
            {supported ? (
              <ContextMenu.Button disabled={disableSave} onClick={fileSave}>
                {t`toolbar.control_menu.file.save`}
              </ContextMenu.Button>
            ) : null}
            <ContextMenu.Button onClick={fileSaveAs}>
              {t`toolbar.control_menu.file.save_as`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={fileImport}>
              {t`toolbar.control_menu.file.import`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={exportBlueprintFile}>
              {t`toolbar.control_menu.file.export`}
            </ContextMenu.Button>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label={t`toolbar.control_menu.edit`}>
          <ContextMenu.Container>
            <ContextMenu.Button onClick={versionUndo}>
              {t`toolbar.control_menu.edit.undo`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={versionRedo}>
              {t`toolbar.control_menu.edit.redo`}
            </ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button
              disabled
            >{t`toolbar.control_menu.edit.cut`}</ContextMenu.Button>
            <ContextMenu.Button disabled>
              {t`toolbar.control_menu.edit.copy`}
            </ContextMenu.Button>
            <ContextMenu.Button disabled>
              {t`toolbar.control_menu.edit.paste`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={deletePartsBySelection}>
              {t`toolbar.control_menu.edit.delete`}
            </ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.Button disabled>
              {t`toolbar.control_menu.edit.hide`}
            </ContextMenu.Button>
            <ContextMenu.Button disabled>
              {t`toolbar.control_menu.edit.unhide`}
            </ContextMenu.Button>
            <ContextMenu.Button disabled>
              {t`toolbar.control_menu.edit.lock`}
            </ContextMenu.Button>
            <ContextMenu.Button disabled>
              {t`toolbar.control_menu.edit.unlock`}
            </ContextMenu.Button>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label={t`toolbar.control_menu.view`}>
          <ContextMenu.Container>
            <ContextMenu.Button onClick={handleLayoutTabClick}>
              {t`toolbar.control_menu.view.layout`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={handleStagingTabClick}>
              {t`toolbar.control_menu.view.staging`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={handleSimulationTabClick}>
              {t`toolbar.control_menu.view.simulation`}
            </ContextMenu.Button>
            <ContextMenu.Button onClick={handleRenderingTabClick}>
              {t`toolbar.control_menu.view.rendering`}
            </ContextMenu.Button>
            <ContextMenu.Separator />
            <ContextMenu.CheckBox
              disabled
            >{t`toolbar.control_menu.view.hud`}</ContextMenu.CheckBox>
            <ContextMenu.Extension
              disabled
              label={t`toolbar.control_menu.view.theme`}
            >
              <ContextMenu.Container>
                <ContextMenu.Button disabled>
                  {t`toolbar.control_menu.view.theme.stellar_dark`}
                </ContextMenu.Button>
                <ContextMenu.Button disabled>
                  {t`toolbar.control_menu.view.theme.stellar_light`}
                </ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label="Add">
          {/* TODO: continue off of here */}
          <ContextMenu.Container>
            <ContextMenu.Extension label="Structural">
              <ContextMenu.Container>
                <ContextMenu.Button onClick={add('Fuel Tank')}>
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
                <ContextMenu.Button onClick={loadBp('testFuelTank')}>
                  Fuel Tank Shapes
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
