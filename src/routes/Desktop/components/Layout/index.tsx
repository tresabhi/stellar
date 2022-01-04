import devBlueprint from 'assets/blueprints/static/grouping.json';
import EditingCanvas from 'components/CanvasRenderer';
import { importifyBlueprint } from 'core/API/blueprint';
import blueprintStore from 'core/stores/blueprint';
import settingsStore from 'core/stores/settings';
import { FC, InputHTMLAttributes } from 'react';
import Explorer from './components/Explorer';
import './index.scss';

if (settingsStore.getState().debug.loadDummyOnLaunch) {
  blueprintStore.setState(importifyBlueprint(devBlueprint));
}

const Layout: FC<InputHTMLAttributes<HTMLDivElement>> = (props) => {
  const blueprint = blueprintStore((state) => state);

  return (
    <div {...props} className={`${props.className || ''} layout-tab`}>
      <Explorer />
      <EditingCanvas data={blueprint} />
    </div>
  );
};

export default Layout;
