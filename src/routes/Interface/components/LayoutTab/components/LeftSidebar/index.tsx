import * as Sidebar from 'components/Sidebar';
import mutateSettings from 'core/app/mutateSettings';
import useSettings, { SidebarTab } from 'stores/settings';
import { TabLayoutProps } from '../..';
import Properties from '../RightSidebar/components/Properties';
import Parts from './components/Parts';
import Snippets from './components/Snippets';
import Tabs from './components/Tabs';

export default function LeftSidebar({ swapSecondTab }: TabLayoutProps) {
  const { visible, tab } = useSettings(
    (state) => state.interface.tabs.layout.leftSidebar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      const { leftSidebar } = draft.interface.tabs.layout;
      leftSidebar.visible = !leftSidebar.visible;
    });
  };

  return (
    <Sidebar.Container visible={visible} position="left">
      {visible && (
        <>
          <Tabs swapSecondTab={swapSecondTab} />
          {tab === SidebarTab.Left && <Parts />}
          {swapSecondTab && tab === SidebarTab.Right && <Properties />}
          {!swapSecondTab && tab === SidebarTab.Right && <Snippets />}
        </>
      )}

      <Sidebar.Collapse
        position="left"
        expanded={visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Container>
  );
}
