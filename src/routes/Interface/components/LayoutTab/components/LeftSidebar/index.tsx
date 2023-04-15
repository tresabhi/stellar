import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import useSettings, { SidebarTab } from 'stores/settings';
import Properties from '../RightSidebar/components/Properties';
import Parts from './components/Parts';
import Snippets from './components/Snippets';
import Tabs from './components/Tabs';

export default function LeftSidebar() {
  const { visible, tab } = useSettings(
    (state) => state.interface.tabs.layout.leftSidebar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      const { leftSidebar } = draft.interface.tabs.layout;
      leftSidebar.visible = !leftSidebar.visible;
    });
  };
  const touchscreenMode = useTouchscreenMode();

  return (
    <Sidebar.Root visible={visible} position="left">
      {visible && (
        <>
          <Tabs />
          {tab === SidebarTab.Left && <Parts />}
          {touchscreenMode && tab === SidebarTab.Right && <Properties />}
          {!touchscreenMode && tab === SidebarTab.Right && <Snippets />}
        </>
      )}

      <Sidebar.Collapse
        position="left"
        expanded={visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Root>
  );
}
