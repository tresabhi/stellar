import devBlueprint from 'assets/blueprints/benchmark/fuelTank';
import { importifyBlueprint } from 'core/API/blueprint';
import appState from 'core/stores/appState';
import blueprintStore from 'core/stores/blueprint';
import Layout from './components/Layout';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolBarTop from './components/ToolbarTop';
import './index.scss';

blueprintStore.setState(importifyBlueprint(devBlueprint));

export default function Desktop() {
  const tab = appState((state) => state.tab);

  return (
    <div className="desktop-container">
      <ToolBarTop />
      <ToolbarBottom />
      {tab === 'layout' ? (
        <Layout />
      ) : tab === 'staging' ? (
        <Staging />
      ) : tab === 'simulation' ? (
        <Simulation />
      ) : (
        <Rendering />
      )}
    </div>
  );
}
