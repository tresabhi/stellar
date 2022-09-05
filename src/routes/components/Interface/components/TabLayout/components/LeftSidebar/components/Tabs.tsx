import {
  Component1Icon,
  LayersIcon,
  MixerVerticalIcon,
} from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import produce from 'immer';
import { FC } from 'react';
import useSettings, { SidebarTab, UseSettings } from 'stores/useSettings';
import { TabLayoutProps } from '../../..';

export const Tabs: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const leftSidebar = useSettings(
    (state) => state.interface.tabs.layout.leftSideBar,
  );
  const handleClick = (tab: SidebarTab) => {
    return () => {
      useSettings.setState(
        produce<UseSettings>((draft) => {
          draft.interface.tabs.layout.leftSideBar.tab = tab;
        }),
      );
    };
  };

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Left)}
        selected={leftSidebar.tab === SidebarTab.Left}
        icon={<LayersIcon />}
      >
        Parts
      </Sidebar.Tab>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Right)}
        selected={leftSidebar.tab === SidebarTab.Right}
        icon={swapSecondTab ? <MixerVerticalIcon /> : <Component1Icon />}
      >
        {swapSecondTab ? 'Properties' : 'Snippets'}
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
};