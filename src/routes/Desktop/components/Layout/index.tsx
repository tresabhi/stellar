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

if (settingsStore.getState().debug.loadDummyOnLaunch) {
  blueprintStore.setState(importifyBlueprint(devBlueprint));
}

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const blueprint = useBlueprint();
  const blueprintState = blueprintStore((state) => state);

  //@ts-ignore
  blueprint.getPartAddress(blueprintState.parts[0].parts[2]);

  return (
    <div {...props} className={`${props.className || ''} layout-tab`}>
      <LeftSideBar />
      <EditingCanvas data={blueprintState} />
      <RightSideBar />
    </div>
  );
};

export default Layout;
