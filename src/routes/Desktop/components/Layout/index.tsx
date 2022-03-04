import devBlueprint from 'assets/blueprints/static/saturn-v.json';
import { LayoutRenderer } from 'components/Canvas';
import { importifyBlueprint } from 'interfaces/blueprint';
import { FC, InputHTMLAttributes } from 'react';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

if (settingsStore.getState().debug.load_dev_blueprint_on_launch) {
  blueprintStore.setState(importifyBlueprint(devBlueprint));
}

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const isLeftSideBarVisible = appStore(
    (state) => state.layout.leftSideBar.visible,
  );
  const isRightSideBarVisible = appStore(
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
