import devBlueprint from 'assets/blueprints/static/grouping.json';
import EditingCanvas from 'components/CanvasRenderer';
import { importifyBlueprint } from 'core/API/blueprint';
import useBlueprint from 'core/hooks/useBlueprint';
import blueprintStore from 'core/stores/blueprint';
import settingsStore from 'core/stores/settings';
import { FC, InputHTMLAttributes } from 'react';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import './index.scss';
import appStore from 'core/stores/app';

if (settingsStore.getState().debug.loadDummyOnLaunch) {
  blueprintStore.setState(importifyBlueprint(devBlueprint));
}

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const blueprint = useBlueprint();
  const blueprintState = blueprintStore((state) => state);

  return (
    <div {...props} className={`${props.className || ''} layout-tab`}>
      {appStore((state) => state.layout.leftSideBar.visible) ? (
        <LeftSideBar />
      ) : undefined}
      <EditingCanvas data={blueprintState} />
      {appStore((state) => state.layout.rightSideBar.visible) ? (
        <RightSideBar />
      ) : undefined}
    </div>
  );
};

export default Layout;
