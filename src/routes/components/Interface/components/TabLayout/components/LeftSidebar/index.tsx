import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { FC } from 'react';
import useSettings, { SidebarTab } from 'stores/useSettings';
import { TabLayoutProps } from '../..';
import { Properties } from '../RightSidebar/components/Properties';
import { Parts } from './components/Parts';
import { Rename } from './components/Rename';
import { Tabs } from './components/Tabs';

export const LeftSidebar: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const leftSidebar = useSettings(
    (state) => state.interface.tabs.layout.leftSideBar,
  );
  const handleCollapseClick = () => {
    mutateSettings((draft) => {
      draft.interface.tabs.layout.leftSideBar.visible =
        !draft.interface.tabs.layout.leftSideBar.visible;
    });
  };

  return (
    <Sidebar.Container
      css={{ position: 'relative' }}
      visible={leftSidebar.visible}
      position="left"
    >
      <Tabs swapSecondTab={swapSecondTab} />
      {leftSidebar.tab === SidebarTab.Left && <Parts />}
      {swapSecondTab && leftSidebar.tab === SidebarTab.Right && <Properties />}

      {leftSidebar.tab === SidebarTab.Left && <Rename />}
      <Sidebar.Collapse
        position="right"
        expanded={leftSidebar.visible}
        onClick={handleCollapseClick}
      />
    </Sidebar.Container>
  );
};
