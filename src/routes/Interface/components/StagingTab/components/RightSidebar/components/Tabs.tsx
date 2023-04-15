import { TextAlignBottomIcon } from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
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

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        readonly
        onClick={handleClick(SidebarTab.Left)}
        selected={visibleTab === SidebarTab.Left}
        icon={<TextAlignBottomIcon />}
      >
        Parts
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
}
