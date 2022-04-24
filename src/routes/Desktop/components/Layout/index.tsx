import { LayoutRenderer } from 'components/Canvas';
import { loadDevBlueprint } from 'interfaces/devBlueprint';
import { FC, InputHTMLAttributes } from 'react';
import settingsStore from 'stores/settings';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

const devBlueprintName = settingsStore.getState().debug.dev_blueprint;
if (devBlueprintName) loadDevBlueprint(devBlueprintName);

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
      <LayoutRenderer />
      {isRightSideBarVisible ? <RightSideBar /> : undefined}
    </div>
  );
};

export default Layout;
