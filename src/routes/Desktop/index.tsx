import devBlueprint from 'assets/blueprints/benchmark/fuelTank';
import { importifyBlueprint } from 'core/API/blueprint';
import blueprintStore from 'core/stores/blueprint';
import { Canvas } from './components/Canvas';
import ExplorerLeft from './components/ExplorerLeft';
import ToolbarBottom from './components/ToolbarBottom';
import ToolBarTop from './components/ToolbarTop';
import './index.scss';

blueprintStore.setState(importifyBlueprint(devBlueprint));

const Desktop = () => {
  return (
    <div className="desktop-container">
      <ToolBarTop />
      <ToolbarBottom />
      <div className="editing-panel">
        <ExplorerLeft />
        <Canvas />
      </div>
    </div>
  );
};

export default Desktop;
