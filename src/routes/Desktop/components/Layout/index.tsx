import devBlueprint from 'assets/blueprints/mutable/fuelTank';
import { LayoutRenderer } from 'components/Canvas';
import { importifyBlueprint } from 'interfaces/blueprint';
import { FC, InputHTMLAttributes } from 'react';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import styles from './index.module.scss';

if (settingsStore.getState().debug.dev_blueprint) {
  const blueprint = importifyBlueprint(devBlueprint);
  console.log(blueprint);
  blueprintStore.setState(blueprint);
}

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
