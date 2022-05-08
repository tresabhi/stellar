import * as Canvas from 'components/Canvas';
import { loadBlueprintTemplate } from 'core/blueprint';
import { FC, InputHTMLAttributes } from 'react';
import settingsStore from 'stores/settings';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

const devBlueprintName = settingsStore.getState().debug.dev_blueprint;
if (devBlueprintName) loadBlueprintTemplate(devBlueprintName);

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const isLeftSideBarVisible = settingsStore(
    (state) => state.layout.leftSideBar.visible,
  );
  const isRightSideBarVisible = settingsStore(
    (state) => state.layout.rightSideBar.visible,
  );

  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['layout-tab']}`}
    >
      {isLeftSideBarVisible ? <LeftSideBar /> : undefined}
      <Canvas.LayoutCanvas />
      {isRightSideBarVisible ? <RightSideBar /> : undefined}
    </div>
  );
};

export default Layout;
