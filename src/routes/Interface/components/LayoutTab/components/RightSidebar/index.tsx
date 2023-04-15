import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import useSettings, { SidebarTab } from 'stores/settings';
import Snippets from '../LeftSidebar/components/Snippets';
import Inspect from './components/Inspect';
import Properties from './components/Properties';
import Tabs from './components/Tabs';

export default function RightSidebar() {
  const touchscreenMode = useTouchscreenMode();
  const rightSidebar = useSettings(
    (draft) => draft.interface.tabs.layout.rightSidebar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      if (touchscreenMode) {
        const { visible } = draft.interface.tabs.layout.rightSidebar;
        visible.inTouchscreenMode = !visible.inTouchscreenMode;
      } else {
        const { visible } = draft.interface.tabs.layout.rightSidebar;
        visible.inDesktopMode = !visible.inDesktopMode;
      }
    });
  };
  const expanded = touchscreenMode
    ? rightSidebar.visible.inTouchscreenMode
    : rightSidebar.visible.inDesktopMode;

  return (
    <Sidebar.Root visible={expanded} position="right">
      {expanded && (
        <>
          <Tabs />
          {!touchscreenMode && rightSidebar.tab === SidebarTab.Left && (
            <Properties />
          )}
          {touchscreenMode && rightSidebar.tab === SidebarTab.Left && (
            <Snippets />
          )}
          {rightSidebar.tab === SidebarTab.Right && <Inspect />}
        </>
      )}

      <Sidebar.Collapse
        position="right"
        expanded={expanded}
        onClick={handleCollapseClick}
      />
    </Sidebar.Root>
  );
}
