import {
  Component1Icon,
  LayersIcon,
  MixerVerticalIcon
} from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import produce from 'immer';
import { FC } from 'react';
import useSettings, { SidebarTab, UseSettings } from 'stores/useSettings';
import { TabLayoutProps } from '../..';
import { Parts } from './components/Parts';
import { Rename } from './components/Rename';

export const LeftSidebar: FC<TabLayoutProps> = ({ swapSecondTab }) => {
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
    <Sidebar.Container
      css={{ position: 'relative' }}
      visible={leftSidebar.visible}
      position="left"
    >
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

      <Parts visible={leftSidebar.tab === SidebarTab.Left} />

      <Rename />
    </Sidebar.Container>
  );
};
