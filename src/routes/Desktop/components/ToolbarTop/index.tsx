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
  versionUndo
} from 'core/blueprint';
import {
  deletePartsBySelection,
  getParentId,
  getPartIndex,
  insertPart
} from 'core/part';
import useApp from 'hooks/useApp';
import useBlueprint from 'hooks/useBlueprint';
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
      const { selections } = useBlueprint.getState();
      const lastPartId = selections[selections.length - 1];

      if (lastPartId) {
        const parentId = getParentId(lastPartId);
        const index = getPartIndex(lastPartId, parentId ?? null);
        insertPart(name, parentId, {
          index: isUndefined(index) ? 0 : index + 1,
        });
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
        <ControlMenu.Button label={t`toolbar.control_menu.add`}>
          <ContextMenu.Container>
            <ContextMenu.Extension
              label={t`toolbar.control_menu.add.structural`}
            >
              <ContextMenu.Container>
                <ContextMenu.Button onClick={add('Fuel Tank')}>
                  {t`toolbar.control_menu.add.structural.fuel_tank`}
                </ContextMenu.Button>
                <ContextMenu.Button disabled>
                  {t`toolbar.control_menu.add.structural.structural_part`}
                </ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Extension
              label={t`toolbar.control_menu.add.propulsion`}
            >
              <ContextMenu.Container>
                <ContextMenu.Button
                  disabled
                >{t`toolbar.control_menu.add.propulsion.titan`}</ContextMenu.Button>
                <ContextMenu.Button
                  disabled
                >{t`toolbar.control_menu.add.propulsion.hawk`}</ContextMenu.Button>
                <ContextMenu.Button
                  disabled
                >{t`toolbar.control_menu.add.propulsion.peregrine`}</ContextMenu.Button>
                <ContextMenu.Button
                  disabled
                >{t`toolbar.control_menu.add.propulsion.frontier`}</ContextMenu.Button>
                <ContextMenu.Button onClick={add('Engine Valiant')}>
                  {t`toolbar.control_menu.add.propulsion.valiant`}
                </ContextMenu.Button>
                <ContextMenu.Button onClick={add('Engine Kolibri')}>
                  {t`toolbar.control_menu.add.propulsion.kolibri`}
                </ContextMenu.Button>
                <ContextMenu.Button
                  disabled
                >{t`toolbar.control_menu.add.propulsion.ion`}</ContextMenu.Button>
                <ContextMenu.Button
                  disabled
                >{t`toolbar.control_menu.add.propulsion.rcs_thruster`}</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Extension
              disabled
              label={t`toolbar.control_menu.add.electric`}
            >
              <ContextMenu.Container>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.parachute`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.side_parachute`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.separator`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.side_separator`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.landing_legs`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.large_landing_legs`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.wheel`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.large_wheel`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.solar_panel`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.large_solar_panel`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.electric.docking_port`}</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
            <ContextMenu.Extension
              disabled
              label={t`toolbar.control_menu.add.aerodynamic`}
            >
              <ContextMenu.Container>
                <ContextMenu.Button>{t`toolbar.control_menu.add.aerodynamic.nose_cone`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.aerodynamic.side_nose_cone`}</ContextMenu.Button>
                <ContextMenu.Button>{t`toolbar.control_menu.add.aerodynamic.fuselage`}</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label={t`toolbar.control_menu.debug`}>
          <ContextMenu.Container>
            <ContextMenu.Extension
              label={t`toolbar.control_menu.debug.load_template`}
            >
              <ContextMenu.Container>
                <ContextMenu.Button onClick={loadBp('testFuelTank')}>
                  Fuel Tank Shapes
                </ContextMenu.Button>
                <ContextMenu.Button onClick={loadBp('shapeAndTextures1')}>
                  Shape &amp; Textures 1
                </ContextMenu.Button>
                <ContextMenu.Button onClick={loadBp('onePart')}>
                  One Part
                </ContextMenu.Button>

                <ContextMenu.Separator />

                <ContextMenu.Button
                  onClick={loadBp()}
                >{t`toolbar.control_menu.debug.load_template.none`}</ContextMenu.Button>
              </ContextMenu.Container>
            </ContextMenu.Extension>
          </ContextMenu.Container>
        </ControlMenu.Button>
        <ControlMenu.Button label={t`toolbar.control_menu.help`}>
          <ContextMenu.Container>
            <ContextMenu.Button to="https://discord.gg/nDt7AjGJQH/">
              {t`toolbar.control_menu.help.discord`}
            </ContextMenu.Button>
            <ContextMenu.Button to="https://github.com/TresAbhi/stellar">
              {t`toolbar.control_menu.help.github`}
            </ContextMenu.Button>
            {wonderfulGrownUp ? (
              <ContextMenu.Button disabled>
                {t`toolbar.control_menu.help.you_will_make_a_wonderful_grown_up`}
              </ContextMenu.Button>
            ) : null}
          </ContextMenu.Container>
        </ControlMenu.Button>
      </ControlMenu.Container>

      <Tabs.Container className={styles['toolbar-tabs']}>
        <Tabs.Tab onClick={handleLayoutTabClick} selected={isTabLayout}>
          {t`toolbar.tabs.layout`}
        </Tabs.Tab>
        <Tabs.Tab onClick={handleStagingTabClick} selected={isTabStaging}>
          {t`toolbar.tabs.staging`}
        </Tabs.Tab>
        <Tabs.Tab onClick={handleSimulationTabClick} selected={isTabSimulation}>
          {t`toolbar.tabs.simulation`}
        </Tabs.Tab>
        <Tabs.Tab onClick={handleRenderingTabClick} selected={isTabRendering}>
          {t`toolbar.tabs.rendering`}
        </Tabs.Tab>
      </Tabs.Container>
    </div>
  );
};
export default ToolBarTop;
