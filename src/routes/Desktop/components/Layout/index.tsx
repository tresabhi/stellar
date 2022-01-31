import devBlueprint from 'assets/blueprints/static/one-part.json';
import EditingCanvas from 'components/CanvasRenderer';
import { importifyBlueprint } from 'interfaces/blueprint';
import appStore from 'stores/app';
import blueprintStore from 'stores/blueprint';
import settingsStore from 'stores/settings';
import { FC, InputHTMLAttributes } from 'react';
import LeftSideBar from './components/LeftSideBar';
import RightSideBar from './components/RightSideBar';
import './index.scss';

if (settingsStore.getState().debug.loadDummyOnLaunch) {
  blueprintStore.setState(importifyBlueprint(devBlueprint));
}

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
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
