import devBlueprint from 'assets/blueprints/benchmark/fuelTank';
import { LayoutRenderer } from 'components/Canvas';
import { importifyBlueprint } from 'interfaces/blueprint';
import { FC, InputHTMLAttributes } from 'react';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

if (settingsStore.getState().debug.load_dummy_on_Launch) {
  blueprintStore.setState(importifyBlueprint(devBlueprint));
}

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div
      {...props}
      className={`${props.className ?? ''} ${styles['layout-tab']}`}
    >
      {appStore((state) => state.layout.leftSideBar.visible) ? (
        <LeftSideBar />
      ) : undefined}
      <LayoutRenderer />
      {appStore((state) => state.layout.rightSideBar.visible) ? (
        <RightSideBar />
      ) : undefined}
    </div>
  );
};

export default Layout;
