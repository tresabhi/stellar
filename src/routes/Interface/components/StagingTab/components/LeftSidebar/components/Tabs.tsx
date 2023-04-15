import { LayersIcon, TextAlignBottomIcon } from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useTouchscreenMode from 'hooks/useTouchscreenMode';
import useSettings, { SidebarTab } from 'stores/settings';

export default function Tabs() {
  const visibleTab = useSettings(
    (state) => state.interface.tabs.staging.leftSidebar.tab,
  );
  const handleClick = (tab: SidebarTab) => () => {
    mutateSettings((draft) => {
      draft.interface.tabs.staging.leftSidebar.tab = tab;
    });
  };
  const touchscreenMode = useTouchscreenMode();

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        readonly={!touchscreenMode}
        onClick={handleClick(SidebarTab.Left)}
        selected={touchscreenMode ? visibleTab === SidebarTab.Left : true}
        icon={<TextAlignBottomIcon />}
      >
        Stages
      </Sidebar.Tab>
      {touchscreenMode && (
        <Sidebar.Tab
          onClick={handleClick(SidebarTab.Right)}
          selected={visibleTab === SidebarTab.Right}
          icon={<LayersIcon />}
        >
          Parts
        </Sidebar.Tab>
      )}
    </Sidebar.TabContainer>
  );
}
