import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import Parts from 'routes/Interface/components/LayoutTab/components/LeftSidebar/components/Parts';
import useSettings, { SidebarTab } from 'stores/settings';
import Stages from './components/Stages';
import Tabs from './components/Tabs';

export default function LeftSidebar() {
  const { visible, tab } = useSettings(
    (state) => state.interface.tabs.staging.leftSidebar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      const { leftSidebar } = draft.interface.tabs.staging;
      leftSidebar.visible = !leftSidebar.visible;
    });
  };
  const touchscreenMode = useTouchscreenMode();

  return (
    <Sidebar.Root visible={visible} position="left">
      <Tabs />

      {tab === SidebarTab.Left || !touchscreenMode ? <Stages /> : <Parts />}

      <Sidebar.Collapse
        position="left"
        expanded={visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Root>
  );
}
