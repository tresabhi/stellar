import * as Canvas from 'components/Canvas';
import { loadBlueprintTemplate } from 'core/blueprint';
import useSettings from 'hooks/useSettings';
import { FC, InputHTMLAttributes } from 'react';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

const { dev_blueprint } = useSettings.getState().debug;
if (dev_blueprint) loadBlueprintTemplate(dev_blueprint);

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
