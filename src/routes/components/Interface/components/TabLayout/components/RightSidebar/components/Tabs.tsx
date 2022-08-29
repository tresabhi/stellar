import {
  Component1Icon,
  MagnifyingGlassIcon,
  MixerVerticalIcon
} from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { FC } from 'react';
import useSettings, { SidebarTab } from 'stores/useSettings';
import { TabLayoutProps } from '../../..';

export const Tabs: FC<TabLayoutProps> = ({swapSecondTab}) => {
  const rightSidebar = useSettings(
    (draft) => draft.interface.tabs.layout.rightSideBar,
  );
  const handleClick = (tab: SidebarTab) => {
    return () => {
      mutateSettings((draft) => {
        draft.interface.tabs.layout.rightSideBar.tab = tab;
      });
    };
  };

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Left)}
        selected={rightSidebar.tab === SidebarTab.Left}
        icon={swapSecondTab ? <Component1Icon /> : <MixerVerticalIcon />}
      >
        {swapSecondTab ? 'Snippets' : 'Properties'}
      </Sidebar.Tab>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Right)}
        selected={rightSidebar.tab === SidebarTab.Right}
        icon={<MagnifyingGlassIcon />}
      >
        Inspect
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
};
