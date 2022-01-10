import createKeybind from 'core/functions/createKeybind';
import useBlueprint from 'core/hooks/useBlueprint';
import app from 'core/stores/app';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolbarTop from './components/ToolbarTop';
import './index.scss';

const tabOrder = ['layout', 'staging', 'simulation', 'rendering'] as [
  'layout',
  'staging',
  'simulation',
  'rendering',
];

export default function Desktop() {
  const tab = app((state) => state.tab);
  const blueprint = useBlueprint();

  useEffect(() => {
    // BIG TODO: make this automated through settings
    document.addEventListener(
      'keypress',
      createKeybind(
        () =>
          app.setState((state) => ({
            tab:
              state.tab === tabOrder[tabOrder.length - 1]
                ? tabOrder[0]
                : tabOrder[tabOrder.indexOf(state.tab) + 1],
          })),
        ['Control', 'Tab'],
      ),
    );

    document.addEventListener(
      'keypress',
      createKeybind(() => {
        blueprint.deletePartsBySelection();
      }, 'Delete'),
    );
  }, [blueprint]);

  return (
    <div className="desktop-container">
      <ToolbarTop />
      <ToolbarBottom />

      <Layout style={{ display: tab === 'layout' ? 'flex' : 'none' }} />
      <Staging style={{ display: tab === 'staging' ? 'flex' : 'none' }} />
      <Simulation style={{ display: tab === 'simulation' ? 'flex' : 'none' }} />
      <Rendering style={{ display: tab === 'rendering' ? 'flex' : 'none' }} />
    </div>
  );
}
