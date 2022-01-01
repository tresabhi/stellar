import createKeybind from 'core/functions/createKeybind';
import appState from 'core/stores/appState';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolBarTop from './components/ToolbarTop';
import './index.scss';

const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

export default function Desktop() {
  const tab = appState((state) => state.tab);

  useEffect(() => {
    const keybind = createKeybind(() => {
      appState.setState((state) => ({
        tab:
          state.tab === tabOrder[tabOrder.length - 1]
            ? tabOrder[0]
            : tabOrder[tabOrder.indexOf(state.tab) + 1],
      }));
    }, ['Control', 'Tab']);

    document.addEventListener('keypress', keybind);
  }, []);

  return (
    <div className="desktop-container">
      <ToolBarTop />
      <ToolbarBottom />

      <Layout style={{ display: tab === 'layout' ? 'flex' : 'none' }} />
      <Staging style={{ display: tab === 'staging' ? 'flex' : 'none' }} />
      <Simulation style={{ display: tab === 'simulation' ? 'flex' : 'none' }} />
      <Rendering style={{ display: tab === 'rendering' ? 'flex' : 'none' }} />
    </div>
  );
}
