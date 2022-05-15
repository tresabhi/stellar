import { notify } from 'core/notifications';
import useApp from 'hooks/useApp';
import useKeybinds from 'hooks/useKeybinds';
import { useEffect } from 'react';
import Layout from './components/Layout';
import Notifications from './components/Notifications';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolbarTop from './components/ToolbarTop';
import styles from './index.module.scss';

export default function Desktop() {
  const tab = useApp((state) => state.tab);

  useEffect(() => {
    notify(
      'Welcome to Stellar!',
      'This is a test notification, please disregard.',
      'info',
      true,
    );
  }, []);

  useKeybinds();

  return (
    <div className={styles['desktop-container']}>
      <Notifications />

      <ToolbarTop />
      <ToolbarBottom />

      <Layout style={{ display: tab === 'layout' ? undefined : 'none' }} />
      <Staging style={{ display: tab === 'staging' ? undefined : 'none' }} />
      <Simulation
        style={{ display: tab === 'simulation' ? undefined : 'none' }}
      />
      <Rendering
        style={{ display: tab === 'rendering' ? undefined : 'none' }}
      />
    </div>
  );
}
