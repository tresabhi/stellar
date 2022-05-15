import { notify } from 'core/notifications';
import useApp from 'hooks/useApp';
import useKeybinds from 'hooks/useKeybinds';
import Layout from './components/Layout';
import Notifications from './components/Notifications';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolbarTop from './components/ToolbarTop';
import styles from './index.module.scss';

notify(
  'Welcome to Stellar!',
  'This is a test notification, please disregard. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'info',
  true,
);

export default function Desktop() {
  const tab = useApp((state) => state.tab);

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
