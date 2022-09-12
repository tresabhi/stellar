import {
  Component1Icon,
  LayersIcon,
  MixerVerticalIcon,
} from '@radix-ui/react-icons';
import * as Sidebar from 'components/Sidebar';
import { mutateSettings } from 'core/app';
import { useTranslator } from 'hooks/useTranslator';
import { FC } from 'react';
import useSettings, { SidebarTab } from 'stores/useSettings';
import { TabLayoutProps } from '../../..';

export const Tabs: FC<TabLayoutProps> = ({ swapSecondTab }) => {
  const { t } = useTranslator();
  const leftSidebar = useSettings(
    (state) => state.interface.tabs.layout.leftSidebar,
  );
  const handleClick = (tab: SidebarTab) => {
    return () => {
      mutateSettings((draft) => {
        draft.interface.tabs.layout.leftSidebar.tab = tab;
      });
    };
  };

  return (
    <Sidebar.TabContainer>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Left)}
        selected={leftSidebar.tab === SidebarTab.Left}
        icon={<LayersIcon />}
      >
        {t`tab.layout.left_sidebar.parts`}
      </Sidebar.Tab>
      <Sidebar.Tab
        onClick={handleClick(SidebarTab.Right)}
        selected={leftSidebar.tab === SidebarTab.Right}
        icon={swapSecondTab ? <MixerVerticalIcon /> : <Component1Icon />}
      >
        {swapSecondTab
          ? t`tab.layout.right_sidebar.properties`
          : t`tab.layout.left_sidebar.snippets`}
      </Sidebar.Tab>
    </Sidebar.TabContainer>
  );
};
