import manifestKeybinds from 'core/functions/manifestKeybinds';
import appStore from 'core/stores/app';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolbarTop from './components/ToolbarTop';
import './index.scss';

export default function Desktop() {
  const tab = appStore((state) => state.tab);

  useEffect(() => manifestKeybinds(), []);

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
