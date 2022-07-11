import useApp, { TAB } from 'hooks/useApp';
import useKeybinds from 'hooks/useKeybinds';
import Export from './components/Export';
import Layout from './components/Layout';
import Notifications from './components/Notifications';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolbarTop from './components/ToolbarTop';
import styles from './index.module.scss';

export default function Desktop() {
  const tab = useApp((state) => state.tab);

  useKeybinds();

  return (
    <div className={styles['desktop-container']}>
      <Notifications />

      <ToolbarTop />
      <ToolbarBottom />

      <Layout style={{ display: tab === TAB.LAYOUT ? undefined : 'none' }} />
      <Staging style={{ display: tab === TAB.STAGING ? undefined : 'none' }} />
      <Export style={{ display: tab === TAB.EXPORT ? undefined : 'none' }} />
    </div>
  );
}
