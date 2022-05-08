import * as Canvas from 'components/Canvas';
import { loadBlueprintTemplate } from 'core/blueprint';
import useSettings from 'hooks/useSettings';
import { FC, InputHTMLAttributes } from 'react';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

const devBlueprintName = useSettings.getState().debug.dev_blueprint;
if (devBlueprintName) loadBlueprintTemplate(devBlueprintName);

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const isLeftSideBarVisible = useSettings(
    (state) => state.layout.leftSideBar.visible,
  );
  const isRightSideBarVisible = useSettings(
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
