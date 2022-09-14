import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { FC } from 'react';
import useSettings, { SidebarTab } from 'stores/useSettings';
import { TabLayoutProps } from '../..';
import { Properties } from '../RightSidebar/components/Properties';
import { Parts } from './components/Parts';
import { Rename } from './components/Rename';
import { Snippets } from './components/Snippets';
import { Tabs } from './components/Tabs';

export const LeftSidebar: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const leftSidebar = useSettings(
    (state) => state.interface.tabs.layout.leftSidebar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      draft.interface.tabs.layout.leftSidebar.visible =
        !draft.interface.tabs.layout.leftSidebar.visible;
    });
  };

  return (
    <Sidebar.Container visible={leftSidebar.visible} position="left">
      {leftSidebar.visible && (
        <>
          <Tabs swapSecondTab={swapSecondTab} />
          {leftSidebar.tab === SidebarTab.Left && <Parts />}
          {swapSecondTab && leftSidebar.tab === SidebarTab.Right && (
            <Properties />
          )}
          {!swapSecondTab && leftSidebar.tab === SidebarTab.Right && (
            <Snippets />
          )}

          {leftSidebar.tab === SidebarTab.Left && <Rename />}
        </>
      )}

      <Sidebar.Collapse
        position="left"
        expanded={leftSidebar.visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Container>
  );
};
