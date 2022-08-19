import {
  Component1Icon,
  LayersIcon,
  MagnifyingGlassIcon,
  MixerVerticalIcon,
} from '@radix-ui/react-icons';
import { LayoutCanvas } from 'components/Canvas';
import * as Sidebar from 'components/Sidebar';
import { TabContainer } from 'components/TabContainer';
import produce from 'immer';
import { FC } from 'react';
import { styled } from 'stitches.config';
import { Tab } from 'stores/useApp';
import useSettings, { SidebarTab, UseSettings } from 'stores/useSettings';
import Toolbar from './components/Toolbar';

interface TabLayoutProps {
  swapSecondTab: boolean;
}

const HorizontalContainer = styled('div', {
  display: 'flex',
  flex: 1,
});

export const TabLayout: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const leftSidebar = useSettings((state) => state.layout.leftSideBar);
  const rightSidebar = useSettings((state) => state.layout.rightSideBar);
  const handleLeftSidebarTabClick = (tab: SidebarTab) => {
    return () => {
      useSettings.setState(
        produce<UseSettings>((draft) => {
          draft.layout.leftSideBar.tab = tab;
        }),
      );
    };
  };
  const handleRightSidebarTabClick = (tab: SidebarTab) => {
    return () => {
      useSettings.setState(
        produce<UseSettings>((draft) => {
          draft.layout.rightSideBar.tab = tab;
        }),
      );
    };
  };

  return (
    <TabContainer tab={Tab.Layout}>
      <Toolbar />

      <HorizontalContainer>
        <Sidebar.Container visible={leftSidebar.visible} position="left">
          <Sidebar.TabContainer>
            <Sidebar.Tab
              onClick={handleLeftSidebarTabClick(SidebarTab.Left)}
              selected={leftSidebar.tab === SidebarTab.Left}
              icon={<LayersIcon />}
            >
              Parts
            </Sidebar.Tab>
            <Sidebar.Tab
              onClick={handleLeftSidebarTabClick(SidebarTab.Right)}
              selected={leftSidebar.tab === SidebarTab.Right}
              icon={swapSecondTab ? <MixerVerticalIcon /> : <Component1Icon />}
            >
              {swapSecondTab ? 'Properties' : 'Snippets'}
            </Sidebar.Tab>
          </Sidebar.TabContainer>
        </Sidebar.Container>

        <LayoutCanvas />

        <Sidebar.Container visible={rightSidebar.visible} position="right">
          <Sidebar.TabContainer>
            <Sidebar.Tab
              onClick={handleRightSidebarTabClick(SidebarTab.Left)}
              selected={rightSidebar.tab === SidebarTab.Left}
              icon={swapSecondTab ? <Component1Icon /> : <MixerVerticalIcon />}
            >
              {swapSecondTab ? 'Snippets' : 'Properties'}
            </Sidebar.Tab>
            <Sidebar.Tab
              onClick={handleRightSidebarTabClick(SidebarTab.Right)}
              selected={rightSidebar.tab === SidebarTab.Right}
              icon={<MagnifyingGlassIcon />}
            >
              Inspect
            </Sidebar.Tab>
          </Sidebar.TabContainer>
        </Sidebar.Container>
      </HorizontalContainer>
    </TabContainer>
  );
};
